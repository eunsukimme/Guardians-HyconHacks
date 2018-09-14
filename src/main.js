$(document).ready(() => {
    let timer = setInterval(()=>{
        if(userAccount !== undefined) {
            Promise.resolve(getUser()).then(data=>{
               console.log(data);
            });
            clearInterval(timer);
        }
    }, 1000);
});