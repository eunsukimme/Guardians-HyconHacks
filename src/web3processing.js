let Guardian;
let userAccount;

const startApp = () => {
    const contractAddress = '0x0287b9f53ba465e4a2e3f59d78e26ac90d9c504f';
    Guardian = new web3.eth.Contract(contractABI, contractAddress);

    let checkAccountChange = setInterval(async function() {
        // 계정이 바뀌었는지 확인
        let currentAccount = await web3.eth.getAccounts().then(function(array) { return array[0] });
        if (currentAccount !== userAccount) {
            userAccount = currentAccount;
            // 새 계정에 대한 UI로 업데이트하기 위한 함수 호출
            //alert('Your account is ' + userAccount);
            // 해당 계정의 유저가 이미 존재하는지 확인
            //console.log(Guardian.methods.checkUser(userAccount).call());
            console.log(checkUser());
            //console.log(isUserExist);
            // 유저가 존재한다면 환영한다
            if(checkUser()){
                console.log(getUser());
                //console.log(`Hello, ${user.name}!`);
            } else {
                // 가입을 권유한다
                console.log('You should create a new account');
            }

        }
    }, 1000);
};

const checkUser = () => {
    return Guardian.methods.checkUser(userAccount).call().then((result)=> {
        console.log(result);
        return result;
    })
}

const getUser = () => {
    return Guardian.methods.getUser(userAccount).call().then(function(result){
        console.log(result);
        return result;
    })
}

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
}

window.addEventListener('load', function() {
    if(typeof web3 !== 'undefined') {
        //alert('메타마스크가 주입되었습니다');
        web3 = new Web3(web3.currentProvider);
    } else {
        //alert('메타마스크 계정을 찾을 수 없습니다.');
        web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    }

    startApp();
})