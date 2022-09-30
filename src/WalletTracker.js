import React, {useState, useEffect} from 'react'

export default function WalletTracker(){
    const [wallet, setWallet] = useState('9ZYCXH5L3znQ1fiLHpA4SaQ5NeScWgrCbFjQNoNjR8VW')
    const [userInput, setUserInput] = useState('')
    const [activity, setActivity] = useState()

    useEffect(() => {
 
         async function getData() {
            let i = 0
            let tempData = []
            let returnAmount
            do{
                const res = await fetch(`https://api-mainnet.magiceden.dev/v2/wallets/${wallet}/activities?offset=${i * 500}&limit=1`)
                const data = await res.json()
                tempData = [...tempData, ...data]
                returnAmount = data.length
                i++
            }while(returnAmount == 500)
            setActivity(tempData)
        }
        getData()
    }, [wallet])

    return (
        <div>
            <input type='textbox' value={userInput} onChange={(event) => setUserInput(event.target.value)} placeholder='New Solana Wallet'></input>
            <button onClick={() => setWallet(userInput)}>Submit Wallet</button>
        </div>
    )
}

