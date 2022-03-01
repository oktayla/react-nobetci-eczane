import { Fragment } from 'react';
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Divider from '@mui/material/Divider'
import ListItemText from '@mui/material/ListItemText'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'

import EczaneImg from '../eczane.png'

import { useSelector, useDispatch } from 'react-redux'
import { setCoordinates } from '../redux/location';

const Sidebar = () => {
    const list = useSelector(state => state.nobetci)

    const dispatch = useDispatch()

    const selectPharmacy = (item) => {
        const {latitude, longitude} = item

        dispatch( setCoordinates({latitude, longitude}) )
    }

    return (
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {list.map((item, index) => (
                <Fragment key={index}>
                    <ListItemButton key={index}  onClick={() => {
                            selectPharmacy(item)
                        }}>
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar variant="square" alt={item.EczaneAdi} src={EczaneImg} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={item.EczaneAdi}
                                secondary={
                                    <>
                                        <Typography sx={{ fontWeight: 'bold' }} component="span" variant="body2" color="text.secondary" >
                                            {item.Sehir} / {item.ilce}<br/>
                                        </Typography>
                                        <Typography sx={{}} component="span" variant="body2">{item.Adresi}</Typography>
                                    </>
                                }
                            />
                        </ListItem>
                    </ListItemButton>

                    <Divider variant="inset" component="li" />
                </Fragment>
            ))}
        </List>
    )
}

export default Sidebar