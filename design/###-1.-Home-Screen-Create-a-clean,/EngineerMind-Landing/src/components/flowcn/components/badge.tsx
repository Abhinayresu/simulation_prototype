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
  {
    variant: [
      "default",
      "secondary",
      "destructive",
      "outline",
      "ghost",
      "link",
    ],
    interactive: [true, false],
  },
  { defaults: { variant: "default" } },
);

export const Badge = defineElement({ name: "Badge", as: "span", variants });

export const BadgeIcon = defineElement({ name: "BadgeIcon" });

export const BadgeText = defineElement({ name: "BadgeText", as: "span" });

export const BadgeEndIcon = defineElement({ name: "BadgeEndIcon" });

const styles = defineStyles<typeof variants>({
  base: {
    Badge:
      "font-medium whitespace-nowrap transition-all rounded-4xl text-xs border border-transparent inline-flex px-2 py-0.5 justify-center items-center shrink-0 gap-1 w-fit h-5 overflow-hidden focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:border-ring aria-invalid:ring-destructive/20 aria-invalid:border-destructive focus-visible:aria-invalid:ring-destructive/20 focus-visible:aria-invalid:border-destructive dark:aria-invalid:ring-destructive/40 focus-visible:dark:aria-invalid:ring-destructive/40",
    BadgeIcon: "pointer-events-none -ml-0.5 size-3",
    BadgeEndIcon: "pointer-events-none -mr-0.5 size-3",
  },
  variant: {
    default: { Badge: "bg-primary text-primary-foreground" },
    secondary: { Badge: "bg-secondary text-secondary-foreground" },
    destructive: {
      Badge:
        "bg-destructive/10 text-destructive focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:focus-visible:ring-destructive/40",
    },
    outline: { Badge: "text-foreground border-border" },
    ghost: {
      Badge:
        "hover:bg-muted hover:text-muted-foreground dark:hover:bg-muted/50",
    },
    link: { Badge: "underline-offset-4 text-primary hover:underline" },
  },
  compoundVariants: [
    {
      when: { interactive: true, variant: "default" },
      classes: { Badge: "hover:bg-primary/80" },
    },
    {
      when: { interactive: true, variant: "secondary" },
      classes: { Badge: "hover:bg-secondary/80" },
    },
    {
      when: { interactive: true, variant: "destructive" },
      classes: { Badge: "hover:bg-destructive/20" },
    },
    {
      when: { interactive: true, variant: "outline" },
      classes: { Badge: "hover:bg-muted hover:text-muted-foreground" },
    },
  ],
});

const props = defineProps<typeof variants>({
  base: { BadgeIcon: { present: false }, BadgeEndIcon: { present: false } },
});

defineComponent({
  styles,
  props,
  structure: (
    <Badge>
      <BadgeIcon />
      <BadgeText>
        <Children />
      </BadgeText>
      <BadgeEndIcon />
    </Badge>
  ),
});
