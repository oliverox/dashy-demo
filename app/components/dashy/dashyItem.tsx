import { useId, type ReactNode } from 'react';
import { clsx } from 'clsx';

export function DashyItem({
  className,
  children,
}: {
  children: ReactNode;
  className?: string;
}) {
  const id = useId();
  return (
    <div data-swapy-item={id} className={clsx('w-full', className)}>
      {children}
    </div>
  );
}
