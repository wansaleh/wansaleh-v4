/* eslint-disable @typescript-eslint/no-explicit-any */
import { format, parse } from 'date-fns';
import { GetStaticProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { getAllPostsNotion, Post } from '@/lib/notion/posts-notion';
import { Song } from '@/lib/songs';

import PeepSVG from '@/components/images/Peep';

export const getStaticProps: GetStaticProps = async () => {
  const allPosts: Post[] = await getAllPostsNotion();

  const { songs } = await fetch(
    'https://diskograf.com/api/v0/songs/user/wansaleh/loves'
  ).then((res) => res.json());

  return {
    props: {
      songs,
      allPosts,
    },
    revalidate: 1,
  };
};

export default function HomePage({
  songs,
  allPosts,
}: {
  songs: Song[];
  allPosts: Post[];
}) {
  return (
    <div className="w-full">
      <div className="relative w-full overflow-hidden bg-yellow-300 dark:bg-blue-900">
        <div className="w-full py-24 pb-8 layout lg:pb-24">
          <div className="mb-6 grid grid-cols-1 items-center gap-6 lg:mb-8 lg:grid-cols-2 lg:gap-10">
            <div className="flex h-full flex-col justify-center">
              <h2 className="mb-6 font-cd text-4xl font-extrabold tracking-tighter lg:text-6xl">
                Hey, I’m Wan!
              </h2>

              <p className="text-4xl font-light !leading-tight tracking-tighter xl:text-5xl">
                I am a music producer, mixer and mastering engineer from
                Malaysia. I run{' '}
                <a
                  href="https://rekaman.org"
                  className="underline decoration-gray-500/50 decoration-4 underline-offset-4 hover:decoration-current"
                >
                  my studio
                </a>{' '}
                in Ara Damansara, Selangor.
              </p>
            </div>

            <div className="-mt-10 lg:-mb-20">
              <PeepSVG className="h-full w-full -scale-x-100" />
            </div>
          </div>
        </div>

        <div className="absolute -bottom-48 left-[-1000px] right-[-1000px] h-80 -skew-y-3 bg-lightbg dark:bg-darkbg"></div>
      </div>

      <div className="w-full pb-32 layout lg:pb-40">
        <div className="mb-6 lg:mb-8">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-2xl font-bold">
              <span className="inline-block font-cd leading-none">
                Featured Works
              </span>
            </h3>

            <Link href="/discography">
              <a className="group flex items-center gap-2 font-cd text-2xl font-medium">
                View All
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="inline-block h-8 w-8 transition group-hover:translate-x-2"
                >
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </a>
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {songs.map((song) => (
              <SongCard key={song.id} song={song} />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-0 lg:grid-cols-2">
          <div className="h-full bg-darkbg p-6 text-lightbg dark:bg-lightbg dark:text-darkbg lg:p-10 [&_a]:underline [&_a]:decoration-gray-500/50 [&_a]:decoration-2 [&_a]:underline-offset-4 hover:[&_a]:decoration-current">
            <h3 className="mb-4 font-cd text-2xl font-bold">About</h3>

            <p className="max-w-xl text-2xl leading-normal">
              My name is Wan Saleh, and I am a music producer based in Kuala
              Lumpur, Malaysia. Aside from music, I&apos;m also a web developer.
              I&apos;m the founder and developer of{' '}
              <a href="https://diskograf.com">Diskograf.com</a> &mdash; a
              platform to help artists in Malaysia to document their credits in
              music. I run my studio, Rekaman Music in Ara Damansara, Selangor.
            </p>
          </div>

          <div className="p-6 lg:p-10">
            <h3 className="mb-4 font-cd text-2xl font-bold">Writing</h3>

            <div>
              {allPosts.slice(0, 5).map((post) => (
                <div key={post.id} className="link-overlay group mt-4">
                  <h3 className="text-xl font-semibold tracking-tight transition group-hover:text-brand">
                    <Link href={`/blog/${post.slug}`}>
                      <a className="link block truncate">{post.title}</a>
                    </Link>
                  </h3>
                  <div className="text-sm font-semibold text-gray-500">
                    {format(
                      parse(post.date, 'yyyy-MM-dd', new Date()),
                      'MMMM d, yyyy'
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SongCard({ song }: { song: Song }) {
  let artistNames = song.primaryNames.join(', ');
  if (song.primaryNames.length === 2) {
    artistNames = `${song.primaryNames[0]} ft. ${song.primaryNames[1]}`;
  }

  return (
    <div
      key={song.id}
      className="link-overlay group relative h-full w-full overflow-hidden ring-1 ring-slate-500/10 transition duration-300"
    >
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={song.artworks.cdn.artworkMedium}
          alt={song.title}
          className="h-full w-full scale-[102%] object-contain"
          loading="lazy"
          layout="fill"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-black to-transparent opacity-0 transition duration-500 group-hover:opacity-90"></div>

      <div className="absolute inset-0 p-4 text-white opacity-0 drop-shadow-md transition duration-500 group-hover:opacity-100">
        <span className="-mb-1 block text-xs font-semibold opacity-70">
          {format(new Date(song.released_at), 'MMMM yyyy')}
        </span>

        <h3 className="text-lg font-bold tracking-tight">
          <a
            href={`https://youtube.com/watch?v=${song.data.youtube}`}
            target="_blank"
            rel="external noopener noreferrer"
            className="link block truncate"
          >
            {song.title}
          </a>
        </h3>

        <div className="-mt-1 truncate text-sm font-semibold tracking-tight">
          {artistNames}
        </div>
      </div>
    </div>
  );
}
