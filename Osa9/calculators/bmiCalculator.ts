interface DivideValues {
  value1: number;
  value2: number;
}

const parseArguments = (args: Array<string>): DivideValues => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too much arguments");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3]),
    };
  } else {
    throw new Error("provided values were not numbers");
  }
};

const bmiCalculator = (a: number, b: number): string => {
  const bmi = a / (b * b);
  if (bmi < 18.5) {
    return "Underweight";
  }
  if (bmi >= 18.5 && bmi <= 25) {
    return "Healthy (normal weight)";
  }
  if (bmi > 35) {
    return "Obese";
  } else return "Overweight";
};
try {
  const { value1, value2 } = parseArguments(process.argv);
  bmiCalculator(value1, value2);
} catch (e) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  console.log("Error, something went wrong, message: ", e.message);
}

export default bmiCalculator;
