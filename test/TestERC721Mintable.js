var ERC721Mintable = artifacts.require('ERC721Mintable');

contract('Testing ERC721Mintable', accounts => {

    const account1 = accounts[0];
    const account2 = accounts[1];


    describe('Able to mint', function () {
        beforeEach(async function () { 
            debugger;
            
            this.contract = await ERC721Mintable.new({from: account1});

            // TODO: mint multiple tokens
            await this.contract.mint(account1, 1);
            await this.contract.mint(account1, 2);
            await this.contract.mint(account1, 3);
            await this.contract.mint(account1, 4);
            await this.contract.mint(account1, 5);            
            await this.contract.mint(account2, 6);            
            await this.contract.mint(account2, 7);  
            await this.contract.mint(account2, 8);  
            await this.contract.mint(account2, 9);  
            await this.contract.mint(account2, 10);  

        })


        it('Should not be able to mint the same token twice', async function () 
        {
            let mintingSuccessful = true;

            try
            {
                await this.contract.mint(account2, 1);                         
                await this.contract.mint(account2, 1);                         
                await this.contract.mint(account2, 2);                         
                await this.contract.mint(account2, 2);                         
                await this.contract.mint(account2, 3);                         
            }
            catch{
                mintingSuccessful = false;
            }

            assert.equal(mintingSuccessful, false, "mint the same token twice.");            
        })


        it('should return total supply', async function () 
        {
            let result = await this.contract.totalSupply();    
            assert.equal(result, 10, "total supply is incorrect.");            
        })

        it('should get token balance', async function () 
        { 
            let balance1 = await this.contract.balanceOf(account1);

            assert.equal(balance1, 5, "account 1 balance is incorrect.");

            let balance2 = await this.contract.balanceOf(account2);

            assert.equal(balance2, 5, "account 2 balance is incorrect.");
            
        })        

        it('should return token uri', async function () 
        { 
            let resultTokenUri = await this.contract.tokenURI(1);
            assert.equal(resultTokenUri, "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1", "TokenUri is not found.")   
        })


        it('should transfer token from one owner to another', async function () 
        {
            let result = await this.contract.transferFrom(account1, account2, 2);

            let owner = await this.contract.ownerOf(2);

            assert.equal(owner, account2, "Owner is still the same and was not changed.");
        })
    });


    describe('have ownership properties', function () {
      
        beforeEach(async function () 
        {             
            this.contract = await ERC721Mintable.new({from: account1});
        })
        
        it('should fail when minting when address is not contract owner', async function () 
        {
            let cancelled = false;
            
            try
            {               
                await this.contract.mint(account1, 4, "testURI", {from: account2}); 
            } 
            catch 
            {
                cancelled = true;
            }
            
            assert.equal(cancelled, true, "Should not allow minting. Not an owner.");   
        })                
        
        it('should return contract owner', async function () 
        {
            let result = await this.contract.isOwner({from: account1}); 

            assert.equal(result, true, "The address is not an owner.");
        })
    });
})
