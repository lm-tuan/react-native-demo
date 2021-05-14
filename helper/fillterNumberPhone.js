const fillterNumberPhone = (numbers, keySearch) => {
    const lst = [];
    numbers.forEach((e) => {
        if(e.number.includes(keySearch)){
            lst.push(e);
        }
    });
    return lst;
}

const checkRegExp = (str) => {
    const reg = new RegExp('^[0-9]$');
    return reg.test(str);
}
export default fillterNumberPhone;