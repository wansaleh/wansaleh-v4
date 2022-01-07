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
      <h1 className="lg:text-8xl relative mx-auto text-5xl font-semibold tracking-tight text-center">
        <span className="relative z-10">{title}</span>
      </h1>

      {subtitle && (
        <p className="mt-10 text-2xl font-normal text-center text-gray-500">
          {subtitle}
        </p>
      )}
    </div>
  );
}
