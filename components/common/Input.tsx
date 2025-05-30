import clsx from "clsx";
import type {
  DetailedHTMLProps,
  FocusEventHandler,
  InputHTMLAttributes,
} from "react";
import React, { forwardRef } from "react";

export interface InputOptions {
  variant?: "outline";
  error?: boolean;
  errorText?: string;
  inputContainerClassName?: string;
  inputClassName?: string;
  containerClassName?: string;
  register?: any;
  handleIncrement?: () => void;
  handleDecrement?: () => void;
}

export type InputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> &
  InputOptions;

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    id,
    className,
    placeholder,
    variant = "outline",
    type = "text",
    register,
    disabled,
    error,
    errorText,
    ...inputProps
  } = props;

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (register && register.onChange) register.onChange(e);
    if (props.onChange) props.onChange(e);
  };

  const handleFocus = (e: FocusEventHandler<HTMLInputElement>) => {
    if (register && register.onFocus) register.onFocus(e);
  };
  const handleBlur = (e: FocusEventHandler<HTMLInputElement>) => {
    if (register && register.onBlur) register.onBlur(e);
  };

  return (
    <div className="relative space-y-1">
      <input
        id={id}
        ref={ref}
        className={clsx(
          "text-sm flex h-12 w-full items-center truncate rounded border px-4 py-3 hover:border-purple-300 focus:outline-none disabled:cursor-not-allowed duration-300",
          {
            "border-gray-300 bg-inherit text-gray-200 placeholder:text-gray-400 focus:border-purple-400 focus:placeholder:text-gray-500 active:border-purple-500 active:placeholder:text-gray-500 disabled:border-gray-200 disabled:text-gray-400 disabled:placeholder:text-gray-400":
              variant === "outline",
          },
          className
        )}
        placeholder={placeholder}
        type={type}
        disabled={disabled}
        {...register}
        onChange={handleTextChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...inputProps}
      />
      {error && (
        <div className="flex items-center gap-x-1">
          <span className="text-xs text-red">{errorText}</span>
        </div>
      )}
    </div>
  );
});

Input.displayName = "Input";
export default Input;
