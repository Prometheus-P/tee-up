import * as React from 'react';
import { cn } from '@/lib/utils'; // Assuming cn utility exists for combining class names

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'rounded-xl border border-tee-ink-light/20 bg-tee-surface shadow-card p-space-8',
        className
      )}
      {...props}
    />
  )
);
Card.displayName = 'Card';

export { Card };
