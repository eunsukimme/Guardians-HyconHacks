<<<<<<< HEAD
const updateContent = (body) => {
    $('#content-area').append(body);
}

const clearContent = () => {
    $('#content-area').empty();
}
=======
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
>>>>>>> 361c83fce95e6906d64a729b26da0bd7711ded43
