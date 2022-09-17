import Link from 'next/link';

import Seo from '@/components/Seo';

export default function NotFoundPage() {
  return (
    <>
      <Seo templateTitle="Not Found" />

      <main>
        <section>
          <div className="flex min-h-screen flex-col items-center justify-center text-center layout">
            <h1 className="mt-8">😩 Page Not Found</h1>
            <Link href="/">
              <a className="mt-4">Back to Home</a>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
