/** @jsxImportSource ../core/template */

import { ChevronDownIcon } from "lucide-react";

import {
  Children,
  defineComponent,
  defineElement,
  defineProps,
  defineStyles,
  defineVariants,
} from "../core/index.ts";

const variants = defineVariants(
  {
    size: ["default", "sm"],
    disabled: [true, false],
    inResponsiveField: [true, false],
  },
  { defaults: { size: "default" } },
);

export const NativeSelect = defineElement({
  name: "NativeSelect",
  as: "div",
  variants,
});

export const NativeSelectControl = defineElement({
  name: "NativeSelectControl",
  as: "select",
});

export const NativeSelectOption = defineElement({
  name: "NativeSelectOption",
  as: "option",
});

export const NativeSelectOptGroup = defineElement({
  name: "NativeSelectOptGroup",
  as: "optgroup",
});

export const NativeSelectIcon = defineElement({
  name: "NativeSelectIcon",
  icon: ChevronDownIcon,
});

const styles = defineStyles<typeof variants>({
  base: {
    NativeSelect: "relative w-fit",
    NativeSelectControl:
      "transition-colors appearance-none select-none rounded-lg bg-transparent text-sm border border-input outline-none py-1 pr-8 pl-2.5 w-full h-8 min-w-0 placeholder:text-muted-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:border-ring disabled:pointer-events-none disabled:cursor-not-allowed aria-invalid:ring-3 aria-invalid:ring-destructive/20 aria-invalid:border-destructive focus-visible:aria-invalid:ring-destructive/20 focus-visible:aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 dark:aria-invalid:ring-destructive/40 dark:aria-invalid:border-destructive/50 focus-visible:dark:aria-invalid:ring-destructive/40 focus-visible:dark:aria-invalid:border-destructive/50",
    NativeSelectOption: "bg-popover text-popover-foreground",
    NativeSelectOptGroup: "bg-popover text-popover-foreground",
    NativeSelectIcon:
      "-translate-y-1/2 select-none pointer-events-none text-muted-foreground absolute top-1/2 right-2.5 size-4",
  },
  disabled: { true: { NativeSelect: "opacity-50" } },
  inResponsiveField: {
    true: { NativeSelect: "w-full @md/field-group:w-auto" },
  },
  size: {
    sm: {
      NativeSelectControl: "rounded-[min(var(--radius-md),10px)] py-0.5 h-7",
    },
  },
});

const props = defineProps<typeof variants>({
  base: { NativeSelectControl: { present: true } },
  disabled: { true: { NativeSelectControl: { disabled: true } } },
});

defineComponent({
  styles,
  props,
  structure: (
    <NativeSelect>
      <NativeSelectControl>
        <NativeSelectOption repeatable />
        <NativeSelectOptGroup repeatable>
          <Children />
        </NativeSelectOptGroup>
        <Children />
      </NativeSelectControl>
      <NativeSelectIcon />
    </NativeSelect>
  ),
});
