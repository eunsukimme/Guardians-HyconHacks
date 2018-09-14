pragma solidity^0.4.24;
pragma experimental ABIEncoderV2;
import "./Ownable.sol";
import "./SafeMath.sol";

contract Guardian is Ownable {
    using SafeMath for uint;
    using SafeMath for uint8;

    /// @dev 여성(0), 아동(1), 노인(2), 장애인(3), 저소득층(4)
    enum minorType { WOMAN, CHILD, ELDER, DISABLED, LOWINCOME}

    /// @dev 사회적 약자 사용자 정보 구조체
    struct Minority {
        address userAccount;
        uint8 minType;
        string name;
    }
    /// @dev 복지 콘텐츠 정보 구조체
    struct Content {
        uint8 minType;
        string title;
        string url;
        string origin;
    }

    /// @dev 계정(키)과 사용자(값) 매핑
    mapping(address => Minority) public addressToMinority;
    /// @dev 사용자를 저장하는 배열
    Minority[] public minorities;
    /// @dev 사용자들의 수
    uint public minorCount = 0;

    function addUser(address _userAccount, uint8 _minType, string _name) public {
        Minority memory minor = Minority(_userAccount, _minType, _name);
        addressToMinority[_userAccount] = minor;
        minorities.push(minor);
        minorCount = minorCount.add(1);
    }

    function getUser(address _userAccount) view public returns(Minority _minor) {
        Minority memory minor = addressToMinority[_userAccount];
        return minor;
    }

    function checkUser(address _userAccount) public view returns(bool) {
        Minority memory minor = addressToMinority[_userAccount];
        if(bytes(minor.name).length != 0){
            return true;
        } else {
            return false;
        }
    }

}