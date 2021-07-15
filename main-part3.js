// npm install --save crypto-js
const SHA256 = require('crypto-js/sha256');

class Transaction
{
    constructor(fromAddress, toAddress, amount)
    {
	this.fromAddress = fromAddress;
	this.toAddress = toAddress;
	this.amount = amount;
    }
}

class Block
{
    constructor(timestamp, transactions, previousHash = '')
    {
	this.timestamp = timestamp;
	this.transactions = transactions;
	this.previousHash = previousHash;
	this.hash = this.calculateHash();
	this.nonce = 0;
    }

    calculateHash()
    {
	return SHA256(this.previousHash +
		      this.timestamp +
		      JSON.stringify(this.transactions) +
		      this.nonce).toString();
	
    }

    mineBlock(difficulty)
    {
	while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0"))
	{
	    this.nonce++;
	    this.hash = this.calculateHash();
	}
	console.log("BLOCK MINED: " + this.hash);
    }
}

class Blockchain
{
    constructor()
    {
	this.chain = [this.createGenesisBlock()];
	this.difficulty = 5;
	this.pendingTransactions = [];
	this.miningReward = 100;
    }

    createGenesisBlock()
    {
	return new Block(0, "03/01/2009", "Genesis block", "0");
    }

    getLatestBlock()
    {
	return this.chain[this.chain.length - 1];
    }

    minePendingTransactions(miningRewardAddress)
    {
	let block = new Block(Date.now(), this.pendingTransactions);
	block.mineBlock(this.difficulty);

	console.log("Block successfully mined!");
	this.chain.push(block);

	this.pendingTransactions = [
	    new Transaction(null, miningRewardAddress, this.miningReward)
	];
    }

    createTransaction(transaction)
    {
	this.pendingTransactions.push(transaction);
    }

    getBalanceOfAddress(address)
    {
	let balance = 0;

	for(const block of this.chain)
	{
	    for(const tx of block.transactions)
	    {
		if(tx.fromAddress === address)
		{
		    balance -= tx.amount;
		}

		if(tx.toAddress === address)
		{
		    balance += tx.amount;
		}
	    }
	}

	return balance;
    }

    isChainValid()
    {
	for(let i = 1; i < this.chain.length; i++)
	{
	    const currentBlock = this.chain[i];
	    const previousBlock = this.chain[i - 1];

	    if(currentBlock.hash !== currentBlock.calculateHash())
	    {
		return false;
	    }

	    if(currentBlock.previousHash !== previousBlock.hash)
	    {
		return false;
	    }
	}

	return true;
    }
}


let educoin = new Blockchain();
educoin.createTransaction(new Transaction('address1', 'address2', 100));
educoin.createTransaction(new Transaction('address2', 'address1', 50));

console.log('\nStarting the miner...');
educoin.minePendingTransactions('satoshi-address');

console.log('\nBalance of Satoshi is', educoin.getBalanceOfAddress('satoshi-address'));

console.log('\nStarting the miner again...');
educoin.minePendingTransactions('satoshi-address');

console.log('\nBalance of Satoshi is', educoin.getBalanceOfAddress('satoshi-address'));


console.log("Source: https://youtu.be/fRV6cGXVQ4I");
console.log("End of Part 3");
