import React, { useState, useEffect } from 'react'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress'
import { get } from '../Utils/Helpers'

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    margin: '10px',
    textAlign: 'center',
    color: theme.palette.text.secondary,
    borderTop: '5px'
}));

const RowItem = styled(Paper)(() => ({
    textAlign: 'start',
    boxShadow: 'none'
}));

const CenterItem = styled(Paper)(() => ({
    textAlign: 'center'
}));

const Content = ({addBet}) => {

    const object = {
        data: null,
        loader: true,
        error: null
    }

    const [scope, setScope] = useState(object)

    const addBetSlip = (betSlip, text) => {
        let bet = {
            id: betSlip.id,
            name: betSlip.name + text,
            price: betSlip.price
        }
        addBet(bet)
    }

    useEffect(() => {

        if (!scope.loader) return

        get('http://www.mocky.io/v2/59f08692310000b4130e9f71', null, function (status, response) {
            if (status === 200) {
                setScope({
                    ...scope,
                    data: response,
                    loader: false
                })
            } else {
                setScope({
                    ...scope,
                    loader: false,
                    error: 'Error en respuesta'
                })
            }
        })
    }, [scope])
    
    return (
        <Box sx={{ flexGrow: 1 }}>
            {scope.data !== null ? scope.data.map((row, index) => row.markets.length > 0 ? <Grid container spacing={2} key={index}>
                <Grid item xs={12}>
                    <Item>
                        <Grid item xs={12}>
                            <label>{row.name}</label>
                        </Grid>
                        <RowItem>
                            <div> To Win</div>
                            <Grid container>
                                {row.markets.map((bRow, bIndex) => bIndex === 0 && bRow.selections.map((crow, cindex) => <Grid item xs={6} key={cindex}>
                                    <Item onClick={() => addBetSlip(crow," to win")} key={cindex}>{crow.name} <br></br> {crow.price}</Item>
                                </Grid>))}
                            </Grid>
                            {row.markets.length > 1 && <div> To Score First</div>}
                            <Grid container >
                                {row.markets.map((bRow, bIndex) => bIndex === 1 && bRow.selections.map((crow, cindex) => <Grid item xs={4} key={cindex}>
                                    <Item onClick={() => addBetSlip(crow," to score first")} key={cindex}>{crow.name} <br></br> {crow.price}</Item>
                                </Grid>))}
                            </Grid>
                        </RowItem>
                    </Item>
                </Grid>
            </Grid> : null) : <CenterItem><CircularProgress /> <CircularProgress color="secondary" /></CenterItem>}
        </Box>
    )

}
export default Content