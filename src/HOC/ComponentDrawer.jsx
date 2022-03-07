import React from 'react'
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';

const ComponentDrawer = ({ betSlip, open, removeBet, toggleClose }) => {
    
    return (
        <>
            <Drawer
                anchor="right"
                open={open}
                onClose={toggleClose}
            >
                {betSlip.bets.map((row, index) => <ul key={index}>
                    <li >{row.betParam.name}</li>
                    <li >{row.betParam.price}</li>
                    <Button variant="contained" onClick={() => removeBet(row.betParam.id)}>DELETE</Button>
                </ul>)}
            </Drawer>
        </>

    )
}
export default ComponentDrawer