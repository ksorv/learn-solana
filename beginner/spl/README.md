# Minting custom SPL token NFTs

In this project we have three folders with following purposes:
- Mint
 - This project helps you mint a new token, and send that to specified account.
- NFT
 - This project has some assets which are part of a nft collection, they are deployed using Sugar cli
 - In this one, in the config file we can set the SPL token and fee taker's address
- Candy Machine UI
 - This is a forker repo from metaplex, In this one, we set the candymachine id from nft deployment
 - And also set a custom rpc since default once dont work well

Purpose of project:
The purpose of this project is to allow whole of token, nft deployment and minting in a single go.

To run the project:
*NOTE*: We first need to go to each folder and install packages with `npm i`

- First
 - update the addresses in the `mint/index.js` and run `node index.js`
 - this will create a new token and mint some into your provided to account.
- Second
 - go to nft folder, Update the assets and their correspoding config if needed
 - update config.json on root level, this has a lot of config for your nfts
 - in this set your `splToken` as mint address of your token from first step
 - set `splTokenAccount` as any token account that can store the corresponding spl token
 - and then run commands below, they will give you your `candyMachineId`

```sh
sugar validate
sugar upload
sugar deploy
sugar verify
```

- Third
 - clone the candy-machine-ui repo
 - update candy machin id to the one from prev step `candyMachineId`
 - start the Ui and mint a nft to verify.

ALL DONE.