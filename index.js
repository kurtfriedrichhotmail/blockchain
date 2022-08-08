//   js-sha256
// https://www.npmjs.com/package/js-sha256
// https://www.youtube.com/watch?v=b81Ib_oYbFk


let Block = function (pName,pData) {
    this.name = pName;
    this.blockNo = 0;
    this.data = pData;
    this.next;
    this.hash;
    this.nonce = 0;
    this.previous_hash = 0x0;
    this.timestamp  =new Date().toLocaleString();

    this.display = function(){
        console.log("Block Hash: " + this.hash() + "\nBlockNo: " + this.blockNo + 
        "\nBlock Data: " + this.data + "\nName: " + this.name + "\nHashes: " + this.nonce + "\n--------------" );
    }

    this.hash = function()
    {
        let newHash =  sha256(
        encodeURI(this.nonce) +
        encodeURI(this.data) +
        encodeURI(this.previous_hash) +
        encodeURI(this.timestamp) +
        encodeURI(this.blockNo) 
        )
        return newHash;
    }
};  
// end of class block

let Blockchain = function () {
    this.diff = 15;  //  difficulty, 0 super easy, 20 takes a lot in iterations
    this.maxNonce = 2**32;
    this.target = 2**(256-this.diff);
    this.block = new Block("Genesis", 12345) // name and data
    this.head = this.block;  // might have by ref problem here

    this.add = function(newMinedBlock)
    {
        newMinedBlock.previous_hash = this.block.hash();
        newMinedBlock.blockNo = this.block.blockNo + 1;
        this.block.next = newMinedBlock
        this.block = this.block.next

    }

    this.mine = function(newBlock){
        let n = 0
        newBlock.nonce = 1;
        while (n < this.maxNonce){
            hashBase10 = new BigNumber(newBlock.hash(), 16);
        
            if (hashBase10.toExponential(10) <= this.target){

                console.log(hashBase10.toExponential(10));
                console.log(this.target);

                this.add(newBlock);
                newBlock.display();
                    break;
            }
            else{
                newBlock.nonce += 1;
                n++;
            }
      }
    }
}


document.addEventListener("DOMContentLoaded", function () {

   
    let blockchain = new Blockchain();
 
    
    for (n = 0; n < 10; n++){
        blockchain.mine(new Block("Block " + (n+1), 12345));
    }

    console.log('==================================');
    console.log('==================================');
    console.log('==================================');

    while (blockchain.head != null) {
        blockchain.head.display();
        blockchain.head = blockchain.head.next
    }

});


function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

 
 


