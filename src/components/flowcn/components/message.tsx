/** @jsxImportSource ../core/template */

import {
  Children,
  defineComponent,
  defineElement,
  defineProps,
  defineStyles,
  defineVariants,
} from "../core/index.ts";

import { Bubble } from "./bubble.tsx";

const variants = defineVariants(
  { align: ["start", "end"], ghost: [true, false] },
  { defaults: { align: "start" } },
);

export const Message = defineElement({ name: "Message", as: "div", variants });

export const MessageAvatar = defineElement({
  name: "MessageAvatar",
  as: "div",
});

export const MessageContent = defineElement({
  name: "MessageContent",
  as: "div",
});

export const MessageHeader = defineElement({
  name: "MessageHeader",
  as: "div",
});

export const MessageFooter = defineElement({
  name: "MessageFooter",
  as: "div",
});

const styles = defineStyles<typeof variants>({
  base: {
    Message: "text-sm grid relative w-full min-w-0",
    MessageAvatar:
      "rounded-full bg-muted flex self-end justify-center items-center shrink-0 row-start-1 w-fit min-w-8 overflow-hidden",
    MessageContent:
      "wrap-break-word flex flex-col gap-2.5 row-start-1 w-full min-w-0",
    MessageHeader:
      "font-medium text-muted-foreground text-xs flex px-3 items-center min-w-0 max-w-full",
    MessageFooter:
      "font-medium text-muted-foreground text-xs flex mt-2.5 px-3 items-center row-start-2 min-w-0 max-w-full",
  },
  align: {
    start: {
      Message: "grid-cols-[auto_minmax(0,1fr)]",
      MessageAvatar: "mr-2 col-start-1",
      MessageContent: "col-start-2",
      MessageFooter: "col-start-2",
    },
    end: {
      Message: "grid-cols-[minmax(0,1fr)_auto]",
      MessageAvatar: "ml-2 col-start-2",
      MessageContent: "col-start-1",
      MessageHeader: "self-end",
      MessageFooter: "justify-self-end justify-end col-start-1",
    },
  },
  ghost: { true: { MessageHeader: "px-0", MessageFooter: "px-0" } },
});

const props = defineProps<typeof variants>({
  base: {
    MessageAvatar: { present: false },
    MessageHeader: { present: false },
    MessageFooter: { present: false },
  },
  align: { end: { Bubble: { align: "end" } } },
});

defineComponent({
  styles,
  props,
  structure: (
    <Message>
      <MessageAvatar />
      <MessageContent>
        <MessageHeader />
        <Bubble repeatable />
        <Children />
      </MessageContent>
      <MessageFooter />
    </Message>
  ),
});
