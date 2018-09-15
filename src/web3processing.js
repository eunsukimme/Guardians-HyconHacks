let Guardian;
let userAccount;
let currentUser;

const startApp = () => {
    const contractAddress = '0x3229cfdd62f8ff37aaa1d2a15cec504717fd8d0a';
    Guardian = new web3.eth.Contract(contractABI, contractAddress);

    let checkAccountChange = setInterval(async function () {
        // 계정이 바뀌었는지 확인
        let currentAccount = await web3.eth.getAccounts().then(function (array) {
            return array[0]
        });
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
    return Guardian.methods.checkUser(userAccount).call().then((result) => {
        return result;
    })
}

// 컨트랙트 메소드 호출
const getUser = () => {
    return Guardian.methods.getUser(userAccount).call().then(function (result) {
        return result;
    })
}

// 컨트랙트 메소드 전송
const addUser = (_minType, _name) => {
    console.log('registering new user on blockchain...');

    return Guardian.methods.addUser(userAccount, _minType, _name)
        .send({from: userAccount})
        .on('receipt', function (receipt) {
            console.log('Successfully registered ' + _name + '!');
            location.reload();
        })
        .on('error', function (error) {
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
    await Promise.resolve(getContentByType(_type)).then(function (result) {
        //console.log(_type);
        console.log(result);
        contentsIdx = result;
    });

    for (let i = 0; i < contentsIdx.length; i++) {
        Promise.resolve(getContent(contentsIdx[i])).then(function (content) {
            console.log(content);
            updateContent('innerBlock', `<article class="row blog_item">
    <div class="col-md-9">
    <div class="blog_post">
    <div class="blog_details">
    <a href=${content.url}><h2>${content.title}</h2></a>
<a href=${content.url} class=white_bg_btn>View More</a>
</div>
</div>
</div>
</article>`);
        });
    }
};

const getContentByMyList = async () => {
    let mylist;
    await Promise.resolve(getUser()).then(user => {
        // 선호하는 콘텐츠 id 배열 반환
        mylist = user.myList;
    });
    console.log(mylist);
    for(let i = 0 ; i < mylist.length ; i++){
        getContent(mylist[i]).then(content => {
            console.log(content);
            updateContent('innerBlock', `<article style="padding-left: 5%" class="blog_item" >
    <div class="col-md-9">
    <div class="blog_post">
    <div class="blog_details">
    <a href=${content.url}><h2>${content.title} ⭐</h2></a>
<a href=${content.url} class=white_bg_btn>View More</a>
</div>
</div>
</div>
</article>`);
        })
    }
};

const getContentByType = (_type) => {
    return Guardian.methods.getContentByType(_type).call()
        .then(function (result) {
            // result는 동일 타입의 컨텐츠의 id 배열
            return result;
        })
};

const getContent = (_id) => {
    return Guardian.methods.getContent(_id).call().then(function (content) {
        return content;
    })
};

const makeContent = async (_type, _title, _url) => {

    await Promise.resolve(getUser()).then(user => {
        console.log(user.minType);
        if (user.minType == 5) {
            return Guardian.methods.makeContent(_type, _title, _url)
                .send({from: userAccount})
                .on("receipt", function (receipt) {
                    console.log("Successfully uploaded a new content!");
                })
                .on("error", function (error) {
                    console.log(error);
                });
        }
    });

    alert('Only public agent can upload content!');
    return;
};

const deleteContent = (_id) => {
    return Guardian.methods.deleteContent(_id)
        .send({from: userAccount})
        .on("receipt", function (receipt) {
            console.log("Successfully deleted the content!");
        })
        .on("error", function (error) {
            console.log(error);
        })
};


const sendEther = (_amount) => {
    return Guardian.methods.sendEther()
        .send({from: userAccount, value: web3.utils.toWei(_amount), gas: 3000000})
        .on('receipt', function(receipt){
            console.log(receipt);
        })
        .on('error', function(error){
            console.log(error);
        })
};

const getGuardianBalance = () => {
    return Guardian.methods.getBalance()
        .call().then(function(balance){
            console.log(balance);
            return balance;
        })
};

const withdraw = () => {
    return Guardian.methods.withdraw().call().then(function(result){
        console.log(result);
        return result;
    })
}

// 페이지가 로드 될 떄 마다 실행
window.addEventListener('load', function () {
    if (typeof web3 !== 'undefined') {
        //alert('메타마스크가 주입되었습니다');
        web3 = new Web3(web3.currentProvider);
    } else {
        //alert('메타마스크 계정을 찾을 수 없습니다.');
        web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    }

    startApp();
});

