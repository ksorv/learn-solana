// Import Solana web3 functionalities
const {
    Connection,
    PublicKey,
    clusterApiUrl,
    Keypair,
    LAMPORTS_PER_SOL,
    Transaction,
    SystemProgram,
    sendAndConfirmTransaction
} = require("@solana/web3.js");

const DEMO_FROM_SECRET_KEY = new Uint8Array(
    // paste your secret key inside this empty array
    // then uncomment transferSol() at the bottom
    [
      139, 206, 172, 118, 171, 201, 106, 189, 176,  35,
      230, 233,   5, 108, 110, 230, 108,   6, 222, 136,
      170, 110,  69,  46, 165, 143, 139, 150, 120, 184,
      105, 134, 207,  29, 217,  90, 168, 117, 180, 167,
      121, 163,  99, 135, 105, 129,   5, 111, 227, 232,
      53,  74, 134, 249,  65, 145, 219, 206,  34,  85,
      218,  41, 139, 196
    ]
);


// Get the wallet balance from a given private key
const getWalletBalance = async (connection, publicKey) => {
    try {
        const walletBalance = await connection.getBalance(
            new PublicKey(publicKey)
        );
        console.log(`Wallet balance: ${parseInt(walletBalance) / LAMPORTS_PER_SOL} SOL`);

        return parseFloat(walletBalance);
    } catch (err) {
        console.log(err);
        return 0
    }
};

const transferSol = async() => {
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

    // Get Keypair from Secret Key
    var from = Keypair.fromSecretKey(DEMO_FROM_SECRET_KEY);
    // Generate another Keypair (account we'll be sending to)
    const to = Keypair.generate();

    // // Aidrop 2 SOL to Sender wallet
    // console.log("Airdopping some SOL to Sender wallet!");
    // const fromAirDropSignature = await connection.requestAirdrop(
    //     new PublicKey(from.publicKey),
    //     4 * LAMPORTS_PER_SOL
    // );

    const fromWallet = await getWalletBalance(connection, from.publicKey);

    // // Latest blockhash (unique identifer of the block) of the cluster
    // let latestBlockHash = await connection.getLatestBlockhash();

    // // Confirm transaction using the last valid block height (refers to its time)
    // // to check for transaction expiration
    // await connection.confirmTransaction({
    //     blockhash: latestBlockHash.blockhash,
    //     lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
    //     signature: fromAirDropSignature
    // });

    // console.log("Airdrop completed for the Sender account");

    // Send money from "from" wallet and into "to" wallet
    var transaction = new Transaction().add(
        SystemProgram.transfer({
            fromPubkey: from.publicKey,
            toPubkey: to.publicKey,
            lamports: fromWallet / 2
        })
    );

    // Sign transaction
    var signature = await sendAndConfirmTransaction(
        connection,
        transaction,
        [from]
    );

    console.log('Signature is', signature);
    await getWalletBalance(connection, from.publicKey);
    await getWalletBalance(connection, to.publicKey);
}

transferSol();

