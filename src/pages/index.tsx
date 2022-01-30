import { GetStaticProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { fetchSongsById } from '@/lib/fetch-songs';
import { prepareSong, Song } from '@/lib/songs';

import profilePic from '../../public/images/avatar2.jpg';

export const getStaticProps: GetStaticProps = async () => {
  const data = await fetchSongsById([28, 5635, 2272, 7, 38]);

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
      <div className="">
        <Image
          src={profilePic}
          width={160}
          height={160}
          alt=""
          className="rounded-full"
        />

        <h2 className="mb-4 mt-8 text-3xl">Hi, I’m Wan!</h2>
        <p className="leading-relaxed text-lg">
          I am a music producer in Malaysia. Also a composer, studio engineer,
          mixer and mastering engineer. I run my studio in Ara Damansara,
          Selangor.
        </p>
      </div>

      <div className="md:col-span-2 lg:col-span-3">
        <div className="gap-6 grid grid-cols-2 lg:gap-8 lg:grid-cols-3">
          {songs.map((song) => (
            <div key={song.id} className="">
              <div className="aspect-square overflow-hidden relative rounded-xl">
                <Image
                  src={song.artworkURL}
                  alt={song.title}
                  className="h-full object-contain scale-[102%] w-full"
                  loading="lazy"
                  layout="fill"
                />
              </div>
              {/* <div>{song.title}</div> */}
            </div>
          ))}

          <Link href="/discography">
            <a className="backdrop-blur-lg bg-gray-500/10 duration-300 flex group items-center justify-center link-overlay p-4 relative rounded-xl text-2xl transition w-full lg:text-4xl dark:hover:ring-offset-gray-900 hover:ring-2 hover:ring-brand hover:ring-offset-4 hover:ring-offset-gray-100">
              All Discography
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
