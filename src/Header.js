import React, { useState } from 'react'
import hamburger from './icons/hamburger-menu.svg'
import magicEden from './icons/magicEdenLogo.svg'

import {Link} from 'react-router-dom'


export default function Header(){
const [open, setOpen] = useState(false);



return (
    <div className='header'>
        <Link to='/' className='solLogo'>
            <img src={magicEden} className='sol' />
        </Link>
        <h1 className='header-txt'>Magic Eden Tracker</h1>
        <div className='menu-container'>
            <div className='menu-trigger' onClick={() => {setOpen(true)}}>
                <img src={hamburger} ></img>
            </div>
            <div className={`dropdown-menu ${open ? 'active' : 'inactive'}`} onMouseLeave={() => setOpen(false)}>
                <ul>
                    <DropdownItem link='/' title='Homepage' />
                    <DropdownItem link='/walletTracker' title='Wallet Tracker' />
                    <DropdownItem link='/whaleTracker' title='Whale Tracker' />
                </ul>
            </div>
        </div>
    </div>
)
}



const DropdownItem = props => {
    return (
        <Link to={props.link} className='dropdownItem'>{props.title}</Link>
    )
}