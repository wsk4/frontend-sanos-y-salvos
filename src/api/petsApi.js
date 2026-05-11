import { baseApi } from './baseApi';

export const petsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getDashboard: builder.query({
            query: () => '/bff/v1/dashboard',
            transformResponse: (response) => response.map(dto => ({
                id: dto.idMascota,
                direccion: dto.direccion,
                contactoInfo: dto.contactoInfo,
                mascota: {
                    nombre: dto.nombre,
                    raza: dto.raza,
                    estado: dto.estado,
                    fotoBytes: dto.fotoBytes ?? null,
                    color: dto.color,
                    tamano: dto.tamano
                },
                geolocalizacion: dto.latitud != null
                    ? { latitud: dto.latitud, longitud: dto.longitud }
                    : null,
            })),
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