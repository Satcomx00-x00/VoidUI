"use client";

import { useEffect, useRef, useState, type ReactElement, type ReactNode } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Alert,
  AlertAction,
  AlertBody,
  AlertIcon,
  AlertTitle,
  Badge,
  DataTable,
  type DataTableColumn,
  type DataTableFilterConfig,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  ButtonKbd,
  Card,
  CardBody,
  CardCorner,
  CardFooter,
  CardHeader,
  CardImage,
  CardMeta,
  CardStat,
  CardTitle,
  Checkbox,
  Command,
  CommandFooter,
  CommandGroupLabel,
  CommandInput,
  CommandItem,
  CommandList,
  Dialog,
  DialogBody,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DropdownItem,
  DropdownLabel,
  DropdownMenu,
  DropdownSeparator,
  Field,
  FieldHint,
  FieldLabel,
  Input,
  Kbd,
  Popover,
  PopoverHeader,
  PopoverTitle,
  Progress,
  Radio,
  RadioGroup,
  Select,
  SelectOption,
  Separator,
  Sidebar,
  SidebarLabel,
  SidebarLink,
  SidebarSection,
  Skeleton,
  Spinner,
  Switch,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Table,
  TableCaption,
  TableContainer,
  TableEmpty,
  TableToolbar,
  Tbody,
  Td,
  TdPin,
  Textarea,
  Tfoot,
  Th,
  ThPin,
  ThSortable,
  Thead,
  Toast,
  ToastProvider,
  useToast,
  type ToastPosition,
  Tooltip,
  Tr,
} from "../components/ui";

/* -------------------------------------------------------------------------- */
/*  Local chrome helpers                                                      */
/* -------------------------------------------------------------------------- */

interface SectionProps {
  id: string;
  index: string;
  eyebrow: string;
  title: string;
  sub: string;
  children: ReactNode;
}

function Section({ id, index, eyebrow, title, sub, children }: SectionProps): ReactElement {
  return (
    <section id={id}>
      <div className="void-section-meta">
        <span className="idx">{index}</span>
        <span>{eyebrow}</span>
        <div className="rule" />
      </div>
      <h2 className="void-section-title">{title}</h2>
      <p className="void-section-sub">{sub}</p>
      {children}
    </section>
  );
}

interface DemoProps {
  name: string;
  meta?: string;
  col?: boolean;
  children: ReactNode;
}

