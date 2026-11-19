/** @jsxImportSource ../core/template */

import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar";

import {
  Children,
  defineComponent,
  defineElement,
  defineProps,
  defineStyles,
  defineVariants,
} from "../core/index.ts";

const variants = defineVariants(
  { size: ["sm", "default", "lg"] },
  { defaults: { size: "default" } },
);

export const Avatar = defineElement({
  name: "Avatar",
  as: AvatarPrimitive.Root,
  variants,
});

export const AvatarImage = defineElement({
  name: "AvatarImage",
  as: AvatarPrimitive.Image,
});

export const AvatarFallback = defineElement({
  name: "AvatarFallback",
  as: AvatarPrimitive.Fallback,
});

export const AvatarBadge = defineElement({ name: "AvatarBadge", as: "span" });

export const AvatarBadgeIcon = defineElement({ name: "AvatarBadgeIcon" });

const styles = defineStyles<typeof variants>({
  base: {
    Avatar:
      "select-none rounded-full flex relative shrink-0 size-8 after:mix-blend-darken after:rounded-full after:border after:border-border after:absolute after:inset-0 dark:after:mix-blend-lighten",
    AvatarImage: "rounded-full size-full aspect-square object-cover",
    AvatarFallback:
      "rounded-full bg-muted text-muted-foreground text-sm flex justify-center items-center size-full",
    AvatarBadge:
      "select-none ring-2 ring-background rounded-full bg-primary bg-blend-color text-primary-foreground inline-flex absolute z-10 right-0 bottom-0 justify-center items-center",
  },
  size: {
    sm: {
      Avatar: "size-6",
      AvatarFallback: "text-xs",
      AvatarBadge: "size-2",
      AvatarBadgeIcon: "hidden",
    },
    default: { AvatarBadge: "size-2.5", AvatarBadgeIcon: "size-2" },
    lg: { Avatar: "size-10", AvatarBadge: "size-3", AvatarBadgeIcon: "size-2" },
  },
});

const props = defineProps<typeof variants>({
  base: {
    AvatarImage: { present: false },
    AvatarBadge: { present: false },
    AvatarBadgeIcon: { present: false },
  },
});

defineComponent({
  styles,
  props,
  structure: (
    <Avatar>
      <AvatarImage />
      <AvatarFallback>
        <Children />
      </AvatarFallback>
      <AvatarBadge>
        <AvatarBadgeIcon />
        <Children />
      </AvatarBadge>
    </Avatar>
  ),
});
