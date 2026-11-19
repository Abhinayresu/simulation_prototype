/** @jsxImportSource ../core/template */

import {
  Children,
  defineComponent,
  defineElement,
  defineProps,
  defineStyles,
  defineVariants,
} from "../core/index.ts";

const variants = defineVariants(
  { variant: ["default", "separator", "border"], interactive: [true, false] },
  { defaults: { variant: "default" } },
);

export const Marker = defineElement({ name: "Marker", as: "div", variants });

export const MarkerIcon = defineElement({ name: "MarkerIcon" });

export const MarkerContent = defineElement({
  name: "MarkerContent",
  as: "span",
});

const styles = defineStyles<typeof variants>({
  base: {
    Marker:
      "text-left text-muted-foreground text-sm flex relative items-center gap-2 w-full min-h-4",
    MarkerIcon: "shrink-0 size-4",
    MarkerContent: "wrap-break-word min-w-0",
  },
  interactive: {
    true: { Marker: "underline underline-offset-3 hover:text-foreground" },
  },
  variant: {
    separator: {
      Marker:
        "before:bg-border before:mr-1 before:flex-1 before:h-px before:min-w-0 after:bg-border after:ml-1 after:flex-1 after:h-px after:min-w-0",
      MarkerContent: "text-center flex-none",
    },
    border: {
      Marker:
        "border-t-border border-r-border border-b border-b-border border-l-border pb-2",
    },
  },
});

const props = defineProps<typeof variants>({
  base: { MarkerIcon: { present: false } },
});

defineComponent({
  styles,
  props,
  structure: (
    <Marker>
      <MarkerIcon />
      <MarkerContent>
        <Children />
      </MarkerContent>
    </Marker>
  ),
});
