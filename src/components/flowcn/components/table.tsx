/** @jsxImportSource ../core/template */

import {
  Children,
  defineComponent,
  defineElement,
  defineProps,
  defineStyles,
  defineVariants,
} from "../core/index.ts";

export const Table = defineElement({ name: "Table", as: "div" });

export const TableElement = defineElement({
  name: "TableElement",
  as: "table",
});

export const TableCaption = defineElement({
  name: "TableCaption",
  as: "caption",
});

const headerVariants = defineVariants(
  { section: ["header", "body", "footer"] },
  { defaults: { section: "header" } },
);

export const TableHeader = defineElement({
  name: "TableHeader",
  as: "thead",
  variants: headerVariants,
});

const rowVariants = defineVariants({
  expanded: [true, false],
  selected: [true, false],
});

export const TableRow = defineElement({
  name: "TableRow",
  as: "tr",
  variants: rowVariants,
});

const headVariants = defineVariants({ control: [true, false] });

export const TableHead = defineElement({
  name: "TableHead",
  as: "th",
  variants: headVariants,
});

export const TableHeadControl = defineElement({
  name: "TableHeadControl",
  as: "span",
});

const cellVariants = defineVariants({ control: [true, false] });

export const TableCell = defineElement({
  name: "TableCell",
  as: "td",
  variants: cellVariants,
});

export const TableCellControl = defineElement({
  name: "TableCellControl",
  as: "span",
});

const bodyVariants = defineVariants(
  { section: ["header", "body", "footer"] },
  { defaults: { section: "body" } },
);

export const TableBody = defineElement({
  name: "TableBody",
  as: "tbody",
  variants: bodyVariants,
});

const footerVariants = defineVariants(
  { section: ["header", "body", "footer"] },
  { defaults: { section: "footer" } },
);

export const TableFooter = defineElement({
  name: "TableFooter",
  as: "tfoot",
  variants: footerVariants,
});

const styles = defineStyles<
  typeof headerVariants &
    typeof rowVariants &
    typeof headVariants &
    typeof cellVariants &
    typeof bodyVariants &
    typeof footerVariants
>({
  base: {
    Table: "relative w-full overflow-x-auto",
    TableElement: "caption-bottom text-sm w-full",
    TableCaption: "text-muted-foreground text-sm mt-4",
    TableRow:
      "transition-colors border-b hover:bg-muted/50 data-[state=selected]:bg-muted hover:data-[state=selected]:bg-muted",
    TableHead:
      "font-medium text-left align-middle whitespace-nowrap text-foreground px-2 h-10",
    TableHeadControl: "inline-flex",
    TableCell: "align-middle whitespace-nowrap p-2",
    TableCellControl: "inline-flex",
    TableFooter: "font-medium bg-muted/50 border-t",
  },
  section: {
    body: { TableRow: "last:border-b-0" },
    footer: { TableRow: "last:border-b-0" },
  },
  expanded: { true: { TableRow: "bg-muted/50" } },
  selected: { true: { TableRow: "bg-muted hover:bg-muted" } },
  control: { true: { TableHead: "pr-0", TableCell: "pr-0" } },
});

const props = defineProps({
  base: {
    TableCaption: { present: false },
    TableHeadControl: { present: false },
    TableCellControl: { present: false },
  },
});

defineComponent({
  styles,
  props,
  structure: (
    <Table>
      <TableElement>
        <TableCaption>
          <Children />
        </TableCaption>
        <TableHeader repeatable>
          <TableRow repeatable>
            <TableHead repeatable>
              <TableHeadControl />
              <Children />
            </TableHead>
            <TableCell repeatable>
              <TableCellControl />
              <Children />
            </TableCell>
            <Children />
          </TableRow>
          <Children />
        </TableHeader>
        <TableBody repeatable>
          <Children />
        </TableBody>
        <TableFooter repeatable>
          <Children />
        </TableFooter>
        <Children />
      </TableElement>
    </Table>
  ),
});
