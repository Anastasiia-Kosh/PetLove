import css from "./Icon.module.css";

export type IconName =
  | "calendar"
  | "check"
  | "nocheck"
  | "chevron-down"
  | "cloud"
  | "eye"
  | "eye-off"
  | "female"
  | "logo"
  | "male"
  | "menu"
  | "multiple"
  | "pet-avatar"
  | "search"
  | "close"
  | "trash"
  | "edit"
  | "heart";

interface IconProps {
  name: IconName;
  width?: number;
  height?: number;
  className?: string;
}

export default function Icon({
  name,
  width = 32,
  height = 32,
  className = "",
}: IconProps) {
  return (
    <svg
      className={`${css.icon} ${className}`}
      width={width}
      height={height}
      aria-hidden="true"
      focusable="false"
    >
      <use href={`/icons/sprite.svg#icon-${name}`} />
    </svg>
  );
}