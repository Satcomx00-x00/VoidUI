"use client";

import { useMemo, useState } from "react";
import {
  Alert,
  Avatar,
  Badge,
  BottomNav,
  BottomNavItem,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Checkbox,
  Chip,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  HeatMap,
  type HeatMapEntry,
  Input,
  ListGroup,
  ListItem,
  Progress,
  Radio,
  RadioGroup,
  Select,
  Separator,
  Slider,
  Spinner,
  StatusDot,
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

// ─── Chevron icon (for ListItem trailing) ────────────────────────────────────

function ChevronRight() {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 3l5 5-5 5" />
    </svg>
  );
}

// ─── Simple icon shapes for BottomNav / ListItem demos ────────────────────────

function HomeIcon() {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" />
      <path d="M9 21V12h6v9" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 01-3.46 0" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <path d="M21 21l-4.35-4.35" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function WifiIcon() {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12.55a11 11 0 0114.08 0" />
      <path d="M1.42 9a16 16 0 0121.16 0" />
      <path d="M8.53 16.11a6 6 0 016.95 0" />
      <line x1="12" y1="20" x2="12.01" y2="20" />
    </svg>
  );
}

function BluetoothIcon() {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6.5 6.5 17.5 17.5 12 23 12 1 17.5 6.5 6.5 17.5" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
    </svg>
  );
}

// ─── Showcase page ────────────────────────────────────────────────────────────

