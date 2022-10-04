import React from 'react'
import {Switch, Route} from 'react-router-dom'

import Header from './Header'
import Homepage from './Homepage'
import WalletTracker from './WalletTracker'
import WhaleTracker from './WhaleTracker'
import WhiteListManager from './WhiteListManager'

//public-api-test.solscan.io/account/splTransfers
export default function App(){

    return(
        <>
        <Header />
        <Switch>
            <Route exact path='/'>
                <Homepage />
            </Route>
            <Route path='/walletTracker'>
                <WalletTracker />
            </Route>
            <Route path='/whaleTracker'>
                <WhaleTracker />
            </Route>
            <Route path='/whiteListManager'>
                <WhiteListManager />
            </Route>
        </Switch>

        </>
    )
}