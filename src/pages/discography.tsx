import { GetStaticProps } from 'next';
import { useState } from 'react';

import { prepareSong, Song } from '@/lib/songs';

import PageTitle from '@/components/PageTitle';
import Seo from '@/components/Seo';
import SongCard from '@/components/SongCard';

export const getStaticProps: GetStaticProps = async () => {
  const url =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : 'https://by.wansaleh.com';

  const data = await fetch(`${url}/api/songs`).then((res) => res.json());

  return {
    props: {
      songs: data.songs.map(prepareSong),
      total: data.total,
    },
    revalidate: 1,
  };
};

export default function DiscographyPage({
  songs,
  total,
}: {
  songs: Song[];
  total: number;
}) {
  const [loading, setLoading] = useState(false);
  const [loadedSongs, setLoadedSongs] = useState(songs);

  async function loadMore() {
    setLoading(true);
    const data = await fetch(`/api/songs?offset=${loadedSongs.length}`).then(
      (res) => res.json()
    );
    setLoadedSongs((loadedSongs) => [
      ...loadedSongs,
      ...data.songs.map(prepareSong),
    ]);
    setLoading(false);
  }

  return (
    <div className="min-h-screen py-24 w-full lg:py-40">
      <Seo templateTitle="Music Works & Discography" />

      <div className="layout">
        <PageTitle
          title="Music Works"
          subtitle="My job. My passion. Some of the works I've involved in."
        />
      </div>

      <div className="layout max-w-[96rem] mt-20">
        <div className="gap-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {loadedSongs.map((song) => (
            <SongCard key={song.id} song={song} />
          ))}
        </div>

        {total > loadedSongs.length && (
          <div className="mt-20 text-center">
            <button
              className="bg-brand duration-100 ease-in font-semibold min-w-[15rem] px-4 py-4 relative rounded-lg shadow-md text-center text-lg text-white transition dark:focus:ring-offset-gray-900 hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 focus:ring-offset-gray-100"
              onClick={() => loadMore()}
              disabled={loading}
            >
              {loading ? (
                <svg
                  className="-mt-1 animate-spin h-6 inline-block mr-2 text-white w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              ) : (
                <>Load More...</>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
