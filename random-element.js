const randomElement = function(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

// a = randomElement([1, 2 , 3, 4, 5]);
// a;


module.exports = randomElement;
