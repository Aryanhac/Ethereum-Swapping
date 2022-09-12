const { assert } = require('chai');
const Web3 = require('web3');

const EthSwap = artifacts.require("EthSwap");
const Token = artifacts.require("Token");

require('chai')
    .use(require('chai-as-promised'))
    .should()

function convert(n){
    return Web3.utils.toWei(n,'ether');
} 
  

contract('EthSwap',([deployer,invester])=>{
    

    describe('EthSwap Deployment',async ()=>{
        it('contract has a name',async () =>{
            let token = await Token.new();
            let ethSwap = await EthSwap.new(token.address);
            let name = await ethSwap.name();
            assert.equal(name,"EthSwap instant swapping");
        })
    })

    describe('Token Deployment',async ()=>{
        it('Token has a name',async () =>{
            let token = await Token.new();
            let name = await token.name();
            assert.equal(name,"Aryan Token");
        })
    })

    describe('sending token to ethSwap account',async()=>{
        it('contract has Token',async ()=>{
            let  token = await Token.new();
            let ethSwap = await EthSwap.new(token.address);
            await token.transfer(ethSwap.address,convert('1000000'));
            let balance = await token.balanceOf(ethSwap.address);
            assert.equal(balance,convert('1000000'));
        })
    })

    describe('buying token',async ()=>{
        it('exchange ether to token',async ()=>{
            let token = await Token.new();
            let ether = await EthSwap.new(token.address);
            await token.transfer(ether.address,'1000000000000000000000000');
            await ether.buyTokens({from:invester,value:convert('1')});
            
        })
    })

    describe('sell token',async ()=>{
        it('exchange token to ether',async ()=>{
            let token = await Token.new();
            let ether = await EthSwap.new(token.address);
            await token.transfer(ether.address,'1000000000000000000000000');
            await ether.buyTokens({from:invester,value:convert('1')});
            await token.approve(ether.address,'100',{from:invester});
            await ether.sellTokens('50',{from:invester});
            
        })
    })
   
})    