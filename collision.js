function remove_px(str) {
    var no_px="";

    for (var char=0; char<=str.length-1; char++) {
        if (str[char]!="p"&&str[char]!="x") {
            no_px=no_px.concat(str[char]);
        }
    }
    return Number(no_px);
}

function collision(el1_el, el2_el) {
    var rect1=window.getComputedStyle(el1_el);
    var rect2=window.getComputedStyle(el2_el);

    if (remove_px(rect1.left) < remove_px(rect2.left) + remove_px(rect2.width) &&
        remove_px(rect1.left) + remove_px(rect1.width) > remove_px(rect2.left) &&
        remove_px(rect1.top) < remove_px(rect2.top) + remove_px(rect2.height) &&
        remove_px(rect1.top) + remove_px(rect1.height) > remove_px(rect2.top)) {
        return true;
    } else {
        return false;
    }
}