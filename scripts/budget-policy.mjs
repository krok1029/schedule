export function recordObservation(ledger, observation, policy) {
  const {
    usedPercent,
    resetsAt,
    windowDurationMins,
    limitId,
    action = "checkpoint",
    taskId,
  } = observation;
  if (
    !Number.isFinite(usedPercent) ||
    usedPercent < 0 ||
    usedPercent > 100 ||
    !Number.isInteger(resetsAt) ||
    resetsAt <= 0 ||
    windowDurationMins !== 10080 ||
    !limitId
  ) {
    throw new Error("需要有效的帳戶週用量讀值，不能將缺漏視為零。");
  }
  if (!["start", "checkpoint", "end"].includes(action)) throw new Error("未知的記帳動作。");
  if (!ledger && action !== "start") throw new Error("首次必須開始執行區間。");
  if (action === "start" && !taskId) throw new Error("開始區間需要任務 ID。");
  if (ledger && (ledger.resetsAt !== resetsAt || ledger.limitId !== limitId)) {
    throw new Error("週期或額度已改變，須先人工結算舊窗口。");
  }
  if (ledger && usedPercent < ledger.lastUsedPercent)
    throw new Error("用量下降，須先核對重設或讀值異常。");
  if (ledger?.active && action === "start") throw new Error("已有未結算區間，請繼續或結束它。");
  if (ledger && !ledger.active && action !== "start") throw new Error("尚未開始區間。");
  const delta = ledger?.active ? usedPercent - ledger.lastUsedPercent : 0;
  const charged = (ledger?.chargedPercentagePoints ?? 0) + delta;
  const stop =
    charged >= policy.weeklyBudget.stopStartingNewIterationsAtPercentagePoints ||
    usedPercent >= 100 - policy.weeklyBudget.reservePercentagePoints;
  if (stop && action === "start") throw new Error("已達停止門檻，不能開始區間。");
  return {
    limitId,
    resetsAt,
    windowDurationMins,
    baselineUsedPercent: ledger?.baselineUsedPercent ?? usedPercent,
    lastUsedPercent: usedPercent,
    chargedPercentagePoints: charged,
    active: action !== "end",
    taskId: action === "start" ? taskId : ledger.taskId,
    status: stop ? "stop" : "monitored_only",
    observations: [
      ...(ledger?.observations ?? []),
      { ...observation, action, chargedDelta: delta },
    ],
  };
}
