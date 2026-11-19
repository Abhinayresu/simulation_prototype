"use client";

import { OTPInput, OTPInputContext } from "input-otp";
import { MinusIcon } from "lucide-react";
import * as React from "react";

import { cn } from "../core/index.ts";

function InputOTP({
  className,
  containerClassName,
  ...props
}: React.ComponentProps<typeof OTPInput> & {
  containerClassName?: string;
}) {
  return (
    <OTPInput
      data-slot="input-otp"
      containerClassName={cn(
        "flex items-center has-disabled:opacity-50",
        containerClassName,
      )}
      spellCheck={false}
      className={cn(
        "text-center bg-transparent outline-none size-full min-w-0 disabled:cursor-not-allowed",
        className,
      )}
      {...props}
    />
  );
}

function InputOTPGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-otp-group"
      className={cn(
        "rounded-lg flex items-center",
        "has-aria-invalid:ring-3 has-aria-invalid:ring-destructive/20 has-aria-invalid:border-destructive has-aria-invalid:dark:ring-destructive/40",
        className,
      )}
      {...props}
    />
  );
}

function InputOTPSlot({
  index,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  index: number;
}) {
  const inputOTPContext = React.useContext(OTPInputContext);
  const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {};

  return (
    <div
      data-slot="input-otp-slot"
      data-active={isActive}
      className={cn(
        "transition-all text-sm border-y border-y-input border-r border-r-input border-l-input outline-none flex relative justify-center items-center size-8 first:rounded-l-lg first:border-l focus-within:ring-3 focus-within:ring-ring/50 focus-within:border-ring focus-within:z-10 last:rounded-r-lg dark:bg-input/30",
        "aria-invalid:border-destructive aria-invalid:focus-within:ring-destructive/20 aria-invalid:focus-within:border-destructive aria-invalid:dark:focus-within:ring-destructive/40",
        "data-[active=true]:ring-3 data-[active=true]:ring-ring/50 data-[active=true]:border-ring data-[active=true]:z-10",
        "data-[active=true]:aria-invalid:ring-destructive/20 data-[active=true]:aria-invalid:border-destructive data-[active=true]:aria-invalid:dark:ring-destructive/40",
        className,
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div
          className={
            "pointer-events-none flex absolute inset-0 justify-center items-center"
          }
        >
          <div
            className={
              "duration-1000 animate-caret-blink bg-foreground w-px h-4"
            }
          />
        </div>
      )}
    </div>
  );
}

function InputOTPSeparator({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-otp-separator"
      className={cn("flex items-center", className)}
      role="separator"
      {...props}
    >
      {children ?? <MinusIcon className={"size-4"} />}
    </div>
  );
}

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
