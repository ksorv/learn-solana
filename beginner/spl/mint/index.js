import { clusterApiUrl, Connection, Keypair, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import { createMint, getOrCreateAssociatedTokenAccount, mintTo, transfer } from '@solana/spl-token';

(async () => {
    // Step 1: Connect to cluster and generate a new Keypair
    const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

    const fromWallet = Keypair.fromSecretKey(
      new Uint8Array(
        [158,100,175,213,245,90,142,146,22,23,254,226,176,95,246,212,57,241,244,225,88,41,23,106,29,124,106,64,98,204,16,102,169,232,179,56,224,118,90,196,177,226,247,3,37,49,135,133,2,95,63,171,242,135,84,174,110,209,191,60,21,210,111,94]
    ));

    console.log(fromWallet.publicKey.toString());
    const toWalletPubKey = "93yaSPXRmESqvtApXWqbt1o6PN6X1PNT4XdCDWZnmgTf";

    // rpc rate limtied, remove airdrop use faucet
    // // // Step 2: Airdrop SOL into your from wallet
    // const fromAirdropSignature = await connection.requestAirdrop(fromWallet.publicKey, 5 * LAMPORTS_PER_SOL);
    // // // Wait for airdrop confirmation
    // await connection.confirmTransaction(fromAirdropSignature, { commitment: "confirmed" });

    // // Step 3: Create new token mint and get the token account of the fromWallet address
    // // If the token account does not exist, create it
    const mint = await createMint(connection, fromWallet, fromWallet.publicKey, null, 3);
    const fromTokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        fromWallet,
        mint,
        fromWallet.publicKey
    )


    // //Step 4: Mint a new token to the from account
    let signature = await mintTo(
        connection,
        fromWallet,
        mint,
        fromTokenAccount.address,
        fromWallet.publicKey,
        50000000000,
        []
    );
    console.log('mint tx:', signature);


    //Step 5: Get the token account of the to-wallet address and if it does not exist, create it
    const toTokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        fromWallet,
        mint,
        new PublicKey(toWalletPubKey)
    );

    //Step 6: Transfer the new token to the to-wallet's token account that was just created
    // Transfer the new token to the "toTokenAccount" we just created
    signature = await transfer(
        connection,
        fromWallet,
        fromTokenAccount.address,
        toTokenAccount.address,
        fromWallet.publicKey,
        20000000000,
        []
    );

    console.log('transfer tx:', signature);
})();