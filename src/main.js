
const updateContent = (locate, selected,body) => {
   $("."+locate).eq(selected).append(body);
}

const clearContent = (loc, selected) => {
    $("."+loc).eq(selected).empty();
}
