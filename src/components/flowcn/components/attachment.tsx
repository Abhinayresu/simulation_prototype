/** @jsxImportSource ../core/template */

import {
  Children,
  defineComponent,
  defineElement,
  defineProps,
  defineStyles,
  defineVariants,
} from "../core/index.ts";

import { Button } from "./button.tsx";

const variants = defineVariants(
  {
    orientation: ["horizontal", "vertical"],
    size: ["default", "sm", "xs"],
    state: ["idle", "uploading", "processing", "error", "done"],
    media: ["icon", "image"],
  },
  {
    defaults: {
      orientation: "horizontal",
      size: "default",
      state: "done",
      media: "icon",
    },
  },
);

export const Attachment = defineElement({
  name: "Attachment",
  as: "div",
  variants,
});

export const AttachmentTrigger = defineElement({
  name: "AttachmentTrigger",
  as: "button",
});

export const AttachmentMedia = defineElement({
  name: "AttachmentMedia",
  as: "div",
});

export const AttachmentMediaIcon = defineElement({
  name: "AttachmentMediaIcon",
});

export const AttachmentMediaImage = defineElement({
  name: "AttachmentMediaImage",
  as: "img",
});

export const AttachmentContent = defineElement({
  name: "AttachmentContent",
  as: "div",
});

export const AttachmentTitle = defineElement({
  name: "AttachmentTitle",
  as: "span",
});

export const AttachmentDescription = defineElement({
  name: "AttachmentDescription",
  as: "span",
});

export const AttachmentActions = defineElement({
  name: "AttachmentActions",
  as: "div",
});

export const AttachmentAction = defineElement({
  name: "AttachmentAction",
  as: Button,
});

const styles = defineStyles<typeof variants>({
  base: {
    Attachment:
      "transition-colors rounded-xl bg-card text-card-foreground border flex relative flex-wrap shrink-0 w-fit min-w-0 max-w-full focus-within:ring focus-within:ring-ring/50",
    AttachmentTrigger:
      "transition-colors rounded-xl outline-none absolute z-10 inset-0 hover:bg-muted/50",
    AttachmentMedia:
      "pointer-events-none rounded-lg bg-muted text-foreground flex relative z-10 justify-center items-center shrink-0 w-10 aspect-square overflow-hidden",
    AttachmentMediaIcon: "pointer-events-none size-4",
    AttachmentMediaImage: "w-full aspect-square object-cover",
    AttachmentContent:
      "pointer-events-none leading-tight relative z-10 flex-1 min-w-0 max-w-full",
    AttachmentTitle:
      "font-medium text-ellipsis whitespace-nowrap block min-w-0 max-w-full overflow-hidden",
    AttachmentDescription:
      "text-ellipsis whitespace-nowrap text-muted-foreground text-xs block mt-0.5 min-w-0 max-w-full overflow-hidden",
    AttachmentActions: "flex relative z-20 items-center shrink-0",
  },
  orientation: {
    horizontal: {
      Attachment: "items-center min-w-40",
      AttachmentMedia: "-mr-0.5",
      AttachmentContent: "ml-0.5 last:mr-0.5",
    },
    vertical: {
      Attachment: "flex-col w-fit min-w-24",
      AttachmentMedia: "contain-inline-size w-full",
      AttachmentMediaIcon: "size-6",
      AttachmentContent: "px-1",
      AttachmentActions: "absolute top-3 right-3 gap-1",
    },
  },
  size: {
    default: { Attachment: "text-sm p-2 gap-2" },
    sm: { Attachment: "text-xs p-1.5 gap-2.5", AttachmentMedia: "w-8" },
    xs: {
      Attachment: "rounded-lg text-xs p-1 gap-1.5",
      AttachmentTrigger: "rounded-lg",
      AttachmentMedia: "rounded-md w-7",
      AttachmentMediaIcon: "size-3.5",
    },
  },
  state: {
    idle: { Attachment: "border-dashed" },
    error: {
      Attachment: "border-destructive/30",
      AttachmentMedia: "bg-destructive/10 text-destructive",
      AttachmentDescription: "text-destructive/80",
    },
  },
  compoundVariants: [
    {
      when: { media: "image", state: "uploading" },
      classes: { AttachmentMedia: "opacity-60" },
    },
    {
      when: { media: "image", state: "processing" },
      classes: { AttachmentMedia: "opacity-60" },
    },
    {
      when: { media: "image", state: "error" },
      classes: { AttachmentMedia: "opacity-60" },
    },
    {
      when: { orientation: "vertical", size: "default" },
      classes: { AttachmentContent: "w-[6.375rem]" },
    },
    {
      when: { orientation: "vertical", size: "sm" },
      classes: { AttachmentContent: "w-[6.625rem]" },
    },
    {
      when: { orientation: "vertical", size: "xs" },
      classes: { AttachmentContent: "w-[6.875rem]" },
    },
  ],
});

const props = defineProps<typeof variants>({
  base: {
    AttachmentTrigger: { type: "button", present: false },
    AttachmentMedia: { present: false },
    AttachmentMediaIcon: { present: false },
    AttachmentMediaImage: { present: false },
    AttachmentContent: { present: false },
    AttachmentDescription: { present: false },
    AttachmentActions: { present: false },
    AttachmentAction: { variant: "ghost", size: "icon-xs" },
  },
});

defineComponent({
  styles,
  props,
  structure: (
    <Attachment>
      <AttachmentTrigger />
      <AttachmentMedia>
        <AttachmentMediaIcon />
        <AttachmentMediaImage />
      </AttachmentMedia>
      <AttachmentContent>
        <AttachmentTitle>
          <Children />
        </AttachmentTitle>
        <AttachmentDescription />
      </AttachmentContent>
      <AttachmentActions>
        <AttachmentAction repeatable />
      </AttachmentActions>
    </Attachment>
  ),
});
