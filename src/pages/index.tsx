import Link from 'next/link';

export default function HomePage() {
  return (
    <>
      <div className="-translate-x-1/2 -translate-y-1/2 -z-10 absolute bg-gradient-to-r from-[#6EE7B7] h-[60vw] left-1/2 p-6 rounded-full to-[#9333EA] top-1/2 transform via-[#3B82F6] w-[60vw]">
        <div className="bg-lightbg h-full rounded-full w-full dark:bg-darkbg" />
      </div>

      <div className="layout text-center">
        <h1 className="font-semibold relative text-5xl tracking-tight lg:text-9xl">
          <span>
            <Link href="/discography">
              <a>Music</a>
            </Link>{' '}
            &amp;{' '}
            <Link href="/code">
              <a>Code</a>
            </Link>
          </span>

          <span className="block font-extralight mx-auto tracking-tight">
            by Wan Saleh
          </span>
        </h1>
      </div>
    </>
  );
}
