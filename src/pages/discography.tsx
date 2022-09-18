import { GetStaticProps } from 'next';
import { useState } from 'react';

import fetchSongsDiskograf from '@/lib/fetch-songs-diskograf';
import { Song } from '@/lib/songs';

import PageTitle from '@/components/PageTitle';
import Seo from '@/components/Seo';
import SongCard from '@/components/SongCard';

export const getStaticProps: GetStaticProps = async () => {
  const data = await fetchSongsDiskograf();

  return {
    props: {
      songs: data.songs,
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
    setLoadedSongs((loadedSongs) => [...loadedSongs, ...data.songs]);
    setLoading(false);
  }

  return (
    <div className="min-h-screen w-full py-24 lg:py-40">
      <Seo templateTitle="Music Works & Discography" />

      <div className="layout">
        <PageTitle
          title="Music Works"
          subtitle="My job. My passion. Some of the works I've involved in."
        />
      </div>

      <div className="mt-12 layout lg:mt-20">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {loadedSongs.map((song) => (
            <SongCard key={song.id} song={song} />
          ))}
        </div>

        {total > loadedSongs.length && (
          <div className="mt-8 text-center">
            <button
              className="relative min-w-[15rem] rounded-lg border-2 border-current bg-black px-4 py-4 text-center text-lg font-semibold tracking-tight text-white transition ease-in dark:bg-white dark:text-black"
              onClick={() => loadMore()}
              disabled={loading}
            >
              {loading ? (
                <svg
                  className="-mt-1 mr-2 inline-block h-6 w-6 animate-spin text-current"
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
