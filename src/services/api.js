import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({
    baseUrl: 'https://www.nosyapi.com/apiv2',
    prepareHeaders: (headers) => {
        headers.set('content-type', 'application/json')
        headers.set('authorization', 'Bearer dErm8eYhyr6rAndupn3tlsJ1Pj6jaAT0H3nkV4bZyV0C2qBJLI48UHM5nSus')
  
        return headers
    },
})

const pharmacyApi = createApi({
    reducerPath: 'pharmacyApi',
    baseQuery,
    endpoints: (builder) => ({
        getCities: builder.query({
            query: () => `/pharmacy/city`
        }),
        getCountiesByCity: builder.query({
            query: ({city}) => `/pharmacy/city?city=${city}`
        }),
        getPharmaciesByCity: builder.query({
            query: ({city}) => `/pharmacy?city=${city}`,
        }),
        getPharmaciesByCounty: builder.query({
            query: ({city, county}) => `/pharmacy?city=${city}&county=${county}`
        }),
        getPharmaciesByCoords: builder.query({
            query: ({latitude, longitude}) => `/pharmacy/distance?latitude=${latitude}&longitude=${longitude}`
        })
    }),
})

export const {
    useGetCitiesQuery,
    useGetCountiesByCityQuery,
    useGetPharmaciesByCityQuery,
    useGetPharmaciesByCountyQuery,
    useGetPharmaciesByCoordsQuery
} = pharmacyApi

export default pharmacyApi