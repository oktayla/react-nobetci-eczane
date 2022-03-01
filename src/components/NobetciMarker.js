import { useState } from 'react'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

import { styled, makeStyles } from '@mui/styles'

import CloseIcon from '@mui/icons-material/Close'
import RoomIcon from '@mui/icons-material/Room'
import { pink, red } from '@mui/material/colors'

const CallButton = styled(Button)({
    backgroundColor: '#21D4FD',
    backgroundImage: 'linear-gradient(45deg, #21D4FD 0%, #B721FF 100%)',
    boxShadow: '2px 2px 2px rgba(0, 0, 0, .2) !important',
    width: '100%',
})

const useStyles = makeStyles({
    marker: {
        zIndex: -1,
        color: pink[500]
    },
    close: {
        cursor: 'pointer',
        fontSize: '1rem !important',
        color: red[500]
    },
    infoCard: {
        border: '0 !important',
        boxShadow: '4px 4px 4px rgba(0, 0, 0, .05) !important',
        backgroundColor: 'rgba(255, 255, 255, .4) !important',
        backdropFilter: 'blur(10px)'
    }
}) 

const NobetciMarker = (props) => {
    const [show, setShow] = useState(false)

    const {
        EczaneAdi,
        Adresi,
        Sehir,
        ilce,
        Telefon,
        Telefon2,
        YolTarifi
    } = props

    const classes = useStyles()

    return (
        <>
            {!show ?
                <IconButton onClick={() => setShow(true)}>
                    <RoomIcon className={classes.marker} />
                </IconButton> : (
                <Box sx={{ minWidth: 275, zIndex: 2 }}>
                    <Card variant="outlined" className={classes.infoCard}>
                        <CardHeader
                            sx={{pb: 0}}
                            title={
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    {Sehir} / {ilce}
                                </Typography>
                            }
                            action={
                                <IconButton onClick={() => {
                                    setShow(false)
                                }}>
                                    <CloseIcon className={classes.close} />
                                </IconButton>
                            }
                        />
                        <CardContent>
                            <Typography variant="h5" component="div">
                                {EczaneAdi}
                            </Typography>
                            <Typography variant="body2">
                                {Adresi}
                            </Typography>
                            
                            {Telefon2 && <Typography sx={{ mt: 1.5 }} color="text.secondary">{Telefon2}</Typography>}
                            
                            {YolTarifi && <Typography sx={{ mt: 1.5 }} color="text.secondary">{YolTarifi}</Typography>}
                        </CardContent>
                        <CardActions>
                            <CallButton href={`tel:${Telefon}`} variant="contained" size="small">ECZANEYİ ARA</CallButton>
                        </CardActions>
                    </Card>
                </Box>
            )}
        </>
    )
}

export default NobetciMarker