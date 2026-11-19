/** @jsxImportSource ../core/template */

import {
  Children,
  defineComponent,
  defineElement,
  defineProps,
  defineStyles,
  defineVariants,
} from "../core/index.ts";

const variants = defineVariants({
  status: ["running", "error", "pending"],
  interactive: [true, false],
});

export const TraceLine = defineElement({
  name: "TraceLine",
  as: "span",
  variants,
});

export const TraceLineIcon = defineElement({ name: "TraceLineIcon" });

export const TraceTitle = defineElement({ name: "TraceTitle", as: "span" });

export const TraceDescription = defineElement({
  name: "TraceDescription",
  as: "span",
});

export const TraceLineEndIcon = defineElement({ name: "TraceLineEndIcon" });

const styles = defineStyles<typeof variants>({
  base: {
    TraceLine:
      "transition-colors text-muted-foreground text-sm flex items-center gap-2 w-fit min-w-0 max-w-full",
    TraceLineIcon: "pointer-events-none shrink-0 size-4",
    TraceTitle: "text-ellipsis whitespace-nowrap min-w-0 overflow-hidden",
    TraceDescription: "tabular-nums text-muted-foreground/70 shrink-0",
    TraceLineEndIcon: "pointer-events-none -ml-1 shrink-0 size-4",
  },
  interactive: {
    true: {
      TraceLine:
        "text-left cursor-pointer rounded-md outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50",
    },
  },
  status: {
    error: { TraceLine: "text-destructive" },
    pending: { TraceLine: "opacity-60" },
  },
  compoundVariants: [
    {
      when: { interactive: true, status: "error" },
      classes: { TraceLine: "hover:text-destructive" },
    },
  ],
});

const props = defineProps<typeof variants>({
  base: {
    TraceLineIcon: { present: false },
    TraceDescription: { present: false },
    TraceLineEndIcon: { present: false },
  },
});

defineComponent({
  styles,
  props,
  structure: (
    <TraceLine>
      <TraceLineIcon />
      <TraceTitle>
        <Children />
      </TraceTitle>
      <TraceDescription />
      <TraceLineEndIcon />
    </TraceLine>
  ),
});
