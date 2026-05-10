import { baseApi } from './baseApi';

export const petsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getDashboard: builder.query({
            query: () => '/bff/v1/dashboard',
            providesTags: ['Pet'],
        }),
        reportPet: builder.mutation({
            query: (formData) => ({
                url: '/bff/v1/mascotas',
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['Pet'],
        }),
    }),
});

export const { useGetDashboardQuery, useReportPetMutation } = petsApi;
