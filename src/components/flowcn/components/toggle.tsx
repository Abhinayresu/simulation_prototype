/** @jsxImportSource ../core/template */

import { Toggle as TogglePrimitive } from "@base-ui/react/toggle";

import {
  Children,
  defineComponent,
  defineElement,
  defineProps,
  defineStyles,
  defineVariants,
} from "../core/index.ts";

const variants = defineVariants(
  { variant: ["default", "outline"], size: ["default", "sm", "lg"] },
  { defaults: { variant: "default", size: "default" } },
);

export const Toggle = defineElement({
  name: "Toggle",
  as: TogglePrimitive,
  variants,
});

export const ToggleIcon = defineElement({ name: "ToggleIcon" });

export const ToggleText = defineElement({ name: "ToggleText", as: "span" });

export const ToggleEndIcon = defineElement({ name: "ToggleEndIcon" });

const styles = defineStyles<typeof variants>({
  base: {
    Toggle:
      "font-medium whitespace-nowrap transition-all rounded-lg text-sm outline-none inline-flex justify-center items-center gap-1 hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:border-ring disabled:opacity-50 disabled:pointer-events-none aria-invalid:ring-destructive/20 aria-invalid:border-destructive focus-visible:aria-invalid:ring-destructive/20 focus-visible:aria-invalid:border-destructive aria-pressed:bg-muted data-pressed:bg-muted dark:aria-invalid:ring-destructive/40 focus-visible:dark:aria-invalid:ring-destructive/40",
    ToggleIcon: "pointer-events-none shrink-0 size-4",
    ToggleEndIcon: "pointer-events-none shrink-0 size-4",
  },
  variant: {
    default: { Toggle: "bg-transparent" },
    outline: { Toggle: "bg-transparent border border-input hover:bg-muted" },
  },
  size: {
    default: {
      Toggle: "px-2.5 h-8 min-w-8",
      ToggleIcon: "-ml-0.5 first:last:ml-0",
      ToggleEndIcon: "-mr-0.5 first:last:mr-0",
    },
    sm: {
      Toggle:
        "rounded-[min(var(--radius-md),12px)] text-[0.8rem] px-2.5 h-7 min-w-7",
      ToggleIcon: "-ml-1 size-3.5 first:last:ml-0",
      ToggleEndIcon: "-mr-1 size-3.5 first:last:mr-0",
    },
    lg: {
      Toggle: "px-2.5 h-9 min-w-9",
      ToggleIcon: "-ml-0.5 first:last:ml-0",
      ToggleEndIcon: "-mr-0.5 first:last:mr-0",
    },
  },
});

const props = defineProps<typeof variants>({
  base: { ToggleIcon: { present: false }, ToggleEndIcon: { present: false } },
});

defineComponent({
  styles,
  props,
  structure: (
    <Toggle>
      <ToggleIcon />
      <ToggleText>
        <Children />
      </ToggleText>
      <ToggleEndIcon />
    </Toggle>
  ),
});
