import clsx from 'clsx';
import { ReactElement } from 'react';

// import LeavesLeft from './LeavesLeft';

export default function PageTitle({
  title,
  subtitle,
  large = true,
  center = true,
}: {
  title: ReactElement | string;
  subtitle?: ReactElement | string;
  large?: boolean;
  center?: boolean;
}) {
  return (
    <div className="mb-10">
      <h1
        className={clsx(
          'font-bold text-center tracking-tighter',
          large && 'text-5xl lg:text-7xl',
          !large && 'text-4xl lg:text-5xl',
          !center && '!text-left'
        )}
      >
        {title}
      </h1>

      {subtitle && (
        <h2
          className={clsx(
            'font-medium mt-4 text-2xl text-center text-gray-500',
            !center && '!text-left'
          )}
        >
          {subtitle}
        </h2>
      )}
    </div>
  );
}
