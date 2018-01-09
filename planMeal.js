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

	// Validate the input

	if (!foodRatios || typeof foodRatios !== "object") {
		throw "invalid input: foodRatios";
	}

	if (numPortions === undefined || typeof numPortions !== "number") {
		throw "invalid input: numPortions";
	}

	// Get the ratio total
	Object.keys(foodRatios).forEach(function (k) {
		total += foodRatios[k];
	});




	// If the total is 0, simply return the original foodRatios
	if (!total) {
		return foodRatios;
	}

	var foodRatiosArr = [];
	var usedTotal = 0;

	Object.keys(foodRatios).forEach(function (k) {
		var foodRatio = {
			"id": k,
			"remainder": (foodRatios[k] * numPortions) % total
		};

		// Push it into an array. We can sort by remainder followed by id after.
		foodRatiosArr.push(foodRatio);

		// Assign its final portion count without remainders taken into account
		var c = Math.floor(foodRatios[k] * numPortions / total);
		usedTotal += c;
		ret[k] = c;
	});

	remainder =  numPortions - usedTotal;

	// Distribute the remainder based on the sorted foodRatiosArr

	var remainderIdSort = function (a, b) {
		if (a.remainder > b.remainder) {
			return -1;
		}

		if (a.remainder < b.remainder) {
			return 1;
		}

		// Otherwise the remainders are even
		if (a.id > b.id) {
			return 1;
		}

		if (a.id < b.id) {
			return -1;
		}

		return 0;
	}


	foodRatiosArr.sort(remainderIdSort);


	var i = 0;
	while (remainder) {

		var key = foodRatiosArr[i].id;
		ret[key]++;
		i++;
		remainder--;
	}

	return ret;
}

function main(foodRatios, numPortions) {
	try {
		return planMeal(foodRatios, numPortions);
	} catch (e) {
		console.log(e);
		return { "error": e };
	}
}

module.exports = main;

return module.exports;