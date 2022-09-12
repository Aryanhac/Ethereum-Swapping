pragma solidity >=0.4.22 <0.9.0;

import './Token.sol';
contract EthSwap{
    string public name = "EthSwap instant swapping"; 
    Token public token;
    uint public rate = 100;

    event TokenPurchased(
        address account,
        address token,
        uint amount,
        uint rate
    );

    event TokenSold(
        address account,
        address token,
        uint amount,
        uint rate
    );
    constructor(Token _token){
        token = _token;
    }
    
    function buyTokens() public payable {
        // calculate token 
        uint amount = msg.value * rate;
        require(token.balanceOf(address(this))>=amount);
        token.transfer(msg.sender, amount);
        emit TokenPurchased(msg.sender,address(token),amount,rate);
    }

    function sellTokens(uint _amount) public {
        uint etherAmount = _amount/100;
        require(address(this).balance>=etherAmount);
        token.transferFrom(msg.sender, address(this), _amount);
        payable(msg.sender).transfer(etherAmount);
        emit TokenSold(msg.sender,address(token),_amount,rate);

    }
}