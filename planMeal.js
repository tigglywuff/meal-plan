'use strict';



/**
  * 
  * @param {object} foodRatios
  * @param {int} numPortions
  * @return {object} foodQuantities
  */
function planMeal(foodRatios, numPortions) {
	var ret = {},
		total = 0,
		remainder,
		portionValue;

	foodRatios = foodRatios || {};

	// get the total of the ratios so we can do math!
	Object.keys(foodRatios).forEach(function (k) {
		total += foodRatios[k];
	});

	// If the total is 0, simply return the original foodRatios
	if (!total) {
		return foodRatios;
	}

	// Calculate the value of 1 portion
	portionValue = Math.floor(numPortions / total);

	// For uneven divides, let's get the remainder so we can spread it to the portions
	remainder = numPortions % total;

	// Assign a value to each food item based on the original ratio * portionValue
	Object.keys(foodRatios).forEach(function (k) {

		// If a remainder still exists and this current item is non-zero
		if (remainder && foodRatios[k]) {
			ret[k] = (foodRatios[k] * portionValue) + 1;
			remainder--;
		} else {
			ret[k] = foodRatios[k] * portionValue;
		}
	});

	return ret;
}

module.exports = planMeal;

return module.exports;