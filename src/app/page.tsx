"use client";

import { useState } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Text,
  Input,
  Badge,
  Toggle,
  Separator,
} from "@/components/ui";

export default function ShowcasePage() {
  const [toggleA, setToggleA] = useState(false);
  const [toggleB, setToggleB] = useState(true);

  return (
    <main className="mx-auto flex min-h-dvh max-w-3xl flex-col gap-16 px-6 py-20">
      {/* ── Hero ── */}
      <section className="void-animate-fade-up space-y-4">
        <div className="flex items-center gap-3">
          <span className="void-animate-pulse-dot inline-block size-2.5 rounded-full bg-accent" />
          <Badge variant="accent">v0.1.0</Badge>
        </div>
        <Text variant="h1">VoidUI</Text>
        <Text variant="body" className="max-w-lg text-text-secondary">
          A state-of-the-art component library inspired by Nothing Brand. Minimalist surfaces, dark
          by default, with fine micro-animations.
        </Text>
      </section>

      <Separator />

      {/* ── Typography ── */}
      <section className="space-y-6">
        <Text variant="overline">Typography</Text>
        <div className="space-y-3">
          <Text variant="h1">Heading 1</Text>
          <Text variant="h2">Heading 2</Text>
          <Text variant="h3">Heading 3</Text>
          <Text variant="h4">Heading 4</Text>
          <Text variant="body">Body text — clean, readable, minimal.</Text>
          <Text variant="caption">Caption — secondary information at a glance.</Text>
          <Text variant="mono">mono — 0x0A 0xFA 0xFF</Text>
        </div>
      </section>

      <Separator />

      {/* ── Buttons ── */}
      <section className="space-y-6">
        <Text variant="overline">Buttons</Text>
        <div className="flex flex-wrap gap-3">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button disabled>Disabled</Button>
        </div>
      </section>

      <Separator />

      {/* ── Inputs ── */}
      <section className="space-y-6">
        <Text variant="overline">Inputs</Text>
        <div className="flex max-w-sm flex-col gap-4">
          <Input placeholder="Default input…" />
          <Input placeholder="Error state…" error />
          <Input placeholder="Disabled…" disabled />
        </div>
      </section>

      <Separator />

      {/* ── Badges ── */}
      <section className="space-y-6">
        <Text variant="overline">Badges</Text>
        <div className="flex flex-wrap gap-3">
          <Badge>Default</Badge>
          <Badge variant="accent">Accent</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="muted">Muted</Badge>
        </div>
      </section>

      <Separator />

      {/* ── Toggles ── */}
      <section className="space-y-6">
        <Text variant="overline">Toggles</Text>
        <div className="flex items-center gap-6">
          <label className="flex items-center gap-3 text-sm text-text-secondary">
            <Toggle checked={toggleA} onCheckedChange={setToggleA} />
            {toggleA ? "On" : "Off"}
          </label>
          <label className="flex items-center gap-3 text-sm text-text-secondary">
            <Toggle checked={toggleB} onCheckedChange={setToggleB} />
            {toggleB ? "On" : "Off"}
          </label>
          <label className="flex items-center gap-3 text-sm text-text-secondary">
            <Toggle disabled />
            Disabled
          </label>
        </div>
      </section>

      <Separator />

      {/* ── Cards ── */}
      <section className="space-y-6">
        <Text variant="overline">Cards</Text>
        <div className="grid gap-4 sm:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Surface</CardTitle>
              <CardDescription>Default card with base surface.</CardDescription>
            </CardHeader>
            <CardContent>
              <Text variant="caption">Minimal and clean, like a Nothing Phone.</Text>
            </CardContent>
          </Card>
          <Card elevated>
            <CardHeader>
              <CardTitle>Elevated</CardTitle>
              <CardDescription>Slightly lighter surface for emphasis.</CardDescription>
            </CardHeader>
            <CardContent>
              <Text variant="caption">Subtle lift to create depth hierarchy.</Text>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="mt-auto border-t border-border pt-6">
        <Text variant="caption">VoidUI — Apache-2.0 · Inspired by Nothing Brand</Text>
      </footer>
    </main>
  );
}
