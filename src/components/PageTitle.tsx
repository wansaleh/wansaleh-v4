import { ReactElement } from 'react';

import LeavesLeft from './LeavesLeft';

export default function PageTitle({
  title,
  subtitle,
}: {
  title: ReactElement | string;
  subtitle?: ReactElement | string;
}) {
  return (
    <div className="mb-12">
      <h1 className="flex font-semibold items-center justify-center mx-auto relative text-5xl text-center tracking-tight lg:text-8xl">
        <LeavesLeft className="fill-brand h-[1em] w-[1em]" />
        <span className="relative z-10">{title}</span>
        <LeavesLeft className="-scale-x-100 fill-brand h-[1em] transform w-[1em]" />
      </h1>

      {subtitle && (
        <p className="font-normal mt-10 text-2xl text-center text-gray-500">
          {subtitle}
        </p>
      )}
    </div>
  );
}
