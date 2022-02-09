import { gql } from 'graphql-request';

import gqlFetch from './gql-fetch';
import type { RawSong } from './songs';

const SONG_FRAGMENT = gql`
  fragment listSongFragment on songs {
    id
    title
    data
    released_at
    # youtube_data
    artists(
      # where: { role: { tag: { _in: [primary, writing] } } }
      order_by: { order: asc }
    ) {
      artist {
        id
        name
        prefix_title
        # aliases
        # is_group
        # avatar: data(path: "avatar")
        # cloudinaryAvatar: data(path: "cloudinaryAvatar.secure_url")
        # is_deceased: data(path: "is_deceased")
      }
      role {
        # id
        title
        tag
      }
    }
    genres(order_by: { order: asc }) {
      order
      genre {
        # id
        slug
        title
        color
      }
    }
    notes
  }
`;

const QUERY_BY_USERNAME = gql`
  query GetUserSongs($offset: Int = 0, $limit: Int = 28) {
    songs_aggregate(where: { artists: { artist_id: { _eq: 87 } } }) {
      aggregate {
        count
      }
    }
    songs(
      where: {
        published_at: { _is_null: false }
        deleted_at: { _is_null: true }
        artists: { artist_id: { _eq: 87 } }
      }
      order_by: { released_at: desc }
      limit: $limit
      offset: $offset
    ) {
      ...listSongFragment
    }
  }
  ${SONG_FRAGMENT}
`;

const QUERY_BY_ID = gql`
  query GetUserSongs($ids: [Int]) {
    songs(
      where: {
        published_at: { _is_null: false }
        deleted_at: { _is_null: true }
        id: { _in: $ids }
      }
      order_by: { released_at: desc }
    ) {
      ...listSongFragment
    }
  }
  ${SONG_FRAGMENT}
`;

export default async function fetchSongsDiskograf(offset = 0): Promise<{
  songs: RawSong[];
  total: number;
}> {
  const data = await gqlFetch(QUERY_BY_USERNAME, {
    offset: offset ? Number(offset) : 0,
  });

  return {
    songs: data?.songs || [],
    total: data?.songs_aggregate?.aggregate?.count || 0,
  };
}

export async function fetchSongsById(ids: number[] = []): Promise<{
  songs: RawSong[];
}> {
  const data = await gqlFetch(QUERY_BY_ID, {
    ids: ids.map((id) => Number(id)),
  });

  return {
    songs: data?.songs || [],
  };
}
