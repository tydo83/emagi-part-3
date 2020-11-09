const translateWord = require('./translate-word.js');
const encodeWord = require('./encode-word.js');
const search = require('./search.js');
const randomElement = require('./random-element.js');
const emojis = require('./emojis.js');
const getCategory = require('./get-category');
const madlibs = require('./madlib-word.js');

const command = process.argv[2];
const words = process.argv.slice(3);

// `if/else if` version.
// if (command === 'encode') {
//     const encoding = words.map(encodeWord);
//     console.log(encoding.join(' '));
// } else if (command === 'translate') {
//     const translation = words.map(translateWord)
//     console.log(translation.join(' '));
// } else {
//     console.log('Your choices for what to write after "node main.js" (and a space!) are:');
//     console.log('* "encode" followed by a space and then as many letters as you want');
//     console.log('* "translate" followed by a space and then as many words as you want');
// }

// or, as a switch
switch (command) {
    case 'encode':
        const encoding = words.map(encodeWord);
        console.log(encoding.join(' '));
        break;

    case 'translate':
        const translation = words.map(translateWord)
        console.log(translation.join(' '));
        break;

    case 'search':
        const input = process.argv[3];
        const searchFound = search(input);
        if(searchFound.length === 0) {
            console.log("There are no matches");
        } else {
            for(let i = 0; i < searchFound.length; i++) {
                console.log(searchFound[i].symbol);
                }
        }
        break;

    case 'random':
        const category = process.argv[3];
        if(category !== undefined) {
            let result = getCategory(category);
            const random = randomElement(result);
            console.log(random.symbol);
        } else {
            const random = randomElement(emojis);
            console.log(random.symbol);
        }
        break;

    case 'madlibs':
        const result = words.map(madlibs);
        console.log(result.join(' '));
        break;

    default:
        console.log('Your choices for what to write after "node main.js" (and a space!) are:');
        console.log('* "encode" followed by a space and then as many letters as you want');
        console.log('* "translate" followed by a space and then as many words as you want');
}
