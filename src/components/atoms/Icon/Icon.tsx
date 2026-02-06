interface IconProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}

export const Icon = ({ src, alt, width, height, className }: IconProps) => {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
    />
  );
};
