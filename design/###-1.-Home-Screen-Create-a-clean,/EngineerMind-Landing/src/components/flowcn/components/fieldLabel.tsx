/** @jsxImportSource ../core/template */

import {
  Children,
  defineComponent,
  defineElement,
  defineProps,
  defineStyles,
  defineVariants,
} from "../core/index.ts";

import { Label } from "./label.tsx";

const variants = defineVariants({
  card: [true, false, "disabled"],
  checked: [true, false],
  inDisabled: [true, false],
});

export const FieldLabel = defineElement({
  name: "FieldLabel",
  as: Label,
  variants,
});

const styles = defineStyles<typeof variants>({
  base: { FieldLabel: "leading-snug flex gap-2 w-fit" },
  card: {
    true: {
      FieldLabel:
        "rounded-lg border flex-col w-full focus-within:ring-3 focus-within:ring-ring/50 focus-within:border-ring hover:bg-muted/50",
    },
    disabled: {
      FieldLabel:
        "rounded-lg border flex-col w-full focus-within:ring-3 focus-within:ring-ring/50 focus-within:border-ring",
    },
  },
  checked: {
    true: {
      FieldLabel:
        "bg-primary/5 border-primary/30 dark:bg-primary/10 dark:border-primary/20 dark:focus-within:border-primary/20 dark:hover:bg-primary/10",
    },
  },
});

const props = defineProps<typeof variants>({
  card: {
    true: { Children: { inCard: true } },
    disabled: { Children: { inCard: true } },
  },
});

defineComponent({
  styles,
  props,
  structure: (
    <FieldLabel>
      <Children />
    </FieldLabel>
  ),
});
