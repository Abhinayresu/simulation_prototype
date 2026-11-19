"use client";

import { CheckIcon, CopyIcon } from "lucide-react";
import * as React from "react";

import { cn } from "../core/index.ts";

import { Button, ButtonIcon } from "./button.tsx";

type CodeBlockContextProps = {
  variant: "default" | "destructive";
  size: "default" | "sm";
  copied: boolean;
  copy: (value: string) => void;
};

const CodeBlockContext = React.createContext<CodeBlockContextProps>({
  variant: "default",
  size: "default",
  copied: false,
  copy: () => {},
});

/** Whether the lines of the content around them are numbered. */
const NumberedContext = React.createContext(false);

function CodeBlock({
  className,
  variant = "default",
  size = "default",
  copied: copiedProp = false,
  ...props
}: React.ComponentProps<"div"> & {
  variant?: CodeBlockContextProps["variant"];
  size?: CodeBlockContextProps["size"];
  /** Whether it starts copied. */
  copied?: boolean;
}) {
  const [copied, setCopied] = React.useState(copiedProp);
  const timeout = React.useRef<ReturnType<typeof setTimeout>>(undefined);
  React.useEffect(() => () => clearTimeout(timeout.current), []);

  // Copied for two seconds from the last copy.
  const copy = React.useCallback((value: string) => {
    navigator.clipboard
      .writeText(value)
      .then(() => {
        setCopied(true);
        clearTimeout(timeout.current);
        timeout.current = setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => {});
  }, []);

  const context = React.useMemo(
    () => ({ variant, size, copied, copy }),
    [variant, size, copied, copy],
  );

  return (
    <CodeBlockContext.Provider value={context}>
      <div
        data-slot="code-block"
        data-variant={variant}
        data-size={size}
        className={cn(
          "group/code-block",
          "rounded-lg text-sm flex relative flex-col w-full min-w-0 overflow-hidden",
          variant === "default"
            ? "text-foreground border border-input dark:bg-input/30"
            : "text-destructive border border-destructive/30 dark:border-destructive/40",
          size === "sm" && "text-xs",
          className,
        )}
        {...props}
      />
    </CodeBlockContext.Provider>
  );
}

function CodeBlockHeader({ className, ...props }: React.ComponentProps<"div">) {
  const { variant, size } = React.useContext(CodeBlockContext);

  return (
    <div
      data-slot="code-block-header"
      className={cn(
        "text-muted-foreground flex px-3 pt-3 items-center shrink-0 gap-2 min-w-0",
        variant === "destructive" && "text-destructive",
        size === "sm" && "px-2.5 pt-2.5",
        className,
      )}
      {...props}
    />
  );
}

function CodeBlockTitle({ className, ...props }: React.ComponentProps<"div">) {
  const { variant, size } = React.useContext(CodeBlockContext);

  return (
    <div
      data-slot="code-block-title"
      className={cn(
        "font-sans font-medium text-ellipsis whitespace-nowrap text-foreground text-sm min-w-0 overflow-hidden",
        variant === "destructive" && "text-destructive",
        size === "sm" && "text-xs",
        className,
      )}
      {...props}
    />
  );
}

function CodeBlockActions({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="code-block-actions"
      className={cn(
        "flex -my-1 -mr-1.5 ml-auto items-center shrink-0 gap-1 rtl:mr-auto rtl:-ml-1.5",
        className,
      )}
      {...props}
    />
  );
}

function CodeBlockCopyButton({
  value,
  variant = "ghost",
  size = "icon-xs",
  className,
  onClick,
  ...props
}: React.ComponentProps<typeof Button> & { value: string }) {
  const { copied, copy } = React.useContext(CodeBlockContext);

  return (
    <>
      <Button
        data-slot="code-block-copy-button"
        data-copied={copied || undefined}
        variant={variant}
        size={size}
        aria-label={copied ? "Copied" : "Copy"}
        className={className}
        onClick={(event) => {
          onClick?.(event);
          copy(value);
        }}
        {...props}
      >
        <ButtonIcon icon={copied ? CheckIcon : CopyIcon} />
      </Button>
      <span aria-live="polite" className={"sr-only"}>
        {copied ? "Copied" : ""}
      </span>
    </>
  );
}

function CodeBlockContent({
  className,
  children,
  wrap = false,
  lineNumbers = false,
  startLine = 1,
  ...props
}: React.ComponentProps<"pre"> & {
  wrap?: boolean;
  lineNumbers?: boolean;
  startLine?: number;
}) {
  const { size } = React.useContext(CodeBlockContext);

  return (
    <pre
      data-slot="code-block-content"
      dir="ltr"
      tabIndex={0}
      className={cn(
        "font-mono text-left scrollbar-thin leading-relaxed outline-none p-3 min-w-0 min-h-0 overflow-auto focus-visible:outline-3 focus-visible:outline-ring/50 focus-visible:outline-offset-[-3px]",
        size === "sm" && "p-2.5",
        // The block tightens its code against a header and a footer.
        "group-has-data-[slot=code-block-header]/code-block:pt-2",
        "group-has-data-[slot=code-block-footer]/code-block:pb-2",
        wrap && "whitespace-pre-wrap wrap-break-word",
        size === "sm" &&
          "group-has-data-[slot=code-block-header]/code-block:pt-1.5",
        size === "sm" &&
          "group-has-data-[slot=code-block-footer]/code-block:pb-2.5",
        className,
      )}
      {...props}
    >
      <code
        data-slot="code-block-code"
        className={cn(
          "grid content-start min-w-max min-h-lh",
          wrap && "min-w-0",
          lineNumbers && "grid-cols-[auto_1fr]",
        )}
      >
        <NumberedContext.Provider value={lineNumbers}>
          {lineNumbers ? numbered(children, startLine) : children}
        </NumberedContext.Provider>
      </code>
    </pre>
  );
}

/**
 * `children` with each line given its number, from `startLine`: lines inside
 * other elements and fragments too, and a number the author wrote kept.
 */
function numbered(children: React.ReactNode, startLine: number) {
  let line = startLine;
  const number = (node: React.ReactNode): React.ReactNode =>
    React.Children.map(node, (child) => {
      if (!React.isValidElement<{ children?: React.ReactNode }>(child))
        return child;
      if (child.type === CodeBlockLine) {
        const place = line++;
        const props = child.props as { "data-line"?: unknown };
        return props["data-line"] === undefined
          ? React.cloneElement(
              child as React.ReactElement<{ "data-line"?: number }>,
              {
                "data-line": place,
              },
            )
          : child;
      }
      return child.props.children === undefined
        ? child
        : React.cloneElement(child, undefined, number(child.props.children));
    });
  return number(children);
}

function CodeBlockLine({
  className,
  variant = "default",
  children,
  ...props
}: React.ComponentProps<"span"> & {
  variant?: "default" | "added" | "removed" | "highlighted";
}) {
  const { size } = React.useContext(CodeBlockContext);
  const numbered = React.useContext(NumberedContext);
  // An empty line holds a newline so copying a selection keeps blank lines.
  const empty =
    children === undefined ||
    children === null ||
    children === "" ||
    (Array.isArray(children) && children.length === 0);

  return (
    <span
      data-slot="code-block-line"
      data-variant={variant}
      className={cn(
        "block relative -mx-3 px-3 min-h-lh after:select-none after:text-muted-foreground after:absolute after:top-0 after:left-1",
        variant === "added" && "bg-muted after:content-['+']",
        variant === "removed" &&
          "bg-destructive/10 after:content-['−'] after:text-destructive",
        variant === "highlighted" && "bg-muted",
        size === "sm" && "-mx-2.5 px-2.5",
        numbered &&
          "grid gap-x-3 grid-cols-subgrid col-span-2 before:text-right before:select-none before:content-[attr(data-line)] before:text-muted-foreground before:min-w-6",
        className,
      )}
      {...props}
    >
      <span data-slot="code-block-line-content" className={"min-w-0"}>
        {empty ? "\n" : children}
      </span>
    </span>
  );
}

function CodeBlockFooter({ className, ...props }: React.ComponentProps<"div">) {
  const { size } = React.useContext(CodeBlockContext);

  return (
    <div
      data-slot="code-block-footer"
      className={cn(
        "text-muted-foreground flex px-3 pb-3 items-center shrink-0 gap-2 min-w-0",
        size === "sm" && "px-2.5 pb-2.5",
        className,
      )}
      {...props}
    />
  );
}

export {
  CodeBlock,
  CodeBlockHeader,
  CodeBlockTitle,
  CodeBlockActions,
  CodeBlockCopyButton,
  CodeBlockContent,
  CodeBlockLine,
  CodeBlockFooter,
};
