import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { updateList } from './redux/nobetci'
import { setCoordinates } from './redux/location'

import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import LinearProgress from '@mui/material/LinearProgress'

import CssBaseline from '@mui/material/CssBaseline'
import { styled, makeStyles } from '@mui/styles'

import Sidebar from './components/Sidebar'
import Filter from './components/Filter'
import NobetciMap from './components/NobetciMap'

import useGeolocation from './helpers/geolocation'

import {
  useGetCountiesByCityQuery,
  useGetPharmaciesByCountyQuery
} from './services/api'

const useStyles = makeStyles({
  container: {
    width: '100vw',
    minHeight: '100vh',
    display: 'flex !important',
    justifyContent: 'center',
    alignItems: 'center'
  },
  main: {
    width: '100vw',
    backgroundColor: '#fff',
    minHeight: '90vh'
  },
  grid: {
    height: '100%'
  }
})

const App = () => {

  const { latitude, longitude } = useGeolocation()

  const location = useSelector(state => state.location)
  const list = useSelector(state => state.nobetci)

  const { city, county } = location

  const { data: newList, isFetching } = useGetPharmaciesByCountyQuery({city, county})

  const dispatch = useDispatch()

  const updateCoordinates = (data) => {
    dispatch(
      setCoordinates({
        latitude: data.latitude,
        longitude: data.longitude
      })
    )
  }

  useEffect(() => {
      if( newList ) {
        dispatch( updateList(newList.data) )

        updateCoordinates(newList.data[0])
      }

      if( latitude ) {
        //dispatch( setCoordinates({latitude, longitude}) )
      }
  }, [newList, latitude])

  const classes = useStyles()

  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg" className={classes.container}>
        <Box className={classes.main}>

          {isFetching && <LinearProgress color="primary" />}

          <Grid container className={classes.grid}>
            <Grid item xs={12} md={4} lg={4}>
              <Filter />
              <Sidebar />
            </Grid>
            <Grid item xs={12} md={8} lg={8}>
              <NobetciMap />
            </Grid>
          </Grid>

        </Box>
      </Container>
    </>
  )
}

export default App