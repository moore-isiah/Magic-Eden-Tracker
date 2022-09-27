import React from 'react'
import {Link} from 'react-router-dom'

export default function Header(){

    const homeImage = <div>
        <img src={'https://cryptologos.cc/logos/solana-sol-logo.png?v=023'} className='home-img' />
        <p>tracker</p>
    </div>

    return (
        <header className='header'>
            <Link to='/'>{homeImage}</Link>
            <ul className='links'>
                <li><Link to='/walletTracker'>Wallet Tracker</Link></li>
                <li><Link to='/whaleTracker'>Whale Tracker</Link></li>
                <li><Link to='/whiteListManager'>White List Manager</Link></li>
            </ul>
        </header>
    )
}