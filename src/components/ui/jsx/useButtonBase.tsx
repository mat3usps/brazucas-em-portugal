import classNames from "classnames";

export interface IUseButtonBase {
  isOutlined?: boolean;
  isFullWidth?: boolean;
  isLoading?: boolean;
  size?: "sm" | "lg";
  variant?: "primary" | "secondary" | "ghost" | "link" | "error";
}

function useButtonBase({
  isOutlined,
  isFullWidth,
  isLoading,
  size,
  variant = "primary",
}: IUseButtonBase) {
  const isPrimary = variant === "primary";
  const isSecondary = variant === "secondary";
  const isGhost = variant === "ghost";
  const isError = variant === "error";
  const isLinkVariant = variant === "link";

  const className = classNames("btn", {
    "btn-primary": isPrimary,
    "btn-secondary": isSecondary,
    "btn-block": isFullWidth,
    "btn-ghost": isGhost,
    "btn-link": isLinkVariant,
    "btn-error": isError,
    "btn-outline": isOutlined,
    "btn-sm": size === "sm",
    "btn-lg": size === "lg",
    loading: isLoading,
  });

  return { className };
}

export default useButtonBase;
