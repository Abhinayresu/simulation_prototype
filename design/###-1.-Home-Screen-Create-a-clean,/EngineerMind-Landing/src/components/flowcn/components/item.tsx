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
    variant: ["default", "outline", "muted"],
    size: ["default", "sm", "xs"],
    media: ["default", "icon", "image"],
    described: [true, false],
    inMenu: [true, false],
    interactive: [true, false],
  },
  { defaults: { variant: "default", size: "default", media: "default" } },
);

export const Item = defineElement({ name: "Item", as: "div", variants });

export const ItemHeader = defineElement({ name: "ItemHeader", as: "div" });

export const ItemMedia = defineElement({ name: "ItemMedia", as: "div" });

export const ItemMediaIcon = defineElement({ name: "ItemMediaIcon" });

export const ItemMediaImage = defineElement({
  name: "ItemMediaImage",
  as: "img",
});

export const ItemContent = defineElement({ name: "ItemContent", as: "div" });

export const ItemTitle = defineElement({ name: "ItemTitle", as: "div" });

export const ItemDescription = defineElement({
  name: "ItemDescription",
  as: "p",
});

export const ItemSecondaryContent = defineElement({
  name: "ItemSecondaryContent",
  as: "div",
});

export const ItemSecondaryTitle = defineElement({
  name: "ItemSecondaryTitle",
  as: "div",
});

export const ItemSecondaryDescription = defineElement({
  name: "ItemSecondaryDescription",
  as: "p",
});

export const ItemActions = defineElement({ name: "ItemActions", as: "div" });

export const ItemFooter = defineElement({ name: "ItemFooter", as: "div" });

const styles = defineStyles<typeof variants>({
  base: {
    Item: "transition-colors duration-100 rounded-lg text-sm border outline-none flex flex-wrap items-center w-full focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:border-ring",
    ItemHeader: "flex justify-between items-center gap-2 basis-full",
    ItemMedia: "flex justify-center items-center shrink-0 gap-2",
    ItemMediaIcon: "pointer-events-none",
    ItemMediaImage: "size-full object-cover",
    ItemContent: "flex flex-col flex-1 gap-1",
    ItemTitle:
      "underline-offset-4 font-medium line-clamp-1 text-sm leading-snug flex items-center gap-2 w-fit",
    ItemDescription:
      "font-normal text-left line-clamp-2 text-muted-foreground text-sm leading-normal",
    ItemSecondaryContent: "flex flex-col flex-none gap-1",
    ItemSecondaryTitle:
      "underline-offset-4 font-medium line-clamp-1 text-sm leading-snug flex items-center gap-2 w-fit",
    ItemSecondaryDescription:
      "font-normal text-left line-clamp-2 text-muted-foreground text-sm leading-normal",
    ItemActions: "flex items-center gap-2",
    ItemFooter: "flex justify-between items-center gap-2 basis-full",
  },
  interactive: { true: { Item: "hover:bg-muted" } },
  variant: {
    default: { Item: "border-transparent" },
    muted: { Item: "bg-muted/50 border-transparent" },
  },
  size: {
    default: { Item: "px-3 py-2.5 gap-2.5" },
    sm: { Item: "px-3 py-2.5 gap-2.5" },
    xs: {
      Item: "px-2.5 py-2 gap-2",
      ItemContent: "gap-0",
      ItemDescription: "text-xs",
      ItemSecondaryContent: "gap-0",
      ItemSecondaryDescription: "text-xs",
    },
  },
  inMenu: { true: { Item: "p-0" } },
  media: {
    default: { ItemMedia: "bg-transparent" },
    icon: { ItemMediaIcon: "size-4" },
    image: { ItemMedia: "rounded-sm overflow-hidden" },
  },
  described: { true: { ItemMedia: "translate-y-0.5 self-start" } },
  compoundVariants: [
    {
      when: { media: "image", size: "default" },
      classes: { ItemMedia: "size-10" },
    },
    { when: { media: "image", size: "sm" }, classes: { ItemMedia: "size-8" } },
    { when: { media: "image", size: "xs" }, classes: { ItemMedia: "size-6" } },
  ],
});

const props = defineProps<typeof variants>({
  base: {
    ItemHeader: { present: false },
    ItemMedia: { present: false },
    ItemMediaIcon: { present: false },
    ItemMediaImage: { present: false },
    ItemDescription: { present: false },
    ItemSecondaryContent: { present: false },
    ItemSecondaryDescription: { present: false },
    ItemActions: { present: false },
    ItemFooter: { present: false },
  },
});

defineComponent({
  styles,
  props,
  structure: (
    <Item>
      <ItemHeader />
      <ItemMedia>
        <ItemMediaIcon />
        <ItemMediaImage />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>
          <Children />
        </ItemTitle>
        <ItemDescription />
      </ItemContent>
      <ItemSecondaryContent>
        <ItemSecondaryTitle>
          <Children />
        </ItemSecondaryTitle>
        <ItemSecondaryDescription />
      </ItemSecondaryContent>
      <ItemActions />
      <ItemFooter />
    </Item>
  ),
});
