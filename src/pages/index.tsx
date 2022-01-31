import { Client } from '@notionhq/client';
import { GetStaticProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { fetchSongsById } from '@/lib/fetch-songs';
import { prepareSong, Song } from '@/lib/songs';

import profilePic from '../../public/images/avatar2.jpg';

export const getStaticProps: GetStaticProps = async () => {
  const notion = new Client({
    auth: process.env.NOTION_TOKEN,
  });
  const response = await notion.databases.query({
    database_id: 'c6193808725b45adb21ccea578af239e',
  });
  let ids: number[] | null = null;
  if (
    'properties' in response.results[0] &&
    'rich_text' in response.results[0].properties.Value
  ) {
    ids = response.results[0].properties.Value.rich_text[0].plain_text
      .split(/\s?,\s?/)
      .map(Number);
  }

  const data = await fetchSongsById(
    ids || [28, 5635, 2272, 7, 38, 34, 44, 71, 68, 79, 19]
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
        <div className="gap-6 grid grid-cols-2 lg:gap-68 lg:grid-cols-3">
          {songs.map((song) => (
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
              <div className="font-bold mt-3 text-xl">{song.title}</div>
              <div className="font-normal mt-0 text-base text-gray-500">
                {song.artistNames.join(', ')}
              </div>
            </div>
          ))}

          <Link href="/discography">
            <a className="aspect-square backdrop-blur-lg bg-gray-500/10 duration-300 flex group items-center justify-center link-overlay p-4 relative rounded-xl text-2xl transition w-full lg:text-4xl dark:hover:ring-offset-gray-900 hover:ring-2 hover:ring-brand hover:ring-offset-4 hover:ring-offset-gray-100">
              All Discography
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
