/* eslint-disable @typescript-eslint/no-explicit-any */
import { format, parse } from 'date-fns';
import { GetStaticProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { fetchSongsById } from '@/lib/fetch-songs-diskograf';
import { getAllPostsNotion, Post } from '@/lib/posts-notion';
import { prepareSong, Song } from '@/lib/songs';

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
      songs: data.songs.map(prepareSong),
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
    <div className="layout min-h-screen py-24 w-full lg:py-40">
      <div className="-scale-y-100 -z-10 absolute h-screen left-0 opacity-50 top-0 w-full">
        <Image src="/images/grad.png" alt="" layout="fill" />
      </div>

      <div className="gap-10 grid grid-cols-1 items-center mb-6 lg:grid-cols-2 lg:mb-8">
        <div className="flex flex-col h-full justify-center">
          <h2 className="font-semibold mb-6 text-3xl tracking-tight">
            Hey, I’m Wan!
          </h2>

          <p className="!leading-tight font-light text-3xl tracking-tight xl:text-4xl">
            I am a music producer, mixer and mastering engineer from Malaysia. I
            run{' '}
            <a
              href="https://rekaman.org"
              className="decoration-4 decoration-gray-500/50 underline underline-offset-4 hover:text-brand"
            >
              my studio
            </a>{' '}
            in Ara Damansara, Selangor.
          </p>
        </div>

        <div className="">
          <PeepSVG className="h-full w-full" />
        </div>
      </div>

      <div className="mb-6 lg:mb-8">
        <h3 className="font-bold mb-6 text-2xl tracking-tight lg:mb-8">
          <span className="border-4 border-current inline-block leading-none p-6 rounded-lg">
            Featured Works
          </span>
        </h3>

        <div className="gap-6 grid grid-cols-2 lg:gap-8 lg:grid-cols-3 xl:grid-cols-4">
          {featuredSongIDs.map((id) => (
            <SongCard
              key={id}
              song={songs.find((song) => song.id === id) as Song}
            />
          ))}

          <Link href="/discography">
            <a className="border-2 border-current duration-300 flex group h-full items-center justify-center link-overlay relative rounded-lg transition w-full hover:shadow-solid">
              <span className="text-5xl">View All</span>
            </a>
          </Link>
        </div>
      </div>

      <div className="border-2 border-current gap-0 grid grid-cols-1 overflow-hidden rounded-lg lg:grid-cols-2">
        <div className="bg-darkbg h-full p-8 text-lightbg lg:p-10 dark:bg-lightbg dark:text-darkbg">
          <h3 className="font-semibold mb-8 text-2xl">About</h3>

          <p className="leading-normal max-w-xl text-2xl">
            My name is Wan Saleh, and I am a music producer based in Kuala
            Lumpur, Malaysia. My business partner is Ikhwan Fatanna, also a
            composer and producer. Together we run our studio, Rekaman Music in
            Ara Damansara, Selangor.
          </p>
        </div>

        <div className="p-8 lg:p-10">
          <h3 className="font-semibold mb-8 text-2xl">Writing</h3>

          <div>
            {allPosts.slice(0, 3).map((post) => (
              <div key={post.id} className="group link-overlay mt-4">
                <h3 className="font-semibold text-xl tracking-tight transition group-hover:text-brand">
                  <Link href={`/blog/${post.slug}`}>
                    <a className="link">{post.title}</a>
                  </Link>
                </h3>
                <div className="font-semibold text-gray-500 text-sm">
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
  );
}

function SongCard({ song }: { song: Song }) {
  let artistNames = song.artistNames.join(', ');
  if (song.artistNames.length === 2) {
    artistNames = `${song.artistNames[0]} ft. ${song.artistNames[1]}`;
  }

  return (
    <div
      key={song.id}
      className="border-2 border-current duration-300 group h-full link-overlay overflow-hidden relative rounded-lg transition w-full hover:shadow-solid"
    >
      <div className="aspect-square border-b-2 border-current overflow-hidden relative">
        <Image
          src={song.artworkURL}
          alt={song.title}
          className="h-full object-contain scale-[102%] w-full"
          loading="lazy"
          layout="fill"
        />
      </div>

      <div className="p-4 lg:p-6">
        <h3 className="font-bold line-clamp-1 text-xl tracking-tight">
          <a
            href={`https://youtube.com/watch?v=${song.data.youtube}`}
            target="_blank"
            rel="external noopener noreferrer"
            className="line-clamp-1 link"
          >
            {song.title}
          </a>
        </h3>

        <div className="font-bold line-clamp-1 text-base text-slate-500 tracking-tight">
          {artistNames}
        </div>
      </div>
    </div>
  );
}
