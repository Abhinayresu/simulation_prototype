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
      "muted",
      "tinted",
      "outline",
      "ghost",
      "destructive",
    ],
    align: ["start", "end"],
    reactionsSide: ["top", "bottom"],
    reactionsAlign: ["start", "end"],
    denseReactions: [true, false],
  },
  {
    defaults: {
      variant: "default",
      align: "start",
      reactionsSide: "bottom",
      reactionsAlign: "end",
    },
  },
);

export const Bubble = defineElement({ name: "Bubble", as: "div", variants });

const contentVariants = defineVariants({ interactive: [true, false] });

export const BubbleContent = defineElement({
  name: "BubbleContent",
  as: "div",
  variants: contentVariants,
});

export const BubbleReactions = defineElement({
  name: "BubbleReactions",
  as: "div",
});

const styles = defineStyles<typeof variants & typeof contentVariants>({
  base: {
    Bubble: "flex relative flex-col gap-1 w-fit min-w-0 max-w-4/5",
    BubbleContent:
      "wrap-break-word transition-colors rounded-xl text-sm leading-relaxed border border-transparent outline-none px-3 py-2 w-fit min-w-0 max-w-full overflow-hidden focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:border-ring",
    BubbleReactions:
      "ring-3 ring-card rounded-full bg-muted text-sm flex absolute z-10 px-1.5 py-0.5 justify-center items-center shrink-0 gap-1 w-fit",
  },
  variant: {
    default: { BubbleContent: "bg-primary text-primary-foreground" },
    secondary: { BubbleContent: "bg-secondary text-secondary-foreground" },
    muted: { BubbleContent: "bg-muted" },
    tinted: { BubbleContent: "bg-primary/10 text-foreground" },
    outline: { BubbleContent: "bg-background border-border" },
    ghost: {
      Bubble: "border-none max-w-full",
      BubbleContent: "rounded-none bg-transparent p-0",
    },
    destructive: {
      BubbleContent:
        "bg-destructive/10 text-destructive dark:bg-destructive/20",
    },
  },
  align: { end: { Bubble: "self-end", BubbleContent: "self-end" } },
  interactive: { true: { BubbleContent: "text-left rtl:text-right" } },
  compoundVariants: [
    {
      when: { interactive: true, variant: "default" },
      classes: { BubbleContent: "hover:bg-primary/80" },
    },
    {
      when: { interactive: true, variant: "secondary" },
      classes: {
        BubbleContent:
          "hover:bg-linear-to-r hover:from-foreground/5 hover:to-foreground/5",
      },
    },
    {
      when: { interactive: true, variant: "muted" },
      classes: {
        BubbleContent:
          "hover:bg-linear-to-r hover:from-foreground/5 hover:to-foreground/5",
      },
    },
    {
      when: { interactive: true, variant: "tinted" },
      classes: { BubbleContent: "hover:bg-primary/15" },
    },
    {
      when: { interactive: true, variant: "outline" },
      classes: {
        BubbleContent:
          "hover:bg-muted hover:text-foreground dark:hover:bg-input/30",
      },
    },
    {
      when: { interactive: true, variant: "ghost" },
      classes: {
        BubbleContent:
          "hover:bg-muted hover:text-foreground dark:hover:bg-muted/50",
      },
    },
    {
      when: { interactive: true, variant: "destructive" },
      classes: {
        BubbleContent: "hover:bg-destructive/20 dark:hover:bg-destructive/30",
      },
    },
  ],
  reactionsSide: {
    top: { BubbleReactions: "-translate-y-3/4 top-0" },
    bottom: { BubbleReactions: "translate-y-3/4 bottom-0" },
  },
  reactionsAlign: {
    start: { BubbleReactions: "left-3" },
    end: { BubbleReactions: "right-3" },
  },
  denseReactions: { true: { BubbleReactions: "p-0" } },
});

const props = defineProps<typeof variants>({
  base: { BubbleReactions: { present: false } },
});

defineComponent({
  styles,
  props,
  structure: (
    <Bubble>
      <BubbleContent>
        <Children />
      </BubbleContent>
      <BubbleReactions />
    </Bubble>
  ),
});
