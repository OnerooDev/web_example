import { debugExchange, fetchExchange } from 'urql';
import { cacheExchange } from '@urql/exchange-graphcache';
import { ClientOptions } from '@urql/core';
import { NextUrqlClientConfig } from 'next-urql';
import { Back_URL } from './const';

// function betterUpdateQuery<Result, Query>(
//   cache: Cache,
//   qi: QueryInput,
//   result: any,
//   fn: (r: Result, q: Query) => Query
// ) {
//   return cache.updateQuery(qi, (data: any) => fn(result, data as any) as any);
// }

export const createUrqlClient: NextUrqlClientConfig = (ssrExchange: any, ctx?: any): ClientOptions => ({
  url: Back_URL,
  fetchOptions: {
    credentials: 'include' as const,
  },
  exchanges: [
    debugExchange,
    ssrExchange,
    fetchExchange],
});
