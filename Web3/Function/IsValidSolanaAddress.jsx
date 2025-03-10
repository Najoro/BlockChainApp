import { PublicKey, Connection } from "@solana/web3.js";
import SOLANA_RPC_URL from "../../app.config";
import { Buffer } from "buffer";
global.Buffer = Buffer;

const connection = new Connection("https://api.devnet.solana.com");

const isValidSolanaAddress = (address) => {
    try {
        const publicKey = new PublicKey(address);
        return publicKey.toString() === address;
    } catch (error) {
        return false; 
    }
};

export default isValidSolanaAddress;
