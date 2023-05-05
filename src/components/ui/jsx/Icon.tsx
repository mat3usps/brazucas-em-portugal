import type { FontAwesomeIconProps } from "@fortawesome/react-fontawesome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp, faTimes } from "@fortawesome/free-solid-svg-icons";
import type { FC } from "react";

export const IconMap = Object.freeze({
  chevronDownS: faChevronDown,
  chevronUpS: faChevronUp,
  timesS: faTimes,
});

export type IconKeys = keyof typeof IconMap;

export interface IconProps extends Omit<FontAwesomeIconProps, "icon"> {
  "data-testid"?: string;
  display: IconKeys;
}

export const Icon: FC<IconProps> = ({
  "data-testid": testId,
  display,
  ...rest
}) => (
  <FontAwesomeIcon
    data-testid={testId || `Icon-${display}`}
    icon={IconMap[display]}
    {...rest}
  />
);
