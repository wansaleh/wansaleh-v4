import clsx from 'clsx';
import { ReactElement } from 'react';

import LeavesLeft from './LeavesLeft';

export default function PageTitle({
  title,
  subtitle,
  large = true,
}: {
  title: ReactElement | string;
  subtitle?: ReactElement | string;
  large?: boolean;
}) {
  return (
    <div className="mb-10">
      <h1
        className={clsx(
          'flex font-semibold items-center justify-center mx-auto relative text-center',
          large && 'text-5xl lg:text-7xl',
          !large && 'text-4xl lg:text-5xl'
        )}
      >
        <span className="relative z-10">
          {large && (
            <LeavesLeft className="absolute fill-brand h-full right-full top-0 w-[1em]" />
          )}

          {title}

          {large && (
            <LeavesLeft className="-scale-x-100 absolute fill-brand h-full left-full top-0 transform w-[1em]" />
          )}
        </span>
      </h1>

      {subtitle && (
        <p className="font-normal mt-4 text-2xl text-center text-gray-500">
          {subtitle}
        </p>
      )}
    </div>
  );
}
