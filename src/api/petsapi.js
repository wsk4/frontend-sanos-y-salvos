import { baseApi } from './baseApi';

export const petsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getDashboard: builder.query({
            query: () => '/bff/dashboard',
            providesTags: ['Pet'],
        }),
        reportPet: builder.mutation({
            query: (formData) => ({
                url: '/mascotas',
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['Pet'],
        }),
    }),
});

export const { useGetDashboardQuery, useReportPetMutation } = petsApi;