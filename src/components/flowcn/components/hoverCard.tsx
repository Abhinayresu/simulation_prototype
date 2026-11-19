/** @jsxImportSource ../core/template */

import { PreviewCard as PreviewCardPrimitive } from "@base-ui/react/preview-card";

import {
  Children,
  defineComponent,
  defineElement,
  defineProps,
  defineStyles,
} from "../core/index.ts";

export const HoverCard = defineElement({
  name: "HoverCard",
  as: PreviewCardPrimitive.Root,
});

export const HoverCardTrigger = defineElement({
  name: "HoverCardTrigger",
  as: PreviewCardPrimitive.Trigger,
});

export const HoverCardPortal = defineElement({
  name: "HoverCardPortal",
  as: PreviewCardPrimitive.Portal,
});

export const HoverCardPositioner = defineElement({
  name: "HoverCardPositioner",
  as: PreviewCardPrimitive.Positioner,
});

export const HoverCardContent = defineElement({
  name: "HoverCardContent",
  as: PreviewCardPrimitive.Popup,
});

const styles = defineStyles({
  base: {
    HoverCardPositioner: "z-50 isolate",
    HoverCardContent:
      "origin-(--transform-origin) duration-100 ring ring-foreground/10 shadow-md rounded-lg bg-popover text-popover-foreground text-sm outline-none z-50 p-2.5 w-64 data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
  },
});

const props = defineProps({
  base: {
    HoverCardTrigger: { present: false },
    HoverCardPortal: { present: false },
    HoverCardPositioner: {
      side: "bottom",
      sideOffset: 4,
      align: "center",
      alignOffset: 4,
    },
  },
});

defineComponent({
  styles,
  props,
  structure: (
    <HoverCard>
      <HoverCardTrigger />
      <HoverCardPortal>
        <HoverCardPositioner>
          <HoverCardContent>
            <Children />
          </HoverCardContent>
        </HoverCardPositioner>
      </HoverCardPortal>
    </HoverCard>
  ),
});
