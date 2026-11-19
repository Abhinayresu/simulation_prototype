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
  { media: ["default", "icon"] },
  { defaults: { media: "default" } },
);

export const Empty = defineElement({ name: "Empty", as: "div", variants });

export const EmptyHeader = defineElement({ name: "EmptyHeader", as: "div" });

export const EmptyMedia = defineElement({ name: "EmptyMedia", as: "div" });

export const EmptyMediaIcon = defineElement({ name: "EmptyMediaIcon" });

export const EmptyTitle = defineElement({ name: "EmptyTitle", as: "div" });

export const EmptyDescription = defineElement({
  name: "EmptyDescription",
  as: "div",
});

export const EmptyContent = defineElement({ name: "EmptyContent", as: "div" });

const styles = defineStyles<typeof variants>({
  base: {
    Empty:
      "text-center text-balance rounded-xl border-dashed flex p-6 flex-col justify-center items-center flex-1 gap-4 w-full min-w-0",
    EmptyHeader: "flex flex-col items-center gap-2 max-w-sm",
    EmptyMedia: "flex mb-2 justify-center items-center shrink-0",
    EmptyMediaIcon: "pointer-events-none shrink-0",
    EmptyTitle: "font-medium text-sm tracking-tight",
    EmptyDescription: "text-muted-foreground text-sm leading-relaxed",
    EmptyContent:
      "text-balance text-sm flex flex-col items-center gap-2.5 w-full min-w-0 max-w-sm",
  },
  media: {
    default: { EmptyMedia: "bg-transparent" },
    icon: {
      EmptyMedia:
        "rounded-lg bg-muted text-foreground flex justify-center items-center shrink-0 size-8",
      EmptyMediaIcon: "size-4",
    },
  },
});

const props = defineProps<typeof variants>({
  base: {
    EmptyHeader: { present: false },
    EmptyMedia: { present: false },
    EmptyDescription: { present: false },
  },
});

defineComponent({
  styles,
  props,
  structure: (
    <Empty>
      <EmptyHeader>
        <EmptyMedia>
          <EmptyMediaIcon />
        </EmptyMedia>
        <EmptyTitle>
          <Children />
        </EmptyTitle>
        <EmptyDescription />
      </EmptyHeader>
      <EmptyContent>
        <Children />
      </EmptyContent>
    </Empty>
  ),
});