function Demo({ name, meta, col = false, children }: DemoProps): ReactElement {
  return (
    <div className="void-demo">
      <div className="void-demo-head">
        <span className="dot" />
        <span className="name">{name}</span>
        <span className="spacer" />
        {meta ? <span>{meta}</span> : null}
      </div>
      <div className={`void-demo-body${col ? " col" : ""}`}>{children}</div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  DataTable demo data                                                       */
/* -------------------------------------------------------------------------- */

type DeployStatus = "READY" | "BUILDING" | "FAILED" | "CANCELLED";

interface DeployRow {
  id: string;
  commit: string;
  message: string;
  branch: string;
  author: string;
  status: DeployStatus;
  duration: string | null;
  size: string | null;
  region: string;
  coldStart: string | null;
  functions: number | null;
  created: string;
  domain: string | null;
  checks: string | null;
}

/* prettier-ignore */
const DEPLOY_ROWS: DeployRow[] = [
  { id: "2f81c", commit: "3a8f02d", message: "initial release",      branch: "main",         author: "a.smith",  status: "READY",     duration: "1.2s", size: "18.2 KB", region: "EU-CENTRAL-1", coldStart: "1.1s", functions: 3, created: "24 Apr 09:41", domain: "void-ui.vercel.app", checks: "3/3 PASSED" },
  { id: "a9b32", commit: "f1c209a", message: "void-ui: add select",  branch: "feat/select",  author: "b.chen",   status: "BUILDING",  duration: null,   size: null,       region: "US-EAST-1",    coldStart: null,   functions: null, created: "24 Apr 09:02", domain: null,                  checks: null },
  { id: "11d4e", commit: "d90c3f1", message: "fix: focus ring",      branch: "main",         author: "a.smith",  status: "READY",     duration: "0.9s", size: "18.0 KB", region: "EU-CENTRAL-1", coldStart: "0.9s", functions: 3, created: "23 Apr 18:44", domain: "void-ui.vercel.app", checks: "3/3 PASSED" },
  { id: "77f0a", commit: "8bc71cd", message: "refactor tokens",      branch: "refactor",     author: "c.okafor", status: "FAILED",    duration: "4.1s", size: null,       region: "US-EAST-1",    coldStart: null,   functions: null, created: "23 Apr 15:20", domain: null,                  checks: "1/3 PASSED" },
  { id: "90abd", commit: "2e50fa9", message: "docs: install guide",  branch: "main",         author: "d.lee",    status: "READY",     duration: "0.8s", size: "17.8 KB", region: "EU-CENTRAL-1", coldStart: "0.8s", functions: 2, created: "22 Apr 11:05", domain: "void-ui.vercel.app", checks: "3/3 PASSED" },
  { id: "4c221", commit: "a11b9e3", message: "chore: bump deps",     branch: "chore",        author: "bot",      status: "CANCELLED", duration: null,   size: null,       region: "US-EAST-1",    coldStart: null,   functions: null, created: "22 Apr 08:30", domain: null,                  checks: null },
  { id: "3f82d", commit: "c7d91ab", message: "feat: keyboard nav",   branch: "feat/kbd",     author: "a.smith",  status: "READY",     duration: "1.1s", size: "18.4 KB", region: "EU-WEST-2",    coldStart: "1.0s", functions: 3, created: "21 Apr 14:22", domain: "void-ui.vercel.app", checks: "3/3 PASSED" },
  { id: "b3e10", commit: "991af2c", message: "fix: radio alignment", branch: "fix/radio",    author: "b.chen",   status: "READY",     duration: "1.0s", size: "18.1 KB", region: "AP-SOUTH-1",   coldStart: "1.0s", functions: 3, created: "21 Apr 10:55", domain: "void-ui.vercel.app", checks: "3/3 PASSED" },
  { id: "c77f1", commit: "4ad3fc8", message: "chore: lint fix",      branch: "chore",        author: "bot",      status: "READY",     duration: "0.7s", size: "18.0 KB", region: "EU-CENTRAL-1", coldStart: "0.7s", functions: 3, created: "20 Apr 22:10", domain: "void-ui.vercel.app", checks: "3/3 PASSED" },
  { id: "d9012", commit: "0bcf714", message: "feat: toast stack",    branch: "feat/toast",   author: "d.lee",    status: "FAILED",    duration: "3.8s", size: null,       region: "US-EAST-1",    coldStart: null,   functions: null, created: "20 Apr 17:35", domain: null,                  checks: "0/3 PASSED" },
];

const DEPLOY_STATUS_VARIANT: Record<
  DeployStatus,
  "success" | "warning" | "error" | "accent"
> = {
  READY: "success",
  BUILDING: "accent",
  FAILED: "error",
  CANCELLED: "warning",
};

const DEPLOY_COLUMNS: DataTableColumn<DeployRow>[] = [
  {
    key: "id",
    label: "Deployment",
    sortable: true,
    width: "280px",
    render: (row) => (
      <span className="flex items-center gap-1.5 font-mono text-[11px]">
        <span className="uppercase text-fg-muted">{row.id.toUpperCase()}</span>
        <span className="text-fg-subtle">·</span>
        <span className="text-fg">{row.message}</span>
      </span>
    ),
  },
  {
    key: "branch",
    label: "Branch",
    sortable: true,
    render: (row) => (
      <span className="font-mono text-[11px] text-fg-muted">{row.branch}</span>
    ),
  },
  {
    key: "author",
    label: "Author",
    sortable: true,
    render: (row) => <span className="text-[11px]">{row.author}</span>,
  },
  {
    key: "status",
    label: "Status",
    render: (row) => (
      <Badge variant={DEPLOY_STATUS_VARIANT[row.status]} dot>
        {row.status}
      </Badge>
    ),
  },
  {
    key: "duration",
    label: "Duration",
    numeric: true,
    render: (row) =>
      row.duration !== null ? (
        <span className="tabular-nums">{row.duration}</span>
      ) : (
        <span className="text-fg-subtle">—</span>
      ),
  },
  {
    key: "size",
    label: "Size",
    numeric: true,
    render: (row) =>
      row.size !== null ? (
        <span className="tabular-nums">{row.size}</span>
      ) : (
        <span className="text-fg-subtle">—</span>
      ),
  },
];

const DEPLOY_FILTERS: DataTableFilterConfig[] = [
  {
    key: "status",
    label: "STATUS",
    options: [
      { label: "Ready", value: "READY" },
      { label: "Building", value: "BUILDING" },
      { label: "Failed", value: "FAILED" },
      { label: "Cancelled", value: "CANCELLED" },
    ],
  },
  {
    key: "branch",
    label: "BRANCH",
    options: [
      { label: "main", value: "main" },
      { label: "feat/select", value: "feat/select" },
      { label: "refactor", value: "refactor" },
      { label: "chore", value: "chore" },
    ],
  },
  {
    key: "author",
    label: "AUTHOR",
    options: [
      { label: "a.smith", value: "a.smith" },
      { label: "b.chen", value: "b.chen" },
      { label: "c.okafor", value: "c.okafor" },
      { label: "d.lee", value: "d.lee" },
      { label: "bot", value: "bot" },
    ],
  },
];

function DeployExpandedPanel({ row }: { row: DeployRow }): ReactElement {
  const fields: { label: string; value: string; accent?: boolean; mono?: boolean; isCheck?: boolean }[] = [
    { label: "COMMIT",      value: row.commit,                   mono: true },
    { label: "REGION",      value: row.region,                   accent: true, mono: true },
    { label: "COLD START",  value: row.coldStart  ?? "—",        accent: row.coldStart !== null },
    { label: "FUNCTIONS",   value: row.functions !== null ? String(row.functions) : "—" },
    { label: "CREATED",     value: row.created },
    { label: "DOMAIN",      value: row.domain    ?? "—" },
    { label: "BUILD LOG",   value: row.domain !== null ? "VIEW →" : "—", accent: row.domain !== null },
    { label: "CHECKS",      value: row.checks    ?? "—",         isCheck: row.checks !== null && row.checks.includes("PASSED") },
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "20px 40px",
      }}
    >
      {fields.map(({ label, value, accent, mono, isCheck }) => (
        <div key={label} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <span
            style={{
              fontSize: 9,
              textTransform: "uppercase",
              letterSpacing: "0.18em",
              color: "var(--fg-subtle)",
            }}
          >
            {label}
          </span>
          <span
            style={{
              fontSize: 12,
              fontFamily: mono === true ? "var(--font-sans)" : undefined,
              color: accent === true ? "var(--accent)" : "var(--fg)",
            }}
          >
            {isCheck === true && value !== "—" ? (
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                <span
                  style={{
                    display: "inline-block",
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "oklch(72% 0.18 145)",
                  }}
                />
                {value}
              </span>
            ) : (
              value
            )}
          </span>
        </div>
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  ToastDemo — interactive toast trigger (must live inside ToastProvider)   */
/* -------------------------------------------------------------------------- */

const TOAST_POSITIONS: ToastPosition[] = [
  "top-left",
  "top-center",
  "top-right",
  "bottom-left",
  "bottom-center",
  "bottom-right",
];

const TOAST_VARIANTS = [
  { label: "default",  variant: "default"  as const, icon: undefined },
  { label: "accent",   variant: "accent"   as const, icon: "i" },
  { label: "success",  variant: "success"  as const, icon: "✓" },
  { label: "error",    variant: "error"    as const, icon: "!" },
] as const;

function ToastDemo(): ReactElement {
  const { toast } = useToast();
  const [duration, setDuration] = useState<number | null>(3000);

  return (
    <div className="flex flex-col gap-4">
      {/* Position grid */}
      <div className="flex flex-col gap-1.5">
        <p className="text-[10px] uppercase tracking-[0.18em] text-fg-muted">Position</p>
        <div className="flex flex-wrap gap-2">
          {TOAST_POSITIONS.map((pos) => (
            <Button
              key={pos}
              size="sm"
              variant="secondary"
              onClick={() =>
                toast({
                  title: pos,
                  message: duration === null ? "Persistent — click ✕ to dismiss." : `Auto-dismiss in ${duration / 1000}s.`,
                  position: pos,
                  duration,
                })
              }
            >
              {pos}
            </Button>
          ))}
        </div>
      </div>

      {/* Variant row */}
      <div className="flex flex-col gap-1.5">
        <p className="text-[10px] uppercase tracking-[0.18em] text-fg-muted">Variant</p>
        <div className="flex flex-wrap gap-2">
          {TOAST_VARIANTS.map(({ label, variant, icon }) => (
            <Button
              key={label}
              size="sm"
              variant="secondary"
              onClick={() =>
                toast({
                  title: label.charAt(0).toUpperCase() + label.slice(1),
                  message: "Triggered from the showcase demo.",
                  variant,
                  icon,
                  duration,
                })
              }
            >
              {label}
            </Button>
          ))}
        </div>
      </div>

      {/* Duration row */}
      <div className="flex flex-col gap-1.5">
        <p className="text-[10px] uppercase tracking-[0.18em] text-fg-muted">Duration</p>
        <div className="flex flex-wrap gap-2">
          {([1500, 3000, 6000, null] as const).map((d) => (
            <Button
              key={d ?? "∞"}
              size="sm"
              variant={duration === d ? "primary" : "secondary"}
              onClick={() => setDuration(d)}
            >
              {d === null ? "persistent" : `${d / 1000}s`}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  ShowcaseMountToast — fires once on mount via the provider                */
/* -------------------------------------------------------------------------- */

function ShowcaseMountToast({ version }: { version: string }): null {
  const { toast } = useToast();
  useEffect(() => {
    toast({
      variant: "accent",
      icon: "i",
      title: `VoidUI · ${version}`,
      message: "Showcase mounted.",
      position: "top-right",
      duration: 5000,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [version]);
  return null;
}

/* -------------------------------------------------------------------------- */
/*  Showcase                                                                  */
/* -------------------------------------------------------------------------- */

export function Showcase(): ReactElement {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownCompact, setDropdownCompact] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!dropdownOpen) return;
    function handleOutside(e: MouseEvent): void {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [dropdownOpen]);
  const [drawerSide, setDrawerSide] = useState<"right" | "left" | "bottom">("right");
  const [accent, setAccent] = useState(true);
  const [airplane, setAirplane] = useState(false);
  const [plan, setPlan] = useState("pro");
  const [tab, setTab] = useState("overview");

  /* Latest GitHub release version */
  const [latestVersion, setLatestVersion] = useState<string>("v0.0.0");
  useEffect(() => {
    fetch("https://api.github.com/repos/Satcomx00-x00/VoidUI/releases/latest", {
      headers: { Accept: "application/vnd.github+json" },
    })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data: { tag_name?: string }) => {
        if (typeof data.tag_name === "string") setLatestVersion(data.tag_name);
      })
      .catch(() => { /* keep default */ });
  }, []);

  /* Table sort state */
  type SortCol = "build" | "branch" | "duration" | "size" | null;
  type SortDirection = "asc" | "desc" | "none";
  const [sortCol, setSortCol] = useState<SortCol>(null);
  const [sortDir, setSortDir] = useState<SortDirection>("none");
  const [tableFilter, setTableFilter] = useState("");

  function handleSort(col: SortCol): void {
    if (sortCol !== col) {
      setSortCol(col);
      setSortDir("asc");
    } else {
      setSortDir((d) => (d === "asc" ? "desc" : d === "desc" ? "none" : "asc"));
      if (sortDir === "none") setSortDir("asc");
    }
  }

  function colDir(col: SortCol): SortDirection {
    return sortCol === col ? sortDir : "none";
  }

  return (
    <ToastProvider defaultPosition="bottom-right" defaultDuration={4000}>
    <div className="void-app">
      <ShowcaseSidebar />

      <main>
        <div className="void-topbar">
          <div className="void-crumbs">
            <span>VOID/UI</span>
            <span className="sep">/</span>
            <b>Showcase</b>
          </div>
          <div className="void-status-pill">DEV · LIVE · {latestVersion}</div>
        </div>

        {/* HERO ----------------------------------------------------------- */}
        <section className="void-hero" id="overview">
          <div className="void-hero-grid" aria-hidden="true" />
          <div className="void-hero-inner">
            <div>
              <div className="void-hero-eyebrow">
                <b>◆ VOID/UI</b>
                <span>COMPONENT SYSTEM</span>
                <span>//</span>
                <span>NEXT 15 · REACT 19 · TAILWIND v4</span>
              </div>
              <h1>
                Build in <em>void</em>.
                <br />
                Ship in silence.
              </h1>
              <p className="void-hero-lead">
                A monochrome, dot-matrix-leaning component library for Next.js. Hairline borders,
                mechanical motion, and a single amethyst accent. Designed to get out of the way.
              </p>
              <div className="void-hero-actions">
                <Button variant="primary">
                  GET STARTED <ButtonKbd>↵</ButtonKbd>
                </Button>
                <Button variant="secondary">READ DOCS</Button>
                <Button variant="ghost">GITHUB ↗</Button>
              </div>
            </div>
            <aside className="void-hero-meta">
              <div className="row">
                <span>PACKAGE</span>
                <b>@nextjs-voidui/voidui</b>
              </div>
              <div className="row">
                <span>VERSION</span>
                <b>0.0.0</b>
              </div>
              <div className="row">
                <span>COMPONENTS</span>
                <b>27</b>
              </div>
              <hr />
              <div className="row">
                <span>NEXT.JS</span>
                <b>15 / 16</b>
              </div>
              <div className="row">
                <span>TAILWIND</span>
                <b>v4</b>
              </div>
              <div className="row">
                <span>LICENSE</span>
                <b>MIT</b>
              </div>
            </aside>
          </div>

          <div className="void-ticker" aria-hidden="true">
            <span>MONOCHROME</span>
            <span>DOT-MATRIX</span>
            <span>SNAPPY MOTION</span>
            <span>TAILWIND NATIVE</span>
            <span>TREE-SHAKEABLE</span>
            <span>TYPESAFE</span>
            <span>ACCESSIBLE</span>
            <span>OPEN-SOURCE</span>
          </div>
        </section>

        {/* PAGE ----------------------------------------------------------- */}
        <div className="void-page">
          {/* BUTTON ------------------------------------------------------- */}
          <Section
            id="button"
            index="01"
            eyebrow="PRIMITIVE"
            title="Button"
            sub="Five variants, three sizes. Hover lifts the surface by 1px and casts a sharp offset shadow — no soft glow."
          >
            <div className="void-two">
              <Demo name="VARIANTS">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="accent">Accent</Button>
                <Button variant="danger">Danger</Button>
              </Demo>
              <Demo name="STATES · SIZES">
                <Button size="sm">SM</Button>
                <Button size="md">MD</Button>
                <Button size="lg">LG</Button>
                <Button disabled>Disabled</Button>
                <Button loading>Loading</Button>
              </Demo>
            </div>
          </Section>

          {/* INPUT -------------------------------------------------------- */}
          <Section
            id="input"
            index="02"
            eyebrow="PRIMITIVE"
            title="Input · Textarea · Select"
            sub="Monospace controls. Focus ring driven by --accent-soft. Optional prefix slot, error states, and required indicators."
          >
            <Demo name="FORM" col>
              <Field>
                <FieldLabel required>Email</FieldLabel>
                <Input type="email" placeholder="you@void.ui" />
                <FieldHint>We never send marketing.</FieldHint>
              </Field>
              <Field>
                <FieldLabel>Workspace URL</FieldLabel>
                <Input prefix="https://" placeholder="acme.void.ui" />
              </Field>
              <Field error>
                <FieldLabel>API key</FieldLabel>
                <Input invalid defaultValue="sk_void_•••" />
                <FieldHint>This token has been revoked.</FieldHint>
              </Field>
              <Field>
                <FieldLabel>Region</FieldLabel>
                <Select defaultValue="eu-west-1">
                  <SelectOption value="eu-west-1" icon="🇫🇷">eu-west-1 · Paris</SelectOption>
                  <SelectOption value="us-east-1" icon="🇺🇸">us-east-1 · Virginia</SelectOption>
                  <SelectOption value="ap-south-1" icon="🇮🇳">ap-south-1 · Mumbai</SelectOption>
                  <SelectOption value="sa-east-1" icon="🇧🇷">sa-east-1 · São Paulo</SelectOption>
                </Select>
              </Field>
              <Field>
                <FieldLabel>Notes</FieldLabel>
                <Textarea rows={3} placeholder="Drop a comment for the team…" />
              </Field>
            </Demo>
          </Section>

          {/* TOGGLE ------------------------------------------------------- */}
          <Section
            id="toggle"
            index="03"
            eyebrow="PRIMITIVE"
            title="Checkbox · Radio · Switch"
            sub="Crisp, square checkboxes; pinhole radios; mechanical switches. All native form-friendly."
          >
            <div className="void-two">
              <Demo name="CHECKBOX · RADIO" col>
                <Checkbox defaultChecked label="Send me product updates" />
                <Checkbox label="Anonymous telemetry" />
                <Checkbox label="Sync drafts across devices" />
                <Separator className="my-2" />
                <RadioGroup>
                  {([
                    ["free", "Free · 1 seat"],
                    ["pro", "Pro · 5 seats"],
                    ["team", "Team · unlimited"],
                  ] as const).map(([value, label]) => (
                    <Radio
                      key={value}
                      name="plan"
                      value={value}
                      checked={plan === value}
                      onChange={() => setPlan(value)}
                      label={label}
                    />
                  ))}
                </RadioGroup>
              </Demo>
              <Demo name="SWITCH" col>
                <Switch
                  checked={accent}
                  onChange={(e) => setAccent(e.currentTarget.checked)}
                  label="Use amethyst accent"
                />
                <Switch
                  checked={airplane}
                  onChange={(e) => setAirplane(e.currentTarget.checked)}
                  label="Airplane mode"
                />
                <Switch label="Auto-deploy on push" disabled />
              </Demo>
            </div>
          </Section>

          {/* BADGE -------------------------------------------------------- */}
          <Section
            id="badge"
            index="04"
            eyebrow="PRIMITIVE"
            title="Badge"
            sub="Hairline pills for status, version tags, and counters. Optional leading dot for liveness."
          >
            <Demo name="BADGES">
              <Badge>Default</Badge>
              <Badge variant="solid">Solid</Badge>
              <Badge variant="accent" dot>
                Live
              </Badge>
              <Badge variant="success">Passing</Badge>
              <Badge variant="warning">Beta</Badge>
              <Badge variant="error">Failed</Badge>
            </Demo>
          </Section>

          {/* PROGRESS ----------------------------------------------------- */}
          <Section
            id="progress"
            index="05"
            eyebrow="PRIMITIVE"
            title="Progress · Spinner · Kbd"
            sub="Determinate progress with optional stripes; indeterminate loop; 3×3 dot-matrix spinner."
          >
            <div className="void-two">
              <Demo name="PROGRESS" col>
                <Progress value={32} />
                <Progress value={68} striped />
                <Progress />
              </Demo>
              <Demo name="SPINNER · KBD">
                <Spinner />
                <Spinner className="text-accent" />
                <span className="text-fg-muted ml-auto text-xs">
                  Press <Kbd>⌘</Kbd> <Kbd>K</Kbd>
                </span>
              </Demo>
            </div>
          </Section>

          {/* ALERT -------------------------------------------------------- */}
          <Section
            id="alert"
            index="06"
            eyebrow="FEEDBACK"
            title="Alert"
            sub="Inline messages with icon, title, body, and an optional action."
          >
            <Demo name="ALERT" col>
              <Alert variant="info">
                <AlertIcon>i</AlertIcon>
                <div>
                  <AlertTitle>Heads up</AlertTitle>
                  <AlertBody>Your build is queued behind 2 other jobs.</AlertBody>
                </div>
                <AlertAction>Dismiss</AlertAction>
              </Alert>
              <Alert variant="success">
                <AlertIcon>✓</AlertIcon>
                <div>
                  <AlertTitle>Deployed</AlertTitle>
                  <AlertBody>Production is live at 14:32 UTC.</AlertBody>
                </div>
              </Alert>
              <Alert variant="warning">
                <AlertIcon>!</AlertIcon>
                <div>
                  <AlertTitle>Token expires soon</AlertTitle>
                  <AlertBody>Rotate your API key within the next 7 days.</AlertBody>
                </div>
              </Alert>
              <Alert variant="error">
                <AlertIcon>×</AlertIcon>
                <div>
                  <AlertTitle>Build failed</AlertTitle>
                  <AlertBody>3 type errors in src/handlers/checkout.ts.</AlertBody>
                </div>
                <AlertAction>View log</AlertAction>
              </Alert>
            </Demo>
          </Section>

          {/* SKELETON ----------------------------------------------------- */}
          <Section
            id="skeleton"
            index="07"
            eyebrow="FEEDBACK"
            title="Skeleton"
            sub="Shimmer placeholders that mirror the final content's footprint."
          >
            <Demo name="SKELETON" col>
              <Skeleton className="h-5 w-1/3" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-5/6" />
              <Skeleton className="h-3 w-2/3" />
              <div className="flex items-center gap-3 pt-2">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-3 w-1/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              </div>
            </Demo>
          </Section>

          {/* TOAST -------------------------------------------------------- */}
          <Section
            id="toast"
            index="08"
            eyebrow="FEEDBACK"
            title="Toast"
            sub="Managed notification system with six screen positions and configurable auto-dismiss. Use ToastProvider + useToast() to push toasts from anywhere in the tree."
          >
            <Demo name="VARIANTS" col>
              <Toast title="Saved." message="Your draft is up to date." />
              <Toast variant="accent" icon="i" title="Sync complete" message="247 records merged." />
              <Toast variant="success" icon="✓" title="Deployed" message="Build #1042 is live." />
              <Toast variant="error" icon="!" title="Connection lost" message="Retrying in 3s…" />
            </Demo>
            <Demo name="INTERACTIVE · CLICK TO FIRE">
              <ToastDemo />
            </Demo>
          </Section>

          {/* DIALOG · DRAWER --------------------------------------------- */}
          <Section
            id="dialog"
            index="09"
            eyebrow="OVERLAY"
            title="Dialog · Drawer"
            sub="Modal surface with body-scroll lock and Escape handling. Edge-anchored drawer for side or bottom sheets."
          >
            <Demo name="OVERLAY">
              <Button onClick={() => setDialogOpen(true)}>Open dialog</Button>
              <Button
                variant="secondary"
                onClick={() => {
                  setDrawerSide("right");
                  setDrawerOpen(true);
                }}
              >
                Drawer · right
              </Button>
              <Button
                variant="ghost"
                onClick={() => {
                  setDrawerSide("bottom");
                  setDrawerOpen(true);
                }}
              >
                Drawer · bottom
              </Button>
            </Demo>
          </Section>

          {/* TOOLTIP · POPOVER ------------------------------------------- */}
          <Section
            id="tooltip"
            index="10"
            eyebrow="OVERLAY"
            title="Tooltip · Popover"
            sub="Hover/focus tooltip with four sides; popover for richer floating panels."
          >
            <div className="void-two">
              <Demo name="TOOLTIP">
                <Tooltip content="Top tooltip">
                  <Button variant="secondary">Top</Button>
                </Tooltip>
                <Tooltip content="Right tooltip" side="right">
                  <Button variant="secondary">Right</Button>
                </Tooltip>
                <Tooltip content="Bottom tooltip" side="bottom">
                  <Button variant="secondary">Bottom</Button>
                </Tooltip>
                <Tooltip content="Left tooltip" side="left">
                  <Button variant="secondary">Left</Button>
                </Tooltip>
              </Demo>
              <Demo name="POPOVER">
                <Popover className="static w-full max-w-[280px]">
                  <PopoverHeader>
                    <PopoverTitle>Notifications</PopoverTitle>
                    <Badge variant="accent" dot>
                      3
                    </Badge>
                  </PopoverHeader>
                  <div className="text-fg-muted px-4 py-3 text-xs leading-relaxed">
                    All new comments will be batched and delivered as a daily digest.
                  </div>
                </Popover>
              </Demo>
            </div>
          </Section>

          {/* DROPDOWN ----------------------------------------------------- */}
          <Section
            id="dropdown"
            index="11"
            eyebrow="OVERLAY"
            title="Dropdown Menu"
            sub="Floating menu surface with check rows, separators, icons, and shortcuts."
          >
            <Demo name="DROPDOWN · INTERACTIVE">
              <div ref={dropdownRef} className="relative inline-block">
                <Button
                  variant="secondary"
                  onClick={() => setDropdownOpen((o) => !o)}
                  aria-haspopup="menu"
                  aria-expanded={dropdownOpen}
                >
                  Account
                  <span
                    aria-hidden="true"
                    style={{
                      display: "inline-block",
                      marginLeft: 6,
                      fontSize: 9,
                      transition: "transform 160ms var(--ease-snap)",
                      transform: dropdownOpen ? "rotateX(180deg)" : "none",
                    }}
                  >
                    ▾
                  </span>
                </Button>

                {dropdownOpen && (
                  <DropdownMenu
                    style={{
                      position: "absolute",
                      top: "calc(100% + 6px)",
                      left: 0,
                      zIndex: 50,
                    }}
                  >
                    <DropdownLabel>Account</DropdownLabel>
                    <DropdownItem
                      icon="◉"
                      shortcut="⌘P"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Profile
                    </DropdownItem>
                    <DropdownItem
                      icon="◈"
                      shortcut="⌘,"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Preferences
                    </DropdownItem>
                    <DropdownItem
                      icon="◧"
                      checked={dropdownCompact}
                      onClick={() => setDropdownCompact((v) => !v)}
                    >
                      Compact mode
                    </DropdownItem>
                    <DropdownItem icon="◬" disabled>Appearance</DropdownItem>
                    <DropdownSeparator />
                    <DropdownLabel>Workspace</DropdownLabel>
                    <DropdownItem icon="◎" onClick={() => setDropdownOpen(false)}>
                      Invite teammates
                    </DropdownItem>
                    <DropdownItem icon="◇" onClick={() => setDropdownOpen(false)}>
                      Billing
                    </DropdownItem>
                    <DropdownItem icon="◰" onClick={() => setDropdownOpen(false)}>
                      Usage &amp; limits
                    </DropdownItem>
                    <DropdownSeparator />
                    <DropdownItem
                      destructive
                      icon="⊗"
                      shortcut="⌘⇧Q"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Sign out
                    </DropdownItem>
                  </DropdownMenu>
                )}
              </div>
            </Demo>
          </Section>

          {/* COMMAND ------------------------------------------------------ */}
          <Section
            id="command"
            index="12"
            eyebrow="OVERLAY"
            title="Command Palette"
            sub="A complete keyboard surface — input, grouped list, footer hint."
          >
            <Demo name="COMMAND">
              <Command className="w-full">
                <CommandInput placeholder="Type a command or search…" tag={<Kbd>ESC</Kbd>} />
                <CommandList>
                  <CommandGroupLabel>Navigation</CommandGroupLabel>
                  <CommandItem active meta="G H">
                    Go to dashboard
                  </CommandItem>
                  <CommandItem meta="G P">Go to projects</CommandItem>
                  <CommandItem meta="G S">Go to settings</CommandItem>
                  <CommandGroupLabel>Actions</CommandGroupLabel>
                  <CommandItem meta="N">New deployment</CommandItem>
                  <CommandItem meta="I">Invite member</CommandItem>
                </CommandList>
                <CommandFooter>
                  <span>
                    <Kbd>↑</Kbd> <Kbd>↓</Kbd> navigate
                  </span>
                  <span className="ml-auto">
                    <Kbd>↵</Kbd> select
                  </span>
                </CommandFooter>
              </Command>
            </Demo>
          </Section>

          {/* CARD --------------------------------------------------------- */}
          <Section
            id="card"
            index="13"
            eyebrow="DATA"
            title="Card"
            sub="Composable surface with title, meta, body, footer, and optional image, header, stat, and corner badge sub-components. Three variants: default · interactive · featured."
          >
            {/* Row 1 — basic info cards (default variant) */}
            <div className="void-two">
              <Card>
                <CardCorner />
                <CardMeta>PROJECT</CardMeta>
                <CardTitle>Atlas Migration</CardTitle>
                <CardBody>
                  Move 4.2 TB of read-heavy data from Postgres to a new sharded Aurora cluster.
                </CardBody>
                <CardFooter>
                  <Badge variant="accent" dot>
                    In progress
                  </Badge>
                  <Button size="sm" variant="ghost" className="ml-auto">
                    View →
                  </Button>
                </CardFooter>
              </Card>
              <Card>
                <CardCorner />
                <CardMeta>DEPLOYMENT</CardMeta>
                <CardTitle>void-web · prod</CardTitle>
                <CardBody>
                  Last shipped 14 minutes ago. Lighthouse 99/100 across all axes.
                </CardBody>
                <CardFooter>
                  <Badge variant="success">Healthy</Badge>
                  <Button size="sm" variant="ghost" className="ml-auto">
                    Logs →
                  </Button>
                </CardFooter>
              </Card>
            </div>

            {/* Row 2 — image card + stat card + profile card */}
            <div className="void-three" style={{ marginTop: 20 }}>
              {/* Image card — interactive variant */}
              <Card variant="interactive">
                <CardImage aspectRatio="video">
                  {/* CSS-art placeholder — no external image required */}
                  <div
                    className="relative h-full w-full overflow-hidden"
                    style={{
                      background:
                        "linear-gradient(135deg, var(--void-800) 0%, var(--amethyst-800) 60%, var(--void-900) 100%)",
                    }}
                  >
                    <span
                      className="absolute bottom-2 left-3 font-dot text-[52px] leading-none tracking-[0.04em]"
                      style={{ color: "color-mix(in oklch, var(--amethyst-400) 35%, transparent)" }}
                      aria-hidden="true"
                    >
                      VOID
                    </span>
                    <div
                      className="absolute right-0 top-0 h-full w-1/3"
                      style={{
                        background:
                          "repeating-linear-gradient(0deg, transparent, transparent 3px, color-mix(in oklch, var(--amethyst-500) 8%, transparent) 3px, color-mix(in oklch, var(--amethyst-500) 8%, transparent) 4px)",
                      }}
                      aria-hidden="true"
                    />
                  </div>
                </CardImage>
                <CardMeta>
                  <span>ARTICLE</span>
                  <span>4 MIN READ</span>
                </CardMeta>
                <CardTitle>Building for the Void</CardTitle>
                <CardBody>
                  How VoidUI's dot-matrix design language emerged from the constraints of
                  monochrome hardware displays and Nothing OS 3.
                </CardBody>
                <CardFooter>
                  <span>APR 2025</span>
                  <Button size="sm" variant="ghost" className="ml-auto">
                    Read →
                  </Button>
                </CardFooter>
              </Card>

              {/* Stat card — featured variant */}
              <Card variant="featured">
                <CardCorner />
                <CardMeta>INFRASTRUCTURE</CardMeta>
                <div className="mb-4 grid grid-cols-2 gap-5">
                  <CardStat value="4.2 TB" label="Data transferred" delta="+12%" deltaDir="up" />
                  <CardStat value="99 ms" label="P99 latency" delta="−18 ms" deltaDir="up" />
                  <CardStat value="99.97%" label="Uptime (30 d)" />
                  <CardStat value="312" label="Active nodes" delta="+4" deltaDir="up" />
                </div>
                <CardFooter>
                  <span>Updated 2 min ago</span>
                  <Button size="sm" variant="ghost" className="ml-auto">
                    Dashboard →
                  </Button>
                </CardFooter>
              </Card>

              {/* Profile card — default variant */}
              <Card>
                <CardHeader>
                  {/* Avatar — CSS gradient circle */}
                  <div
                    className="h-10 w-10 shrink-0 rounded-full"
                    style={{
                      background:
                        "linear-gradient(135deg, var(--amethyst-700) 0%, var(--amethyst-400) 100%)",
                    }}
                    aria-hidden="true"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[13px] leading-none text-fg">Mira Solano</p>
                    <p className="mt-1 truncate text-[10px] uppercase tracking-[0.14em] text-fg-muted">
                      Systems Engineer
                    </p>
                  </div>
                  <Badge variant="accent" dot>
                    Online
                  </Badge>
                </CardHeader>
                <CardBody>
                  Infrastructure lead on the Atlas migration. Expert in distributed query planning
                  and zero-downtime schema changes.
                </CardBody>
                <CardFooter>
                  <div className="flex gap-1.5">
                    <Badge>Postgres</Badge>
                    <Badge>Aurora</Badge>
                    <Badge>Kafka</Badge>
                  </div>
                  <Button size="sm" variant="ghost" className="ml-auto">
                    Profile →
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </Section>

          {/* TABLE -------------------------------------------------------- */}
          <Section
            id="table"
            index="14"
            eyebrow="DATA"
            title="Table"
            sub="Composable table primitives — sortable headers, pinned columns, footer totals, empty states, and a toolbar slot."
          >
            {/* Demo 1 — Sortable with toolbar + footer totals */}
            {(() => {
              type BuildRow = {
                id: string;
                branch: string;
                status: "Passed" | "Flaky" | "Failed" | "Running";
                duration: number; /* seconds */
                size: number; /* KB */
              };

              const RAW_ROWS: BuildRow[] = [
                { id: "#1042", branch: "main", status: "Passed", duration: 134, size: 482 },
                { id: "#1041", branch: "feat/cards", status: "Flaky", duration: 182, size: 497 },
                { id: "#1040", branch: "fix/a11y", status: "Failed", duration: 107, size: 491 },
                { id: "#1039", branch: "feat/table", status: "Passed", duration: 161, size: 503 },
                { id: "#1038", branch: "main", status: "Running", duration: 88, size: 479 },
              ];

              const STATUS_VARIANT: Record<
                BuildRow["status"],
                "success" | "warning" | "error" | "accent"
              > = {
                Passed: "success",
                Flaky: "warning",
                Failed: "error",
                Running: "accent",
              };

              const fmtDur = (s: number): string =>
                `${Math.floor(s / 60)}m ${(s % 60).toString().padStart(2, "0")}s`;

              const filtered = RAW_ROWS.filter(
                (r) =>
                  tableFilter === "" ||
                  r.id.includes(tableFilter) ||
                  r.branch.toLowerCase().includes(tableFilter.toLowerCase()),
              );

              const sorted = [...filtered].sort((a, b) => {
                if (sortCol === null || sortDir === "none") return 0;
                let av: string | number = a[sortCol as keyof BuildRow] as string | number;
                let bv: string | number = b[sortCol as keyof BuildRow] as string | number;
                if (typeof av === "string") av = av.toLowerCase();
                if (typeof bv === "string") bv = bv.toLowerCase();
                if (av < bv) return sortDir === "asc" ? -1 : 1;
                if (av > bv) return sortDir === "asc" ? 1 : -1;
                return 0;
              });

              const totalDur = filtered.reduce((acc, r) => acc + r.duration, 0);
              const avgSize = Math.round(
                filtered.reduce((acc, r) => acc + r.size, 0) / Math.max(filtered.length, 1),
              );

              return (
                <div>
                  <TableToolbar>
                    <span className="text-[11px] uppercase tracking-[0.14em] text-fg-muted">
                      CI Builds
                      <span className="ml-2 text-fg-subtle">({filtered.length})</span>
                    </span>
                    <Input
                      placeholder="Filter builds…"
                      value={tableFilter}
                      onChange={(e) => setTableFilter(e.target.value)}
                      className="w-48"
                    />
                  </TableToolbar>
                  <TableContainer>
                    <Table>
                      <TableCaption>Recent pipeline runs · VoidUI monorepo</TableCaption>
                      <Thead>
                        <Tr>
                          <ThSortable
                            sortDir={colDir("build")}
                            onSort={() => handleSort("build")}
                          >
                            Build
                          </ThSortable>
                          <ThSortable
                            sortDir={colDir("branch")}
                            onSort={() => handleSort("branch")}
                          >
                            Branch
                          </ThSortable>
                          <Th>Status</Th>
                          <ThSortable
                            numeric
                            sortDir={colDir("duration")}
                            onSort={() => handleSort("duration")}
                          >
                            Duration
                          </ThSortable>
                          <ThSortable
                            numeric
                            sortDir={colDir("size")}
                            onSort={() => handleSort("size")}
                          >
                            Bundle
                          </ThSortable>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {sorted.length === 0 ? (
                          <TableEmpty
                            colSpan={5}
                            message="No builds match your filter"
                            hint="Try a different branch name or build ID."
                          />
                        ) : (
                          sorted.map((row) => (
                            <Tr key={row.id}>
                              <Td className="font-mono">{row.id}</Td>
                              <Td>{row.branch}</Td>
                              <Td>
                                <Badge variant={STATUS_VARIANT[row.status]} dot>
                                  {row.status}
                                </Badge>
                              </Td>
                              <Td numeric>{fmtDur(row.duration)}</Td>
                              <Td numeric>{row.size} KB</Td>
                            </Tr>
                          ))
                        )}
                      </Tbody>
                      {sorted.length > 0 && (
                        <Tfoot>
                          <Tr>
                            <Td colSpan={3} className="text-[10px] uppercase tracking-[0.14em]">
                              Totals
                            </Td>
                            <Td numeric>{fmtDur(totalDur)}</Td>
                            <Td numeric>~{avgSize} KB avg</Td>
                          </Tr>
                        </Tfoot>
                      )}
                    </Table>
                  </TableContainer>
                </div>
              );
            })()}

            {/* Demo 2 — Pinned column table */}
            <div style={{ marginTop: 32 }}>
              <TableToolbar>
                <span className="text-[11px] uppercase tracking-[0.14em] text-fg-muted">
                  Node metrics — pinned ID column
                </span>
                <Badge>Sticky</Badge>
              </TableToolbar>
              <TableContainer>
                <Table>
                  {(() => {
                    const nodes = [
                      { id: "node-01", region: "us-east-1", cpu: "18%", mem: "3.1 GB", net: "2.4 Gbps", uptime: "99.97%" },
                      { id: "node-02", region: "eu-west-1", cpu: "34%", mem: "5.8 GB", net: "1.1 Gbps", uptime: "99.91%" },
                      { id: "node-03", region: "ap-south-1", cpu: "9%", mem: "2.0 GB", net: "0.8 Gbps", uptime: "100%" },
                      { id: "node-04", region: "us-west-2", cpu: "61%", mem: "7.4 GB", net: "3.2 Gbps", uptime: "99.82%" },
                    ];
                    return (
                      <>
                        <Thead>
                          <Tr>
                            <ThPin pin="left">Node</ThPin>
                            <Th>Region</Th>
                            <Th numeric>CPU</Th>
                            <Th numeric>Memory</Th>
                            <Th numeric>Network</Th>
                            <ThPin pin="right" numeric>Uptime</ThPin>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {nodes.map((n) => (
                            <Tr key={n.id}>
                              <TdPin pin="left" className="font-mono">{n.id}</TdPin>
                              <Td>{n.region}</Td>
                              <Td numeric>{n.cpu}</Td>
                              <Td numeric>{n.mem}</Td>
                              <Td numeric>{n.net}</Td>
                              <TdPin pin="right" numeric>{n.uptime}</TdPin>
                            </Tr>
                          ))}
                        </Tbody>
                      </>
                    );
                  })()}
                </Table>
              </TableContainer>
            </div>
          </Section>

          {/* DATA TABLE -------------------------------------------------- */}
          <Section
            id="data-table"
            index="15"
            eyebrow="DATA"
            title="DataTable"
            sub="Full-featured table: row selection, expandable rows, sortable columns, filter pills, search, export, and paginated navigation."
          >
            <DataTable<DeployRow>
              columns={DEPLOY_COLUMNS}
              rows={DEPLOY_ROWS}
              rowKey="id"
              selectable
              selectionActions={(_selected, clear) => (
                <>
                  <button
                    type="button"
                    onClick={clear}
                    style={{
                      padding: "4px 10px",
                      border: "1px solid var(--border)",
                      borderRadius: 4,
                      background: "transparent",
                      color: "var(--fg)",
                      fontSize: 10,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      cursor: "pointer",
                    }}
                  >
                    Retry
                  </button>
                  <button
                    type="button"
                    onClick={clear}
                    style={{
                      padding: "4px 10px",
                      border: "1px solid var(--border)",
                      borderRadius: 4,
                      background: "transparent",
                      color: "var(--fg)",
                      fontSize: 10,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      cursor: "pointer",
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={clear}
                    style={{
                      padding: "4px 10px",
                      border: "1px solid oklch(52% 0.22 25)",
                      borderRadius: 4,
                      background: "transparent",
                      color: "oklch(65% 0.22 25)",
                      fontSize: 10,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </>
              )}
              expandable
              renderExpanded={(row) => <DeployExpandedPanel row={row} />}
              searchable
              searchPlaceholder="Search deployments…"
              searchKeys={["id", "message", "branch", "author"]}
              filters={DEPLOY_FILTERS}
              exportable
              onExport={(rows) => {
                // eslint-disable-next-line no-console
                console.info("Export", rows.length, "rows");
              }}
              pageSizeOptions={[5, 10, 25]}
              defaultPageSize={5}
              totalRows={142}
              rowNoun="DEPLOYMENTS"
            />
          </Section>

          {/* TABS --------------------------------------------------------- */}
          <Section
            id="tabs"
            index="16"
            eyebrow="DATA"
            title="Tabs"
            sub="Three variants — underline, pill, and boxed — each with arrow-key navigation."
          >
            <Demo name="TABS · UNDERLINE" col>
              <Tabs value={tab} onValueChange={setTab}>
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="activity">Activity</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>
                <TabsContent value="overview">
                  <p className="text-fg-muted text-xs leading-relaxed">
                    Snapshot of your workspace — open issues, recent deployments, and on-call.
                  </p>
                </TabsContent>
                <TabsContent value="activity">
                  <p className="text-fg-muted text-xs leading-relaxed">
                    14 events in the last hour. 3 deploys, 11 merges.
                  </p>
                </TabsContent>
                <TabsContent value="settings">
                  <p className="text-fg-muted text-xs leading-relaxed">
                    Manage tokens, members, and webhooks.
                  </p>
                </TabsContent>
              </Tabs>
            </Demo>
          </Section>

          {/* ACCORDION ---------------------------------------------------- */}
          <Section
            id="accordion"
            index="17"
            eyebrow="DATA"
            title="Accordion"
            sub="Single or multiple open at a time. Controlled and uncontrolled."
          >
            <Demo name="ACCORDION" col>
              <Accordion type="single" defaultValue={["a"]}>
                <AccordionItem value="a">
                  <AccordionTrigger>How does pricing work?</AccordionTrigger>
                  <AccordionContent>
                    Per-seat, monthly. Cancel anytime. The first 14 days are free on every plan.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="b">
                  <AccordionTrigger>Can I self-host?</AccordionTrigger>
                  <AccordionContent>
                    Yes — every release ships a Docker image and a Helm chart for Kubernetes.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="c">
                  <AccordionTrigger>Do you offer SSO?</AccordionTrigger>
                  <AccordionContent>
                    SAML and OIDC are included on the Team plan and above.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </Demo>
          </Section>

          {/* SIDEBAR ------------------------------------------------------ */}
          <Section
            id="sidebar-comp"
            index="18"
            eyebrow="NAV"
            title="Sidebar"
            sub="Standalone navigation column you can drop into any layout."
          >
            <Demo name="SIDEBAR">
              <div className="h-[280px] w-full max-w-[260px] overflow-hidden rounded-md border border-border">
                <Sidebar className="h-full">
                  <SidebarSection>
                    <SidebarLabel>Workspace</SidebarLabel>
                    <SidebarLink href="#" active>
                      Dashboard
                    </SidebarLink>
                    <SidebarLink href="#">Projects</SidebarLink>
                    <SidebarLink href="#">Activity</SidebarLink>
                  </SidebarSection>
                  <SidebarSection>
                    <SidebarLabel>Account</SidebarLabel>
                    <SidebarLink href="#">Settings</SidebarLink>
                    <SidebarLink href="#">Billing</SidebarLink>
                  </SidebarSection>
                </Sidebar>
              </div>
            </Demo>
          </Section>

          {/* BREADCRUMB --------------------------------------------------- */}
          <Section
            id="breadcrumb"
            index="19"
            eyebrow="NAV"
            title="Breadcrumb"
            sub="Auto-injected separators between items; mark the last as current."
          >
            <Demo name="BREADCRUMB">
              <Breadcrumb>
                <BreadcrumbItem href="#">Workspace</BreadcrumbItem>
                <BreadcrumbItem href="#">Projects</BreadcrumbItem>
                <BreadcrumbItem href="#">Atlas</BreadcrumbItem>
                <BreadcrumbItem current>Migration</BreadcrumbItem>
              </Breadcrumb>
            </Demo>
          </Section>

          {/* Mount toast — fired once via ToastProvider */}
          <ShowcaseMountToast version={latestVersion} />
        </div>

        <footer className="void-foot">
          <div>
            <div className="mark">VOID/UI</div>
            <p className="mt-3 text-xs">
              Built in dark mode. Shipped under MIT. Inspired by <em>Nothing</em>.
            </p>
          </div>
          <div className="void-foot-links">
            <a href="#overview">DOCS</a>
            <a href="https://github.com/Satcomx00-x00/VoidUI">GITHUB</a>
            <a href="#">CHANGELOG</a>
          </div>
        </footer>
      </main>

      {/* OVERLAYS ------------------------------------------------------- */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogHeader>
          <DialogTitle>Delete project?</DialogTitle>
          <DialogDescription>
            This will permanently delete <b>atlas-migration</b> and all of its 247 deployments.
            This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogBody>
          <Field>
            <FieldLabel required>Type the project name to confirm</FieldLabel>
            <Input placeholder="atlas-migration" />
          </Field>
        </DialogBody>
        <DialogFooter>
          <Button variant="ghost" onClick={() => setDialogOpen(false)}>
            Cancel
          </Button>
          <Button variant="accent" onClick={() => setDialogOpen(false)}>
            Delete project
          </Button>
        </DialogFooter>
      </Dialog>

      <Drawer open={drawerOpen} side={drawerSide} onOpenChange={setDrawerOpen}>
        <DrawerHeader>
          <div>
            <div className="text-fg-muted text-[10px] uppercase tracking-[0.18em]">
              Deployment
            </div>
            <div className="font-dot text-2xl">#1042</div>
          </div>
          <Button size="sm" variant="ghost" onClick={() => setDrawerOpen(false)}>
            Close
          </Button>
        </DrawerHeader>
        <DrawerBody>
          <p className="text-fg-muted text-xs leading-relaxed">
            Triggered by <b className="text-fg">@you</b> · 14 min ago · main · 2m 14s.
          </p>
          <Separator className="my-4" />
          <ul className="space-y-2 text-xs">
            <li className="flex justify-between">
              <span className="text-fg-muted">Build</span>
              <Badge variant="success">Passed</Badge>
            </li>
            <li className="flex justify-between">
              <span className="text-fg-muted">Tests</span>
              <Badge variant="success">312 / 312</Badge>
            </li>
            <li className="flex justify-between">
              <span className="text-fg-muted">Lighthouse</span>
              <Badge variant="accent">99 / 100</Badge>
            </li>
          </ul>
        </DrawerBody>
        <DrawerFooter>
          <Button variant="ghost" onClick={() => setDrawerOpen(false)}>
            Dismiss
          </Button>
          <Button variant="primary">Promote to prod</Button>
        </DrawerFooter>
      </Drawer>
    </div>
    </ToastProvider>
  );
}

/* -------------------------------------------------------------------------- */
/*  Sidebar                                                                   */
/* -------------------------------------------------------------------------- */

interface NavGroup {
  label: string;
  items: ReadonlyArray<{ href: string; label: string }>;
}

const NAV: ReadonlyArray<NavGroup> = [
  {
    label: "Start",
    items: [{ href: "#overview", label: "Overview" }],
  },
  {
    label: "Primitives",
    items: [
      { href: "#button", label: "Button" },
      { href: "#input", label: "Input · Textarea · Select" },
      { href: "#toggle", label: "Checkbox · Radio · Switch" },
      { href: "#badge", label: "Badge" },
      { href: "#progress", label: "Progress · Spinner · Kbd" },
    ],
  },
  {
    label: "Feedback",
    items: [
      { href: "#alert", label: "Alert" },
      { href: "#skeleton", label: "Skeleton" },
      { href: "#toast", label: "Toast" },
    ],
  },
  {
    label: "Overlay",
    items: [
      { href: "#dialog", label: "Dialog · Drawer" },
      { href: "#tooltip", label: "Tooltip · Popover" },
      { href: "#dropdown", label: "Dropdown Menu" },
      { href: "#command", label: "Command Palette" },
    ],
  },
  {
    label: "Data",
    items: [
      { href: "#card", label: "Card" },
      { href: "#table", label: "Table" },
      { href: "#data-table", label: "DataTable" },
      { href: "#tabs", label: "Tabs" },
      { href: "#accordion", label: "Accordion" },
    ],
  },
  {
    label: "Navigation",
    items: [
      { href: "#sidebar-comp", label: "Sidebar" },
      { href: "#breadcrumb", label: "Breadcrumb" },
    ],
  },
];

function ShowcaseSidebar(): ReactElement {
  return (
    <aside className="void-aside">
      <div className="void-brand">
        <span className="void-brand-mark" aria-hidden="true">
          <i />
          <i className="off" />
          <i />
          <i className="off" />
          <i />
          <i className="off" />
          <i />
          <i className="off" />
          <i />
        </span>
        <span className="void-brand-name">VOID/UI</span>
        <span className="void-brand-ver">v0.0</span>
      </div>

      <nav className="void-nav">
        {NAV.map((group) => (
          <div key={group.label}>
            <div className="void-nav-label">{group.label}</div>
            {group.items.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </div>
        ))}
      </nav>

      <div className="void-side-foot">
        <span>THEME</span>
        <span>DARK</span>
      </div>
    </aside>
  );
}
