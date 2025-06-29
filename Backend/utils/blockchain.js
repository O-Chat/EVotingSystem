const crypto= require('crypto');

//Block class
class Block {
    constructor(index, previousHash='', timestamp, data) {
        this.index = index;
        this.previousHash = previousHash;
        this.timestamp = timestamp;
        this.data = data;
        this.hash =this. calculateHash();
    }
    calculateHash() {
        return crypto.createHash('sha256')
            .update(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data))
            .digest('hex');
    }
}

//Blockchain class
class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
        
    }

    createGenesisBlock() {
        return new Block(0, '0', Date.now(), { isGenesis: true });
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(data) {
        const newBlock = new Block(this.chain.length,this.getLatestBlock().hash,Date.now(),data);
  newBlock.hash = newBlock.calculateHash();
  this.chain.push(newBlock);
    
    }

    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }
            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }
        return true;
    }
}

const voteChain = new Blockchain();
module.exports  = voteChain;