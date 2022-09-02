const { assert } = require('chai');

const EthSwap = artifacts.require("EthSwap");
const Token = artifacts.require("Token");

require('chai')
    .use(require('chai-as-promised'))
    .should()

contract('EthSwap',(accounts)=>{
    describe('EthSwap Deployment',async ()=>{
        it('contract has a name',async () =>{
            let ethSwap = await EthSwap.new();
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

    it('contract has Token',async ()=>{
        const token = await Token.new();
        const ethSwap = await EthSwap.new();
        await token.transfer(ethSwap.address,'1000000000000000000000000');
        let balance = await token.balanceOf(ethSwap.address);
        assert.equal(balance,'1000000000000000000000000');
    })
})    