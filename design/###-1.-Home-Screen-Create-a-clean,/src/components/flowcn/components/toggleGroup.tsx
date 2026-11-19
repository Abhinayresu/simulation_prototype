/** @jsxImportSource ../core/template */

import { ToggleGroup as ToggleGroupPrimitive } from "@base-ui/react/toggle-group";

import {
  Children,
  defineComponent,
  defineElement,
  defineProps,
  defineStyles,
  defineVariants,
} from "../core/index.ts";

import { Toggle, ToggleEndIcon, ToggleIcon, ToggleText } from "./toggle.tsx";

const variants = defineVariants(
  {
    variant: ["default", "outline"],
    size: ["default", "sm", "lg"],
    orientation: ["horizontal", "vertical"],
    joined: ["horizontal", "vertical"],
  },
  { defaults: { orientation: "horizontal" } },
);

export const ToggleGroup = defineElement({
  name: "ToggleGroup",
  as: ToggleGroupPrimitive,
  variants,
});

const itemVariants = defineVariants({
  variant: ["default", "outline"],
  size: ["default", "sm", "lg"],
});

export const ToggleGroupItem = defineElement({
  name: "ToggleGroupItem",
  as: Toggle,
  variants: itemVariants,
});

const styles = defineStyles<typeof variants & typeof itemVariants>({
  base: {
    ToggleGroup:
      "rounded-lg flex flex-row items-center gap-2 w-fit data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-stretch",
    ToggleGroupItem: "shrink-0 focus:z-10 focus-visible:z-10",
  },
  size: { sm: { ToggleGroup: "rounded-[min(var(--radius-md),10px)]" } },
  joined: {
    horizontal: {
      ToggleGroup: "gap-0",
      ToggleGroupItem:
        "rounded-none border-l-0 px-2 first:rounded-l-lg first:border-l last:rounded-r-lg",
      ToggleIcon: "-ml-0.5 first:last:ml-0",
      ToggleEndIcon: "-mr-0.5 first:last:mr-0",
    },
    vertical: {
      ToggleGroup: "gap-0",
      ToggleGroupItem:
        "rounded-none border-t-0 px-2 first:rounded-t-lg first:border-t last:rounded-b-lg",
      ToggleIcon: "-ml-0.5 first:last:ml-0",
      ToggleEndIcon: "-mr-0.5 first:last:mr-0",
    },
  },
});

const props = defineProps<typeof variants & typeof itemVariants>({
  base: { ToggleIcon: { present: false }, ToggleEndIcon: { present: false } },
  variant: {
    default: { ToggleGroupItem: { variant: "default" } },
    outline: { ToggleGroupItem: { variant: "outline" } },
  },
  size: {
    default: { ToggleGroupItem: { size: "default" } },
    sm: { ToggleGroupItem: { size: "sm" } },
    lg: { ToggleGroupItem: { size: "lg" } },
  },
});

defineComponent({
  styles,
  props,
  structure: (
    <ToggleGroup>
      <ToggleGroupItem repeatable>
        <ToggleIcon />
        <ToggleText>
          <Children />
        </ToggleText>
        <ToggleEndIcon />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
});
