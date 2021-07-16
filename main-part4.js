const {Blockchain, Transaction} = require('./blockchain');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const myKey = ec.keyFromPrivate('011eb8a4702d9c2f3f686efca889826585e4f5f5d1423846c9e19486ddc14b83');
const myWalletAddress = myKey.getPublic('hex');

let educoin = new Blockchain();

const tx1 = new Transaction(myWalletAddress, 'public key goes here', 10);
tx1.signTransaction(myKey);
educoin.addTransaction(tx1);

console.log('\nStarting the miner...');
educoin.minePendingTransactions(myWalletAddress);

console.log('\nBalance of Satoshi is',
	    educoin.getBalanceOfAddress(myWalletAddress));

console.log('Is chain valid? ', educoin.isChainValid());

educoin.chain[1].transactions[0].amount = 1;

console.log('Is chain valid? ', educoin.isChainValid());

console.log("Source: https://youtu.be/kWQ84S13-hw");
console.log("End of Part 4");
