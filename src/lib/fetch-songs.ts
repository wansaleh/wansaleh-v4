import { gql } from 'graphql-request';

import gqlFetch from './gql-fetch';
import type { RawSong } from './songs';

const QUERY_BY_USERNAME = gql`
  query GetUserSongs($offset: Int = 0, $limit: Int = 20) {
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

export default async function fetchSongs(offset = 0): Promise<{
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
