import { useSelector } from 'react-redux'
import GoogleMapReact from 'google-map-react'
import { makeStyles } from '@mui/styles'

import ISTANBUL_CENTER from '../const/istanbul_center'

import NobetciMarker from './NobetciMarker'

const useStyles = makeStyles({
    mapContainer: {
        padding: 10,
        width: '100%',
        minHeight: '400px',
        height: '100%',
    }
  })

const NobetciMap = () => {
    const list = useSelector(state => state.nobetci)
    const location = useSelector(state => state.location)

    const {latitude: lat, longitude: lng} = location.coords

    const getMapBounds = (map, maps) => {
        const bounds = new maps.LatLngBounds()
      
        list.forEach((item) => {
            bounds.extend(new maps.LatLng(
                item.latitude,
                item.longitude,
              ))
        })

        return bounds
      };

    const apiIsLoaded = (map, maps) => {
        const bounds = getMapBounds(map, maps)

        map.fitBounds(bounds)
        map.setZoom(13)
    }

    const classes = useStyles()

    return (
        <div className={classes.mapContainer}>
            <GoogleMapReact
            bootstrapURLKeys={{ key: "AIzaSyDy9eRYpa7luz3gC3-MrT-psHyHmaKSbWw" }}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map, maps }) => apiIsLoaded(map, maps)}
            defaultCenter={ISTANBUL_CENTER}
            center={{lat, lng}}
            defaultZoom={14}
            >

            {list.map((item, index) => {
                const { latitude: lat, longitude: lng, ...props } = item
 
                return <NobetciMarker key={index} lat={lat} lng={lng} {...props} />
            })}
            </GoogleMapReact>
        </div>
    )
}

export default NobetciMap