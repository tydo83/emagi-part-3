const emojis = require('./emojis.js')

// 3a
const getCategory = function(category) {
    const newArray = [];
    for(const emoji of emojis) {
        if(emoji.categories.includes(category)) {
            newArray.push(emoji)
        }
        }
    return newArray;
    }

module.exports = getCategory;