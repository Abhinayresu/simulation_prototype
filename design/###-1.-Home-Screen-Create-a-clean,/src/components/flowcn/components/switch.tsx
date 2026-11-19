/** @jsxImportSource ../core/template */

import { Switch as SwitchPrimitive } from "@base-ui/react/switch";

import {
  defineComponent,
  defineElement,
  defineStyles,
  defineVariants,
} from "../core/index.ts";

const variants = defineVariants(
  { size: ["default", "sm"], inCard: [true, false] },
  { defaults: { size: "default" } },
);

export const Switch = defineElement({
  name: "Switch",
  as: SwitchPrimitive.Root,
  variants,
});

export const SwitchThumb = defineElement({
  name: "SwitchThumb",
  as: SwitchPrimitive.Thumb,
});

const styles = defineStyles<typeof variants>({
  base: {
    Switch:
      "transition-all rounded-full border border-transparent outline-none inline-flex relative items-center shrink-0 after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:border-ring aria-invalid:ring-3 aria-invalid:ring-destructive/20 aria-invalid:border-destructive focus-visible:aria-invalid:ring-destructive/20 focus-visible:aria-invalid:border-destructive dark:aria-invalid:ring-destructive/40 dark:aria-invalid:border-destructive/50 focus-visible:dark:aria-invalid:ring-destructive/40 focus-visible:dark:aria-invalid:border-destructive/50 data-checked:bg-primary data-unchecked:bg-input dark:data-unchecked:bg-input/80 data-checked:data-unchecked:bg-input data-checked:dark:data-unchecked:bg-input/80 data-disabled:opacity-50 data-disabled:cursor-not-allowed",
    SwitchThumb:
      "transition-transform pointer-events-none ring-0 rounded-full bg-background block data-checked:translate-x-[calc(100%-2px)] dark:data-checked:bg-primary-foreground data-unchecked:translate-x-0 dark:data-unchecked:bg-foreground data-checked:data-unchecked:translate-x-0 dark:data-checked:data-unchecked:bg-foreground",
  },
  size: {
    default: { Switch: "w-[32px] h-[18.4px]", SwitchThumb: "size-4" },
    sm: { Switch: "w-[24px] h-[14px]", SwitchThumb: "size-3" },
  },
  inCard: {
    true: {
      Switch:
        "focus-visible:ring-0 focus-visible:border-transparent aria-invalid:focus-visible:ring-3",
    },
  },
});

defineComponent({
  styles,
  structure: (
    <Switch>
      <SwitchThumb />
    </Switch>
  ),
});
