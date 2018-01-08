describe("Test Meal Plan", function () {
	var planMeal = require("../planMeal.js");

	describe("Validation: Basic Inputs", function () {

		it("should handle undefined inputs", function () {
			expect(planMeal()).toEqual({});
		});

		it("should accept empty dictionary", function () {
			expect(planMeal({}, 1)).toEqual({});
		});

		it("should accept single-food item dictionary", function () {
			expect(planMeal({ 1: 1 }, 5)).toEqual({ 1: 5 });
		});

		it("should handle a meal with 0 portions", function () {
			expect(planMeal({ 1: 1 }, 0)).toEqual({ 1: 0 });
		});

		it("should accept both empty dictionary and 0 portion meal", function () {
			expect(planMeal({}, 0)).toEqual({});
		});

	});

	describe("Functional: Handling 0 Ratios", function () {

		it("should handle single 0 ratio food item", function () {
			expect(planMeal({ 1: 0 }, 10)).toEqual({ 1: 0 });
		});

		it("should handle multiple 0 ratio food items", function () {
			expect(planMeal({ 1: 0, 2: 0, 3: 1 }, 8)).toEqual({ 1: 0, 2: 0, 3: 8 });
		});

		it("should handle all 0 ratio food items", function () {
			var foodRatios = { 1: 0, 2: 0, 3: 0 };
			expect(planMeal(foodRatios, 10)).toEqual(foodRatios);
		});

		it("should ignore any 0 ratios", function () {
			expect(planMeal({ 1: 0, 2: 1, 3: 1 }, 10)).toEqual({ 1: 0, 2: 5, 3: 5 });
		});

		it("should not add a remainder to 0 ratio portions", function () {
			var input = {
					1: 0,
					2: 1,
					3: 1,
					4: 1
				},
				output = {
					1: 0, // Make sure a remainder is not added to this value
					2: 4,
					3: 4,
					4: 3
				};
			expect(planMeal(input, 11)).toEqual(output);
		});

	});
	
	// When a ratio does not divide evenly

	it("should correctly handle remainders", function () {
		expect(planMeal({ 1: 1, 2: 1, 3: 1 }, 11)).toEqual({ 1: 4, 2: 4, 3: 3 });
	});

	it("should handle when a single ratio is greater than portion", function () {
		expect(planMeal({ 1: 5 }, 1)).toEqual({ 1: 5 });
	});

	// pretty sure this should be an error?
	it("should handle when the total ratios is greater than portion count", function () {
		expect(planMeal({ 1: 2, 2: 1, 3: 1 }, 3)).toEqual({ 1: 20, 2: 20 })
	});

	// If the ratios are not true ratios
	it("should treat the dict values as a true ratio", function () {
		expect(planMeal({ 1: 5, 2: 5 }, 4)).toEqual({ 1: 2, 2: 2 });
	});

});