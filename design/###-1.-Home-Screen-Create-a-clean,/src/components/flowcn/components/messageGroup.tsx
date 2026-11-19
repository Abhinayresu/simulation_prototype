/** @jsxImportSource ../core/template */

import { defineComponent, defineElement, defineStyles } from "../core/index.ts";

import { Message } from "./message.tsx";

export const MessageGroup = defineElement({ name: "MessageGroup", as: "div" });

const styles = defineStyles({
  base: { MessageGroup: "flex flex-col gap-2 min-w-0" },
});

defineComponent({
  styles,
  structure: (
    <MessageGroup>
      <Message repeatable />
    </MessageGroup>
  ),
});
