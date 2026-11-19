/** @jsxImportSource ../core/template */

import {
  Children,
  defineComponent,
  defineElement,
  defineStyles,
  defineVariants,
} from "../core/index.ts";

import { Separator } from "./separator.tsx";

const variants = defineVariants({ variant: ["default", "outline"] });

export const FieldGroup = defineElement({
  name: "FieldGroup",
  as: "div",
  variants,
});

export const FieldSeparator = defineElement({
  name: "FieldSeparator",
  as: "div",
});

export const FieldSeparatorLine = defineElement({
  name: "FieldSeparatorLine",
  as: Separator,
});

export const FieldSeparatorContent = defineElement({
  name: "FieldSeparatorContent",
  as: "span",
});

const styles = defineStyles<typeof variants>({
  base: {
    FieldGroup: "flex flex-col gap-5 w-full @container/field-group",
    FieldSeparator: "text-sm relative -my-2 h-5",
    FieldSeparatorLine: "absolute inset-x-0 top-1/2 bottom-0",
    FieldSeparatorContent:
      "bg-background text-muted-foreground block relative mx-auto px-2 w-fit",
  },
  variant: { outline: { FieldSeparator: "-mb-2" } },
});

defineComponent({
  styles,
  structure: (
    <FieldGroup>
      <FieldSeparator repeatable>
        <FieldSeparatorLine />
        <FieldSeparatorContent>
          <Children />
        </FieldSeparatorContent>
      </FieldSeparator>
      <Children />
    </FieldGroup>
  ),
});
