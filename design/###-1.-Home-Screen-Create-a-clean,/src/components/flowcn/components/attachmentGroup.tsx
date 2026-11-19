/** @jsxImportSource ../core/template */

import { defineComponent, defineElement, defineStyles } from "../core/index.ts";

import { Attachment } from "./attachment.tsx";

export const AttachmentGroup = defineElement({
  name: "AttachmentGroup",
  as: "div",
});

const styles = defineStyles({
  base: {
    AttachmentGroup:
      "snap-x snap-mandatory scrollbar-none flex scroll-px-1 py-1 gap-3 min-w-0 overflow-x-auto overscroll-x-contain",
    Attachment: "snap-start flex-none",
  },
});

defineComponent({
  styles,
  structure: (
    <AttachmentGroup>
      <Attachment repeatable />
    </AttachmentGroup>
  ),
});
