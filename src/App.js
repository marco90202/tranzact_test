import React, { useState } from 'react';
import './App.css';
import Header from './HOC/Header'
import Content from './Components/Content'

function App() {

  const data = {
    bets: []
  }

  const [betSlip, setBetSlip] = useState(data)

  const addBet = (betParam) => {
    setBetSlip({
      ...betSlip,
      bets: [...betSlip.bets, { betParam }]
    })
  }

  const removeBet = (betParam) => {
    let betRemoved = {
      bets: betSlip.bets.filter(row => row.betParam.id !== betParam)
    }
    setBetSlip(betRemoved)
  }

  return (
    <div >
      <Header betSlip={betSlip} removeBet={removeBet} />
      <Content addBet={addBet} />
    </div>
  );
}

export default App;
