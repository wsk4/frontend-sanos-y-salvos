import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,

    prepareHeaders: async (headers) => {
      try {
        if (window.Clerk && !window.Clerk.session) {
          await Promise.race([
            new Promise((resolve) => window.Clerk.addListener(({ session }) => {
              if (session) resolve();
            })),
            new Promise((resolve) => setTimeout(resolve, 5000))
          ]);
        }

        const token = await window.Clerk?.session?.getToken();
        if (token) {
          headers.set('Authorization', 'Bearer ${token}');
        }
      } catch (_) {}
      return headers;
    },
  }),
  tagTypes: ['Pet', 'Location'],
  endpoints: () => ({}),
});