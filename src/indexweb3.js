let checkAccountChange = setInterval(async function() {
    // 계정이 바뀌었는지 확인
    let currentAccount = await web3.eth.getAccounts().then(function(array) { return array[0] });
    checkCurrentUserAccountAndRedirect(currentAccount);

}, 100);


const checkCurrentUserAccountAndRedirect = (_currentAccount) => {
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
                    location.replace('mypage.html');
                });
            } else {
                // 유저가 존재하지 않는다면 가입을 권유한다
                alert('You should create a new account');
            }
        });
    }
}