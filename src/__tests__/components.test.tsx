/**
 * VoidUI component consistency suite
 *
 * Enforces the design-system contract across every UI primitive:
 *
 * 1. Smoke — component renders without throwing
 * 2. displayName — set on every forwardRef component
 * 3. className merging — extra className is appended, not dropped
 * 4. ref forwarding — ref receives the underlying DOM node
 * 5. data-* attributes — data-variant present where applicable
 * 6. CVA variants — each variant string is present in className
 * 7. HTML attribute passthrough — arbitrary props reach the DOM element
 */
import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { describe, expect, it } from "vitest";

import { Alert, AlertBody, AlertIcon, AlertTitle, alertVariants } from "../components/ui/alert";
import { Badge, badgeVariants } from "../components/ui/badge";
import { Breadcrumb, BreadcrumbItem, BreadcrumbSeparator } from "../components/ui/breadcrumb";
import { Button, buttonVariants } from "../components/ui/button";
import { Card, CardBody, CardFooter, CardHeader, CardMeta, CardTitle, cardVariants } from "../components/ui/card";
import { Checkbox } from "../components/ui/checkbox";
import { Field, FieldHint, FieldLabel } from "../components/ui/field";
import { Input } from "../components/ui/input";
import { Kbd } from "../components/ui/kbd";
import { Progress } from "../components/ui/progress";
import { Separator } from "../components/ui/separator";
import { Skeleton } from "../components/ui/skeleton";
import { Spinner } from "../components/ui/spinner";
import { Textarea } from "../components/ui/textarea";
import { Toast, toastVariants } from "../components/ui/toast";

/* ─── helpers ─────────────────────────────────────────────────────────────── */

