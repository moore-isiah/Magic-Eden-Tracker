import React, { useState, useEffect } from 'react'
import { useInfiniteQuery, useQuery } from 'react-query'
import errorImg from './icons/errorImg.png'

//track the buys, sells, sent bids and recieved bids of a specified solana wallet on Magic Eden (ME), all fetches are to different ME end points 
export default function WalletTracker(){
    const [wallet, setWallet] = useState('9ZYCXH5L3znQ1fiLHpA4SaQ5NeScWgrCbFjQNoNjR8VW')
    const [userInput, setUserInput] = useState('')
    const [photos, setPhotos] = useState([])

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

    //once the inital fetch of transactions returns allData, use data from allData to do the following fetches
    useEffect(() => {
        //itterate through the responses from the first fetch to fetch the meta data for each nft based on the tokenMint address of said nft, then add it to the photos state
        async function getActivityPhotos(){ 
            let tempArr = []
            for(let i = 0; i < allData?.pages.length; i++){
                for(let j = 0; j < allData.pages[i].length; j++){
                    if((!tempArr.find(im => im.mintAddress == allData.pages[i][j].tokenMint)) && (!photos.find(im => im.mintAddress == allData.pages[i][j].tokenMint))){
                    const imgRes = await fetch(`https://api-mainnet.magiceden.dev/v2/tokens/${allData.pages[i][j].tokenMint}`)
                    const imgData = await imgRes.json()
                    tempArr.push(imgData)                    
                    }
                }
            }
           setPhotos([...photos, ...tempArr])
        }

        //same as last fetch but for sent bids
        async function getBidOutPhotos() {
            let tempArr = []
            for(let i = 0; i < bidOutData?.length; i++){
                const bidPhotoRes = await fetch(`https://api-mainnet.magiceden.dev/v2/tokens/${bidOutData[i].tokenMint}`)
                const bidPhotoData = await bidPhotoRes.json()
                tempArr.push(bidPhotoData)
            }
            setPhotos([...photos, ...tempArr])
        }

        //same as last two but for recieved bids
        async function getBidInPhotos() {
            let tempArr = []
            for(let i = 0; i < bidInData?.length; i++){
                const bidPhotoRes = await fetch(`https://api-mainnet.magiceden.dev/v2/tokens/${bidInData[i].tokenMint}`)
                const bidPhotoData = await bidPhotoRes.json()
                tempArr.push(bidPhotoData)
            }
            setPhotos([...photos, ...tempArr])
        }


        getActivityPhotos()
        getBidOutPhotos()
        getBidInPhotos()
    }, [allData])

    //maping through the data, filtering the buys of the provided wallet, then filtering the photos state to find its matching image adn returning the jsx to be displayed
    const buys = allData?.pages.map(page => {
        let temp = page?.filter(arg => arg.type === 'buyNow' && arg.buyer === wallet)
        let final = temp.map(item => {
            let tempImg = photos.filter(img => img.mintAddress === item.tokenMint)
            return (
                <div className='scroll-item'>    
                    <div>{tempImg[0]?.name}</div>
                    <img src={tempImg[0]?.image ? tempImg[0].image : errorImg} className='nft-img'/>
                </div>
            )
         })
         return final
    })
    

    //same as the previous but for the sells
    const sells = allData?.pages.map(page => {
        let temp = page.filter(arg => arg.type === 'buyNow' && arg.seller === wallet)
        let final = temp.map(item => {
            let tempImg = photos.filter(img => img.mintAddress === item.tokenMint)
            return (
                <div className='scroll-item'>
                    <div>{tempImg[0]?.name}</div>
                    <img src={tempImg[0]?.image ? tempImg[0].image : errorImg} className='nft-img'/>
                </div>
            )
        })
        return final
    })

    //same as the previous two but for sent bids
    const bidsOut = bidOutData?.map(item => {
            let tempImg = photos.filter(img => img.mintAddress === item.tokenMint)
            return (
                <div className='scroll-item'>
                    <div>{tempImg[0]?.name}</div>
                    <img src={tempImg[0]?.image ? tempImg[0].image : errorImg} className='nft-img'/>
                </div>
            )
    })

    //same as the previous 3 but for recieved bids
    const bidsIn = bidInData?.map(item => {
        let tempImg = photos.filter(img => img.mintAddress === item.tokenMint)
        return (
            <div className='scroll-item'>
                <div>{tempImg[0]?.name}</div>
                <img src={tempImg[0]?.image ? tempImg[0].image : errorImg} className='nft-img'/>
            </div>
        )
})

    //once the user inputs a new wallet set the wallet state to the new one and wait a second for it to update then refetch everything above
    const newWallet = () => {
        setWallet(userInput)
        setTimeout(() => {
            refetchTransactions()
            refetchBidsIn()
            refetchBidsOut()
        }, 1000)
    }

    return (
        <> 
        <input type='textbox' value={userInput} onChange={(event) => setUserInput(event.target.value)} placeholder='New Solana Wallet'></input>
        <button onClick={() => newWallet()}>Submit Wallet</button>
        <div className='wallet-tracker'>
            
            <div className='containers'>
                <p>Purchases</p>
                <button onClick={() => fetchNextPage()}>get more</button>
                {buys}
            </div>

            <div className='containers'>
                <p>Sold</p>
                {sells}
            </div>

            <div className='containers'>
                <p>Sent Offers</p>
                {bidsOut?.length == 0 ? 'No Bids to Display' : bidsOut}
            </div>

            <div className='containers'>
                <p>Offers Recieved</p>
                {bidsIn?.length == 0 ? 'No Offers to Display' : bidsIn}
            </div>
            
        </div>
        </>
    )
}
