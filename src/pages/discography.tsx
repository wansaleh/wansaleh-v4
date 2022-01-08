import { map } from 'lodash-es';
import { useState } from 'react';

import fetchSongs from '@/lib/fetch-songs';
import { prepareSong, Song } from '@/lib/songs';

import PageTitle from '@/components/PageTitle';
import Seo from '@/components/Seo';
import SongCard from '@/components/SongCard';

export async function getStaticProps() {
  const data = await fetchSongs();

  return {
    props: {
      songs: map(data.songs, prepareSong),
      total: data.total,
    },
  };
}

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
    const data = await fetchSongs(loadedSongs.length);
    setLoadedSongs((loadedSongs) => [
      ...loadedSongs,
      ...map(data.songs, prepareSong),
    ]);
    setLoading(false);
  }

  return (
    <>
      <Seo templateTitle="Music Works & Discography" />

      <div className="lg:py-40 py-20 min-h-screen">
        <div className="layout">
          <PageTitle title="Music Works" />
        </div>

        <div className="layout max-w-[96rem]">
          <div className="lg:grid-cols-5 md:grid-cols-3 grid grid-cols-1 gap-12">
            {loadedSongs.map((song) => (
              <SongCard key={song.id} song={song} />
            ))}
          </div>

          {total > loadedSongs.length && (
            <div className="mt-20 text-center">
              <button
                className="py-4 px-4 bg-brand hover:bg-purple-800 focus:ring-brand focus:ring-offset-gray-100 dark:focus:ring-offset-gray-900 text-white transition ease-in duration-100 text-center text-lg font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg min-w-[15rem] relative"
                onClick={() => loadMore()}
                disabled={loading}
              >
                {loading ? (
                  <svg
                    className="inline-block mr-2 -mt-1 w-6 h-6 text-white animate-spin"
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
    </>
  );
}