function getClasses(element: Element): string {
  return element.getAttribute("class") ?? "";
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/*  1. SMOKE TESTS — every component renders without throwing                */
/* ═══════════════════════════════════════════════════════════════════════════ */

describe("smoke — components render without errors", () => {
  it("renders Badge", () => {
    const { container } = render(<Badge>test</Badge>);
    expect(container.firstChild).toBeTruthy();
  });

  it("renders Alert", () => {
    const { container } = render(<Alert>test</Alert>);
    expect(container.firstChild).toBeTruthy();
  });

  it("renders Button", () => {
    const { container } = render(<Button>click me</Button>);
    expect(container.firstChild).toBeTruthy();
  });

  it("renders Card", () => {
    const { container } = render(<Card>test</Card>);
    expect(container.firstChild).toBeTruthy();
  });

  it("renders Separator", () => {
    const { container } = render(<Separator />);
    expect(container.firstChild).toBeTruthy();
  });

  it("renders Skeleton", () => {
    const { container } = render(<Skeleton />);
    expect(container.firstChild).toBeTruthy();
  });

  it("renders Spinner", () => {
    const { container } = render(<Spinner />);
    expect(container.firstChild).toBeTruthy();
  });

  it("renders Kbd", () => {
    const { container } = render(<Kbd>⌘K</Kbd>);
    expect(container.firstChild).toBeTruthy();
  });

  it("renders Input", () => {
    const { container } = render(<Input />);
    expect(container.firstChild).toBeTruthy();
  });

  it("renders Textarea", () => {
    const { container } = render(<Textarea />);
    expect(container.firstChild).toBeTruthy();
  });

  it("renders Toast", () => {
    const { container } = render(<Toast title="hi" />);
    expect(container.firstChild).toBeTruthy();
  });

  it("renders Progress", () => {
    const { container } = render(<Progress value={50} />);
    expect(container.firstChild).toBeTruthy();
  });

  it("renders Checkbox", () => {
    // Radix Checkbox — unwrapped render check
    const { container } = render(<Checkbox />);
    expect(container.firstChild).toBeTruthy();
  });

  it("renders Breadcrumb with items", () => {
    const { container } = render(
      <Breadcrumb>
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>Current</BreadcrumbItem>
      </Breadcrumb>,
    );
    expect(container.firstChild).toBeTruthy();
  });

  it("renders Field composition", () => {
    const { container } = render(
      <Field>
        <FieldLabel htmlFor="x">Label</FieldLabel>
        <Input id="x" />
        <FieldHint>hint</FieldHint>
      </Field>,
    );
    expect(container.firstChild).toBeTruthy();
  });

  it("renders Card sub-components", () => {
    const { container } = render(
      <Card>
        <CardHeader>header</CardHeader>
        <CardMeta>meta</CardMeta>
        <CardTitle>title</CardTitle>
        <CardBody>body</CardBody>
        <CardFooter>footer</CardFooter>
      </Card>,
    );
    expect(container.firstChild).toBeTruthy();
  });

  it("renders Alert sub-components", () => {
    const { container } = render(
      <Alert>
        <AlertIcon>!</AlertIcon>
        <AlertTitle>Title</AlertTitle>
        <AlertBody>body</AlertBody>
      </Alert>,
    );
    expect(container.firstChild).toBeTruthy();
  });
});

/* ═══════════════════════════════════════════════════════════════════════════ */
/*  2. displayName — every exported component has .displayName set           */
/* ═══════════════════════════════════════════════════════════════════════════ */

describe("displayName — set on every component", () => {
  const components: [string, { displayName?: string }][] = [
    ["Badge", Badge],
    ["Alert", Alert],
    ["AlertIcon", AlertIcon],
    ["AlertTitle", AlertTitle],
    ["AlertBody", AlertBody],
    ["Button", Button],
    ["Card", Card],
    ["CardTitle", CardTitle],
    ["CardMeta", CardMeta],
    ["CardBody", CardBody],
    ["CardFooter", CardFooter],
    ["CardHeader", CardHeader],
    ["Separator", Separator],
    ["Skeleton", Skeleton],
    ["Spinner", Spinner],
    ["Kbd", Kbd],
    ["Input", Input],
    ["Textarea", Textarea],
    ["Toast", Toast],
    ["Progress", Progress],
    ["Breadcrumb", Breadcrumb],
    ["BreadcrumbItem", BreadcrumbItem],
    ["BreadcrumbSeparator", BreadcrumbSeparator],
    ["Field", Field],
    ["FieldLabel", FieldLabel],
    ["FieldHint", FieldHint],
  ];

  for (const [name, component] of components) {
    it(`${name}.displayName === "${name}"`, () => {
      expect(component.displayName).toBe(name);
    });
  }
});

/* ═══════════════════════════════════════════════════════════════════════════ */
/*  3. className merging — extra className is appended, not dropped          */
/* ═══════════════════════════════════════════════════════════════════════════ */

describe("className merging — extra className survives", () => {
  it("Badge merges className", () => {
    const { container } = render(<Badge className="test-sentinel">x</Badge>);
    expect(getClasses(container.firstChild as Element)).toContain("test-sentinel");
  });

  it("Alert merges className", () => {
    const { container } = render(<Alert className="test-sentinel">x</Alert>);
    expect(getClasses(container.firstChild as Element)).toContain("test-sentinel");
  });

  it("Button merges className", () => {
    const { container } = render(<Button className="test-sentinel">x</Button>);
    expect(getClasses(container.firstChild as Element)).toContain("test-sentinel");
  });

  it("Card merges className", () => {
    const { container } = render(<Card className="test-sentinel">x</Card>);
    expect(getClasses(container.firstChild as Element)).toContain("test-sentinel");
  });

  it("Separator merges className", () => {
    const { container } = render(<Separator className="test-sentinel" />);
    expect(getClasses(container.firstChild as Element)).toContain("test-sentinel");
  });

  it("Skeleton merges className", () => {
    const { container } = render(<Skeleton className="test-sentinel" />);
    expect(getClasses(container.firstChild as Element)).toContain("test-sentinel");
  });

  it("Toast merges className", () => {
    const { container } = render(<Toast className="test-sentinel" title="x" />);
    expect(getClasses(container.firstChild as Element)).toContain("test-sentinel");
  });

  it("Input merges className", () => {
    const { container } = render(<Input className="test-sentinel" />);
    expect(getClasses(container.firstChild as Element)).toContain("test-sentinel");
  });

  it("Textarea merges className", () => {
    const { container } = render(<Textarea className="test-sentinel" />);
    expect(getClasses(container.firstChild as Element)).toContain("test-sentinel");
  });

  it("Kbd merges className", () => {
    const { container } = render(<Kbd className="test-sentinel">⌘</Kbd>);
    expect(getClasses(container.firstChild as Element)).toContain("test-sentinel");
  });
});

/* ═══════════════════════════════════════════════════════════════════════════ */
/*  4. ref forwarding — ref receives the underlying DOM node                 */
/* ═══════════════════════════════════════════════════════════════════════════ */

describe("ref forwarding — ref reaches the DOM node", () => {
  it("Badge ref", () => {
    const ref = createRef<HTMLSpanElement>();
    render(<Badge ref={ref}>x</Badge>);
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });

  it("Alert ref", () => {
    const ref = createRef<HTMLDivElement>();
    render(<Alert ref={ref}>x</Alert>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("Button ref", () => {
    const ref = createRef<HTMLButtonElement>();
    render(<Button ref={ref}>x</Button>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it("Card ref", () => {
    const ref = createRef<HTMLDivElement>();
    render(<Card ref={ref}>x</Card>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("Separator ref", () => {
    const ref = createRef<HTMLDivElement>();
    render(<Separator ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("Skeleton ref", () => {
    const ref = createRef<HTMLDivElement>();
    render(<Skeleton ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("Input ref", () => {
    const ref = createRef<HTMLInputElement>();
    render(<Input ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it("Textarea ref", () => {
    const ref = createRef<HTMLTextAreaElement>();
    render(<Textarea ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
  });

  it("Toast ref", () => {
    const ref = createRef<HTMLDivElement>();
    render(<Toast ref={ref} title="x" />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});

/* ═══════════════════════════════════════════════════════════════════════════ */
/*  5. data-* attributes — data-variant on components that declare it        */
/* ═══════════════════════════════════════════════════════════════════════════ */

describe("data-variant attribute consistency", () => {
  it("Badge renders data-variant=default by default", () => {
    const { container } = render(<Badge>x</Badge>);
    expect(container.firstChild).toHaveAttribute("data-variant", "default");
  });

  it("Badge renders data-variant=solid when variant=solid", () => {
    const { container } = render(<Badge variant="solid">x</Badge>);
    expect(container.firstChild).toHaveAttribute("data-variant", "solid");
  });

  it("Badge renders data-variant=success when variant=success", () => {
    const { container } = render(<Badge variant="success">x</Badge>);
    expect(container.firstChild).toHaveAttribute("data-variant", "success");
  });

  it("Alert renders data-variant=info by default", () => {
    const { container } = render(<Alert>x</Alert>);
    expect(container.firstChild).toHaveAttribute("data-variant", "info");
  });

  it("Alert renders data-variant=error when variant=error", () => {
    const { container } = render(<Alert variant="error">x</Alert>);
    expect(container.firstChild).toHaveAttribute("data-variant", "error");
  });

  it("Card renders data-variant=default by default", () => {
    const { container } = render(<Card>x</Card>);
    expect(container.firstChild).toHaveAttribute("data-variant", "default");
  });

  it("Card renders data-variant=interactive when variant=interactive", () => {
    const { container } = render(<Card variant="interactive">x</Card>);
    expect(container.firstChild).toHaveAttribute("data-variant", "interactive");
  });

  it("Toast renders data-variant=default by default", () => {
    const { container } = render(<Toast title="x" />);
    expect(container.firstChild).toHaveAttribute("data-variant", "default");
  });

  it("Toast renders data-variant=accent when variant=accent", () => {
    const { container } = render(<Toast variant="accent" title="x" />);
    expect(container.firstChild).toHaveAttribute("data-variant", "accent");
  });
});

/* ═══════════════════════════════════════════════════════════════════════════ */
/*  6. CVA variant class-names — each variant emits its expected base class   */
/* ═══════════════════════════════════════════════════════════════════════════ */

describe("CVA — variant classes present on rendered element", () => {
  describe("badgeVariants", () => {
    it("default variant has 'bg-bg'", () => {
      expect(badgeVariants({ variant: "default" })).toContain("bg-bg");
    });

    it("solid variant has 'bg-fg'", () => {
      expect(badgeVariants({ variant: "solid" })).toContain("bg-fg");
    });

    it("accent variant has 'bg-accent-soft'", () => {
      expect(badgeVariants({ variant: "accent" })).toContain("bg-accent-soft");
    });

    it("success variant has oklch green text", () => {
      expect(badgeVariants({ variant: "success" })).toContain("oklch(68%_0.14_150)");
    });

    it("warning variant has oklch amber text", () => {
      expect(badgeVariants({ variant: "warning" })).toContain("oklch(72%_0.16_70)");
    });

    it("error variant has oklch red text", () => {
      expect(badgeVariants({ variant: "error" })).toContain("oklch(62%_0.18_25)");
    });

    it("all variants share base class 'uppercase'", () => {
      const variants = ["default", "solid", "accent", "success", "warning", "error"] as const;
      for (const v of variants) {
        expect(badgeVariants({ variant: v })).toContain("uppercase");
      }
    });
  });

  describe("alertVariants", () => {
    it("info variant has 'bg-accent-soft'", () => {
      expect(alertVariants({ variant: "info" })).toContain("bg-accent-soft");
    });

    it("success variant has oklch green", () => {
      expect(alertVariants({ variant: "success" })).toContain("oklch(64%_0.22_150)");
    });

    it("warning variant has oklch amber", () => {
      expect(alertVariants({ variant: "warning" })).toContain("oklch(74%_0.2_70)");
    });

    it("error variant has oklch red", () => {
      expect(alertVariants({ variant: "error" })).toContain("oklch(64%_0.24_25)");
    });

    it("all variants share base class 'rounded-lg'", () => {
      const variants = ["info", "success", "warning", "error"] as const;
      for (const v of variants) {
        expect(alertVariants({ variant: v })).toContain("rounded-lg");
      }
    });
  });

  describe("buttonVariants", () => {
    it("primary variant has 'bg-fg'", () => {
      expect(buttonVariants({ variant: "primary" })).toContain("bg-fg");
    });

    it("secondary variant has 'border-fg'", () => {
      expect(buttonVariants({ variant: "secondary" })).toContain("border-fg");
    });

    it("ghost variant has 'hover:bg-surface'", () => {
      expect(buttonVariants({ variant: "ghost" })).toContain("hover:bg-surface");
    });

    it("accent variant has 'bg-accent'", () => {
      expect(buttonVariants({ variant: "accent" })).toContain("bg-accent");
    });

    it("sm size has 'h-[26px]'", () => {
      expect(buttonVariants({ size: "sm" })).toContain("h-[26px]");
    });

    it("md size has 'h-8'", () => {
      expect(buttonVariants({ size: "md" })).toContain("h-8");
    });

    it("lg size has 'h-[42px]'", () => {
      expect(buttonVariants({ size: "lg" })).toContain("h-[42px]");
    });

    it("all variants share base class 'uppercase'", () => {
      const variants = ["primary", "secondary", "ghost", "accent", "danger"] as const;
      for (const v of variants) {
        expect(buttonVariants({ variant: v })).toContain("uppercase");
      }
    });
  });

  describe("cardVariants", () => {
    it("default variant is empty (no extra classes)", () => {
      // default only has the base — no variant-specific extra class
      const cls = cardVariants({ variant: "default" });
      expect(cls).toContain("rounded-lg");
    });

    it("interactive variant has 'cursor-pointer'", () => {
      expect(cardVariants({ variant: "interactive" })).toContain("cursor-pointer");
    });

    it("featured variant has 'border-accent/30'", () => {
      expect(cardVariants({ variant: "featured" })).toContain("border-accent/30");
    });
  });

  describe("toastVariants", () => {
    it("default variant has 'border-border'", () => {
      expect(toastVariants({ variant: "default" })).toContain("border-border");
    });

    it("accent variant has 'color-mix'", () => {
      expect(toastVariants({ variant: "accent" })).toContain("color-mix");
    });

    it("all variants share base class 'rounded-lg'", () => {
      const variants = ["default", "accent", "success", "error"] as const;
      for (const v of variants) {
        expect(toastVariants({ variant: v })).toContain("rounded-lg");
      }
    });
  });
});

/* ═══════════════════════════════════════════════════════════════════════════ */
/*  7. HTML attribute passthrough — arbitrary props reach the DOM element    */
/* ═══════════════════════════════════════════════════════════════════════════ */

describe("HTML attribute passthrough", () => {
  it("Badge passes aria-label", () => {
    const { container } = render(<Badge aria-label="status badge">x</Badge>);
    expect(container.firstChild).toHaveAttribute("aria-label", "status badge");
  });

  it("Alert passes role override", () => {
    const { container } = render(<Alert role="alert">x</Alert>);
    expect(container.firstChild).toHaveAttribute("role", "alert");
  });

  it("Separator passes data-testid", () => {
    render(<Separator data-testid="sep" />);
    expect(screen.getByTestId("sep")).toBeInTheDocument();
  });

  it("Separator horizontal renders h-px", () => {
    const { container } = render(<Separator orientation="horizontal" />);
    expect(getClasses(container.firstChild as Element)).toContain("h-px");
  });

  it("Separator vertical renders w-px", () => {
    const { container } = render(<Separator orientation="vertical" />);
    expect(getClasses(container.firstChild as Element)).toContain("w-px");
  });

  it("Separator dashed renders border-dashed", () => {
    const { container } = render(<Separator dashed />);
    expect(getClasses(container.firstChild as Element)).toContain("border-dashed");
  });

  it("Input passes placeholder", () => {
    render(<Input placeholder="enter text" />);
    expect(screen.getByPlaceholderText("enter text")).toBeInTheDocument();
  });

  it("Textarea passes placeholder", () => {
    render(<Textarea placeholder="enter text" />);
    expect(screen.getByPlaceholderText("enter text")).toBeInTheDocument();
  });

  it("Button passes type=submit", () => {
    const { container } = render(<Button type="submit">go</Button>);
    expect(container.firstChild).toHaveAttribute("type", "submit");
  });

  it("Button disabled passes through", () => {
    const { container } = render(<Button disabled>off</Button>);
    expect(container.firstChild).toBeDisabled();
  });
});

/* ═══════════════════════════════════════════════════════════════════════════ */
/*  8. Badge dot prop — status dot renders                                   */
/* ═══════════════════════════════════════════════════════════════════════════ */

describe("Badge dot prop", () => {
  it("renders status dot span when dot=true", () => {
    const { container } = render(<Badge dot>active</Badge>);
    const dot = container.querySelector("span[aria-hidden='true']");
    expect(dot).toBeInTheDocument();
    expect(dot).toHaveClass("rounded-full");
  });

  it("does not render status dot when dot=false (default)", () => {
    const { container } = render(<Badge>inactive</Badge>);
    const dot = container.querySelector("span[aria-hidden='true']");
    expect(dot).not.toBeInTheDocument();
  });
});

/* ═══════════════════════════════════════════════════════════════════════════ */
/*  9. Toast — dismiss button and role                                        */
/* ═══════════════════════════════════════════════════════════════════════════ */

describe("Toast structure", () => {
  it("has role=status", () => {
    const { container } = render(<Toast title="hello" />);
    expect(container.firstChild).toHaveAttribute("role", "status");
  });

  it("renders dismiss button when onDismiss provided", () => {
    render(<Toast title="hello" onDismiss={() => undefined} />);
    expect(screen.getByRole("button", { name: /dismiss/i })).toBeInTheDocument();
  });

  it("does not render dismiss button when onDismiss absent", () => {
    render(<Toast title="hello" />);
    expect(screen.queryByRole("button", { name: /dismiss/i })).not.toBeInTheDocument();
  });
});

/* ═══════════════════════════════════════════════════════════════════════════ */
/*  10. Button asChild — renders as child element                             */
/* ═══════════════════════════════════════════════════════════════════════════ */

describe("Button asChild", () => {
  it("renders as anchor when asChild with <a>", () => {
    const { container } = render(
      <Button asChild>
        <a href="/test">link</a>
      </Button>,
    );
    expect(container.querySelector("a")).toBeInTheDocument();
    expect(container.querySelector("button")).not.toBeInTheDocument();
  });

  it("anchor inherits button classes", () => {
    const { container } = render(
      <Button asChild variant="primary">
        <a href="/test">link</a>
      </Button>,
    );
    expect(getClasses(container.querySelector("a") as Element)).toContain("uppercase");
  });
});

/* ═══════════════════════════════════════════════════════════════════════════ */
/*  11. Progress — value clamping                                             */
/* ═══════════════════════════════════════════════════════════════════════════ */

describe("Progress", () => {
  it("renders without error at value=0", () => {
    const { container } = render(<Progress value={0} />);
    expect(container.firstChild).toBeTruthy();
  });

  it("renders without error at value=100", () => {
    const { container } = render(<Progress value={100} />);
    expect(container.firstChild).toBeTruthy();
  });

  it("renders without error when value is undefined", () => {
    // indeterminate state
    const { container } = render(<Progress />);
    expect(container.firstChild).toBeTruthy();
  });
});
