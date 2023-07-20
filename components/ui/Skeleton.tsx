import { CSSProperties, memo } from "react";

interface SkeletonProps {
  className?: string;
  height?: string | number;
  width?: string | number;
  border?: string;
}

const Skeleton = (({ className = "", width, height, border }: SkeletonProps) => {
  const styles: CSSProperties = {
    width,
    height,
    borderRadius: border,
  };
  return (
    <div className={`bg-gray-200 rounded-full dark:bg-gray-700 animate-pulse ${className}`} style={styles} />
  );
});

export default memo(Skeleton);
