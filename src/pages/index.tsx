import Link from 'next/link';

export default function HomePage() {
  return (
    <>
      <div
        className="absolute top-1/2 left-1/2 -z-10 w-[60vw] h-[60vw] transform -translate-x-1/2 -translate-y-1/2 rounded-full
  bg-gradient-to-r p-6 from-[#6EE7B7] via-[#3B82F6] to-[#9333EA]"
      >
        <div className="dark:bg-darkbg bg-lightbg w-full h-full rounded-full" />
      </div>

      <div className="layout text-center">
        <h1 className="lg:text-9xl relative text-5xl font-semibold tracking-tight">
          <span>
            <Link href="/discography">
              <a>Music</a>
            </Link>{' '}
            &amp;{' '}
            <Link href="/web">
              <a>Code</a>
            </Link>
          </span>

          <span className="block mx-auto font-extralight tracking-tight">
            by Wan Saleh
          </span>
        </h1>
      </div>
    </>
  );
}
