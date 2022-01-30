import useSWR from 'swr';

import { getSavedTracks, getTopTracks, TTrack } from '@/lib/spotify';

import NowPlaying from '@/components/NowPlaying';
import PageTitle from '@/components/PageTitle';
import Seo from '@/components/Seo';
import Track from '@/components/Track';

// export async function getServerSideProps() {
//   const top = await getTopTracks();
//   const saved = await getSavedTracks();

//   return {
//     props: { top, saved },
//   };
// }

export default function SpotifyPage() {
  const { data: top } = useSWR('/api/spotify/top.json');
  const { data: saved } = useSWR('/api/spotify/saved.json');

  return (
    <>
      <Seo templateTitle="Listens" />

      <div className="layout max-w-7xl min-h-screen py-20 lg:py-40">
        <PageTitle title="Listens" />

        <div className="border-2 border-current max-w-2xl mb-10 mx-auto rounded-xl">
          <NowPlaying />
        </div>

        <div className="gap-16 grid-cols-2 md:grid">
          <div>
            <h2 className="font-light mb-4 text-4xl text-gray-500 tracking-tight">
              Saved Tracks{' '}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="fill-current h-[1em] inline-block"
              >
                <path d="M20.16,5A6.29,6.29,0,0,0,12,4.36a6.27,6.27,0,0,0-8.16,9.48l6.21,6.22a2.78,2.78,0,0,0,3.9,0l6.21-6.22A6.27,6.27,0,0,0,20.16,5Zm-1.41,7.46-6.21,6.21a.76.76,0,0,1-1.08,0L5.25,12.43a4.29,4.29,0,0,1,0-6,4.27,4.27,0,0,1,6,0,1,1,0,0,0,1.42,0,4.27,4.27,0,0,1,6,0A4.29,4.29,0,0,1,18.75,12.43Z" />
              </svg>
            </h2>

            <div className="mb-10 mx-auto">
              {saved ? (
                saved?.map((track: TTrack) => (
                  <Track key={track.songUrl} track={track} />
                ))
              ) : (
                <>Loading tracks...</>
              )}
            </div>
          </div>

          <div>
            <h2 className="font-light mb-4 text-4xl text-gray-500 tracking-tight">
              Top Tracks{' '}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="fill-current h-[1em] inline-block"
              >
                <path d="M18.54,9,8.88,3.46a3.42,3.42,0,0,0-5.13,3V17.58A3.42,3.42,0,0,0,7.17,21a3.43,3.43,0,0,0,1.71-.46L18.54,15a3.42,3.42,0,0,0,0-5.92Zm-1,4.19L7.88,18.81a1.44,1.44,0,0,1-1.42,0,1.42,1.42,0,0,1-.71-1.23V6.42a1.42,1.42,0,0,1,.71-1.23A1.51,1.51,0,0,1,7.17,5a1.54,1.54,0,0,1,.71.19l9.66,5.58a1.42,1.42,0,0,1,0,2.46Z" />
              </svg>
            </h2>

            <div className="mb-10 mx-auto">
              {top ? (
                top.map((track: TTrack) => (
                  <Track key={track.songUrl} track={track} />
                ))
              ) : (
                <>Loading tracks...</>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
