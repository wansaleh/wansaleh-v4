import slugify from 'slugify';

type Data = {
  artwork: string;
  spotify: string;
  youtube: string;
  dateType?: string;
  duration: number;
  applemusic: string;
  artworkThumb: string;
  artworkCustom?: string;
  artworkMedium: string;
};

type Role = {
  title: string;
  tag: string;
};

type Artist = {
  artist: {
    id: number;
    name: string;
    prefix_title?: string;
  };
  role: Role;
};

type Genre = {
  order: number;
  genre: {
    slug: string;
    title: string;
    color: string;
  };
};

export type RawSong = {
  id: number;
  title: string;
  data: Data;
  released_at: string;
  artists: Artist[];
  genres: Genre[];
  notes?: string;
  // youtube_data: any;
};

export type Song = RawSong & {
  permalink: string;
  artistNames: string[];
  artworkURL: string;
  myRoles: string[];
};

export function prepareSong(song: RawSong): Song {
  const permalink = getDiskografLink(song);
  const artistNames = getArtistNames(song);
  const artworkURL = getArtworkURL(song);
  const myRoles = song.artists
    .filter(({ artist }) => artist.id === 87)
    .map(({ role }) => role.title);

  return {
    ...song,
    permalink,
    artistNames,
    artworkURL,
    myRoles,
  };
}

export function convertCdn(url: string): string {
  return url
    ?.replace(/\/\/is([1-5])-ssl.mzstatic.com/, '//dkg-is$1.b-cdn.net')
    .replace('//i.scdn.co', '//dkg-scdn.b-cdn.net')
    .replace('//i.ytimg.com/vi', '//dkg-ytimg.b-cdn.net');
}

export function getArtworkURL(song: RawSong, size = 'artwork'): string {
  if (song?.data?.artworkCustom)
    return `https://dkg-cloudinary.b-cdn.net/image/fetch/c_pad,w_600,h_600/${song.data.artworkCustom}`;

  if (song?.data?.[size]) return convertCdn(song.data[size]);

  if (song?.data?.youtube)
    return convertCdn(
      `https://i.ytimg.com/vi/${song.data.youtube}/hqdefault.jpg`
    );

  return 'https://via.placeholder.com/600x600?text=No%20Artwork';
}

export function getArtistNames(song: RawSong): string[] {
  return song.artists
    .filter(({ role }) => role.tag === 'primary')
    .map(({ artist }) => `${artist.prefix_title || ''} ${artist.name}`.trim());
}

export default function getDiskografLink(song: RawSong): string {
  return `https://diskograf.com/explore/song/${song.id}-${getSlug(
    song.title
  )}?ref=wansalehdotcom`;
}

function getSlug(text: string): string {
  if (!text) return text;

  return slugify(text, {
    remove: /[*+~,.()'"!:@#]/g,
    lower: true,
  });
}
