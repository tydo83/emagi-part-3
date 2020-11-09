const emojis = require('./emojis.js');


// string-building version
const encodeWord = function(word) {
    let result = '';
    for (const char of word) {
        let found = false;
        for (const emoji of emojis) {
            if (emoji.letter === char.toLowerCase()) {
                found = true;
                result += emoji.symbol;
            }
        }

        if (found === false) {
            result += char;
        }
    }

    return result;
}

// mapping version
const encodeWordAlt = function(word) {
    const letters = word.split('');
    const encodedLetters = letters.map(function(letter) {
        for (const emoji of emojis) {
            if (emoji.letter === letter) {
                return emoji.symbol;
            }
        }

        return letter;
    })

    return encodedLetters.join('');
}

// mapping with no intermediate variables version.
const encodeWordAlt2 = function(word) {
    return word.split('').map(function(letter) {
        for (const emoji of emojis) {
            if (emoji.letter === letter) {
                return emoji.symbol;
            }
        }

        return letter;
    }).join('');
}

module.exports = encodeWord;
