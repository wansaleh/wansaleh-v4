/* eslint-disable @typescript-eslint/no-explicit-any */
import { GraphQLClient } from 'graphql-request';

const normalEndpoint = process.env.HASURA_ENDPOINT;

export default async function gqlFetch(
  query: string,
  variables: { [key: string]: unknown } = {}
): Promise<any> {
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
