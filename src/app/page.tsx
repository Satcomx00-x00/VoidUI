export default function HomePage(): React.ReactElement {
  return (
    <main className="flex min-h-screen items-center justify-center p-8">
      <div className="text-center">
        <p className="text-text-muted font-mono text-xs tracking-[0.2em] uppercase">
          VoidUI · v0.0.0
        </p>
        <h1 className="font-display mt-4 text-6xl tracking-tight">
          void<span className="text-accent">.</span>
        </h1>
        <p className="text-text-secondary mt-4 max-w-md text-sm">
          A minimalist, dark-first component system. Components coming soon.
        </p>
      </div>
    </main>
  );
}
