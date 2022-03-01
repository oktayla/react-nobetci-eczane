import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { useGetCitiesQuery, useGetCountiesByCityQuery } from '../services/api'
import { setCities, setCounties, setCity, setCounty } from '../redux/location'

import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

import { makeStyles } from '@mui/styles'

const useStyles = makeStyles({
    wrapper: {
        margin: '20px',
        minWidth: 120,
    }
})

const Filter = () => {

    const { cities, counties, city, county } = useSelector(state => state.location)

    const { data: citiesData } = useGetCitiesQuery()
    const { data: countiesData } = useGetCountiesByCityQuery({city})

    const dispatch = useDispatch()

    useEffect(() => {
        if( citiesData ) {
            dispatch( setCities(citiesData.data) )
        }

        if( countiesData ) {
            dispatch( setCounties(countiesData.data) )
            dispatch( setCounty(countiesData.data[0].ilceSlug) )
        }
    }, [citiesData, countiesData])

    const handleCity = (event) => {
        dispatch( setCity(event.target.value) )
        dispatch( setCounty(countiesData.data[0].ilceSlug) )
    }
    
    const handleCounty = (event) => {
        dispatch( setCounty(event.target.value) )
    }

    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: 250
            }
        }
    }

    const classes = useStyles()

    return (
    <Box className={classes.wrapper}>

        <Typography sx={{mb: 2.5}} variant="h5" component="div" gutterBottom>
            Nöbetçi <b>Eczane</b>
        </Typography>

        <FormControl fullWidth>
            <InputLabel id="select-city-label">Şehir</InputLabel>
            <Select
                labelId="select-city-label"
                id="select-city"
                value={cities.length ? city : ''}
                label="Şehir"
                onChange={handleCity}
                MenuProps={MenuProps}
            >
                
                {cities.map((item, index) => <MenuItem key={index} value={item.SehirSlug}>{item.SehirAd}</MenuItem>)}
            </Select>
        </FormControl>

        <FormControl fullWidth disabled={!counties.length} sx={{my: 2.5}}>
            <InputLabel id="select-county-label">İlçe</InputLabel>
            <Select
                labelId="select-county-label"
                id="select-county"
                value={counties.length ? county : ''}
                label="Şehir"
                onChange={handleCounty}
                MenuProps={MenuProps}
            >
                {counties.map((item, index) => <MenuItem key={index} value={item.ilceSlug}>{item.ilceAd}</MenuItem>)}
            </Select>
        </FormControl>
    </Box>
    )
}

export default Filter