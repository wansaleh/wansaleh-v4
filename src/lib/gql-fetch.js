import { GraphQLClient } from 'graphql-request';

const normalEndpoint = process.env.NEXT_PUBLIC_HASURA_ENDPOINT;

export default async function gqlFetch(query, variables) {
  const client = new GraphQLClient(normalEndpoint);

  try {
    return client.request(query, variables);
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      const { response, request } = error;
      console.log(response);
      console.group('GraphQL Error:', query.trim().split('\n')[0]);
      response.errors.map((e) => {
        console.error(`‼️ ${e.extensions.code}:`, e.extensions.path, e.message);
        console.error('‼️ message:', e.message);
      });
      console.error(`🗒 ${request.query}`, request.variables);
      console.groupEnd();
      const err = new Error(JSON.stringify(error, undefined, 2));
      throw err;
    }
    return { error };
  }
}
