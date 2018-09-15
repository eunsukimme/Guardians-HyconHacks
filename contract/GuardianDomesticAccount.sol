pragma solidity^0.4.24;
pragma experimental ABIEncoderV2;
import "./GuardianContent.sol";

contract GuardianDomesticAccount is GuardianContent {
    using SafeMath for uint;
    using SafeMath for uint8;

    /// @dev 공공 예산 장부
    address public domesticAccount;

    function chargeDomesticAccount() onlyOwner external {
        domesticAccount.
    }

}