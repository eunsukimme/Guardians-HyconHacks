const loadContents = () => {
    Promise.resolve(getAllContentMatchWithUser()).then(data=>{
        console.log(data);
    });
}

$(document).ready(() => {

});