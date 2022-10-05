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
          'text-center font-cd font-black tracking-tighter',
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
            'mx-auto mt-2 max-w-3xl text-center text-2xl font-semibold text-gray-500',
            !center && '!mx-0 !text-left'
          )}
        >
          {subtitle}
        </h2>
      )}
    </div>
  );
}
