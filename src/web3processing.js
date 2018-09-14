let contract;
let userAccount;

const startApp = () => {
    const contractAddress = '';
    Guardian = new web3.eth.Contract(contractABI, contractAddress);

    let checkAccountChange = setInterval(async function() {
        // 계정이 바뀌었는지 확인
        let currentAccount = await web3.eth.getAccounts().then(function(array) { return array[0] });
        if (currentAccount !== userAccount) {
            userAccount = currentAccount;
            // 새 계정에 대한 UI로 업데이트하기 위한 함수 호출
            //alert('Your account is ' + userAccount);
            // 해당 계정의 유저가 이미 존재하는지 확인
            const isUserExist = Guardian.methods.checkUser(userAccount).call();
            // 유저가 존재한다면 환영한다
            if(isUserExist){
                const user = Guardian.methods.getUser(userAccount).call();
                console.log(`Hello, ${user.name}!`);
            } else {
                // 가입을 권유한다
                console.log('You should create a new account');
            }

        }
    }, 1000);
};

const getUser = () => {
    return Guardian.methods.getUser(userAccount).call();
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
        web3 = new Web3(web3.currentProvider);
    } else {
        web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    }

    startApp();
})