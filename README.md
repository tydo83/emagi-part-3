# Emagi Front-End - Part 3

Welcome back! At the end of Part 2, we:

1. got `encodeWord` in tip-top form, handling all kinds of weird input to give a good answer to the user's request, and
2. put a framework in place to allow the user to pick which command including translation and encoding, but with the ability to extend to any future commands we implement.

That implementation starts now! In Part 3, we're going to add:

1. MadLibs - asking for random emojis by category in the middle of our sentences.
2. Search - find an emoji by name.
3. Random - get a random emoji, filtered by category if desired.


Welcome to part 3, the final part. Let's master these emagi!


### First Up - A Crucial Helper Function

Our `getCategory` function is going to get all the emojis for a given category. If we ask it to get all emojis in the `animal` category, it will return to us only the animal emojis. In other words: it's a filter! This will be very useful when we want to get a random emoji from a specific category, which is part of not only our random feature, but our madlibs one as well.

We've done some mapping, now let's do a filter! 

1) Let's wire everything together first. Create a `get-category.js` file, have it require in our emoji data from `emoji.js`, add a `getCategory` function, and at the end of the file, export that function. We're ready to start!

2) We'll need to return an array of filtered-down emoji objects. But how will we know if an emoji makes the cut? If that object's `categories` property, which is an array, contains the category we're looking for. Check out the `emojis` in `emojis.js`--every emoji has an array of `categories`, ranging from 0 categories (an empty array) to a `categories` array holding 2 strings. We COULD loop through that `categories` array and see if the category we're looking for is in there, but there's a method called `.includes` that will do that for us, returning `true` if our category is in that array and `false` if it isn't. This is a highly recommended tool!

Get re-accustomed to what those emoji objects look like, and, for now, just **take in a `category` parameter in your `getCategory` function.**

3) Choose your own adventure! `3a` will give you the manual filter steps, `3b` the `.filter` version.

3a) If you're not comfortable with `.filter`, you could certainly solve this problem manually. Simply create a new empty array, loop through the `emojis` array, and in that loop, check each one for whether its `categories` property (an array, remember) includes the parameter our function was given. **If it does**, push it into the new array. If it doesn't, don't do a darned thing. After the loop, return the resulting array. You should be passing both tests for `getCategory` now!

3b) If you run `emojis.filter`, passing in a helper function, it will return a filtered-down array for you. It's not a bad idea to save the return value of this call to a variable for returning, though you could also simply do `return emojis.filter()` (with the helper function in there, of course).

**Important note**: Our helper function needs access to the `category` that was passed in, and it needs to be inside the `getCategory` function for that to be in its scope. The best way to solve this problem is to pass `.filter` not a NAMED function, but an anonymous inline helper function. But if you're not comfortable with that syntax, a named helper function will work as well, as long as it's declared inside `getCategory` and *above* the call to `.filter`.

That helper function will be called by `.filter` on every emoji object in `emojis`, and, if our helper function returns `true` for that emoji, it will make it into our filtered-down array. If it doesn't return `true`, it will be skipped. So our function just needs to return `true` if the emoji object it takes in has a `categories` property that includes the `category` parameter from `getCategory`, and false otherwise. You can set that up with an `if`/`else` statement, but since `.includes` returns the boolean we want to return, we can just return its return value. In other words: rather than saying "if `.includes` returns `true`, return `true`, if `.includes` returns `false`, return `false`", we can just say, "return whatever `.includes` gives us".

Don't forget to return the reuslts of this `.filter` call! `.filter` doesn't change the array it's called on, it simply returns a new array, and we need to take that value and return it as our return value for `getCategory`.

If you got it right, you should be passing both the tests for `getCategory`!


### Search

Search is very similar to `getCategory`, with only one difference. We'll be checking each emoji's `.name` rather than `.category`!

1) Create the file, `search.js`, in the usual way, with the `emojis` require at the top, the `search` function in the middle, and exporting the function at the bottom.

2) `search` will take in a search string instead of a `category`; call it what you want!

3) Return the result of filtering our `emojis` by whether its `name` property includes the (preferably lowercased) search string.

4) Refer to your `getCategory` solution if you're not quite getting it, and, as always, check your terminal results for your tests if you're not passing them. If yougot it right, you should be passing all of the tests now! Every single one! Huzzah.


### Searching On The Front End

Let's give our user the option of searching!

1) Add `search` as an option for their command; whether you're using `if` or `switch`, it should be pretty easy.

2) The way in which `search` is different is that it's not taking in a set of words, but one word. So in your `if` or `switch` code for `search`, grab and save into a variable what's in `process.argv[3]`--this should be the next thing they type after `node main.js search`.

3) We now save into a varaible the result of calling `search` with that `process.argv[3]` value. We'll need to do a few things with it!

4) The first is to check if there were no matches. How would we tell that? Well, the array of matches we get back would be empty! If that's true, print to the user that there were no matches. Don't just give them no feedback!

5) If there WERE matches, we'll want to print them out. If you want to double check you've got a good answer, just print out the return value from search. But because it's an array of objects, you're going to be printing it out with curly braces and quotes and square brackets and commas and the whole thing. Not even your fellow programmers would want their emojis printed in that format! So we'll print them a better way.

6) So instead, loop through that matches array and do a `console.log` on the `symbol` property for each object.

7) Test it by running `node main.js search corn`. You should see both a unicorn and a popcorn print out!


### Randomness

Let's add the randomness feature. You've got a helper function already written for you for that: `randomElement` in `random-element.js`. Feel free to check out the code, but all you need to know is that it takes in an array and gives you a random element from it. We'll use it and our `getCategory` function to implement our `random` feature!

1) Add a check for whether `process.argv[2]` is `random` to your logic in `main.js`.

2) If it is, get a random emoji from `emojis` using `randomElement`, which you'll have to `require` in from its file.

3) That will be an object, since we're getting the entire (random) element. So print out its `symbol` property, and you'll have the basic `random` feature!

4) But what if they want a random `animal` or `plant` or `face` emoji? Add a check to our logic for if `process.argv[2]` is `random` and `process.argv[3]` exists (i.e., is NOT `undefined`). This is a bit tough logic-wise; we want to make sure if it exists we're running the "search by category" code we're about to write, and if it doesn't, we run the code we just wrote for a random emoji from all the emojis. Feel free to flowchart this!

5) If the user DID enter a keyword like `animal` or `holiday`, we'll want to filter the emojis down to that category before we pass it to `randomElement` and print the random element's symbol. How do we do that? Pass that `process.argv[3]` value to `getCategory`! That should give you back a filtered down array to just that category, and THAT is what we want to give to `randomElement`.

6) Check that both searches still work! Try `node main.js random` and see if you're getting different kinds of emojis, and try `node main.js plant`, which only has cactus and christmas tree.


### Mad Libs

Coming soon!
