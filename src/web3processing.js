let Guardian;
let userAccount;
let currentUser;

const startApp = () => {
    const contractAddress = '0xcf99c96eab2d4735fd94ef0ddc783017db29ed83';
    Guardian = new web3.eth.Contract(contractABI, contractAddress);

    let checkAccountChange = setInterval(async function() {
        // 계정이 바뀌었는지 확인
        let currentAccount = await web3.eth.getAccounts().then(function(array) { return array[0] });
        checkCurrentUserAccount(currentAccount);
    }, 100);

};

// 현재 account가 이미 존재하는 사용자인지 확인
const checkCurrentUserAccount = (_currentAccount) => {
    if (_currentAccount !== userAccount) {
        userAccount = _currentAccount;
        // 새 계정에 대한 UI로 업데이트하기 위한 함수 호출
        // 유저의 존재 유무
        let isUserExist;
        Promise.resolve(checkUser()).then(result => {
            isUserExist = result;
            // 유저가 존재한다면
            if (isUserExist) {
                // 환영한다
                Promise.resolve(getUser()).then(user => {
                    currentUser = user;
                    //alert(currentUser.name);
                    console.log(`Hello, ${user.name}`);
                });
            } else {
                // 유저가 존재하지 않는다면 가입을 권유한다
                alert('You should create a new account');
            }
        });
    }
}

// 컨트랙트 메소드 호출
const checkUser = () => {
    return Guardian.methods.checkUser(userAccount).call().then((result)=> {
        return result;
    })
}

// 컨트랙트 메소드 호출
const getUser = () => {
    return Guardian.methods.getUser(userAccount).call().then(function(result){
        return result;
    })
}

// 컨트랙트 메소드 전송
const addUser = (_minType, _name) => {
    console.log('registering new user on blockchain...');

    return Guardian.methods.addUser(userAccount, _minType, _name)
        .send({from: userAccount})
        .on('receipt', function(receipt){
            console.log('Successfully registered ' + _name + '!');
            location.reload();
        })
        .on('error', function(error){
            console.log(error);
        })
};

const getAllContentMatchWithUser = async () => {
    let _type;
    await Promise.resolve(getUser()).then(user => {
        _type = user.minType;
    });
    // 컨텐트들의 id가 담긴 배열
    let contentsIdx;
    await Promise.resolve(getContentByType(_type)).then(function(result){
        //console.log(_type);
        console.log(result);
        contentsIdx = result;
    });

    for(let i = 0 ; i < contentsIdx.length ; i++){
        Promise.resolve(getContent(contentsIdx[i])).then(function(content){
            console.log(content);
            clearContent('blog_left_sidebar',i);
            updateContent('blog_left_sidebar',i ,`<div class=blog-details>
                                            <p>content-id: ${content.id}</p>
                                            <a href=${content.url}><h2>${content.title}</h2></a>
                                            <a href=${content.url} class=white_bg_btn>View More</a>
                                            <p>타입: ${content.minType}</p>
                                        </div>`);
        });
    }
};


const getContentByType = (_type) => {
    return Guardian.methods.getContentByType(_type).call()
        .then(function(result){
            // result는 동일 타입의 컨텐츠의 id 배열
            return result;
        })
};

const getContent = (_id) => {
    return Guardian.methods.getContent(_id).call().then(function(content){
        return content;
    })
};

const makeContent = (_type, _title, _url) => {
    return Guardian.methods.makeContent(_type, _title, _url)
        .send({from: userAccount})
        .on("receipt", function(receipt){
            console.log("Successfully uploaded a new content!");
        })
        .on("error", function(error){
            console.log(error);
        })
};

const deleteContent = (_id) => {
    return Guardian.methods.deleteContent(_id)
        .send({from: userAccount})
        .on("receipt", function(receipt){
            console.log("Successfully deleted the content!");
        })
        .on("error", function(error){
            console.log(error);
        })
};

// 페이지가 로드 될 떄 마다 실행
window.addEventListener('load', function() {
    if(typeof web3 !== 'undefined') {
        //alert('메타마스크가 주입되었습니다');
        web3 = new Web3(web3.currentProvider);
    } else {
        //alert('메타마스크 계정을 찾을 수 없습니다.');
        web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    }

    startApp();
});

