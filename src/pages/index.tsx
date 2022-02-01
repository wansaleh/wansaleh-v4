import { GetStaticProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { fetchSongsById } from '@/lib/fetch-songs';
import { prepareSong, Song } from '@/lib/songs';

import profilePic from '../../public/images/avatar2.jpg';

export const getStaticProps: GetStaticProps = async () => {
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
      songs: data.songs.map(prepareSong),
    },
    revalidate: 1,
  };
};

export default function HomePage({ songs }: { songs: Song[] }) {
  return (
    <div className="gap-10 grid grid-cols-1 layout min-h-screen py-24 w-full md:grid-cols-3 lg:grid-cols-4 lg:py-40">
      <div>
        <div className="sticky top-10">
          <Image
            src={profilePic}
            width={160}
            height={160}
            alt=""
            className="rounded-full"
          />

          <h2 className="font-semibold mb-4 mt-8 text-3xl">Hi, I’m Wan!</h2>
          <p className="leading-relaxed text-lg">
            I am a music producer in Malaysia. Also a composer, studio engineer,
            mixer and mastering engineer. I run my studio in Ara Damansara,
            Selangor.
          </p>
        </div>
      </div>

      <div className="md:col-span-2 lg:col-span-3">
        <div className="gap-6 grid grid-cols-2 lg:gap-8 lg:grid-cols-3 xl:grid-cols-4">
          {songs.map((song) => (
            <SongCard key={song.id} song={song} />
          ))}

          <Link href="/discography">
            <a className="aspect-square backdrop-blur-lg bg-gray-500/10 duration-300 flex group items-center justify-center link-overlay p-4 relative rounded-xl text-2xl transition w-full lg:text-4xl dark:hover:ring-offset-gray-900 hover:ring-2 hover:ring-brand hover:ring-offset-4 hover:ring-offset-gray-100">
              <svg
                className="stroke-current"
                height="4em"
                width="4em"
                fill="none"
                stroke="#000"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line x1="12" x2="12" y1="5" y2="19" />
                <line x1="5" x2="19" y1="12" y2="12" />
              </svg>
              <span className="sr-only">All Discography</span>
            </a>
          </Link>
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
    <div key={song.id}>
      <div className="aspect-square overflow-hidden relative rounded-xl">
        <Image
          src={song.artworkURL}
          alt={song.title}
          className="h-full object-contain scale-[102%] w-full"
          loading="lazy"
          layout="fill"
        />
      </div>
      <div className="font-bold line-clamp-1 mt-3 text-xl">{song.title}</div>
      <div className="font-bold line-clamp-1 mb-6 text-base text-slate-500">
        {artistNames}
      </div>
    </div>
  );
}
