/** @jsxImportSource ../core/template */

import {
  Children,
  defineComponent,
  defineElement,
  defineProps,
  defineStyles,
  defineVariants,
} from "../core/index.ts";

import {
  Dialog,
  DialogCloseButton,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from "./dialog.tsx";

const variants = defineVariants({ showCloseButton: [true, false] });

export const CommandDialog = defineElement({
  name: "CommandDialog",
  as: Dialog,
  variants,
});

const styles = defineStyles<typeof variants>({
  base: {
    DialogContent: "translate-y-0 rounded-xl top-1/3 p-0 overflow-hidden",
    DialogHeader: "sr-only",
  },
  showCloseButton: { false: { DialogCloseButton: "hidden" } },
});

const props = defineProps<typeof variants>({
  base: { DialogTrigger: { present: false }, Children: { inDialog: true } },
});

defineComponent({
  styles,
  props,
  structure: (
    <CommandDialog>
      <DialogTrigger />
      <DialogOverlay />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Command Palette</DialogTitle>
          <DialogDescription>Search for a command to run...</DialogDescription>
        </DialogHeader>
        <Children />
        <DialogCloseButton />
      </DialogContent>
    </CommandDialog>
  ),
});
