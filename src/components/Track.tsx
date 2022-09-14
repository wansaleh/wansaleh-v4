/* eslint-disable @next/next/no-img-element */
import { formatDistanceToNow, parseISO } from 'date-fns';

import { TTrack } from '@/lib/spotify';

export default function Track({ track }: { track: TTrack }) {
  return (
    <div className="link-overlay group flex w-full flex-row items-center border-b border-gray-200 py-2 leading-tight dark:border-gray-800">
      <div className="flex flex-1 items-center">
        <div className="mr-3">
          <img
            src={track.thumb.url}
            width={track.thumb.width}
            height={track.thumb.height}
            alt=""
            className="h-12 w-12 rounded"
          />
        </div>
        <div className="flex flex-1 flex-col">
          <a
            className="link font-medium text-gray-900 transition duration-200 line-clamp-1 group-hover:text-brand dark:text-gray-100"
            href={track.songUrl}
            target="_blank"
            rel="noopener noreferrer"
            title={`${track.title} — ${track.artist}`}
          >
            {track.title}
          </a>
          <p className="truncate text-sm font-medium text-gray-500 line-clamp-1">
            {track.artist}
          </p>
          {track.addedAt && (
            <p className="truncate text-xs font-medium text-gray-500 opacity-70 line-clamp-1">
              {formatDistanceToNow(parseISO(track.addedAt))} ago
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
