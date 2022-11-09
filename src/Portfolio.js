import React, { useState } from 'react'
import { useQuery } from 'react-query'

import solLogo from './icons/solana-sol-logo.svg'

const decimal = .000000001

export default function Portfolio(){
    const [wallet, setWallet] = useState('9ZYCXH5L3znQ1fiLHpA4SaQ5NeScWgrCbFjQNoNjR8VW')
    const [userInput, setUserInput] = useState('')

    const {data, refetch: refetchCollections} = useQuery([`portfolio${wallet}`], 
    async ({}, wal = wallet) => {
        let final = []
        const res = await fetch(`https://api-mainnet.magiceden.dev/v2/wallets/${wal}/tokens`)
        const data = await res.json()
        let tempArr = []

        for(let i = 0; i < data.length; i++){
            if(data[i]?.collection !== data[i-1]?.collection){                
                tempArr[0] ? final.push(tempArr) : console.log(i, 'empty')
                tempArr = []
                tempArr.push(data[i])
            }else {
                tempArr.push(data[i])
            }
        }
        return final
    }
    )
    console.log(data)
    const Collections = () => {
        const CollectionHeader = (props) => {

            const {data: stats} = useQuery([props.show.collection],
                async ({}, name = props.show.collection) => {
                    const statsRes = await fetch(`https://api-mainnet.magiceden.dev/v2/collections/${name}/stats`)
                    const statsData = await statsRes.json()
                    return statsData
                }
            )

            const twoRound = (num) => {
                return Math.round(num * 100)/100
            }

            let floor = stats?.floorPrice * decimal
            let totalFloor = floor * props.amount
            let meFees = .02
            let royalty = props.show.sellerFeeBasisPoints * .0001
            
            return(
                <div className='collection-header'>
                    <div className='header-title'>
                        <img className='collection-img' src={props.show.image} />
                        <p>{props.show.collectionName}</p>
                    </div>
                    <p>Listed: {stats?.listedCount}</p>
                    <p>Floor:<img className='port-sol' src={solLogo}/>{twoRound(floor)}</p>
                    <div className='floor-container'>    
                        <p>Total Floor Value:<img className='port-sol' src={solLogo}/>{twoRound(totalFloor)}</p>
                        <p>With ME Fees:<img className='port-sol' src={solLogo}/>{twoRound(totalFloor - (totalFloor * meFees))}</p>
                        <p>With Fees and Royalties:<img className='port-sol' src={solLogo}/>{twoRound(totalFloor - (totalFloor * (meFees + royalty)))}</p>
                    </div>
                </div>
            )
        }

        return(
        <div className='collections-containter'>
            {data?.map(group => {
               
                return (
                <div className='collection'>
                    <CollectionHeader show={group[0]} amount={group.length}/>
                    <div className='item-container'>
                    {group.map(item =>{
                        console.log(item)
                        return(
                            <div className='collection-item'>
                                <img className='item-img' src={item.image} />
                                <p className='item-name'>{item.name}</p>
                            </div>
                        )
                    })
                    }
                    </div>
                </div>
                )
            })}
        </div>
        )
        }

    async function newWallet() {
        const res = await fetch(`https://api-mainnet.magiceden.dev/v2/wallets/${userInput}/tokens`)

        await res.ok ? setWallet(userInput) : window.alert('Please enter a valid wallet!!!')

        refetchCollections()
    }

    return(
        <div className='portfolio'>
            <div className='port-enter-section' >
                <input className='port-input' type='text' onChange={(e) => setUserInput(e.target.value)} value={userInput} placeholder='Solana Wallet' />
                <button className='port-button' onClick={newWallet}>Submit</button>
            </div>
            <Collections/> 
        </div>
    )
}