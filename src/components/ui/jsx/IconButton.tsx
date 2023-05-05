import classNames from "classnames";
import { forwardRef } from "react";
import type { IconKeys, IconProps } from "./Icon";
import { Icon } from "./Icon";
import type { IUseButtonBase } from "./useButtonBase";
import useButtonBase from "./useButtonBase";

export type IconButtonProps = IUseButtonBase &
  Omit<JSX.IntrinsicElements["button"], "children"> & {
    icon: IconKeys;
    iconProps?: Omit<IconProps, "display">;
    type?: "button" | "submit" | "reset";
    onClick?: () => void;
  };

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      className,
      icon,
      iconProps,
      isOutlined,
      isFullWidth,
      isLoading,
      size,
      type = "button",
      variant,
      ...rest
    }: IconButtonProps,
    ref
  ) => {
    const { className: baseClassName } = useButtonBase({
      isOutlined,
      isFullWidth,
      isLoading,
      size,
      variant,
    });

    return (
      <button
        className={classNames(baseClassName, "btn-square mx-1", className)}
        type={type}
        ref={ref}
        {...rest}
      >
        <Icon
          display={icon}
          fixedWidth
          {...iconProps}
          style={{ maxHeight: "100%", maxWidth: "100%" }}
        />
      </button>
    );
  }
);

IconButton.displayName = "IconButton";

export default IconButton;
