import { ReactElement } from 'react';

export default function PageTitle({
  title,
  subtitle,
}: {
  title: ReactElement | string;
  subtitle?: ReactElement | string;
}) {
  return (
    <div className="mb-12">
      <h1 className="font-semibold mx-auto relative text-5xl text-center tracking-tight lg:text-8xl">
        <span className="relative z-10">{title}</span>
      </h1>

      {subtitle && (
        <p className="font-normal mt-10 text-2xl text-center text-gray-500">
          {subtitle}
        </p>
      )}
    </div>
  );
}
