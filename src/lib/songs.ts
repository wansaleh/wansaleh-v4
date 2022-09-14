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
  permalink: string;
  primaryNames: string[];
  artworks: any;
};

export type Song = RawSong & {
  artworkURL: string;
  // myRoles: string[];
};

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
