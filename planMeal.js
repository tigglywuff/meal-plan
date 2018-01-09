'use strict';

/**
  * Validates the input for getMealPlan(). Throws an error if any inputs are invalid.
  */
function validateInput(input) {
	if (!input.foodRatios || typeof input.foodRatios !== "object") {
		throw "invalid input: foodRatios";
	}

	// If any of the keys are non-numeric or any of the ratio values are negative 
	Object.keys(input.foodRatios).forEach(function (k) {
		if (!/^[0-9]+$/.test(k) || input.foodRatios[k] < 0) {
			throw "invalid input: foodRatios";
		}
	});

	if (input.numPortions === undefined || typeof input.numPortions !== "number" || input.numPortions < 0) {
		throw "invalid input: numPortions";
	}
}

/**
  * Given specified ratios and portions, returns a map of actual quantities for each food item.
  *
  * @param {object} foodRatios
  * @param {int} numPortions
  * @returns {object} Actual quantities for each food item
  */
function getMealPlan(foodRatios, numPortions) {
	var actualQuantities = {},
		foodRatiosArr = [],
		i,
		remainder,
		total = 0,
		usedTotal = 0;

	// Validate the input
	validateInput({ "foodRatios": foodRatios, "numPortions": numPortions });

	// Get the item ratio total
	Object.keys(foodRatios).forEach(function (k) {
		total += foodRatios[k];
	});

	// If all the item ratios are 0, simply return the original foodRatios
	if (!total) {
		return foodRatios;
	}

	Object.keys(foodRatios).forEach(function (k) {

		// Store every food item's numeric identifier and its remainder in an array
		foodRatiosArr.push({
			"id": k,
			"remainder": (foodRatios[k] * numPortions) % total
		});

		// Assign final item quantities without remainders
		actualQuantities[k] = Math.floor(foodRatios[k] * numPortions / total);

		// Tally up the total quantities, used to calculate final remainder
		usedTotal += actualQuantities[k];
	});

	remainder = numPortions - usedTotal;

	// Sort foodRatiosArr based on remainder then numeric id
	foodRatiosArr.sort(function (a, b) {
		if (a.remainder > b.remainder) return -1;
		if (a.remainder < b.remainder) return 1;

		if (a.id > b.id) return 1;
		if (a.id < b.id) return -1;

		return 0;
	});

	// Distribute the remainder based on the sorted foodRatiosArr
	i = 0;
	while (remainder) {
		actualQuantities[foodRatiosArr[i].id]++;
		i++;
		remainder--;
	}

	return actualQuantities;
}

function main(foodRatios, numPortions) {
	try {
		return getMealPlan(foodRatios, numPortions);
	} catch (e) {
		return { "error": e };
	}
}

module.exports = main;

return module.exports;