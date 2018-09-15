pragma solidity^0.4.24;
pragma experimental ABIEncoderV2;
import "./GuardianContent.sol";

contract GuardianDomesticAccount is GuardianContent {
    using SafeMath for uint256;
    using SafeMath for uint;
    using SafeMath for uint8;

    function sendEther() external payable {
        address(this).transfer(msg.value);
    }

    function getBalance() view public returns(uint){
        return address(this).balance;
    }

    function withdraw() external onlyOwner payable {
        msg.sender.transfer(address(this).balance);
    }

}