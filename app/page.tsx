export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-light-bg dark:bg-dark-bg">
      <div className="text-center space-y-6 p-8">
        <h1 className="text-6xl font-bold text-light-text dark:text-dark-text">
          LINKER<span className="text-primary">.</span>
        </h1>
        <p className="text-xl text-light-muted dark:text-dark-muted max-w-2xl">
          Simplifica Tus Conexiones
        </p>
        <p className="text-sm text-light-muted dark:text-dark-muted">
          Inicializando proyecto Next.js 16... 🚀
        </p>
      </div>
    </main>
  );
}
