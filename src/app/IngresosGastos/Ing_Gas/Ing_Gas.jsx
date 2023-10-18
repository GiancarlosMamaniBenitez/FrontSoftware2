import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Gastos from "./Gastos";
import Ingresos from "./Ingresos";
import { useState } from 'react';

export default function Ing_Gas() {
    
    const [openI, setOpenI] = useState(false);

    const handleClickI = () => {
      setOpenI(!openI);
    };

    const [openG, setOpenG] = useState(false);

    const handleClickG = () => {
      setOpenG(!openG);
    };

    return (
        <>
            <ListItemButton onClick={handleClickI} className='my-2'>
                <ListItemText primary="Registrar Ingresos" />
                {openI ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openI} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <Ingresos />
                </List>
            </Collapse>
            <ListItemButton onClick={handleClickG} className='my-2'>
                <ListItemText primary="Registrar Gastos" />
                {openG ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openG} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <Gastos />
                </List>
            </Collapse>
        </>
    )
}