/** @jsxImportSource ../core/template */

import { Button as ButtonPrimitive } from "@base-ui/react/button";

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
    variant: [
      "default",
      "outline",
      "secondary",
      "ghost",
      "destructive",
      "link",
    ],
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
    inButtonGroup: ["horizontal", "vertical"],
  },
  { defaults: { variant: "default", size: "default" } },
);

export const Button = defineElement({
  name: "Button",
  as: ButtonPrimitive,
  variants,
});

export const ButtonIcon = defineElement({ name: "ButtonIcon" });

export const ButtonText = defineElement({ name: "ButtonText", as: "span" });

export const ButtonEndIcon = defineElement({ name: "ButtonEndIcon" });

const styles = defineStyles<typeof variants>({
  base: {
    Button:
      "font-medium whitespace-nowrap transition-all select-none rounded-lg bg-clip-padding text-sm border border-transparent outline-none inline-flex justify-center items-center shrink-0 group/button focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:border-ring active:not-aria-[haspopup]:translate-y-px disabled:opacity-50 disabled:pointer-events-none aria-invalid:ring-3 aria-invalid:ring-destructive/20 aria-invalid:border-destructive focus-visible:aria-invalid:ring-destructive/20 focus-visible:aria-invalid:border-destructive dark:aria-invalid:ring-destructive/40 dark:aria-invalid:border-destructive/50 focus-visible:dark:aria-invalid:ring-destructive/40 focus-visible:dark:aria-invalid:border-destructive/50",
    ButtonIcon: "pointer-events-none shrink-0 size-4",
    ButtonEndIcon: "pointer-events-none shrink-0 size-4",
  },
  variant: {
    default: {
      Button: "bg-primary text-primary-foreground hover:bg-primary/80",
    },
    outline: {
      Button:
        "bg-background border-border hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 aria-expanded:dark:bg-input/30 hover:aria-expanded:dark:bg-input/50",
    },
    secondary: {
      Button:
        "bg-secondary text-secondary-foreground hover:bg-linear-to-r hover:from-foreground/5 hover:to-foreground/5 aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
    },
    ghost: {
      Button:
        "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
    },
    destructive: {
      Button:
        "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:ring-destructive/20 focus-visible:border-destructive/40 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
    },
    link: { Button: "underline-offset-4 text-primary hover:underline" },
  },
  size: {
    default: {
      Button: "px-2.5 gap-1.5 h-8",
      ButtonIcon: "-ml-0.5",
      ButtonEndIcon: "-mr-0.5",
    },
    xs: {
      Button: "rounded-[min(var(--radius-md),10px)] text-xs px-2 gap-1 h-6",
      ButtonIcon: "-ml-0.5 size-3",
      ButtonEndIcon: "-mr-0.5 size-3",
    },
    sm: {
      Button:
        "rounded-[min(var(--radius-md),12px)] text-[0.8rem] px-2.5 gap-1 h-7",
      ButtonIcon: "-ml-1 size-3.5",
      ButtonEndIcon: "-mr-1 size-3.5",
    },
    lg: {
      Button: "px-2.5 gap-1.5 h-9",
      ButtonIcon: "-ml-0.5",
      ButtonEndIcon: "-mr-0.5",
    },
    icon: { Button: "size-8" },
    "icon-xs": {
      Button: "rounded-[min(var(--radius-md),10px)] size-6",
      ButtonIcon: "size-3",
      ButtonEndIcon: "size-3",
    },
    "icon-sm": { Button: "rounded-[min(var(--radius-md),12px)] size-7" },
    "icon-lg": { Button: "size-9" },
  },
  inButtonGroup: {
    horizontal: {
      Button:
        "rounded-none border-l-0 first:rounded-l-lg first:border-l last:rounded-r-lg focus-visible:relative focus-visible:z-10",
    },
    vertical: {
      Button:
        "rounded-none border-t-0 first:rounded-t-lg first:border-t last:rounded-b-lg focus-visible:relative focus-visible:z-10",
    },
  },
});

const props = defineProps<typeof variants>({
  base: { ButtonIcon: { present: false }, ButtonEndIcon: { present: false } },
});

defineComponent({
  styles,
  props,
  structure: (
    <Button>
      <ButtonIcon />
      <ButtonText>
        <Children />
      </ButtonText>
      <ButtonEndIcon />
    </Button>
  ),
});
