import { ILoaderProps } from "../types/type";

export default function Loader({ size = 20, color = "#181717" }: ILoaderProps) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderColor: color,
      }}
      className={`rounded-full animate-spin border-t-4`}
    />
  );
}
