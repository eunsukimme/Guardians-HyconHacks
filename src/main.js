
<<<<<<< HEAD
const updateContent = (body) => {
    $('#content-area').append(body);
=======
const updateContent = (locate, selected,body) => {
   $("."+locate).append(body);
>>>>>>> 5d175653d1d2c3651c8489c132754c64ee2bf764
}

const clearContent = (loc, selected) => {
    $("."+loc).eq(selected).empty();
}
<<<<<<< HEAD

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

=======
>>>>>>> 5d175653d1d2c3651c8489c132754c64ee2bf764
