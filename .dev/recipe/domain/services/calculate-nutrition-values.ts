import { NutritionalValue } from "#/modules/meal/ingredient/domain/entities/nutritional-value";

export class CalculateNutritionalValue {
  // eslint-disable-next-line max-lines-per-function
  public static calculate(nutritionalValues: NutritionalValue[]): NutritionalValue {
    const sum: NutritionalValue = new NutritionalValue({
      calories: 0,
      saturatedFat: 0,
      monounsaturatedFat: 0,
      polyunsaturatedFat: 0,
      carbohydrate: 0,
      protein: 0,
      fiberFeed: 0,
      cholesterol: 0,
      vitaminA: 0,
      vitaminB: 0,
      vitaminB1: 0,
      vitaminB12: 0,
      vitaminB2: 0,
      vitaminB3: 0,
      vitaminB5: 0,
      vitaminB6: 0,
      vitaminC: 0,
      vitaminD: 0,
      vitaminE: 0,
      vitaminK: 0,
      calcium: 0,
      copper: 0,
      iron: 0,
      magnesium: 0,
      manganese: 0,
      phosphor: 0,
      potassium: 0,
      sodium: 0,
      selenium: 0,
      zinc: 0,
    });
    // eslint-disable-next-line max-statements, max-lines-per-function
    nutritionalValues.forEach((nutritionalValue) => {
      sum.calories += nutritionalValue.calories;
      sum.saturatedFat += nutritionalValue.saturatedFat;
      sum.monounsaturatedFat += nutritionalValue.monounsaturatedFat;
      sum.polyunsaturatedFat += nutritionalValue.polyunsaturatedFat;
      sum.carbohydrate += nutritionalValue.carbohydrate;
      sum.protein += nutritionalValue.protein;
      sum.fiberFeed += nutritionalValue.fiberFeed;
      sum.cholesterol += nutritionalValue.cholesterol;
      sum.vitaminA += nutritionalValue.vitaminA;
      sum.vitaminB += nutritionalValue.vitaminB;
      sum.vitaminB1 += nutritionalValue.vitaminB1;
      sum.vitaminB12 += nutritionalValue.vitaminB12;
      sum.vitaminB2 += nutritionalValue.vitaminB2;
      sum.vitaminB3 += nutritionalValue.vitaminB3;
      sum.vitaminB5 += nutritionalValue.vitaminB5;
      sum.vitaminB6 += nutritionalValue.vitaminB6;
      sum.vitaminC += nutritionalValue.vitaminC;
      sum.vitaminD += nutritionalValue.vitaminD;
      sum.vitaminE += nutritionalValue.vitaminE;
      sum.vitaminK += nutritionalValue.vitaminK;
      sum.calcium += nutritionalValue.calcium;
      sum.copper += nutritionalValue.copper;
      sum.iron += nutritionalValue.iron;
      sum.magnesium += nutritionalValue.magnesium;
      sum.manganese += nutritionalValue.manganese;
      sum.phosphor += nutritionalValue.phosphor;
      sum.potassium += nutritionalValue.potassium;
      sum.sodium += nutritionalValue.sodium;
      sum.selenium += nutritionalValue.selenium;
      sum.zinc += nutritionalValue.zinc;
    });

    return new NutritionalValue(sum);
  }
}
