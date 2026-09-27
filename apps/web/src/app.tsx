export function App() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-3xl flex-col justify-center px-6 py-16">
      <p className="text-sm font-semibold tracking-widest text-emerald-800">SCHEDULE</p>
      <h1 className="mt-4 text-4xl leading-tight font-semibold sm:text-5xl">
        安排好時間，接著往前。
      </h1>
      <p className="mt-6 max-w-xl text-lg leading-relaxed text-stone-600">
        把每週的安排、上次的進度與下一步放在一起。
      </p>
      <section
        aria-labelledby="preview-title"
        className="mt-10 rounded-2xl border border-stone-300 bg-white p-6"
      >
        <h2 id="preview-title" className="text-xl font-semibold">
          開發預覽
        </h2>
        <p className="mt-3 leading-relaxed text-stone-600">
          目前是應用程式的起始畫面，項目建立與保存功能尚未開放。
        </p>
      </section>
    </main>
  );
}
