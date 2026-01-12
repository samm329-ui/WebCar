import { cn } from "@/lib/utils";

export function Loader({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 200"
      className={cn("w-16 h-16", className)}
      aria-label="Loading..."
      role="status"
    >
      <rect
        fill="none"
        stroke="hsl(var(--foreground))"
        strokeWidth="10"
        strokeLinecap="round"
        x="25"
        y="25"
        width="150"
        height="150"
        strokeDasharray="400 1600"
        strokeDashoffset="0"
        transform="rotate(-90 100 100)"
      >
        <animate
          attributeName="stroke-dashoffset"
          dur="4s"
          repeatCount="indefinite"
          values="0;-800;-1600;-2400"
        ></animate>
        <animateTransform
          attributeName="transform"
          type="rotate"
          values="0 100 100;-90 100 100;-180 100 100;-270 100 100"
          dur="1s"
          repeatCount="indefinite"
        ></animateTransform>
      </rect>
    </svg>
  );
}
