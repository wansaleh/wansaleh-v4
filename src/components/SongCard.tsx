/* eslint-disable @next/next/no-img-element */
import { format, parseISO } from 'date-fns';
import Image from 'next/image';

import { Song } from '@/lib/songs';

export default function SongCard({ song }: { song: Song }) {
  return (
    <div className="link-overlay group relative h-full w-full overflow-hidden rounded-md transition duration-300">
      <div className="relative aspect-square overflow-hidden bg-black duration-200 ease-out">
        <div className="absolute inset-0 z-0 h-full w-full">
          <Image
            src={song.artworks.cdn.artworkMedium}
            alt={song.title}
            className="scale-[200%] object-contain blur-xl"
            loading="lazy"
            width="600"
            height="600"
          />
        </div>
        <div>
          <Image
            src={song.artworks.cdn.artworkMedium}
            alt={song.title}
            className="scale-[101%] object-contain"
            loading="lazy"
            width="600"
            height="600"
          />
        </div>
      </div>

      <div className="bg-black p-3 text-white">
        <div className="text-xs font-medium tracking-tight">
          {format(parseISO(song.released_at), 'MMMM yyyy')}
        </div>

        <h2 className="text-xl font-bold leading-tight tracking-tight">
          <a
            href={`https://youtube.com/watch?v=${song.data.youtube}`}
            target="_blank"
            rel="external noopener noreferrer"
            className="link line-clamp-1"
          >
            {song.title}
          </a>
        </h2>

        <div className="mt-0.5 text-sm font-medium leading-tight tracking-tight line-clamp-1">
          {song.primaryNames.join(', ')}
        </div>

        <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
          <Info song={song} />
          <Links song={song} />
        </div>

        {process.env.NODE_ENV === 'development' && (
          <div className="absolute top-0 mt-2 bg-black text-xs font-medium leading-tight text-white">
            id: {song.id}
          </div>
        )}
      </div>
    </div>
  );
}

