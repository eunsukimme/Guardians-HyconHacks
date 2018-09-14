pragma solidity^0.4.24;
pragma experimental ABIEncoderV2;
import "./Guardian.sol";

contract GuardianContent is Guardian {
    using SafeMath for uint;
    using SafeMath for uint8;

    /// @dev 복지 콘텐츠 정보 구조체
    struct Content {
        uint id;
        uint8 minType;
        string title;
        string url;
        //string body;
    }

    /// @dev 콘텐츠 id로 콘텐츠를 찾는다
    mapping (uint => Content) public contents;
    /// @dev 콘텐츠에 부여되는 id, 1씩 증가한다
    uint public contentId = 0;

    /// @dev 콘텐츠를 생성
    function makeContent(uint8 _type, string _title, string _url) public {
        Content memory con = Content(contentId, _type, _title, _url);
        contents[contentId] = con;
        contentId = contentId.add(1);
    }

    /// @dev 주어진 id에 해당하는 콘텐츠 반환
    function getContent(uint _id) view public returns(Content) {
        return contents[_id];
    }



}