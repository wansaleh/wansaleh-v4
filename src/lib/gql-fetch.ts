import { GraphQLClient } from 'graphql-request';

const normalEndpoint = process.env.NEXT_PUBLIC_HASURA_ENDPOINT;

export default async function gqlFetch(
  query: string,
  variables: { [key: string]: string } = {}
): Promise<unknown> {
  const client = new GraphQLClient(normalEndpoint as string);

  try {
    return client.request(query, variables);
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      const err = new Error(JSON.stringify(error, undefined, 2));
      throw err;
    }
    return { error };
  }
}
