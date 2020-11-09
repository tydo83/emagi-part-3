const getRandom = require('./random-element.js');
const getCategory = require('./get-category.js');

const madlibWord = function(word) {
    const category = getCategory(word);
    if(category.length <= 0) {
        return word;
    } else if(category.length > 0) {
        const random = getRandom(category);
        return random.symbol
    }
}

module.exports = madlibWord;