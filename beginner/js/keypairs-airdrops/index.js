// Import Solana web3 functionalities
const {
    Connection,
    PublicKey,
    clusterApiUrl,
    Keypair,
    LAMPORTS_PER_SOL
} = require("@solana/web3.js");

// Get the wallet balance from a given private key
const getWalletBalance = async (connection, publicKey) => {
    try {
        const walletBalance = await connection.getBalance(
            new PublicKey(publicKey)
        );
        console.log(`Wallet balance: ${parseInt(walletBalance) / LAMPORTS_PER_SOL} SOL`);
    } catch (err) {
        console.log(err);
    }
};

const airDropSol = async (connection, publicKey) => {
    try {
        // Request airdrop of 2 SOL to the wallet
        console.log("Airdropping some SOL to your wallet!");
        const fromAirDropSignature = await connection.requestAirdrop(
            new PublicKey(publicKey),
            2 * LAMPORTS_PER_SOL
        );

        await connection.confirmTransaction(fromAirDropSignature);
    } catch (err) {
        console.log(err);
    }
};

// Show the wallet balance before and after airdropping SOL
const mainFunction = async (publicKey) => {
    // Connect to the Devnet
    const connection = new Connection(clusterApiUrl("testnet"), "confirmed");
    await getWalletBalance(connection, publicKey);
    await airDropSol(connection, publicKey);
    await getWalletBalance(connection, publicKey);
}

if (process.argv.length <= 2) {
  throw new Error("Please provide private key");
} else {
  mainFunction(process.argv.length);
}