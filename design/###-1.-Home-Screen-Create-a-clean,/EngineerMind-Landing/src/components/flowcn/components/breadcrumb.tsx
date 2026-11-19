/** @jsxImportSource ../core/template */

import { ChevronRightIcon, EllipsisIcon } from "lucide-react";

import {
  Children,
  defineComponent,
  defineElement,
  defineProps,
  defineStyles,
} from "../core/index.ts";

export const Breadcrumb = defineElement({ name: "Breadcrumb", as: "nav" });

export const BreadcrumbList = defineElement({
  name: "BreadcrumbList",
  as: "ol",
});

export const BreadcrumbItem = defineElement({
  name: "BreadcrumbItem",
  as: "li",
});

export const BreadcrumbLink = defineElement({
  name: "BreadcrumbLink",
  as: "a",
});

export const BreadcrumbPage = defineElement({
  name: "BreadcrumbPage",
  as: "span",
});

export const BreadcrumbEllipsis = defineElement({
  name: "BreadcrumbEllipsis",
  as: "span",
});

export const BreadcrumbEllipsisIcon = defineElement({
  name: "BreadcrumbEllipsisIcon",
  icon: EllipsisIcon,
});

export const BreadcrumbEllipsisLabel = defineElement({
  name: "BreadcrumbEllipsisLabel",
  as: "span",
});

export const BreadcrumbSeparator = defineElement({
  name: "BreadcrumbSeparator",
  as: "li",
});

export const BreadcrumbSeparatorIcon = defineElement({
  name: "BreadcrumbSeparatorIcon",
  icon: ChevronRightIcon,
});

const styles = defineStyles({
  base: {
    BreadcrumbList:
      "wrap-break-word text-muted-foreground text-sm flex flex-wrap items-center gap-1.5",
    BreadcrumbItem: "inline-flex items-center gap-1",
    BreadcrumbLink: "transition-colors hover:text-foreground",
    BreadcrumbPage: "font-normal text-foreground",
    BreadcrumbEllipsis: "flex justify-center items-center size-5",
    BreadcrumbEllipsisIcon: "size-4",
    BreadcrumbEllipsisLabel: "sr-only",
    BreadcrumbSeparatorIcon: "size-3.5 rtl:rotate-180",
  },
});

const props = defineProps({
  base: {
    Breadcrumb: { "aria-label": "breadcrumb" },
    BreadcrumbLink: { present: false },
    BreadcrumbPage: {
      present: false,
      role: "link",
      "aria-disabled": "true",
      "aria-current": "page",
    },
    BreadcrumbEllipsis: {
      present: false,
      role: "presentation",
      "aria-hidden": "true",
    },
    BreadcrumbSeparator: { role: "presentation", "aria-hidden": "true" },
  },
});

defineComponent({
  styles,
  props,
  structure: (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem repeatable>
          <Children />
          <BreadcrumbLink />
          <BreadcrumbPage />
          <BreadcrumbEllipsis>
            <BreadcrumbEllipsisIcon />
            <BreadcrumbEllipsisLabel>More</BreadcrumbEllipsisLabel>
          </BreadcrumbEllipsis>
        </BreadcrumbItem>
        <BreadcrumbSeparator repeatable>
          <BreadcrumbSeparatorIcon />
        </BreadcrumbSeparator>
      </BreadcrumbList>
    </Breadcrumb>
  ),
});
