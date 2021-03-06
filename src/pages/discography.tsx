import { GetStaticProps } from 'next';
import { useState } from 'react';

import fetchSongsDiskograf from '@/lib/fetch-songs-diskograf';
import { prepareSong, Song } from '@/lib/songs';

import PageTitle from '@/components/PageTitle';
import Seo from '@/components/Seo';
import SongCard from '@/components/SongCard';

export const getStaticProps: GetStaticProps = async () => {
  const data = await fetchSongsDiskograf();

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

      <div className="layout mt-12 lg:mt-20">
        <div className="gap-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {loadedSongs.map((song) => (
            <SongCard key={song.id} song={song} />
          ))}
        </div>

        {total > loadedSongs.length && (
          <div className="mt-20 text-center">
            <button
              className="border-2 border-current ease-in font-semibold min-w-[15rem] px-4 py-4 relative rounded-lg text-center text-lg transition hover:shadow-solid active:shadow-solid"
              onClick={() => loadMore()}
              disabled={loading}
            >
              {loading ? (
                <svg
                  className="-mt-1 animate-spin h-6 inline-block mr-2 text-current w-6"
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
