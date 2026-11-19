/** @jsxImportSource ../core/template */

import {
  Children,
  defineComponent,
  defineElement,
  defineProps,
  defineStyles,
  defineVariants,
} from "../core/index.ts";

import { Avatar } from "./avatar.tsx";

const variants = defineVariants(
  { size: ["sm", "default", "lg"] },
  { defaults: { size: "default" } },
);

export const AvatarGroup = defineElement({
  name: "AvatarGroup",
  as: "div",
  variants,
});

export const AvatarGroupCount = defineElement({
  name: "AvatarGroupCount",
  as: "div",
});

export const AvatarGroupCountIcon = defineElement({
  name: "AvatarGroupCountIcon",
});

const styles = defineStyles<typeof variants>({
  base: {
    AvatarGroup: "flex",
    Avatar:
      "ring-2 ring-background -mr-2 last:mr-0 rtl:mr-0 rtl:-ml-2 rtl:last:ml-0",
    AvatarGroupCount:
      "ring-2 ring-background rounded-full bg-muted text-muted-foreground text-sm flex relative -mr-2 justify-center items-center shrink-0 last:mr-0 rtl:mr-0 rtl:-ml-2 rtl:last:ml-0",
  },
  size: {
    sm: { AvatarGroupCount: "size-6", AvatarGroupCountIcon: "size-3" },
    default: { AvatarGroupCount: "size-8", AvatarGroupCountIcon: "size-4" },
    lg: { AvatarGroupCount: "size-10", AvatarGroupCountIcon: "size-5" },
  },
});

const props = defineProps<typeof variants>({
  base: {
    AvatarGroupCount: { present: false },
    AvatarGroupCountIcon: { present: false },
  },
  size: {
    sm: { Avatar: { size: "sm" } },
    default: { Avatar: { size: "default" } },
    lg: { Avatar: { size: "lg" } },
  },
});

defineComponent({
  styles,
  props,
  structure: (
    <AvatarGroup>
      <Avatar repeatable />
      <AvatarGroupCount>
        <AvatarGroupCountIcon />
        <Children />
      </AvatarGroupCount>
    </AvatarGroup>
  ),
});
