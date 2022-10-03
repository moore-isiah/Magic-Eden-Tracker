import React, {useState, useEffect} from 'react'

export default function WalletTracker(){
    const [wallet, setWallet] = useState('9ZYCXH5L3znQ1fiLHpA4SaQ5NeScWgrCbFjQNoNjR8VW')

    return (
        <>
        <input type='textbox' value={userInput} onChange={(event) => setUserInput(event.target.value)} placeholder='New Solana Wallet'></input>
        <button onClick={() => setWallet(userInput)}>Submit Wallet</button>
        <div className='wallet-tracker'>
            
            <div className='containers'>
                <p>Purchases</p>
                
            </div>
            <div className='containers'>
                <p>listings</p>
            </div>
            
        </div>
        </>
    )
}

/*
const [userInput, setUserInput] = useState('')
const [activityData, setActivityData] = useState({
    buys: [],
    sells: [],
    bidSent: [],
    bidRecieve: [],
    urls: {}
})
const [collections, setCollections] = useState()

useEffect(() => {
    async function getBuySell() {
        let i = 0
        let tempData = []
        let returnAmount
        
        do{
            const walletRes = await fetch(`https://api-mainnet.magiceden.dev/v2/wallets/${wallet}/activities?offset=${i * 500}&limit=500`)
            const walletData = await walletRes.json()
            tempData = [...tempData, ...walletData]
            returnAmount = walletData.length
            i++

        }while(returnAmount === 500)
        setActivityData({buys: tempData.filter(item => (item.buyer === wallet && item.type === 'buyNow')), sells: tempData.filter(item => (item.seller === wallet && item.type === 'buyNow')), bidSent: tempData.filter(item => (item.buyer === wallet && item.type === 'bid'))})

        //console.log(tempData)
    }
    getBuySell()

//        async function getBids(){
//          let offerOut, offerIn
//        const offerOutRes = await fetch(`https://api-mainnet.magiceden.dev/v2/wallets/${wallet}/offers_made?offset=${i * 500}&limit=500`)
  //      const offerOutData = await offerOutRes.json()

    //    console.log(offerOutData)
      //  offerOut = offerOutData

   // }
    
}, [wallet])


//console.log(activityData.buys, activityData.sells, activityData.bidRecieve)

useEffect(() => {
    async function getCollections(){
        let responseAmount
        let arr = []
        let i = 0
        do{
            const collectionRes = await fetch(`https://api-mainnet.magiceden.dev/v2/collections?offset=${i * 500}&limit=500`)
            const collectionData = await collectionRes.json()
            responseAmount = collectionData.length
            arr = [...arr, ...collectionData]
            i++
        }while(responseAmount === 500)
       // console.log(arr)

        setCollections(arr)
    }
    getCollections()
}, [activityData])


// let buyItems = activityData.buys.map(act => collections.find(coll => {
   // if(coll.symbol == act.collectionSymbol){
      //  setActivityData({...activityData, urls: {...activityData.urls, [coll.symbol]: coll.image}})
    //    return(
  //          <p>{act.collectionSymbol}</p>
//        )
//      }
//    }))
*/