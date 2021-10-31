const API_KEY = process.env.API_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

const { ethers } = require("ethers");
const contract = require("../artifacts/contracts/hello.sol/hello.json");

const prompt = require("prompt-sync")();

// console.log(JSON.stringify(contract.abi));

const alchemyProvider = new ethers.providers.AlchemyProvider(network='ropsten', API_KEY);

const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider);

const hello_contract = new ethers.Contract(CONTRACT_ADDRESS, contract.abi, signer);

async function readMessage(){
    const message = await hello_contract.message();
    console.log("the message is: " + message);
}
async function updateMessage(){
    const input = prompt("What message would you like to update to? ");
    const updatedMessage = input;
    console.log("Updating message to: " + updatedMessage);
    const tx = await hello_contract.update(updatedMessage);
    await tx.wait();
}
async function main(){
    // const message = await hello_contract.message();
    // console.log("the message is: " + message);

    // const updatedMessage = "updated message #3!!";
    // console.log("Updating message to: " + updatedMessage);
    // const tx = await hello_contract.update(updatedMessage);
    // await tx.wait();

    // const newMessage = await hello_contract.message();
    // console.log("the new message is: " + newMessage);
    await readMessage();
    await updateMessage();
    await readMessage();

}
main();