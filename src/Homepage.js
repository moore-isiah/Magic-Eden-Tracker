import React from 'react'
import { Link } from 'react-router-dom'

import wtsc from './icons/walletTracker.png'
import wt1 from './icons/wt1.png'

export default function Homepage(){


    return (
        <div className='homepage'>
           
           <div className='first section-container'>
                <Link to='/walletTracker'>
                    <img className='section-img' src={wtsc} />
                </Link>

                <div className='section-text'>
                    <Link to='walletTracker'>
                        <h1 className='section-title'>Wallet Tracker</h1>
                    </Link>
                    <p className='wallet-text'>Use the provided default wallet or enter your own unique wallet and track all of its activity breaking it down between its buys, sales, offers you have sent, and offers you have recieved.</p>
                </div>
           </div>
           <div className=' second section-container'>
                <div className='section-text'>
                    <Link to='/whaleTracker'>
                        <h1 className='section-title'>Whale Tracker</h1>
                    </Link>
                    <p className='whale-text'>Choose from a list of preset whales or enter your own to track the buys and sales of up to 7 at a time.</p>
                </div>
                <Link to='/whaleTracker'>
                    <img className='section-img wt1' src={wt1} />
                </Link>
           </div>
        </div>
    )
}