export default function ShowcasePage() {
  const [toggleA, setToggleA] = useState(false);
  const [toggleB, setToggleB] = useState(true);
  const [checked, setChecked] = useState(false);
  const [progress, setProgress] = useState(40);
  const [radioValue, setRadioValue] = useState("b");
  const [sliderValue, setSliderValue] = useState(60);
  const [activeNav, setActiveNav] = useState("home");
  const [selectedChips, setSelectedChips] = useState<string[]>(["all"]);
  const heatmapData = useMemo(() => generateHeatMapData(), []);

  const toggleChip = (val: string) =>
    setSelectedChips((prev) =>
      prev.includes(val) ? prev.filter((c) => c !== val) : [...prev, val],
    );

  return (
    <main className="mx-auto flex min-h-dvh max-w-4xl flex-col gap-16 px-6 py-20 pb-28">
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="void-animate-fade-up space-y-4">
        <div className="flex items-center gap-3">
          <span className="void-animate-pulse-dot inline-block size-2.5 rounded-full bg-accent" />
          <Badge variant="accent">v0.1.0</Badge>
        </div>
        <Text variant="h1">VoidUI</Text>
        <Text variant="body" className="max-w-lg text-text-secondary">
          A Nothing-inspired component library. Minimalist surfaces, dark by default, dot-matrix
          accents, and precise micro-animations.
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
          <Text variant="overline">Overline Label</Text>
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
          <Text variant="caption" className="text-text-muted">Button — variants</Text>
          <div className="flex flex-wrap gap-3">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Danger</Button>
          </div>
          <Text variant="caption" className="text-text-muted">Button — sizes</Text>
          <div className="flex flex-wrap items-center gap-3">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
            <Button disabled>Disabled</Button>
          </div>
        </div>

        {/* Input */}
        <div className="space-y-4">
          <Text variant="caption" className="text-text-muted">Input — states</Text>
          <div className="flex max-w-sm flex-col gap-3">
            <Input placeholder="Default input…" />
            <Input placeholder="Error state…" error />
            <Input placeholder="Disabled…" disabled />
          </div>
        </div>

        {/* Textarea */}
        <div className="space-y-4">
          <Text variant="caption" className="text-text-muted">Textarea</Text>
          <div className="flex max-w-sm flex-col gap-3">
            <Textarea placeholder="Write something…" />
            <Textarea placeholder="Error state…" error />
          </div>
        </div>

        {/* Select */}
        <div className="space-y-4">
          <Text variant="caption" className="text-text-muted">Select</Text>
          <div className="flex max-w-sm flex-col gap-3">
            <Select defaultValue="">
              <option value="" disabled>Choose an option…</option>
              <option value="a">Option A</option>
              <option value="b">Option B</option>
              <option value="c">Option C</option>
            </Select>
            <Select disabled defaultValue="a">
              <option value="a">Disabled</option>
            </Select>
          </div>
        </div>

        {/* Toggle */}
        <div className="space-y-4">
          <Text variant="caption" className="text-text-muted">Toggle</Text>
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
          <Text variant="caption" className="text-text-muted">Checkbox</Text>
          <div className="flex flex-wrap items-center gap-6">
            <Checkbox label="Unchecked" checked={checked} onChange={() => setChecked(!checked)} />
            <Checkbox label="Checked" defaultChecked />
            <Checkbox label="Error" error defaultChecked />
            <Checkbox label="Disabled" disabled />
          </div>
        </div>

        {/* Radio */}
        <div className="space-y-4">
          <Text variant="caption" className="text-text-muted">Radio Group</Text>
          <RadioGroup value={radioValue} onValueChange={setRadioValue}>
            <Radio value="a" label="Option A" />
            <Radio value="b" label="Option B" />
            <Radio value="c" label="Option C" />
            <Radio value="d" label="Disabled option" disabled />
          </RadioGroup>
        </div>

        {/* Slider */}
        <div className="space-y-4">
          <Text variant="caption" className="text-text-muted">
            Slider — {sliderValue}%
          </Text>
          <div className="max-w-sm">
            <Slider
              min={0}
              max={100}
              value={sliderValue}
              onChange={(e) => setSliderValue(Number(e.currentTarget.value))}
            />
          </div>
        </div>

        {/* Chip */}
        <div className="space-y-4">
          <Text variant="caption" className="text-text-muted">Chip — filter</Text>
          <div className="flex flex-wrap gap-2">
            {["all", "design", "code", "motion", "type"].map((c) => (
              <Chip key={c} selected={selectedChips.includes(c)} onClick={() => toggleChip(c)}>
                {c}
              </Chip>
            ))}
          </div>
        </div>
      </section>

      <Separator />

      {/* ════════════════════════════════════════════════════════════
          CATEGORY: Data Display
      ══════════════════════════════════════════════════════════════ */}
      <section className="space-y-8">
        <CategoryHeader label="Data Display" />

        {/* Avatar + StatusDot */}
        <div className="space-y-3">
          <Text variant="caption" className="text-text-muted">Avatar + StatusDot</Text>
          <div className="flex flex-wrap items-center gap-5">
            <div className="relative">
              <Avatar size="lg" fallback="AB" />
              <StatusDot status="online" pulse className="absolute bottom-0 right-0 ring-2 ring-void-black" />
            </div>
            <div className="relative">
              <Avatar size="lg" fallback="CD" />
              <StatusDot status="busy" pulse className="absolute bottom-0 right-0 ring-2 ring-void-black" />
            </div>
            <div className="relative">
              <Avatar size="lg" fallback="EF" />
              <StatusDot status="away" className="absolute bottom-0 right-0 ring-2 ring-void-black" />
            </div>
            <div className="relative">
              <Avatar size="lg" fallback="GH" />
              <StatusDot status="offline" className="absolute bottom-0 right-0 ring-2 ring-void-black" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5"><StatusDot status="online" /><Text variant="caption">Online</Text></div>
            <div className="flex items-center gap-1.5"><StatusDot status="busy" /><Text variant="caption">Busy</Text></div>
            <div className="flex items-center gap-1.5"><StatusDot status="away" /><Text variant="caption">Away</Text></div>
            <div className="flex items-center gap-1.5"><StatusDot status="offline" /><Text variant="caption">Offline</Text></div>
          </div>
        </div>

        {/* Progress */}
        <div className="space-y-3">
          <Text variant="caption" className="text-text-muted">Progress</Text>
          <div className="flex max-w-sm flex-col gap-4">
            <Progress value={progress} />
            <Progress value={75} />
            <Progress indeterminate />
            <div className="flex gap-2">
              <Button size="sm" variant="secondary" onClick={() => setProgress((p) => Math.max(0, p - 10))}>−10</Button>
              <Button size="sm" variant="secondary" onClick={() => setProgress((p) => Math.min(100, p + 10))}>+10</Button>
              <Text variant="caption" className="self-center text-text-muted">{progress}%</Text>
            </div>
          </div>
        </div>

        {/* Badge */}
        <div className="space-y-3">
          <Text variant="caption" className="text-text-muted">Badge</Text>
          <div className="flex flex-wrap gap-3">
            <Badge>Default</Badge>
            <Badge variant="accent">Accent</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="muted">Muted</Badge>
            <Badge tone="hard">Hard</Badge>
            <Badge variant="accent" tone="hard">Accent Hard</Badge>
          </div>
        </div>
      </section>

      <Separator />

      {/* ════════════════════════════════════════════════════════════
          CATEGORY: Layout
      ══════════════════════════════════════════════════════════════ */}
      <section className="space-y-6">
        <CategoryHeader label="Layout" />

        {/* Cards */}
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
              <CardDescription>Slightly lighter surface for depth.</CardDescription>
            </CardHeader>
            <CardContent>
              <Text variant="caption">Subtle lift to create depth hierarchy.</Text>
            </CardContent>
          </Card>
        </div>

        {/* ListItem — settings panel */}
        <div className="space-y-3">
          <Text variant="caption" className="text-text-muted">
            ListItem — Nothing phone settings panel
          </Text>
          <ListGroup>
            <ListItem
              leading={<WifiIcon />}
              title="Wi-Fi"
              description="Connected to NothingOS_5G"
              trailing={
                <div className="flex items-center gap-2">
                  <Badge variant="accent" tone="soft">On</Badge>
                  <ChevronRight />
                </div>
              }
              interactive
            />
            <ListItem
              leading={<BluetoothIcon />}
              title="Bluetooth"
              description="2 devices connected"
              trailing={<ChevronRight />}
              interactive
            />
            <ListItem
              leading={<MoonIcon />}
              title="Dark Mode"
              description="Always on"
              trailing={<Toggle checked={toggleB} onCheckedChange={setToggleB} />}
              interactive
            />
            <ListItem
              title="Sound &amp; Vibration"
              trailing={<ChevronRight />}
              interactive
              divider={false}
            />
          </ListGroup>
        </div>
      </section>

      <Separator />

      {/* ════════════════════════════════════════════════════════════
          CATEGORY: Feedback
      ══════════════════════════════════════════════════════════════ */}
      <section className="space-y-6">
        <CategoryHeader label="Feedback" />

        {/* Alert */}
        <div className="space-y-3">
          <Text variant="caption" className="text-text-muted">Alert</Text>
          <div className="flex flex-col gap-3">
            <Alert variant="info" title="System update available" description="NothingOS 3.0 is ready to install." />
            <Alert variant="success" title="Backup complete" description="All data synced to Nothing Cloud." />
            <Alert variant="warning" title="Storage warning" description="You have less than 1 GB remaining." />
            <Alert variant="danger" title="Connection lost" description="Unable to reach the server. Check your network." />
          </div>
        </div>

        {/* Dialog */}
        <div className="space-y-3">
          <Text variant="caption" className="text-text-muted">Dialog</Text>
          <Dialog>
            <DialogTrigger className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-[var(--radius-md)] border border-border bg-void-900 px-4 text-sm text-text-secondary transition-colors hover:border-void-600 hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
              Open dialog
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Reset device</DialogTitle>
                <DialogDescription>
                  This will erase all data on your Nothing Phone. This action cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Dialog>
                  <DialogTrigger className="inline-flex h-9 cursor-pointer items-center rounded-[var(--radius-md)] bg-void-900 px-4 text-sm text-text-secondary hover:bg-void-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
                    Cancel
                  </DialogTrigger>
                </Dialog>
                <Button variant="danger" size="sm">Confirm reset</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Spinner */}
        <div className="space-y-3">
          <Text variant="caption" className="text-text-muted">Spinner</Text>
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
          <Text variant="caption" className="text-text-muted">Tabs</Text>
          <Tabs defaultValue="overview">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
              <Text variant="body">Overview panel — minimal, Nothing-inspired.</Text>
            </TabsContent>
            <TabsContent value="analytics">
              <Text variant="body">Analytics panel — surface your metrics here.</Text>
            </TabsContent>
            <TabsContent value="settings">
              <Text variant="body">Settings panel — configure your experience.</Text>
            </TabsContent>
          </Tabs>
        </div>

        {/* BottomNav — static demo (not fixed here so it doesn't overlap) */}
        <div className="space-y-3">
          <Text variant="caption" className="text-text-muted">
            BottomNav (live at bottom of viewport)
          </Text>
          <div className="relative overflow-hidden rounded-[var(--radius-lg)] border border-border">
            <div className="h-28 bg-void-950" />
            <div className="flex items-center justify-around border-t border-[var(--color-glass-border)] bg-[var(--color-glass)] backdrop-blur-md px-2 h-16">
              {(["home", "search", "bell", "profile"] as const).map((key) => {
                const icons = { home: <HomeIcon />, search: <SearchIcon />, bell: <BellIcon />, profile: <UserIcon /> };
                const labels = { home: "Home", search: "Search", bell: "Alerts", profile: "Profile" };
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setActiveNav(key)}
                    aria-current={activeNav === key ? "page" : undefined}
                    className={`relative flex flex-1 flex-col items-center justify-center gap-1 py-1 text-xs font-medium cursor-pointer rounded-[var(--radius-md)] transition-all duration-[120ms] ${activeNav === key ? "text-text-primary" : "text-text-muted hover:text-text-secondary"}`}
                  >
                    {activeNav === key && <span aria-hidden className="absolute top-0 size-1 rounded-full bg-accent void-animate-scale-in" />}
                    <span className={activeNav === key ? "scale-110 transition-transform" : ""}>{icons[key]}</span>
                    <span>{labels[key]}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <Separator />

      {/* ════════════════════════════════════════════════════════════
          CATEGORY: Charts
      ══════════════════════════════════════════════════════════════ */}
      <section className="space-y-6">
        <CategoryHeader label="Charts" />
        <div className="space-y-4">
          <Text variant="caption" className="text-text-muted">HeatMap — contribution graph</Text>
          <Card>
            <CardHeader>
              <CardTitle>Activity</CardTitle>
              <CardDescription>365 days of contribution data — hover a cell for details.</CardDescription>
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
        <Text variant="caption">VoidUI — Apache-2.0 · Nothing Brand inspired</Text>
      </footer>

      {/* Live BottomNav — fixed to viewport */}
      <BottomNav>
        <BottomNavItem icon={<HomeIcon />} label="Home" active={activeNav === "home"} onClick={() => setActiveNav("home")} />
        <BottomNavItem icon={<SearchIcon />} label="Search" active={activeNav === "search"} onClick={() => setActiveNav("search")} />
        <BottomNavItem icon={<BellIcon />} label="Alerts" active={activeNav === "bell"} onClick={() => setActiveNav("bell")} />
        <BottomNavItem icon={<UserIcon />} label="Profile" active={activeNav === "profile"} onClick={() => setActiveNav("profile")} />
      </BottomNav>
    </main>
  );
}
