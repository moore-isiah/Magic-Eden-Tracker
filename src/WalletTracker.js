import React, { useState, useEffect } from 'react'
import { useInfiniteQuery } from 'react-query'
import errorImg from './icons/errorImg.png'

export default function WalletTracker(){
    const [wallet, setWallet] = useState('9ZYCXH5L3znQ1fiLHpA4SaQ5NeScWgrCbFjQNoNjR8VW')
    const [userInput, setUserInput] = useState('')
    const [photos, setPhotos] = useState([])

    const {data, fetchNextPage} = useInfiniteQuery(['transactions'], async ({ pageParam = 1}, wal = wallet) => {
        const walletRes = await fetch(`https://api-mainnet.magiceden.dev/v2/wallets/${wal}/activities?offset=${(pageParam - 1 ) * 50}&limit=50`)
        const data = await walletRes.json()
        return data
      },
      {getNextPageParam: (lastPage, page) => lastPage.length === 50 ? page.length + 1 : undefined})
      useEffect(() => {
        async function getPhotos(){
            let tempArr = []
            for(let i = 0; i < data.pages.length; i++){
                for(let j = 0; j < data.pages[i].length; j++){
                    const imgRes = await fetch(`https://api-mainnet.magiceden.dev/v2/tokens/${data.pages[i][j].tokenMint}`)
                    const imgData = await imgRes.json()
                    tempArr.push(imgData)
                }
            }
            setPhotos(tempArr)
        }
        getPhotos()
      }, [data])

      const buys = data?.pages.map(page => {
        let temp = page.filter(arg => arg.type === 'buyNow' && arg.buyer === wallet)
        let final = temp.map(item => {
            let tempImg = photos.filter(img => img.mintAddress === item.tokenMint)
            return (
            <>    
            <p>{item.collection}</p>
            <img src={tempImg[0]?.image ? tempImg[0].image : errorImg} className='nft-img'/>
            </>
            )
         })
         return final
     })

     const sells = data?.pages.map(page => {
        let temp = page.filter(arg => arg.type === 'buyNow' && arg.seller === wallet)
        let final = temp.map(item => {
            let tempImg = photos.filter(img => img.mintAddress === item.tokenMint)
            return (
            <>
            <div className='scroll-item'>{item.collection}</div>
            <img src={tempImg[0]?.image ? tempImg[0].image : errorImg} className='nft-img'/>
            </>
            )
         })
         return final
     })


    
    return (
        <> 
        <input type='textbox' value={userInput} onChange={(event) => setUserInput(event.target.value)} placeholder='New Solana Wallet'></input>
        <button onClick={() => setWallet(userInput)}>Submit Wallet</button>
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
            
        </div>
        </>
    )
}
