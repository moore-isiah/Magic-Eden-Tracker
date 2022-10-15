import React from 'react'
import wtsc from './icons/walletTracker.png'

export default function Homepage(){


    return (
        <div className='homepage'>
           <div className='section-container'>
                <img className='section-img' src={wtsc} />
                <div className='section-text'>
                    <h1 className='section-title'>Wallet Tracker</h1>
                    <p>Use the provided default wallet or enter your own unique wallet and track all of its activity breaking it down between its buys, sales, offers you have sent, and offers you have recieved.</p>
                </div>
           </div>
        </div>
    )
}

