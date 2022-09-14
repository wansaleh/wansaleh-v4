import clsx from 'clsx';
import Link from 'next/link';
import useSWR from 'swr';

export default function NowPlaying({
  showLink = false,
}: {
  showLink?: boolean;
}) {
  const { data: nowPlaying } = useSWR('/api/spotify/nowplaying.json', {
    refreshInterval: 10000,
  });

  return (
    <>
      <div className="p-4 text-center leading-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 48"
          className="-mt-1 mr-1 inline-block h-5"
        >
          <g fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
            <g
              className={clsx(
                nowPlaying?.isPlaying ? 'fill-[#00DA5A]' : 'fill-gray-500'
              )}
              transform="translate(-200.000000, -460.000000)"
            >
              <path d="M238.16,481.36 C230.48,476.8 217.64,476.32 210.32,478.6 C209.12,478.96 207.92,478.24 207.56,477.16 C207.2,475.96 207.92,474.76 209,474.4 C217.52,471.88 231.56,472.36 240.44,477.64 C241.52,478.24 241.88,479.68 241.28,480.76 C240.68,481.6 239.24,481.96 238.16,481.36 M237.92,488.08 C237.32,488.92 236.24,489.28 235.4,488.68 C228.92,484.72 219.08,483.52 211.52,485.92 C210.56,486.16 209.48,485.68 209.24,484.72 C209,483.76 209.48,482.68 210.44,482.44 C219.2,479.8 230,481.12 237.44,485.68 C238.16,486.04 238.52,487.24 237.92,488.08 M235.04,494.68 C234.56,495.4 233.72,495.64 233,495.16 C227.36,491.68 220.28,490.96 211.88,492.88 C211.04,493.12 210.32,492.52 210.08,491.8 C209.84,490.96 210.44,490.24 211.16,490 C220.28,487.96 228.2,488.8 234.44,492.64 C235.28,493 235.4,493.96 235.04,494.68 M224,460 C210.8,460 200,470.8 200,484 C200,497.2 210.8,508 224,508 C237.2,508 248,497.2 248,484 C248,470.8 237.32,460 224,460" />
            </g>
          </g>
        </svg>{' '}
        <span>
          {nowPlaying?.isPlaying ? (
            <Link href={nowPlaying.songUrl}>
              <a rel="external noopener noreferrer" target="_blank">
                Now Playing:{' '}
                <span className="font-semibold">{nowPlaying.album}</span>
                <span className="mx-2 text-gray-500">&mdash;</span>
                {nowPlaying.artist}
              </a>
            </Link>
          ) : (
            <>Not Playing</>
          )}
          {showLink && (
            <>
              <span className="mx-2 text-gray-500">&mdash;</span>
              <Link href="/spotify">
                <a>My Spotify</a>
              </Link>
            </>
          )}
        </span>
      </div>
    </>
  );
}
