import { describe, expect, it } from "vitest";
import { recordObservation } from "./budget-policy.mjs";

const policy = {
  weeklyBudget: { stopStartingNewIterationsAtPercentagePoints: 28, reservePercentagePoints: 2 },
};
const baseline = {
  limitId: "codex",
  usedPercent: 64,
  windowDurationMins: 10080,
  resetsAt: 1791071949,
  action: "start",
  taskId: "SETUP-001",
};

describe("budget policy", () => {
  it("should charge only the observed increase after the baseline", () => {
    const target = recordObservation(null, baseline, policy);
    const result = recordObservation(
      target,
      { ...baseline, action: "checkpoint", usedPercent: 67 },
      policy,
    );
    expect(result.chargedPercentagePoints).toBe(3);
    expect(result.status).toBe("monitored_only");
  });
  it("should stop at 28 percentage points before the 30 percent cap", () => {
    const target = recordObservation(null, baseline, policy);
    expect(
      recordObservation(target, { ...baseline, action: "checkpoint", usedPercent: 92 }, policy)
        .status,
    ).toBe("stop");
  });
  it("should stop when account allowance is nearly exhausted", () => {
    expect(() => recordObservation(null, { ...baseline, usedPercent: 98 }, policy)).toThrow();
  });
  it.each([null, -1, 101, Number.NaN])("should reject invalid usage %s", (usedPercent) => {
    expect(() => recordObservation(null, { ...baseline, usedPercent }, policy)).toThrow();
  });
  it("should exclude an explicitly closed idle interval", () => {
    const target = recordObservation(null, baseline, policy);
    const closed = recordObservation(
      target,
      { ...baseline, action: "end", usedPercent: 67 },
      policy,
    );
    const reopened = recordObservation(closed, { ...baseline, usedPercent: 75 }, policy);
    expect(reopened.chargedPercentagePoints).toBe(3);
    expect(reopened.active).toBe(true);
  });
  it("should reject resets, unknown buckets and decreasing readings", () => {
    const target = recordObservation(null, baseline, policy);
    expect(() =>
      recordObservation(target, { ...baseline, resetsAt: 1792071949 }, policy),
    ).toThrow();
    expect(() => recordObservation(target, { ...baseline, limitId: "other" }, policy)).toThrow();
    expect(() =>
      recordObservation(target, { ...baseline, action: "checkpoint", usedPercent: 63 }, policy),
    ).toThrow();
  });
});
