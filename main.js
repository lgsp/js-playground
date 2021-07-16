// npm install --save crypto-js
const SHA256 = require('crypto-js/sha256');

class Block
{
    constructor(index, timestamp, data, previousHash = '')
    {
	this.index = index;
	this.timestamp = timestamp;
	this.data = data;
	this.previousHash = previousHash;
	this.hash = this.calculateHash();
    }

    calculateHash()
    {
	return SHA256(this.index + this.previousHash +
		      this.timestamp +
		      JSON.stringify(this.data)).toString();
	
    }
}

class Blockchain
{
    constructor()
    {
	this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock()
    {
	return new Block(0, "03/01/2009", "Genesis block", "0");
    }

    getLatestBlock()
    {
	return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock)
    {
	newBlock.previousHash = this.getLatestBlock().hash;
	newBlock.hash = newBlock.calculateHash();
	this.chain.push(newBlock);
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
educoin.addBlock(new Block(1, "10/01/2009", { amount: 10 }));
educoin.addBlock(new Block(2, "15/01/2009", { amount: 5 }));

console.log('Is blockchain valid? ' + educoin.isChainValid());
console.log(JSON.stringify(educoin, null, 4));

educoin.chain[1].data = { amount: 100 };
console.log('Is blockchain valid? ' + educoin.isChainValid());
console.log(JSON.stringify(educoin, null, 4));

educoin.chain[1].hash = educoin.chain[1].calculateHash();
console.log('Is blockchain valid? ' + educoin.isChainValid());
console.log(JSON.stringify(educoin, null, 4));

console.log("Source: https://youtu.be/zVqczFZr124");
console.log("End of Part 1");
