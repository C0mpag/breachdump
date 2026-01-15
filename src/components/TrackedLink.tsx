'use client';

import type React from 'react';
import { trackEvent } from '@/lib/analytics';

type Props = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  eventName: string;
};

export const TrackedLink = ({ eventName, onClick, ...props }: Props) => (
  <a
    {...props}
    onClick={(event) => {
      trackEvent(eventName, { location: props['data-location'] || 'link' });
      onClick?.(event);
    }}
  />
);
