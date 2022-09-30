import React, {useState, useEffect} from 'react'

export default function WalletTracker(){
    const [transactions, setTransactions] = useState()
    const [wallet, setWallet] = useState('9C89G5Z151iZsJmu9evZzQ5z2R9vsGvrKidwcQSRRo3S')
    const [secondFetch, setSecondFetch] = useState()
    
    useEffect(() => {
        async function getData(){
            /*
            getting initial solTransfer data from sol scan api in batched of 50 per request
            re-fetches data if the submitted wallet is changed
            base url: https://public-api.solscan.io/
            */
            let returnAmount
            let finalData = []
            let i = 0
            do{
                const res = await fetch(`https://public-api.solscan.io/account/solTransfers?account=${wallet}&limit=50&offset=${i * 50}`)
                const data = await res.json()
                finalData = [...finalData, ...data.data]
                returnAmount = data.data.length
                i++
            }while(returnAmount == 50)

        let tempArr = finalData.map(item => item.txHash)
        setSecondFetch(tempArr)
        }
        getData()
    }, [wallet])

    useEffect(() => {
        async function getMoreData() {
            /* 
            using the txHash: property (transactin signiture) to fetch individual transaction data because solTransfers does not provide the amount of sol transfered
            */
            let arr = []
            let almost = []
            for(let i = 0; i < secondFetch.length; i++) {
                const res2 = await fetch(`https://public-api.solscan.io/transaction/${secondFetch[i]}`)
                const data2 = await res2.json()
                arr.push(data2.inputAccount)
            }
            console.log(arr)
            for(let j = 0; j < arr.length; j++) {
                let temp = arr[j].filter(item => item.account == wallet)
                almost = [...almost, ...temp]
            }
            
        }
        getMoreData()
    }, [secondFetch])



    return (
        <div>
            working wallet tracker
        </div>
    )
}
