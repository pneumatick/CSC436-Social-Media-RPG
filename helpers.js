function sanitizeString(str){
    str = str.replace(/[^a-z0-9!.-_@ ,]/gim,"");
    return str.trim();
}

module.exports = { sanitizeString };