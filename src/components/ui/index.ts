/**
 * VoidUI — Core UI primitives.
 *
 * Each primitive lives in its own kebab-case file (e.g. `button.tsx`)
 * and is re-exported from this barrel.
 */

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "./accordion";
export type { AccordionProps, AccordionItemProps, AccordionType } from "./accordion";

export { Alert, AlertIcon, AlertTitle, AlertBody, AlertAction } from "./alert";
export type { AlertProps, AlertVariant } from "./alert";

export { Badge } from "./badge";
export type { BadgeProps, BadgeVariant } from "./badge";

export {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from "./breadcrumb";
export type { BreadcrumbProps, BreadcrumbItemProps } from "./breadcrumb";

export { Button, ButtonKbd } from "./button";
export type { ButtonProps, ButtonSize, ButtonVariant } from "./button";

export {
  Card,
  CardTitle,
  CardMeta,
  CardBody,
  CardFooter,
  CardCorner,
  CardImage,
  CardHeader,
  CardStat,
} from "./card";
export type {
  CardProps,
  CardVariant,
  CardImageProps,
  CardImageAspect,
  CardStatProps,
  CardStatDeltaDir,
} from "./card";

export { DotBackground } from "./dot-background";
export type { DotBackgroundProps } from "./dot-background";

export { DataTable } from "./data-table";
export type {
  DataTableProps,
  DataTableColumn,
  DataTableFilterConfig,
  DataTableFilterOption,
  DataTableSortDir,
  DataTableSelectionActionsProps,
} from "./data-table";

export { Checkbox } from "./checkbox";
export type { CheckboxProps } from "./checkbox";

export {
  Command,
  CommandInput,
  CommandList,
  CommandGroupLabel,
  CommandItem,
  CommandFooter,
} from "./command";
export type { CommandInputProps, CommandItemProps } from "./command";

export {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "./dialog";
export type { DialogProps, DialogHeaderProps } from "./dialog";

export { Drawer, DrawerHeader, DrawerBody, DrawerFooter } from "./drawer";
export type { DrawerProps, DrawerHeaderProps, DrawerSide } from "./drawer";

export {
  DropdownMenu,
  DropdownItem,
  DropdownSeparator,
  DropdownLabel,
} from "./dropdown-menu";
export type { DropdownItemProps } from "./dropdown-menu";

export { Field, FieldLabel, FieldHint } from "./field";
export type { FieldProps, FieldLabelProps } from "./field";

export { Input } from "./input";
export type { InputProps } from "./input";

export { Kbd } from "./kbd";

export { Popover, PopoverHeader, PopoverTitle, Tooltip } from "./tooltip";
export type { TooltipProps, TooltipSide } from "./tooltip";

export { Progress } from "./progress";
export type { ProgressProps } from "./progress";

export { Radio, RadioGroup } from "./radio";
export type { RadioProps } from "./radio";

export { Select, SelectOption } from "./select";
export type { SelectProps, SelectOptionProps } from "./select";

export { Separator } from "./separator";
export type { SeparatorProps } from "./separator";

export { Sidebar, SidebarSection, SidebarLabel, SidebarLink } from "./sidebar";
export type { SidebarLinkProps } from "./sidebar";

export { Skeleton } from "./skeleton";

export { Spinner } from "./spinner";

export { Switch } from "./switch";
export type { SwitchProps } from "./switch";

export {
  Table,
  TableContainer,
  TableCaption,
  TableToolbar,
  TableEmpty,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  ThSortable,
  ThPin,
  Td,
  TdPin,
} from "./table";
export type {
  ThProps,
  TdProps,
  TdPinProps,
  ThPinProps,
  ThSortableProps,
  SortDir,
  TableEmptyProps,
} from "./table";

export { Tabs, TabsList, TabsTrigger, TabsContent } from "./tabs";
export type { TabsProps, TabsTriggerProps, TabsContentProps, TabsVariant } from "./tabs";

export { Textarea } from "./textarea";
export type { TextareaProps } from "./textarea";

export { Toast, ToastStack, ToastProvider, useToast } from "./toast";
export type { ToastProps, ToastVariant, ToastEntry, ToastPosition, ToastProviderProps } from "./toast";
