import { Button } from "../components/ui";

export default function HomePage(): React.ReactElement {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-16 p-8">
      <header className="text-center">
        <p className="text-text-muted font-mono text-xs tracking-[0.2em] uppercase">
          VoidUI · v0.0.0
        </p>
        <h1 className="font-display mt-4 text-6xl tracking-tight">
          void<span className="text-accent">.</span>
        </h1>
        <p className="text-text-secondary mt-4 max-w-md text-sm">
          A minimalist, dark-first component system.
        </p>
      </header>

      <section className="flex w-full max-w-3xl flex-col gap-8">
        <ButtonRow label="Variants">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
        </ButtonRow>

        <ButtonRow label="Sizes">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </ButtonRow>

        <ButtonRow label="States">
          <Button disabled>Disabled</Button>
          <Button loading>Loading</Button>
          <Button variant="secondary" loading>
            Working
          </Button>
        </ButtonRow>
      </section>
    </main>
  );
}

function ButtonRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-text-muted font-mono text-[10px] tracking-[0.2em] uppercase">{label}</p>
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    </div>
  );
}
