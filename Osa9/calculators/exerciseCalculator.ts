export interface Result {
  periodLength: number;
  trainingDays: number;
  succes: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const parseArguments2 = (args: Array<string>): Array<number> => {
  const numberArguments = Array.from(args).slice(2);
  const validNumbers = numberArguments.filter((value) => !isNaN(Number(value)));
  if (args.length < 4) {
    throw new Error("minimum two numbers needed");
  }

  if (validNumbers.length === numberArguments.length) {
    const dayArray = numberArguments.map((string) => Number(string));
    return dayArray;
  } else throw new Error("provided values were not numbers");
};

const exerciseCalculator = (
  dailyHours: Array<number>,
  targetHours: number
): Result => {
  const days = dailyHours.length;
  const trainingDays = dailyHours.filter((day) => day !== 0).length;
  const hoursSum = dailyHours.reduce((hoursSum, hours) => hoursSum + hours);
  const hoursAverage = hoursSum / days;
  const rating = (): number => {
    const result = targetHours / hoursAverage;
    if (result <= 1) {
      return 3;
    }
    if (result > 1 && result < 1.3) {
      return 2;
    }
    return 1;
  };
  const ratingDescription = (rating: number): string => {
    if (rating === 3) {
      return "Very good! Target reached!";
    }
    if (rating === 2) {
      return "Almost there!";
    }
    return "Not even close!";
  };
  const trainingReport = {
    periodLength: days,
    trainingDays: trainingDays,
    succes: hoursAverage >= targetHours,
    rating: rating(),
    ratingDescription: ratingDescription(rating()),
    target: targetHours,
    average: hoursAverage,
  };
  return trainingReport;
};
if (process.argv[1] !== "index.ts") {
  const daysAndTarget = parseArguments2(process.argv);
  const days = Array.from(daysAndTarget).slice(1);
  const target = daysAndTarget[0];

  console.log(exerciseCalculator(days, target));
}
export default exerciseCalculator;
