/** @jsxImportSource ../core/template */

import { ChevronLeftIcon, ChevronRightIcon, EllipsisIcon } from "lucide-react";

import {
  Children,
  defineComponent,
  defineElement,
  defineProps,
  defineStyles,
  defineVariants,
} from "../core/index.ts";

export const Pagination = defineElement({ name: "Pagination", as: "nav" });

export const PaginationContent = defineElement({
  name: "PaginationContent",
  as: "ul",
});

export const PaginationItem = defineElement({
  name: "PaginationItem",
  as: "li",
});

const linkVariants = defineVariants(
  {
    isActive: [true, false],
    size: [
      "default",
      "xs",
      "sm",
      "lg",
      "icon",
      "icon-xs",
      "icon-sm",
      "icon-lg",
    ],
  },
  { defaults: { size: "icon" } },
);

export const PaginationLink = defineElement({
  name: "PaginationLink",
  as: "a",
  variants: linkVariants,
});

const previousVariants = defineVariants(
  {
    size: [
      "default",
      "xs",
      "sm",
      "lg",
      "icon",
      "icon-xs",
      "icon-sm",
      "icon-lg",
    ],
  },
  { defaults: { size: "default" } },
);

export const PaginationPrevious = defineElement({
  name: "PaginationPrevious",
  as: "a",
  variants: previousVariants,
});

export const PaginationPreviousIcon = defineElement({
  name: "PaginationPreviousIcon",
  icon: ChevronLeftIcon,
});

export const PaginationPreviousLabel = defineElement({
  name: "PaginationPreviousLabel",
  as: "span",
});

const nextVariants = defineVariants(
  {
    size: [
      "default",
      "xs",
      "sm",
      "lg",
      "icon",
      "icon-xs",
      "icon-sm",
      "icon-lg",
    ],
  },
  { defaults: { size: "default" } },
);

export const PaginationNext = defineElement({
  name: "PaginationNext",
  as: "a",
  variants: nextVariants,
});

export const PaginationNextLabel = defineElement({
  name: "PaginationNextLabel",
  as: "span",
});

export const PaginationNextIcon = defineElement({
  name: "PaginationNextIcon",
  icon: ChevronRightIcon,
});

export const PaginationEllipsis = defineElement({
  name: "PaginationEllipsis",
  as: "span",
});

export const PaginationEllipsisIcon = defineElement({
  name: "PaginationEllipsisIcon",
  icon: EllipsisIcon,
});

export const PaginationEllipsisLabel = defineElement({
  name: "PaginationEllipsisLabel",
  as: "span",
});

const styles = defineStyles<
  typeof linkVariants & typeof previousVariants & typeof nextVariants
