/* eslint-disable @next/next/no-img-element */
import { formatDistanceToNow, parseISO } from 'date-fns';

import { TTrack } from '@/lib/spotify';

export default function Track({ track }: { track: TTrack }) {
  return (
    <div className="border-b border-gray-200 flex flex-row group items-center leading-tight link-overlay py-2 w-full dark:border-gray-800">
      <div className="flex flex-1 items-center">
        <div className="mr-3">
          <img
            src={track.thumb.url}
            width={track.thumb.width}
            height={track.thumb.height}
            alt=""
            className="h-12 rounded w-12"
          />
        </div>
        <div className="flex flex-1 flex-col">
          <a
            className="duration-200 font-medium line-clamp-1 link text-gray-900 transition dark:text-gray-100 group-hover:text-brand"
            href={track.songUrl}
            target="_blank"
            rel="noopener noreferrer"
            title={`${track.title} — ${track.artist}`}
          >
            {track.title}
          </a>
          <p className="font-medium line-clamp-1 text-gray-500 text-sm truncate">
            {track.artist}
          </p>
          {track.addedAt && (
            <p className="font-medium line-clamp-1 opacity-70 text-gray-500 text-xs truncate">
              {formatDistanceToNow(parseISO(track.addedAt))} ago
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
