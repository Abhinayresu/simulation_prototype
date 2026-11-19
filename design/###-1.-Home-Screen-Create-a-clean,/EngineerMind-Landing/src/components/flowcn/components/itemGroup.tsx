/** @jsxImportSource ../core/template */

import {
  defineComponent,
  defineElement,
  defineProps,
  defineStyles,
  defineVariants,
} from "../core/index.ts";

import { Item } from "./item.tsx";
import { Separator } from "./separator.tsx";

const variants = defineVariants(
  { size: ["default", "sm", "xs"] },
  { defaults: { size: "default" } },
);

export const ItemGroup = defineElement({
  name: "ItemGroup",
  as: "div",
  variants,
});

export const ItemSeparator = defineElement({
  name: "ItemSeparator",
  as: Separator,
});

const styles = defineStyles<typeof variants>({
  base: { ItemGroup: "flex flex-col w-full", ItemSeparator: "my-2" },
  size: {
    default: { ItemGroup: "gap-4" },
    sm: { ItemGroup: "gap-2.5" },
    xs: { ItemGroup: "gap-2" },
  },
});

const props = defineProps<typeof variants>({
  base: {
    ItemGroup: { role: "list" },
    ItemSeparator: { orientation: "horizontal" },
  },
  size: { sm: { Item: { size: "sm" } }, xs: { Item: { size: "xs" } } },
});

defineComponent({
  styles,
  props,
  structure: (
    <ItemGroup>
      <Item repeatable />
      <ItemSeparator repeatable />
    </ItemGroup>
  ),
});
