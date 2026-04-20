"use client";

import { useMemo, useState } from "react";
import {
  Avatar,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Checkbox,
  HeatMap,
  type HeatMapEntry,
  Input,
  Progress,
  Select,
  Separator,
  Spinner,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Text,
  Textarea,
  Toggle,
} from "@/components/ui";

// ─── Heatmap mock data ────────────────────────────────────────────────────────

function generateHeatMapData(): HeatMapEntry[] {
  const entries: HeatMapEntry[] = [];
  const today = new Date();
  for (let i = 364; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().slice(0, 10);
    // Weighted random — weekdays more active, occasional spikes
    const weekday = d.getDay();
    const isWeekend = weekday === 0 || weekday === 6;
    const base = isWeekend ? 1 : 4;
    const rand = Math.random();
    const value = rand < 0.25 ? 0 : Math.floor(rand * base * 6);
    entries.push({ date: dateStr, value });
  }
  return entries;
}

// ─── Category header ──────────────────────────────────────────────────────────

function CategoryHeader({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="inline-block size-1.5 rounded-full bg-accent" />
      <Text variant="overline">{label}</Text>
    </div>
  );
}

// ─── Showcase page ────────────────────────────────────────────────────────────

export default function ShowcasePage() {
  const [toggleA, setToggleA] = useState(false);
  const [toggleB, setToggleB] = useState(true);
  const [checked, setChecked] = useState(false);
  const [progress, setProgress] = useState(40);
  const heatmapData = useMemo(() => generateHeatMapData(), []);

  return (
    <main className="mx-auto flex min-h-dvh max-w-4xl flex-col gap-16 px-6 py-20">
      {/* ── Hero ─────────────────────────────────────────────────── */}
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

      {/* ════════════════════════════════════════════════════════════
          CATEGORY: Typography
      ══════════════════════════════════════════════════════════════ */}
      <section className="space-y-6">
        <CategoryHeader label="Typography" />
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

      {/* ════════════════════════════════════════════════════════════
          CATEGORY: Forms
      ══════════════════════════════════════════════════════════════ */}
      <section className="space-y-10">
        <CategoryHeader label="Forms" />

        {/* Buttons */}
        <div className="space-y-4">
          <Text variant="caption" className="text-text-muted">
            Button — variants
          </Text>
          <div className="flex flex-wrap gap-3">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Danger</Button>
          </div>

          <Text variant="caption" className="text-text-muted">
            Button — sizes
          </Text>
          <div className="flex flex-wrap items-center gap-3">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
            <Button disabled>Disabled</Button>
          </div>
        </div>

        {/* Inputs */}
        <div className="space-y-4">
          <Text variant="caption" className="text-text-muted">
            Input — states
          </Text>
          <div className="flex max-w-sm flex-col gap-3">
            <Input placeholder="Default input…" />
            <Input placeholder="Error state…" error />
            <Input placeholder="Disabled…" disabled />
          </div>
        </div>

        {/* Toggles */}
        <div className="space-y-4">
          <Text variant="caption" className="text-text-muted">
            Toggle
          </Text>
          <div className="flex items-center gap-6">
            <label className="flex cursor-pointer items-center gap-3 text-sm text-text-secondary">
              <Toggle checked={toggleA} onCheckedChange={setToggleA} />
              {toggleA ? "On" : "Off"}
            </label>
            <label className="flex cursor-pointer items-center gap-3 text-sm text-text-secondary">
              <Toggle checked={toggleB} onCheckedChange={setToggleB} />
              {toggleB ? "On" : "Off"}
            </label>
            <label className="flex items-center gap-3 text-sm text-text-secondary">
              <Toggle disabled />
              Disabled
            </label>
          </div>
        </div>

        {/* Checkbox */}
        <div className="space-y-4">
          <Text variant="caption" className="text-text-muted">
            Checkbox
          </Text>
          <div className="flex flex-wrap items-center gap-6">
            <Checkbox label="Unchecked" checked={checked} onChange={() => setChecked(!checked)} />
            <Checkbox label="Checked" defaultChecked />
            <Checkbox label="Error state" error defaultChecked />
            <Checkbox label="Disabled" disabled />
          </div>
        </div>

        {/* Textarea */}
        <div className="space-y-4">
          <Text variant="caption" className="text-text-muted">
            Textarea — states
          </Text>
          <div className="flex max-w-sm flex-col gap-3">
            <Textarea placeholder="Write something…" />
            <Textarea placeholder="Error state…" error />
            <Textarea placeholder="Disabled…" disabled />
          </div>
        </div>

        {/* Select */}
        <div className="space-y-4">
          <Text variant="caption" className="text-text-muted">
            Select — states
          </Text>
          <div className="flex max-w-sm flex-col gap-3">
            <Select defaultValue="">
              <option value="" disabled>
                Choose an option…
              </option>
              <option value="a">Option A</option>
              <option value="b">Option B</option>
              <option value="c">Option C</option>
            </Select>
            <Select error defaultValue="a">
              <option value="a">Error state</option>
            </Select>
            <Select disabled defaultValue="a">
              <option value="a">Disabled</option>
            </Select>
          </div>
        </div>
      </section>

      <Separator />

      {/* ════════════════════════════════════════════════════════════
          CATEGORY: Data Display
      ══════════════════════════════════════════════════════════════ */}
      <section className="space-y-8">
        <CategoryHeader label="Data Display" />

        {/* Avatar */}
        <div className="space-y-3">
          <Text variant="caption" className="text-text-muted">
            Avatar — sizes &amp; fallbacks
          </Text>
          <div className="flex flex-wrap items-center gap-4">
            <Avatar size="sm" fallback="AB" />
            <Avatar size="md" fallback="CD" />
            <Avatar size="lg" fallback="EF" />
            <Avatar size="xl" fallback="GH" />
            <Avatar size="md" />
          </div>
        </div>

        {/* Progress */}
        <div className="space-y-3">
          <Text variant="caption" className="text-text-muted">
            Progress — determinate &amp; indeterminate
          </Text>
          <div className="flex max-w-sm flex-col gap-4">
            <Progress value={progress} />
            <Progress value={75} />
            <Progress indeterminate />
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="secondary"
                onClick={() => setProgress((p) => Math.max(0, p - 10))}
              >
                −10
              </Button>
              <Button
                size="sm"
                variant="secondary"
                onClick={() => setProgress((p) => Math.min(100, p + 10))}
              >
                +10
              </Button>
              <Text variant="caption" className="self-center text-text-muted">
                {progress}%
              </Text>
            </div>
          </div>
        </div>

        {/* Badges — soft */}
        <div className="space-y-3">
          <Text variant="caption" className="text-text-muted">
            Badge — soft (default)
          </Text>
          <div className="flex flex-wrap gap-3">
            <Badge tone="soft">Default</Badge>
            <Badge variant="accent" tone="soft">
              Accent
            </Badge>
            <Badge variant="success" tone="soft">
              Success
            </Badge>
            <Badge variant="muted" tone="soft">
              Muted
            </Badge>
          </div>
        </div>

        {/* Badges — hard */}
        <div className="space-y-3">
          <Text variant="caption" className="text-text-muted">
            Badge — hard
          </Text>
          <div className="flex flex-wrap gap-3">
            <Badge tone="hard">Default</Badge>
            <Badge variant="accent" tone="hard">
              Accent
            </Badge>
            <Badge variant="success" tone="hard">
              Success
            </Badge>
            <Badge variant="muted" tone="hard">
              Muted
            </Badge>
          </div>
        </div>
      </section>

      <Separator />

      {/* ════════════════════════════════════════════════════════════
          CATEGORY: Feedback
      ══════════════════════════════════════════════════════════════ */}
      <section className="space-y-6">
        <CategoryHeader label="Feedback" />

        {/* Spinner */}
        <div className="space-y-3">
          <Text variant="caption" className="text-text-muted">
            Spinner — sizes
          </Text>
          <div className="flex flex-wrap items-center gap-6">
            <Spinner size="sm" />
            <Spinner size="md" />
            <Spinner size="lg" />
          </div>
        </div>
      </section>

      <Separator />

      {/* ════════════════════════════════════════════════════════════
          CATEGORY: Navigation
      ══════════════════════════════════════════════════════════════ */}
      <section className="space-y-6">
        <CategoryHeader label="Navigation" />

        {/* Tabs */}
        <div className="space-y-3">
          <Text variant="caption" className="text-text-muted">
            Tabs
          </Text>
          <Tabs defaultValue="overview">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
              <Text variant="body">
                Overview panel — minimal, clean, nothing-inspired content area.
              </Text>
            </TabsContent>
            <TabsContent value="analytics">
              <Text variant="body">Analytics panel — surface your metrics here.</Text>
            </TabsContent>
            <TabsContent value="settings">
              <Text variant="body">Settings panel — configure your experience.</Text>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <Separator />

      {/* ════════════════════════════════════════════════════════════
          CATEGORY: Layout
      ══════════════════════════════════════════════════════════════ */}
      <section className="space-y-6">
        <CategoryHeader label="Layout" />
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

      <Separator />

      {/* ════════════════════════════════════════════════════════════
          CATEGORY: Charts
      ══════════════════════════════════════════════════════════════ */}
      <section className="space-y-6">
        <CategoryHeader label="Charts" />

        <div className="space-y-4">
          <Text variant="caption" className="text-text-muted">
            HeatMap — contribution graph
          </Text>
          <Card>
            <CardHeader>
              <CardTitle>Activity</CardTitle>
              <CardDescription>
                365 days of contribution data — hover a cell for details.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto pb-1">
                <HeatMap data={heatmapData} />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────── */}
      <footer className="mt-auto border-t border-border pt-6">
        <Text variant="caption">VoidUI — Apache-2.0 · Inspired by Nothing Brand</Text>
      </footer>
    </main>
  );
}
