pragma solidity^0.4.24;
pragma experimental ABIEncoderV2;
import "./Ownable.sol";
import "./SafeMath.sol";

contract Guardian is Ownable {
    using SafeMath for uint;
    using SafeMath for uint8;

    /// @dev 여성(0), 아동(1), 노인(2), 장애인(3), 저소득층(4), 공무원(5)
    enum minorType { WOMAN, CHILD, ELDER, DISABLED, LOWINCOME, AGENT}

    /// @dev 사회적 약자 사용자 정보 구조체
    struct Minority {
        address userAccount;
        uint8 minType;
        string name;
        uint[] myList;
    }

    /// @dev 사회복지사 정보 구조체
    struct Helper {
        address helperAccount;
        string name;
        string contact;
    }

    /// @dev 계정(키)과 사용자(값) 매핑
    mapping(address => Minority) public addressToMinority;
    /// @dev 사용자를 저장하는 배열
    Minority[] public minorities;
    /// @dev 초기화된 배열
    uint[] list;
    /// @dev 사용자들의 수
    uint public minorCount = 0;

    /// @dev 사용자 정보를 입력받아 사용자 객체 생성
    /// @param _userAccount 유저의 어카운트
    /// @param _minType 유저의 사회적 약점 정보
    /// @param _name 유저의 이름
    function addUser(address _userAccount, uint8 _minType, string _name) public {
        Minority memory minor = Minority(_userAccount, _minType, _name, list);
        addressToMinority[_userAccount] = minor;
        minorities.push(minor);
        minorCount = minorCount.add(1);
    }

    /// @dev 주어진 어카운트에 해당하는 유저 객체 반환
    function getUser(address _userAccount) view public returns(Minority _minor) {
        Minority memory minor = addressToMinority[_userAccount];
        return minor;
    }

    /// @dev 주어진 어카운트에 해당한는 유저가 존재하는지의 유무를 bool 값으로 리턴
    function checkUser(address _userAccount) public view returns(bool) {
        Minority memory minor = addressToMinority[_userAccount];
        if(bytes(minor.name).length != 0){
            return true;
        } else {
            return false;
        }
    }

    /// @dev 마음에 드는 콘텐츠 id를 myList에 추가한다
    function addMyList(uint _id) public {
        addressToMinority[msg.sender].myList.push(_id);
    }
}