function Info({ song }: { song: Song }) {
  // const replacements = {
  //   Composer: 'Composed',
  //   Producer: 'Produced',
  //   Lyricist: 'Lyrics',
  //   Arranger: 'Arranged',
  //   Recording: 'Recorded',
  //   Mixing: 'Mixed',
  //   Mastering: 'Mastered',
  // };

  // function replaceAll(str, mapObj) {
  //   const re = new RegExp(Object.keys(mapObj).join('|'), 'gi');

  //   return str.replace(re, function (matched) {
  //     return mapObj[matched];
  //   });
  // }

  return (
    <div>
      {/* <div className="font-medium leading-tight line-clamp-1 mt-6 text-xs dark:text-gray-500">
        {roles}
      </div> */}

      <div className="flex flex-wrap gap-2 text-xs font-medium tracking-tight">
        <div className="add-comma">
          {song.genres.slice(0, 2).map(({ genre, order }) => (
            <span key={order}>{genre.title}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function Links({ song }: { song: Song }) {
  return (
    <div className="links relative z-50 flex transform items-center gap-1.5 text-sm font-medium transition">
      {song.data.applemusic && (
        <a
          href={song.data.applemusic}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="sr-only">Apple Music</span>
          <svg
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
            className="block h-[1.25em]"
            fill="currentColor"
          >
            <path d="M 20.84375 2 C 19.203125 2 17.546875 2.851563 16.4375 4.15625 L 16.4375 4.1875 C 15.648438 5.167969 14.792969 6.714844 15.0625 8.5 C 14.933594 8.449219 14.925781 8.464844 14.78125 8.40625 C 14.089844 8.125 13.234375 7.8125 12.21875 7.8125 C 8.238281 7.8125 5.21875 11.417969 5.21875 16.15625 C 5.21875 19.222656 6.25 22.097656 7.625 24.25 C 8.3125 25.328125 9.09375 26.214844 9.90625 26.875 C 10.71875 27.535156 11.570313 28 12.53125 28 C 13.492188 28 14.210938 27.675781 14.75 27.4375 C 15.289063 27.199219 15.707031 27 16.5 27 C 17.214844 27 17.578125 27.195313 18.125 27.4375 C 18.671875 27.679688 19.417969 28 20.40625 28 C 21.476563 28 22.386719 27.476563 23.125 26.8125 C 23.863281 26.148438 24.484375 25.292969 25 24.46875 C 25.515625 23.644531 25.921875 22.835938 26.21875 22.1875 C 26.367188 21.863281 26.476563 21.59375 26.5625 21.375 C 26.648438 21.15625 26.691406 21.09375 26.75 20.84375 L 26.9375 20.03125 L 26.1875 19.6875 C 26.011719 19.609375 25.3125 19.261719 24.6875 18.625 C 24.0625 17.988281 23.53125 17.117188 23.53125 15.78125 C 23.53125 14.488281 24.027344 13.621094 24.5625 13 C 24.828125 12.691406 25.105469 12.4375 25.3125 12.28125 C 25.417969 12.203125 25.5 12.164063 25.5625 12.125 C 25.625 12.085938 25.613281 12.097656 25.71875 12.03125 L 26.5625 11.5 L 26 10.65625 C 24.367188 8.144531 21.753906 7.8125 20.71875 7.8125 C 20.238281 7.8125 19.898438 7.980469 19.46875 8.0625 C 19.710938 7.835938 20.023438 7.695313 20.21875 7.4375 C 20.222656 7.433594 20.214844 7.410156 20.21875 7.40625 C 20.230469 7.394531 20.242188 7.386719 20.25 7.375 L 20.28125 7.375 C 21.347656 6.183594 21.9375 4.582031 21.84375 2.9375 L 21.78125 2 Z M 19.65625 4.3125 C 19.484375 4.972656 19.203125 5.601563 18.75 6.09375 L 18.6875 6.15625 C 18.304688 6.671875 17.714844 7.054688 17.125 7.28125 C 17.289063 6.628906 17.574219 5.96875 17.96875 5.46875 C 17.976563 5.457031 17.992188 5.449219 18 5.4375 C 18.4375 4.9375 19.042969 4.5625 19.65625 4.3125 Z M 12.21875 9.8125 C 12.777344 9.8125 13.390625 10.023438 14.03125 10.28125 C 14.671875 10.539063 15.269531 10.875 16.125 10.875 C 16.976563 10.875 17.621094 10.539063 18.375 10.28125 C 19.128906 10.023438 19.933594 9.8125 20.71875 9.8125 C 21.242188 9.8125 22.535156 10.144531 23.625 11.15625 C 23.433594 11.328125 23.265625 11.453125 23.0625 11.6875 C 22.300781 12.570313 21.53125 13.945313 21.53125 15.78125 C 21.53125 17.6875 22.363281 19.121094 23.25 20.03125 C 23.800781 20.59375 24.140625 20.726563 24.5625 20.96875 C 24.507813 21.09375 24.476563 21.191406 24.40625 21.34375 C 24.136719 21.929688 23.765625 22.679688 23.3125 23.40625 C 22.859375 24.132813 22.308594 24.839844 21.78125 25.3125 C 21.253906 25.785156 20.78125 26 20.40625 26 C 19.839844 26 19.507813 25.84375 18.9375 25.59375 C 18.367188 25.34375 17.582031 25 16.5 25 C 15.363281 25 14.523438 25.335938 13.9375 25.59375 C 13.351563 25.851563 13.046875 26 12.53125 26 C 12.285156 26 11.753906 25.800781 11.15625 25.3125 C 10.558594 24.824219 9.902344 24.082031 9.3125 23.15625 C 8.128906 21.304688 7.21875 18.761719 7.21875 16.15625 C 7.21875 12.214844 9.417969 9.8125 12.21875 9.8125 Z" />
          </svg>
        </a>
      )}

      {song.data.spotify && (
        <a href={song.data.spotify} target="_blank" rel="noopener noreferrer">
          <span className="sr-only">Spotify</span>
          <svg
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
            className="block h-[1.25em]"
            fill="currentColor"
          >
            <path d="M 16 4 C 9.371094 4 4 9.371094 4 16 C 4 22.628906 9.371094 28 16 28 C 22.628906 28 28 22.628906 28 16 C 28 9.371094 22.628906 4 16 4 Z M 16 6 C 21.554688 6 26 10.445313 26 16 C 26 21.554688 21.554688 26 16 26 C 10.445313 26 6 21.554688 6 16 C 6 10.445313 10.445313 6 16 6 Z M 14.40625 10.75 C 12.460938 10.75 10.765625 10.929688 9.15625 11.4375 C 8.730469 11.523438 8.375 11.84375 8.375 12.4375 C 8.375 13.03125 8.8125 13.554688 9.40625 13.46875 C 9.660156 13.46875 9.832031 13.375 10 13.375 C 11.355469 13.035156 12.882813 12.875 14.40625 12.875 C 17.367188 12.875 20.40625 13.535156 22.4375 14.71875 C 22.691406 14.804688 22.777344 14.90625 23.03125 14.90625 C 23.625 14.90625 24.039063 14.46875 24.125 13.875 C 24.125 13.367188 23.871094 13.042969 23.53125 12.875 C 20.992188 11.4375 17.621094 10.75 14.40625 10.75 Z M 14.125 14.46875 C 12.347656 14.46875 11.082031 14.722656 9.8125 15.0625 C 9.390625 15.230469 9.15625 15.492188 9.15625 16 C 9.15625 16.421875 9.492188 16.84375 10 16.84375 C 10.171875 16.84375 10.246094 16.835938 10.5 16.75 C 11.429688 16.496094 12.707031 16.34375 14.0625 16.34375 C 16.855469 16.34375 19.285156 17.023438 21.0625 18.125 C 21.230469 18.210938 21.402344 18.28125 21.65625 18.28125 C 22.164063 18.28125 22.5 17.851563 22.5 17.34375 C 22.5 17.003906 22.339844 16.667969 22 16.5 C 19.800781 15.144531 17.003906 14.46875 14.125 14.46875 Z M 14.40625 18.125 C 12.96875 18.125 11.605469 18.285156 10.25 18.625 C 9.910156 18.710938 9.65625 18.953125 9.65625 19.375 C 9.65625 19.714844 9.921875 20.0625 10.34375 20.0625 C 10.429688 20.0625 10.675781 19.96875 10.84375 19.96875 C 11.945313 19.714844 13.128906 19.5625 14.3125 19.5625 C 16.425781 19.5625 18.359375 20.070313 19.96875 21 C 20.140625 21.085938 20.332031 21.15625 20.5 21.15625 C 20.839844 21.15625 21.164063 20.902344 21.25 20.5625 C 21.25 20.136719 21.066406 19.980469 20.8125 19.8125 C 18.949219 18.710938 16.773438 18.125 14.40625 18.125 Z" />
          </svg>
        </a>
      )}

      <a href={song.permalink} target="_blank" rel="noopener noreferrer">
        <span className="sr-only">Diskograf</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 249 325.5"
          enableBackground="new 0 0 249 325.5"
          className="-mt-1 ml-0.5 block h-[1.15em]"
          fill="currentColor"
          xmlSpace="preserve"
        >
          <path d="M176.4 185.7c-4.3-5-12.3-17.3-12.3-17.3-6.9-7.6-14.9-14.1-24-19.2-6.7-3.7-14-6.7-21.8-8.7s-15.8-3.2-24.2-3.2c-13 0-25.3 2.4-36.7 7.3s-21.4 11.5-30 20.1-15.3 18.6-20.1 30c-5 11.5-7.4 23.8-7.4 36.8 0 13 2.4 25.3 7.3 36.7 4.8 11.4 11.5 21.4 20.1 30 8.6 8.6 18.6 15.3 30 20.1s23.6 7.3 36.7 7.3 25.3-2.4 36.7-7.3c11.4-4.8 21.4-11.5 30-20.1 8.6-8.6 15.3-18.6 20.1-30 26.8 27.5 52.9 11.7 63.5 2.8l4.8-4.5c-59.6-50.1-72.1-79.3-72.7-80.8zm-41.8 45.8c0 5.6-1.1 10.8-3.2 15.6-2 5-5 9.3-8.6 12.8-3.7 3.7-8 6.5-12.8 8.6-5 2-10.2 3.2-15.6 3.2-5.6 0-10.8-1.1-15.6-3.2-5-2-9.3-5-12.8-8.6-3.7-3.7-6.5-8-8.6-12.8-2-5-3.2-10.2-3.2-15.6 0-5.6 1.1-10.8 3.2-15.6 2-5 5-9.3 8.6-12.8 3.7-3.7 8-6.5 12.8-8.6 5-2 10.2-3.2 15.6-3.2 5.6 0 10.8 1.1 15.6 3.2 5 2 9.3 5 12.8 8.6.7.7 1.5 1.5 2 2.2l31.6 36.8c.2.2.4.4.6.4 0 0-11.7-5.4-22.5-13.2.1.7.1 1.5.1 2.2z" />
          <path d="M146.5 0h-6.3v141.2s17.1 11.9 24 27.2c0 0 8.2 12.3 12.3 17.3 2 3.3 6.3 7.3 11.9 11.2V46.7C188.3 7.3 159.7.7 146.5 0z" />
          <path
            style={{
              opacity: '.3',
              fill: '#231f20',
            }}
            enableBackground="new"
            d="M156.9 242.5c-.6-.2-3.2-1.5-7.1-3.5l27.5 36.7c1.3-2.4 2.4-4.8 3.5-7.4.3-.1-13.9-14.8-23.9-25.8z"
          ></path>
        </svg>
      </a>
    </div>
  );
}
