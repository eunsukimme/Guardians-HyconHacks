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

    /// @dev 주어진 type에 해당하는 컨텐츠들의 id들을 반환
    function getContentByType(uint8 _type) view public returns(uint[] _idx){
        uint idxCount = 0;
        // 순차 탐색하며 주어진 타입과 동일한 컨텐츠 개수 셈
        for(uint i = 0 ; i < contentId ; i++){
            if(contents[i].minType == _type){
                idxCount = idxCount.add(1);
            }
        }
        // 고정 길이 배열 할당
        uint[] memory idx = new uint[](idxCount);
        uint index = 0;
        // push와 같은 기능 구현
        for(uint ind = 0 ; ind < contentId ; ind++){
            if(contents[ind].minType == _type){
                idx[index] = contents[ind].id;
                index = index.add(1);
            }
        }
        return idx;
    }

    /// @dev 주어진 id에 해당하는 컨텐츠 삭제
    function deleteContent(uint _id) public {
        delete contents[_id];
    }


}