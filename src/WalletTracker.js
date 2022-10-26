import React, { useState, useEffect } from 'react'
import { useInfiniteQuery, useQuery } from 'react-query'
import errorImg from './icons/errorImg.png'
import solLogo from './icons/solana-sol-logo.svg'

//track the buys, sells, sent bids and recieved bids of a specified solana wallet on Magic Eden (ME), all fetches are to different ME end points 
const WalletTracker = () => {
    const [wallet, setWallet] = useState('9ZYCXH5L3znQ1fiLHpA4SaQ5NeScWgrCbFjQNoNjR8VW')
    const [userInput, setUserInput] = useState('')

    //using react-query to fetching all transactions from ME
    const {data: allData, fetchNextPage, refetch: refetchTransactions} = useInfiniteQuery(['transactions'], async ({ pageParam = 1}, wal = wallet) => {
        const walletRes = await fetch(`https://api-mainnet.magiceden.dev/v2/wallets/${wal}/activities?offset=${(pageParam - 1 ) * 50}&limit=50`)
        const data = await walletRes.json()
        return data
    },
    {getNextPageParam: (lastPage, page) => lastPage.length === 50 ? page.length + 1 : undefined,
    })

    //using react-query fetch all of the sent offers
    const {data: bidOutData, refetch: refetchBidsOut} = useQuery(['bidOutData'], async ({}, wal = wallet) => {
        const bidOutRes = await fetch(`https://api-mainnet.magiceden.dev/v2/wallets/${wal}/offers_made`)
        const bidOutD = await bidOutRes.json()
        return bidOutD
    })

    //using react-query to fetch all bids revieved
    const {data: bidInData, refetch: refetchBidsIn} = useQuery(['bidInData'], async ({}, wal = wallet) => {
        const bidInRes = await fetch(`https://api-mainnet.magiceden.dev/v2/wallets/${wal}/offers_received`)
        const bidInD = await bidInRes.json()
        return bidInD
    })

    //once the user inputs a new wallet set the wallet state to the new one and wait a second for it to update then refetch everything above
    const newWallet = () => {
        if(userInput.length >= 32 && userInput.length <= 44){
            setWallet(userInput)
        setTimeout(() => {
            refetchTransactions()
            refetchBidsIn()
            refetchBidsOut()
        }, 1000)
        }else {
            window.alert('Please enter a valid wallet!!!')
        }
    }

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
        })
        if(isLoading){
            <div className='scroll-item'>
                <div className='scroll-info'>Loading...</div>
            </div>
        }else if(isError){
            <div className='scroll-item'>
                <div className='scroll-info'>Error Fetching Data</div>
            </div>
        }else{
            if(data.image){
                return (
                    <div className='scroll-item'>
                        <div className='scroll-info'>
                            <div>{data.name}</div>
                            <img src={solLogo} className='sol-logo'/>
                            <div>{props.price}</div>
                            {props.type ? (<div className='type'>{props.type}</div>) : null}
                        </div>
                        <img src={data.image} className='scroll-img'/>
                    </div>
                )
           }else{
            return (
                <div className='scroll-item'>
                    <div className='scroll-info'>
                        <div>Error Fetching Meta Data</div>
                    </div>
                    <img src={errorImg} className='scroll-img'/>
                </div>
            
            )
           }
        }
    }

    //maping through the data, filtering the buys of the provided wallet, then filtering the photos state to find its matching image adn returning the jsx to be displayed
    
    const buys = (
        <div className='containers' onScroll={handleScroll}>
            <div className='container-label'>
                <p>Purchases</p>
            </div>
            <div className='scroll-container'>
                {
                    allData?.pages.map(page => {
                        let temp = page?.filter(arg => arg.type === 'buyNow' && arg.buyer === wallet)
                        let final = temp.map(item => {
                            return <ScrollItem tokenMint={item.tokenMint} price={item.price} />
                        })
                        return final
                    })
                }
            </div>
        </div>
    )

    //same as the previous but for the sells
    const sells = (
        <div className='containers' onScroll={handleScroll}>
            <div className='container-label'>
                <p>Sales</p>
            </div>
            <div className='scroll-container'>
                {
                    allData?.pages.map(page => {
                        let temp = page.filter(arg => arg.type === 'buyNow' && arg.seller === wallet)
                        let final = temp.map(item => {
                            return <ScrollItem tokenMint={item.tokenMint} price={item.price} />
                        })
                        return final
                    })
                }
            </div>
        </div> 
    )

    const allActivity =  (
        <div className='containers all-activity' onScroll={handleScroll}>
                <div className='container-label all-label'>
                    <p>All Activity</p>
                </div>
                <div className='scroll-container'>
                    {
                        allData?.pages.map(page => {
                            let final = page.map(item => {
                                return <ScrollItem tokenMint={item.tokenMint} price={item.price} type={item.type}/>
                            })
                            return final
                        })
                    }
                </div>
            </div>
        
    )

    //same as the previous two but for sent bids
    const bidsOut = bidOutData?.map(item => <ScrollItem tokenMint={item.tokenMint} />)

    //same as the previous 3 but for recieved bids
    const bidsIn = bidInData?.map(item => <ScrollItem tokenMint={item.tokenMint} />)

    return (

        <div className='wallet-tracker'>

            {buys}

            <div className='containers submit-section'>
                <input type='textbox' className='wallet-textbox' value={userInput} onChange={(event) => setUserInput(event.target.value)} placeholder='Enter New Solana Wallet' />
                <button className='submit-wallet-button' onClick={() => newWallet()}>Submit Wallet</button>
                <p>Use the default wallet to test the website or submit your own and track your own activity.</p>
            </div>

           {sells}

            <div className='containers'>
                <div className='container-label'>
                    <p>Sent Offers</p>
                </div>
                <div className='scroll-container'>
                    {bidsOut?.length === 0 ? 'No Bids to Display' : bidsOut}
                </div>
            </div>

            {allActivity}

            <div className='containers'>
                <div className='container-label'>
                    <p>Offers Recieved</p>
                </div>
                <div className='scroll-container'>
                    {bidsIn?.length === 0 ? 'No Offers to Display' : bidsIn}
                </div>
            </div>
            
        </div>
    )
}

export default WalletTracker