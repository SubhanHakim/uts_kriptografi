import * as React from 'react';
import * as SwitchPrimitive from '@radix-ui/react-switch';
import { cn } from '@/lib/utils';

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root> & { labels?: { on: string; off: string } }
>(({ className, labels = { on: 'On', off: 'Off' }, ...props }, ref) => (
  <SwitchPrimitive.Root
    className={cn(
      'peer inline-flex h-[32px] w-[80px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input',
      className
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitive.Thumb
      className={cn(
        'pointer-events-none block h-7 w-7 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-[48px] data-[state=unchecked]:translate-x-0'
      )}
    />
    <span
      className={cn(
        'absolute left-2 text-xs font-medium text-white transition-opacity data-[state=checked]:opacity-0 data-[state=unchecked]:opacity-100'
      )}
    >
      {labels.off}
    </span>
    <span
      className={cn(
        'absolute right-2 text-xs font-medium text-white transition-opacity data-[state=checked]:opacity-100 data-[state=unchecked]:opacity-0'
      )}
    >
      {labels.on}
    </span>
  </SwitchPrimitive.Root>
));
Switch.displayName = SwitchPrimitive.Root.displayName;

export { Switch };