import { baseApi } from './baseApi';

export const petsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getDashboard: builder.query({
            query: () => '/v1/dashboard',
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
            providesTags: ['Pets'],
        }),
        getPetById: builder.query({
            query: (id) => `/v1/mascotas/${id}`,
            transformResponse: (dto) => ({
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
            }),
            providesTags: (result, error, id) => [{ type: 'Pets', id }],
        }),
        reportPet: builder.mutation({
            query: (formData) => ({
                url: '/v1/mascotas',
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['Pets'],
        }),
    }),
});

export const {
    useGetDashboardQuery,
    useGetPetByIdQuery,
    useReportPetMutation
} = petsApi;