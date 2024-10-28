import { useId, type ReactNode } from 'react';
import { clsx } from 'clsx';

export function DashySlot({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const id = useId();
  return (
    <div
      data-swapy-slot={id}
      data-swapy-handle
      className={clsx('w-full bg-gray-400 p-1 rounded flex flex-row gap-0', className)}
    >
      {children}
    </div>
  );
}
