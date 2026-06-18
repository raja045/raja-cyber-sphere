import { cn } from "@/lib/cn";

export function Container({
  children,
  className,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
}) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Component = Tag as any;
  return (
    <Component
      className={cn(
        "mx-auto w-full max-w-6xl px-5 sm:px-8 lg:px-12",
        className,
      )}
    >
      {children}
    </Component>
  );
}
