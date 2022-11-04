import React from 'react'
import { Link } from 'react-router-dom'

import smallME from './icons/me.png'
import globe from './icons/globe_icon.svg'
import twitter from './icons/Twitter-logo.svg'

export default function Footer(){

    return(
        <div className='footer'>
            <div className='foot-container'>
                <img className='small-me' src={smallME}/>
                <p>Made using Magic Edens public API.</p>
                
                <div className='link-container'>
                    <img className='globe' src={globe} />
                    <a className='link' href='https://magiceden.io/'>magiceden.io</a>
                </div>
                <div className='link-container'>
                    <img className='globe' src={globe} />
                    <a className='link' href='https://api.magiceden.dev/'>Magic Eden API</a>
                </div>
                <div className='link-container'>
                    <img className='globe' src={twitter} />
                    <a className='link' href='https://twitter.com/MagicEden' >Twitter</a>
                </div>

            </div>
            <div className='foot-container'>
                <h1 className='footer-title'>Trackers</h1>
                <Link to='/walletTracker'>
                    <p className='footer-item'>Wallet Tracker</p>
                </Link>
                <Link to='/whaleTracker' >
                    <p className='footer-item'>Whale Tracker</p>
                </Link>
                <Link to='/Portfolio'>
                    <p className='footer-item'>Portfolio</p>
                </Link>
            </div>
            <div className='foot-container'>
                <h1 className='footer-title'>Contact</h1>
            </div>
        </div>
    )
}