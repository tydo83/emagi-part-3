const emojis = require('./emojis.js')

const search = function(word) {
    const newArray = [];
    for(const emoji of emojis) {
        if(emoji.name.includes(word.toLowerCase())) {
            newArray.push(emoji)
        }
        }
    return newArray;
    }

module.exports = search;