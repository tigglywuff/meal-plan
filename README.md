# meal-plan

## Overview
This repository contains a library planMeal.js whose sole export is a function that helps users plan a meal. The function accepts 2 arguments:
* A dictionary/map where the keys are numeric identifiers for a certain food item, and the values are the ratio of that item desired
* An integer indicating how many portions the meal should serve

And returns a dictionary/map where the keys are numeric identifiers for each food item, and the values are the actual quantities for each food item

## Sample Usage
Simply import planMeal.js and call the function with its appropriate parameters.
```
var plan = require("./planMeal.js");
plan({ 1: 1, 2: 1 }, 4);
```

## Testing
A small end-to-end test suite has been included for testing planMeal.js's main function. To install jasmine and run the tests please issue the following simple commands:
```
npm install
npm test
```

## Comments
The least optimal portion of my algorithm is the array sort by remainder followed by numeric id. In the best interests of time I have used the default js array sort function, but I do recognize that this area can be optimized by creating my own sorting data structure instead.