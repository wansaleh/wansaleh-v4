/* eslint-disable @typescript-eslint/no-explicit-any */
import { format, parse, parseISO } from 'date-fns';
import { GetStaticProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { fetchSongsById } from '@/lib/fetch-songs-diskograf';
import { getAllPostsNotion, Post } from '@/lib/notion/posts-notion';
import { Song } from '@/lib/songs';

import PeepSVG from '@/components/images/Peep';

export const getStaticProps: GetStaticProps = async () => {
  const allPosts: Post[] = await getAllPostsNotion();

  const featuredSongsData = await fetch(
    'https://notion-api.splitbee.io/v1/page/c730d2d7e3044427b03f7bcc4eb9aad7'
  ).then((res) => res.json());

  const featuredSongIDs = Object.values(featuredSongsData)
    .filter((data) => (data as any).value.type === 'bookmark')
    .map((data) => (data as any).value.properties.link.flat())
    .flat()
    .map((url) => Number(url.replace(/^.+\/song\/(\d+)-.+$/, '$1')));

  const data = await fetchSongsById(
    featuredSongIDs || [28, 5635, 2272, 7, 38, 34, 44, 71, 68, 79, 19]
  );

  return {
    props: {
      featuredSongIDs,
      songs: data.songs,
      allPosts,
    },
    revalidate: 1,
  };
};

export default function HomePage({
  featuredSongIDs,
  songs,
  allPosts,
}: {
  featuredSongIDs: number[];
  songs: Song[];
  allPosts: Post[];
}) {
  return (
    <div className="w-full">
      <div className="w-full border-b-4 border-current bg-[#fff000] dark:bg-[#002855]">
        <div className="layout w-full py-24 pb-8 lg:pb-24">
          <div className="mb-6 grid grid-cols-1 items-center gap-6 lg:mb-8 lg:grid-cols-2 lg:gap-10">
            <div className="flex h-full flex-col justify-center">
              <h2 className="mb-6 font-cd text-3xl font-semibold tracking-tight lg:text-5xl">
                Hey, I’m Wan!
              </h2>

              <p className="text-4xl font-light !leading-tight tracking-tight xl:text-6xl">
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

            <div className="">
              <PeepSVG className="h-full w-full -scale-x-100" />
            </div>
          </div>
        </div>
      </div>

      <div className="layout w-full pb-32 pt-10 lg:pb-40">
        <div className="mb-6 lg:mb-8">
          <h3 className="mb-6 text-2xl font-bold tracking-tight lg:mb-8">
            <span className="inline-block rounded-lg bg-darkbg px-6 py-4 font-cd leading-none text-lightbg dark:bg-lightbg dark:text-darkbg">
              Featured Works
            </span>
          </h3>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8 xl:grid-cols-4">
            {featuredSongIDs.map((id) => (
              <SongCard
                key={id}
                song={songs.find((song) => song.id === id) as Song}
              />
            ))}

            <Link href="/discography">
              <a className="link-overlay hover:shadow-solid group relative flex h-full w-full items-center justify-center rounded-lg border-2 border-current p-6 transition duration-300">
                <span className="text-5xl">View All</span>
              </a>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-0 overflow-hidden rounded-lg border-2 border-current lg:grid-cols-2">
          <div className="h-full bg-darkbg p-6 text-lightbg dark:bg-lightbg dark:text-darkbg lg:p-10">
            <h3 className="mb-8 font-cd text-2xl font-bold">About</h3>

            <p className="max-w-xl text-2xl leading-normal">
              My name is Wan Saleh, and I am a music producer based in Kuala
              Lumpur, Malaysia. My business partner is{' '}
              <a
                href="https://instagram.com/ikhwanfatanna"
                // className="underline"
              >
                Ikhwan Fatanna
              </a>
              , who is a singer-songwriter and producer. Together we run our
              studio, Rekaman Music in Ara Damansara, Selangor.
            </p>
          </div>

          <div className="p-6 lg:p-10">
            <h3 className="mb-8 font-cd text-2xl font-bold">Writing</h3>

            <div>
              {allPosts.slice(0, 3).map((post) => (
                <div key={post.id} className="link-overlay group mt-4">
                  <h3 className="text-xl font-semibold tracking-tight transition group-hover:text-brand">
                    <Link href={`/blog/${post.slug}`}>
                      <a className="link">{post.title}</a>
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
      className="link-overlay hover:shadow-solid group relative h-full w-full overflow-hidden rounded-lg border-2 border-current transition duration-300"
    >
      <div className="relative aspect-square overflow-hidden border-b-2 border-current">
        <Image
          src={song.artworks.cdn}
          alt={song.title}
          className="h-full w-full scale-[102%] object-contain"
          loading="lazy"
          layout="fill"
        />
      </div>

      <div className="p-4 lg:p-6">
        <h3 className="text-xl font-bold tracking-tight line-clamp-1">
          <a
            href={`https://youtube.com/watch?v=${song.data.youtube}`}
            target="_blank"
            rel="external noopener noreferrer"
            className="link line-clamp-1"
          >
            {song.title}
          </a>
        </h3>

        <div className="text-base font-semibold tracking-tight text-slate-500 line-clamp-1">
          {artistNames}{' '}
          <span className="ml-1 font-normal">
            {format(parseISO(song.released_at), 'yyyy')}
          </span>
        </div>
      </div>
    </div>
  );
}
