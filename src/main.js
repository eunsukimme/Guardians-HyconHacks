
const updateContent = (locate, selected,body) => {
   $("."+locate).append(body);
}

const clearContent = (loc, selected) => {
    $("."+loc).eq(selected).empty();
}
