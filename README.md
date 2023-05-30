Usage:
1. Pull this repo into a text editor.
1. Run 'NPM start' in a terminal.
2. Will open localhost.3000 


Note: Magic Eden's API only supports two requests a second so data may be delayed

About:
Choose any Solana Blockchain wallet and track the NFT transactions of said wallet. Supmit one wallet for in depth transaction history or track up to seven wallets buy and sell transactions. React Query's useInfinateQueary is used to fetch data for the different transaction type containers. One issue is that the object returned from Magic Eden does not contain the full NFT meta data, mainly the Image, so React Query's useQuery is used to get the meta data of each transaction, but will only fetch it if the NFT in said has not showed up in a previous transaction

![image](https://github.com/moore-isiah/magic-eden-tracker/assets/112504984/15be2afa-1cb5-40ab-b43e-e86f1c862f75)

Wallet Tracker:
Enter any wallet and get all the transaction data. (all activity, buys, sells, and offers pending)

![image](https://github.com/moore-isiah/magic-eden-tracker/assets/112504984/bc43b30c-0af1-454a-89ae-71212213de5a)

Whale Tracker:
Use one of the pre-set options or enter your own wallets and information. Store as many options as you like but can only display the buys and sells of up to 7 wallets at a time.

Portfolio Tracker Submit any wallet and will take the current NFT holdings and will calculate it's value in total, with Magic Eden's marketplace fees, or fees along with creator royalties. There is also another half where it would look back and calculate the profit earned over a given time span but for now it remains unfinished.
