import React, { useState } from 'react'
import { useInfiniteQuery, useQuery } from 'react-query'

import errorImg from './icons/errorImg.png'
import twitter from './icons/Twitter-logo.svg'

export default function WhaleTracker () {
    const [allWallets, setAllWallets] = useState({ 
        JawnxWick: {
            name: 'JawnxWick',
            wallet: '7B4qYwRgfZivYfuFErVoFRqqw5K1NvfPJcx2cX9QxUym',
            twitter: 'https://twitter.com/Jawnxwick',
        },
        SolanaGoddes: {
            name: 'SolanaGoddes',
            wallet: 'fr7YFkGeJNGMxVJAhQgp9gZivKSNPcQU4roBK4boKGB',
            twitter: 'https://twitter.com/Solana_Goddess',
        },
        LionFelidae: {
            name: 'LionFelidae',
            wallet: 'BvKDnbsCgrJGADhCoKY8az5c8qhvFHPYaEekucmHsWqH',
            twitter: 'https://twitter.com/LionFelidae',
        },
        MurathSOL: {
            name: 'MurathSOL',
            wallet: '9zjxoKgsQSkcUTv7P4fSYDPFFQn2fUCy7pSwM27dc1jn',
            twitter: 'https://twitter.com/murathsol',
        },
        Tominator: {
            name: 'Tominator',
            wallet: '3AEqNkS6T7ig535rbMc7oDV6uavL2KF3zRGAPbtj5Ngc',
            twitter: ''
        },
        SkellyMode: {
            name: 'SkellyMode',
            wallet: 'BP9a7nk1GJFAeLDJL1BxnXDRxzJviHT66w6Qcznz3t1X',
            twitter: 'https://twitter.com/skellymode_sol'
        }
    })

    const [inputValues, setInputValues] = useState({
        name: '',
        wallet: '',
        twitter:'',
        isActive: true,
    })

    const [activeWallets, setActiveWallets] = useState(['JawnxWick'])

    const NewWhale = (props) => {

        const {data: allData, fetchNextPage} = useInfiniteQuery([props.who.wallet], async ({ pageParam = 1}, wal = props.who.wallet) => {
            const walletRes = await fetch(`https://api-mainnet.magiceden.dev/v2/wallets/${wal}/activities?offset=${(pageParam - 1 ) * 50}&limit=50`)
            const data = await walletRes.json()
            return data
        },
        {getNextPageParam: (lastPage, page) => lastPage.length === 50 ? page.length + 1 : undefined,
        })

        const handleScroll = (e) => {
            const bottom = e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight < 1;
            if(bottom){
                fetchNextPage()                
            }
        }

        const ScrollItem = (props) =>{
            const {data, isLoading, isError} = useQuery([props.tokenMint], async ({}, token = props.tokenMint) => {
                const imgRes = await fetch(`https://api-mainnet.magiceden.dev/v2/tokens/${token}`)
                const imgData = await imgRes.json()
                return imgData
            }, {staleTime: Infinity})
            if(isLoading){
                return(
                    <div className='scroll-item-wh'>
                        <div className='scroll-info-wh'>Loading...</div>
                    </div>
                )
            }else if(isError){
                return(
                    <div className='scroll-item'>
                        <div className='scroll-info'>Error Fetching Data</div>
                    </div>
                )
            }else{
                if(data.image){
                    return (
                        <div className='scroll-item-wh'>
                            <div className='scroll-info-wh'>
                                <div>{data.name}</div>
                            </div>
                            <img src={data.image} className='scroll-img-wh'/>
                        </div>
                    )
            }else{
                return (
                    <div className='scroll-item-wh'>
                        <div className='scroll-info-wh'>
                            <div>Error Fetching Meta Data</div>
                        </div>
                        <img src={errorImg} className='scroll-img-wh'/>
                    </div>
                )
            }
            }
        }

        const buys = (
            <div className='containers-wh' onScroll={handleScroll}>
                <div className='container-label-wh'>
                    <p className='whale-label'>Purchases</p>
                </div>
                <div className='scroll-container-wh'>
                    {   
                        allData?.pages.map(page => {
                            let temp = page?.filter(arg => arg.type === 'buyNow' && arg.buyer === props.who.wallet)
                            let final = temp.map(item => {
                                return <ScrollItem tokenMint={item.tokenMint} price={item.price} />
                            })
                            return final
                        })
                    }
                </div>
            </div>
        )

        const sells = (
            <div className='containers-wh' onScroll={handleScroll}>
                <div className='container-label-wh'>
                    <p className='whale-label'>Sales</p>
                </div>
                <div className='scroll-container-wh'>
                    {
                        allData?.pages.map(page => {
                            let temp = page.filter(arg => arg.type === 'buyNow' && arg.seller === props.who.wallet)
                            let final = temp.map(item => {
                                return <ScrollItem tokenMint={item.tokenMint} price={item.price} />
                            })
                            return final
                        })
                    }
                </div>
            </div> 
        )

        return(
                <div className='whale-container'>
                    <div className='small-header-wh'>
                        <p className='whale-label'>{props.who.name}</p>
                        {props.who.twitter ? <a href={props.who.twitter} target='_blank'><img src={twitter} className='twitter-logo' /></a> : null}
                        <button className='close-whale' onClick={() => {
                            console.log('clicked', activeWallets.length)
                            if(activeWallets.length <= 7){
                                setActiveWallets(() => {
                                    let clicked = activeWallets.indexOf(props.who.name)
                                    return [...activeWallets.slice(0, clicked), ...activeWallets.slice(clicked + 1)]
                                })
                            }else{
                                window.alert('Only a maximum of 7 whales can be displayed at a time.')
                            }
                        }}>X</button>
                    </div>
                    {buys}
                    {sells}
                </div>
        )
    }

    const whaleSelection =  (
       <div className='whale-selection'>
        <p className='whale-selection-label'>Choose up to 7 wallets to be displayed.</p>
            <div className='whale-items-container'>
            {
                Object.keys(allWallets).map(whale => {
                    
                    let isChecked = activeWallets.includes(whale)
                    return(
                        <div className='selection-items'>
                            <label for={whale}>{allWallets[whale].name}</label>
                            <input type='checkbox' id={whale} onChange={() => {
                                let clicked = activeWallets.indexOf(whale)
                                return isChecked ? setActiveWallets([...activeWallets.slice(0, clicked), ...activeWallets.slice(clicked + 1)]) : setActiveWallets([...activeWallets, whale])
                                }} checked={isChecked}></input>
                        </div>
                    )
                })
            }
            </div>
        </div>
    )

    const displayWallets = (
        activeWallets.map(whale => {
            return (
                <NewWhale key={whale} who={allWallets[whale]}/>
            )
        })
    )

    async function handleEnterClick() {
        const res = await fetch(`https://api-mainnet.magiceden.dev/v2/wallets/${inputValues.wallet}/tokens`)

        console.log(res.ok)   

        let regex = /[^a-z]+/gi
        let nameTest = regex.test(inputValues.name)

        if(res.ok && inputValues.wallet && !nameTest) {
            setAllWallets({...allWallets, [inputValues.name]: inputValues})                
            localStorage.setItem(inputValues.name, inputValues)
            setInputValues({
                name: '',
                wallet: '',
                twitter: '',
            })
        }else if(!nameTest){
            window.alert('This is not a valid wallet')
        }else {
            window.alert('Please enter a name without spaces, numers or special charicters')
        }

    }

    return(
        <div className='whale-tracker'>
            <div className='edit-section whale-container'>
                {whaleSelection}
                <div className='enter-section'>
                    <p className='enter-text'>Don't see a whale in the options above? Add your own using the template below.</p>
                    <label for='name' className='enter-lable'>Name ~ </label>
                    <input type='text' className='enter-whale' id='name' placeholder='name - only a-z no spaces' value={inputValues.name} autocomplete='off' onChange={(e) => {setInputValues({...inputValues, name: e.target.value})}}/>
                    <label for='wallet' className='enter-label'>Wallet ~ </label>
                    <input type='text' className='enter-whale' id='wallet' placeholder='Solana address' value={inputValues.wallet} autocomplete='off' onChange={(e) => {setInputValues({...inputValues, wallet: e.target.value})}}/>
                    <label for='twitter' className='enter-label'>Twitter ~ </label>
                    <input type='text' className='enter-whale' id='twitter' placeholder='account link' value={inputValues.twitter} autocomplete='off' onChange={(e) => {setInputValues({...inputValues, twitter: e.target.value})}}/>
                    <button className='whale-add-button' onClick={handleEnterClick}>add</button>
                 </div>
            </div>
            {displayWallets}
        </div>
    )
}