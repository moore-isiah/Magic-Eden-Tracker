import React from 'react'


export default function Homepage(){


    return (
        <div className='homepage'>
            <HomeComponent />
            <HomeComponent />
            <HomeComponent />
            <HomeComponent />
        </div>
    )
}

const HomeComponent = () => {

    return (
        <div className='homeComponent'>
            homepage component
        </div>
    )
}