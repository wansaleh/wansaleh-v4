import type { RawSong } from './songs';

export default async function fetchSongsDiskograf(offset = 0): Promise<{
  songs: RawSong[];
  total: number;
}> {
  const { songs, total } = await fetch(
    `https://diskograf.com/api/v0/songs/user/wansaleh?limit=20&offset=${offset}`
  ).then((r) => r.json());

  return {
    songs: songs || [],
    total: total || 0,
  };
}

export async function fetchSongsById(ids: number[] = []): Promise<{
  songs: RawSong[];
}> {
  const { songs, total } = await fetch(
    `https://diskograf.com/api/v0/songs/ids/${ids.join(',')}`
  ).then((r) => r.json());

  return {
    songs: songs || [],
  };
}
