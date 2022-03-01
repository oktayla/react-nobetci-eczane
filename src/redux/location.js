import { createSlice } from '@reduxjs/toolkit'

const location = createSlice({
    name: 'location',
    initialState: {
        cities: [],
        counties: [],
        city: 'istanbul',
        county: 'besiktas',
        coords: {
            latitude: 40.990635,
            longitude: 28.89614,
        }
    },
    reducers: {
        setCoordinates: (state, action) => {
            const { latitude, longitude } = action.payload
            state.coords = {latitude, longitude}

            return state
        },
        setCity: (state, action) => {
            state.city = action.payload

            return state
        },
        setCounty: (state, action) => {
            state.county = action.payload

            return state
        },
        setCities: (state, action) => {
            state.cities = action.payload

            return state
        },
        setCounties: (state, action) => {
            state.counties = action.payload

            return state
        }
    }
})

export const { setCoordinates, setCity, setCounty, setCities, setCounties } = location.actions

export default location.reducer