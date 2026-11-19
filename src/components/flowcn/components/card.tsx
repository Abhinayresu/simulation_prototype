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
  { size: ["default", "sm"] },
  { defaults: { size: "default" } },
);

export const Card = defineElement({ name: "Card", as: "div", variants });

export const CardImage = defineElement({ name: "CardImage", as: "img" });

const headerVariants = defineVariants({ bordered: [true, false] });

export const CardHeader = defineElement({
  name: "CardHeader",
  as: "div",
  variants: headerVariants,
});

export const CardTitle = defineElement({ name: "CardTitle", as: "div" });

export const CardDescription = defineElement({
  name: "CardDescription",
  as: "div",
});

export const CardAction = defineElement({ name: "CardAction", as: "div" });

export const CardContent = defineElement({ name: "CardContent", as: "div" });

export const CardFooter = defineElement({ name: "CardFooter", as: "div" });

const styles = defineStyles<typeof variants & typeof headerVariants>({
  base: {
    Card: "ring ring-foreground/10 rounded-xl bg-card text-card-foreground text-sm flex flex-col overflow-hidden",
    CardImage: "rounded-t-xl last:rounded-b-xl",
    CardHeader:
      "rounded-t-xl grid items-start gap-y-1 grid-cols-[1fr_auto] auto-rows-min @container/card-header",
    CardTitle: "font-medium text-base leading-snug col-start-1",
    CardDescription: "text-muted-foreground text-sm col-start-1",
    CardAction:
      "ml-1 self-start justify-self-end col-start-2 row-span-2 row-start-1",
    CardFooter: "rounded-b-xl bg-muted/50 border-t flex items-center",
  },
  size: {
    default: {
      Card: "py-4 gap-4",
      CardImage: "-mt-4",
      CardHeader: "px-4",
      CardContent: "px-4",
      CardFooter: "-mb-4 p-4",
    },
    sm: {
      Card: "py-3 gap-3",
      CardImage: "-mt-3",
      CardHeader: "px-3",
      CardTitle: "text-sm leading-snug",
      CardContent: "px-3",
      CardFooter: "-mb-3 p-3",
    },
  },
  bordered: { true: { CardHeader: "border-b" } },
  compoundVariants: [
    {
      when: { bordered: true, size: "default" },
      classes: { CardHeader: "pb-4" },
    },
    { when: { bordered: true, size: "sm" }, classes: { CardHeader: "pb-3" } },
  ],
});

const props = defineProps<typeof variants>({
  base: {
    CardImage: { present: false },
    CardDescription: { present: false },
    CardAction: { present: false },
  },
});

defineComponent({
  styles,
  props,
  structure: (
    <Card>
      <CardImage />
      <CardHeader repeatable>
        <CardTitle>
          <Children />
        </CardTitle>
        <CardDescription />
        <CardAction />
      </CardHeader>
      <CardContent repeatable>
        <Children />
      </CardContent>
      <CardFooter repeatable />
      <Children />
    </Card>
  ),
});
