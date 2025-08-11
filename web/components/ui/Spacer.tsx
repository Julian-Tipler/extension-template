type SpacerSize =
  | "xx-small"
  | "x-small"
  | "small"
  | "medium"
  | "large"
  | "x-large"
  | "xx-large";

type SpacerProps = {
  size?: SpacerSize;
  axis?: "vertical" | "horizontal";
};

const sizeMap: Record<SpacerSize, number> = {
  "xx-small": 2,
  "x-small": 4,
  small: 8,
  medium: 16,
  large: 24,
  "x-large": 32,
  "xx-large": 64,
};

const Spacer: React.FC<SpacerProps> = ({
  size = "medium",
  axis = "vertical",
}) => {
  const px = sizeMap[size];
  const style =
    axis === "vertical"
      ? { height: px, width: "100%" }
      : { width: px, height: "100%" };

  return <div style={style} aria-hidden="true" />;
};

export default Spacer;
