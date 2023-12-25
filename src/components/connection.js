import Web3 from "web3";
window.ethereum.request({ method: "eth_requestAccounts" });
const web3 = new Web3(window.ethereum);
const Transaction = require('../contracts/Transaction.json');

//function for using Metamask
async function connectMetamask() {//const web3 = new Web3(Web3.givenProvider);
    const accounts = await web3.eth.getAccounts();
    const networkId = await web3.eth.net.getId();
    console.log(networkId)
    const deployedNetwork = await Transaction.networks[5777];
    
    const instance = new web3.eth.Contract(
        Transaction.abi,
        deployedNetwork.address
    );
    console.log("Injected web3 detected.", accounts, instance);
    return {accounts, instance}
}
//connectMetamask() 
//let web3;
// async function createInstance() {
//   try {
//     const accounts = await web3.eth.getAccounts();
//     const networkId = await web3.eth.net.getId();
//     const { address } = Transaction.networks[networkId];
//     const instance = await new web3.eth.Contract(Transaction.abi, address);
//     console.log(accounts);
//     return { instance, accounts };
//   } catch (error) {
//     console.error("Error creating instance:", error);
//     return { error };
//   }
// }

async function transferToOwner(amount) {
  const { accounts, instance } = await connectMetamask();

  if (accounts && accounts.length > 0) {
    try {
      // Replace '0xOWNER_ADDRESS' with the actual owner's Ethereum address
     // const ownerAddress = '0x603BC3425b2F174fC7c652b26288ab543BFEAabd';

      // Convert amount to Wei
      const amountInWei = web3.utils.toWei(amount.toString(), 'ether');

      // Send transaction to transfer funds to the owner
      const result = await instance.methods.transferToOwner(amountInWei).send({
        from: accounts[0], // Use the MetaMask account for transaction
        value: amountInWei,
        gas: 200000, // Set the gas value as needed
      });

      console.log('Transaction Hash:', result.transactionHash);
    } catch (error) {
      console.error('Error:', error.message);
    }
  } else {
    console.error('No accounts found or MetaMask not connected.');
  }
}
export { transferToOwner, connectMetamask }
