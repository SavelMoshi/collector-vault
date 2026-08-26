"use client";

import {
  type ButtonHTMLAttributes,
  useRef,
  useState,
} from "react";
import { useFormStatus } from "react-dom";

type PendingSubmitButtonProps =
  ButtonHTMLAttributes<HTMLButtonElement> & {
    pendingLabel: string;
  };

export default function PendingSubmitButton({
  children,
  disabled,
  onClick,
  pendingLabel,
  ...props
}: PendingSubmitButtonProps) {
  const { pending } = useFormStatus();
  const [clicked, setClicked] = useState(false);
  const clickedRef = useRef(false);

  const isDisabled = disabled || pending || clicked;

  return (
    <button
      {...props}
      type="submit"
      disabled={isDisabled}
      onClick={(event) => {
        if (clickedRef.current) {
          event.preventDefault();
          return;
        }

        onClick?.(event);

        if (
          event.defaultPrevented ||
          !event.currentTarget.form?.checkValidity()
        ) {
          return;
        }

        clickedRef.current = true;

        window.setTimeout(() => {
          setClicked(true);
        }, 0);
      }}
    >
      {pending || clicked ? pendingLabel : children}
    </button>
  );
}
