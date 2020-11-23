module.exports = {
    enc : function(code, salt) {
        const sha256 = require('sha256');
        
        return sha256(code + salt)
    },
}