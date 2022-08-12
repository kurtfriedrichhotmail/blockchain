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
        let output =  "Block Hash: " + this.hash() + "\nBlockNo: " + this.blockNo + 
        "\nBlock Data: " + this.data + "\nName: " + this.name + "\nHashes: " + this.nonce + "\n--------------" ;

        document.getElementById("data").value += "\r\n" + output
        
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
    this.diff = 18;  //  difficulty, 0 super easy, 20 takes a lot in iterations
    this.maxNonce = 2**32;
    this.target = 2**(256-this.diff);
    // max int is 2**53 – 1
    //this.target = 2**(53-this.diff);
    this.block = new Block("Genesis", 12345) // name and data
    this.head = this.block;  // might have by ref problem here

    this.add = function(newMinedBlock)
    {
        newMinedBlock.previous_hash = this.block.hash();
        newMinedBlock.blockNo = this.block.blockNo + 1;
        this.block.next = newMinedBlock
        this.block = this.block.next

    }

    //https://academy.binance.com/en/glossary/nonce
    // we are doing hashes on a potential new block, but we keep changing
    // one part of its input data, the nonce.  We loop, creating new hashes for
    // the potential new block until we get one "lucky" one that has a certain number
    // of leading zeros (or said another way, until we get a hash that is smaller)
    // making the diff bigger, means we are requiring more leading 0's, making it
    // less and less likely we will get an acceptable hash. So a particlular blockchain
    // implimentation can decide how difficult they want it to be to find a hash
   
    // I may have a bug in my code, or in my treatment of these big numbers, but when 
    // I make diff smaller, like 10, I get identical loop counts sometimes??
    


    this.mine = function(newBlock){
        let n = 0
        newBlock.nonce = 1;
        while (n < this.maxNonce){
            let hashBase10 = new BigNumber(newBlock.hash(), 16);
        
            if (hashBase10.toExponential(10) <= this.target){

               console.log("finally found am acceptable hash: " + hashBase10.toExponential(10) );
               console.log("the target, our hash had to  be < " + this.target);

                this.add(newBlock);
                //newBlock.display();
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

    document.getElementById("data").value += "\r\n \r\n \r\n ==================================" +
    "\r\n ==================================" +
    "\r\n ================================== \r\n \r\n \r\n"

    while (blockchain.head != null) {
        blockchain.head.display();
        blockchain.head = blockchain.head.next
    }

});


function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

 
 


