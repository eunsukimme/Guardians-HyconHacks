class AutoUserCheck {

    constructor(url){
        this.url = url;
        this.accountTime = 0;
    }

    accountTimer(){
        let accountTime = setInterval(() => {
            if(this.checkCurrentUserAccount()){
                clearInterval(accountTime);
            }
        }, 1000)
    }

    /// @dev 유저 어카운트를 주기적으로 조사
    checkCurrentUserAccount(){
        if (currentUser !== userAccount) {
            userAccount = currentUser;
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
                        return true;
                    });
                } else {
                    // 유저가 존재하지 않는다면 가입을 권유한다
                    alert('You should create a new account');
                }
            });
        }
    }

    stopTimer(){
        clearInterval(this.accountTime);
    }
}