>({
  base: {
    Pagination: "flex mx-auto justify-center w-full",
    PaginationContent: "flex items-center gap-0.5",
    PaginationLink:
      "font-medium whitespace-nowrap transition-all select-none rounded-lg bg-clip-padding text-sm border border-transparent outline-none inline-flex justify-center items-center shrink-0 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:border-ring active:not-aria-[haspopup]:translate-y-px disabled:opacity-50 disabled:pointer-events-none aria-invalid:ring-3 aria-invalid:ring-destructive/20 aria-invalid:border-destructive focus-visible:aria-invalid:ring-destructive/20 focus-visible:aria-invalid:border-destructive dark:aria-invalid:ring-destructive/40 dark:aria-invalid:border-destructive/50 focus-visible:dark:aria-invalid:ring-destructive/40 focus-visible:dark:aria-invalid:border-destructive/50",
    PaginationPrevious:
      "font-medium whitespace-nowrap transition-all select-none rounded-lg bg-clip-padding text-sm border border-transparent outline-none inline-flex justify-center items-center shrink-0 hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:border-ring active:not-aria-[haspopup]:translate-y-px disabled:opacity-50 disabled:pointer-events-none aria-expanded:bg-muted aria-expanded:text-foreground aria-invalid:ring-3 aria-invalid:ring-destructive/20 aria-invalid:border-destructive focus-visible:aria-invalid:ring-destructive/20 focus-visible:aria-invalid:border-destructive dark:hover:bg-muted/50 aria-expanded:dark:hover:bg-muted/50 dark:aria-invalid:ring-destructive/40 dark:aria-invalid:border-destructive/50 focus-visible:dark:aria-invalid:ring-destructive/40 focus-visible:dark:aria-invalid:border-destructive/50",
    PaginationPreviousIcon:
      "pointer-events-none shrink-0 size-4 rtl:rotate-180",
    PaginationPreviousLabel: "hidden sm:block",
    PaginationNext:
      "font-medium whitespace-nowrap transition-all select-none rounded-lg bg-clip-padding text-sm border border-transparent outline-none inline-flex justify-center items-center shrink-0 hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:border-ring active:not-aria-[haspopup]:translate-y-px disabled:opacity-50 disabled:pointer-events-none aria-expanded:bg-muted aria-expanded:text-foreground aria-invalid:ring-3 aria-invalid:ring-destructive/20 aria-invalid:border-destructive focus-visible:aria-invalid:ring-destructive/20 focus-visible:aria-invalid:border-destructive dark:hover:bg-muted/50 aria-expanded:dark:hover:bg-muted/50 dark:aria-invalid:ring-destructive/40 dark:aria-invalid:border-destructive/50 focus-visible:dark:aria-invalid:ring-destructive/40 focus-visible:dark:aria-invalid:border-destructive/50",
    PaginationNextLabel: "hidden sm:block",
    PaginationNextIcon: "pointer-events-none shrink-0 size-4 rtl:rotate-180",
    PaginationEllipsis: "flex justify-center items-center size-8",
    PaginationEllipsisIcon: "size-4",
    PaginationEllipsisLabel: "sr-only",
  },
  size: {
    default: {
      PaginationLink: "px-2.5 gap-1.5 h-8",
      PaginationPrevious: "pr-2.5 pl-1.5 gap-1.5 h-8",
      PaginationNext: "pr-1.5 pl-2.5 gap-1.5 h-8",
    },
    xs: {
      PaginationLink:
        "rounded-[min(var(--radius-md),10px)] text-xs px-2 gap-1 h-6",
      PaginationPrevious:
        "rounded-[min(var(--radius-md),10px)] text-xs pr-2 pl-1.5 gap-1 h-6",
      PaginationPreviousIcon: "size-3",
      PaginationNext:
        "rounded-[min(var(--radius-md),10px)] text-xs pr-1.5 pl-2 gap-1 h-6",
      PaginationNextIcon: "size-3",
    },
    sm: {
      PaginationLink:
        "rounded-[min(var(--radius-md),12px)] text-[0.8rem] px-2.5 gap-1 h-7",
      PaginationPrevious:
        "rounded-[min(var(--radius-md),12px)] text-[0.8rem] pr-2.5 pl-1.5 gap-1 h-7",
      PaginationPreviousIcon: "size-3.5",
      PaginationNext:
        "rounded-[min(var(--radius-md),12px)] text-[0.8rem] pr-1.5 pl-2.5 gap-1 h-7",
      PaginationNextIcon: "size-3.5",
    },
    lg: {
      PaginationLink: "px-2.5 gap-1.5 h-9",
      PaginationPrevious: "pr-2.5 pl-1.5 gap-1.5 h-9",
      PaginationNext: "pr-1.5 pl-2.5 gap-1.5 h-9",
    },
    icon: {
      PaginationLink: "size-8",
      PaginationPrevious: "pl-1.5 size-8",
      PaginationNext: "pr-1.5 size-8",
    },
    "icon-xs": {
      PaginationLink: "rounded-[min(var(--radius-md),10px)] size-6",
      PaginationPrevious: "rounded-[min(var(--radius-md),10px)] pl-1.5 size-6",
      PaginationPreviousIcon: "size-3",
      PaginationNext: "rounded-[min(var(--radius-md),10px)] pr-1.5 size-6",
      PaginationNextIcon: "size-3",
    },
    "icon-sm": {
      PaginationLink: "rounded-[min(var(--radius-md),12px)] size-7",
      PaginationPrevious: "rounded-[min(var(--radius-md),12px)] pl-1.5 size-7",
      PaginationNext: "rounded-[min(var(--radius-md),12px)] pr-1.5 size-7",
    },
    "icon-lg": {
      PaginationLink: "size-9",
      PaginationPrevious: "pl-1.5 size-9",
      PaginationNext: "pr-1.5 size-9",
    },
  },
  isActive: {
    true: {
      PaginationLink:
        "bg-background border-border hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 aria-expanded:dark:bg-input/30 hover:aria-expanded:dark:bg-input/50",
    },
    false: {
      PaginationLink:
        "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
    },
  },
});

const props = defineProps<typeof linkVariants>({
  base: {
    Pagination: { role: "navigation", "aria-label": "pagination" },
    PaginationPrevious: { "aria-label": "Go to previous page" },
    PaginationPreviousLabel: { present: true },
    PaginationNext: { "aria-label": "Go to next page" },
    PaginationNextLabel: { present: true },
    PaginationEllipsis: { "aria-hidden": true },
  },
  isActive: { true: { PaginationLink: { "aria-current": "page" } } },
});

defineComponent({
  styles,
  props,
  structure: (
    <Pagination>
      <PaginationContent>
        <PaginationItem repeatable>
          <PaginationLink repeatable />
          <PaginationPrevious repeatable>
            <PaginationPreviousIcon />
            <PaginationPreviousLabel>
              <Children>Previous</Children>
            </PaginationPreviousLabel>
          </PaginationPrevious>
          <PaginationNext repeatable>
            <PaginationNextLabel>
              <Children>Next</Children>
            </PaginationNextLabel>
            <PaginationNextIcon />
          </PaginationNext>
          <PaginationEllipsis repeatable>
            <PaginationEllipsisIcon />
            <PaginationEllipsisLabel>More pages</PaginationEllipsisLabel>
          </PaginationEllipsis>
          <Children />
        </PaginationItem>
        <Children />
      </PaginationContent>
    </Pagination>
  ),
});
