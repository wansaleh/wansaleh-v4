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
    <div className="mb-20">
      <h1
        className={clsx(
          'flex font-semibold items-center justify-center mx-auto relative text-center',
          large && 'text-6xl lg:text-7xl',
          !large && 'text-4xl lg:text-5xl'
        )}
      >
        {large && <LeavesLeft className="fill-brand h-[1em] w-[1em]" />}
        <span className="relative z-10">{title}</span>
        {large && (
          <LeavesLeft className="-scale-x-100 fill-brand h-[1em] transform w-[1em]" />
        )}
      </h1>

      {subtitle && (
        <p className="font-normal mt-4 text-2xl text-center text-gray-500">
          {subtitle}
        </p>
      )}
    </div>
  );
}
