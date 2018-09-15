
const loadContents = () => {
    let checkAccountChange = setTimeout( function() {
        // 계정이 바뀌었는지 확인
        Promise.resolve(getContentByMyList())
    }, 1000);
    console.log('loading contents...');
}

$(document).ready(() => {
    loadContents();
})