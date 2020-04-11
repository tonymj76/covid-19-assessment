const compose = (...fns) => (...args) => fns.reduce((res, fn) => [fn.call(null, ...res)], args)[0];

const giveValue = (value) => (d) => parseInt(value, 10) * d;
const currentlyInfected = (input) => {
  const { data, impact, severeImpact } = input;
  const reported = giveValue(data.reportedCases);

  impact.currentlyInfected = reported(10);
  severeImpact.currentlyInfected = reported(50);
  return input;
};
const getInfactions = (time) => (d) => {
  const factor = Math.trunc(parseInt(time, 10) / 3);
  return d * (2 ** factor);
};

const infectionsByRequestedTime = (input) => {
  const { data, impact, severeImpact } = input;
  const periodType = data.periodType.trim().toLowerCase();
  const monthsInfection = getInfactions(data.timeToElapse * 30);
  const weeksInfaction = getInfactions(data.timeToElapse * 7);
  const daysInfaction = getInfactions(data.timeToElapse);
  switch (periodType) {
    case 'months':
      impact.infectionsByRequestedTime = monthsInfection(impact.currentlyInfected);
      severeImpact.infectionsByRequestedTime = monthsInfection(severeImpact.currentlyInfected);
      break;
    case 'weeks':
      impact.infectionsByRequestedTime = weeksInfaction(impact.currentlyInfected);
      severeImpact.infectionsByRequestedTime = weeksInfaction(severeImpact.currentlyInfected);
      break;
    default:
      impact.infectionsByRequestedTime = daysInfaction(impact.currentlyInfected);
      severeImpact.infectionsByRequestedTime = daysInfaction(severeImpact.currentlyInfected);
      break;
  }
  return input;
};

// const amount = (percentValue, amt) => percentValue/100 * amt
const whatIs = (percentage) => ({ of: (amount) => (parseFloat(percentage) / 100) * amount });
const convertPercent = (input) => {
  const { impact, severeImpact } = input;
  impact.severeCasesByRequestedTime = whatIs('15%').of(impact.infectionsByRequestedTime);
  severeImpact.severeCasesByRequestedTime = whatIs('15%').of(severeImpact.infectionsByRequestedTime);
  return input;
};

const hospitalBedsByRequestedTime = (input) => {
  const { data, impact, severeImpact } = input;
  // const avarageCase = whatIs('65%').of(data.totalHospitalBeds);
  const expectCase = whatIs('35%').of(data.totalHospitalBeds);
  impact.hospitalBedsByRequestedTime = Math.trunc(
    expectCase - impact.severeCasesByRequestedTime
  );
  severeImpact.hospitalBedsByRequestedTime = Math.trunc(
    expectCase - severeImpact.severeCasesByRequestedTime
  );
  return input;
};

const rateDollar = (...args) => (d) => (Math.trunc(
  d * args.reduce((acc, preV) => ((acc * preV)))
));
const dollarsInFlight = (input) => {
  const { data, impact, severeImpact } = input;
  const { region } = data;
  const periodType = data.periodType.trim().toLowerCase();
  const monthsRate = rateDollar(
    region.avgDailyIncomeInUSD,
    data.timeToElapse * 30
  );

  const weeksRate = rateDollar(
    region.avgDailyIncomeInUSD,
    data.timeToElapse * 7
  );

  const daysRate = rateDollar(
    region.avgDailyIncomeInUSD,
    data.timeToElapse
  );
  switch (periodType) {
    case 'months':
      impact.casesForICUByRequestedTime = Math.trunc(
        whatIs('5%').of(impact.infectionsByRequestedTime / 30)
      );
      severeImpact.casesForICUByRequestedTime = Math.trunc(
        whatIs('5%').of(severeImpact.infectionsByRequestedTime / 30)
      );
      impact.casesForVentilatorsByRequestedTime = Math.trunc(
        whatIs('2%').of(impact.infectionsByRequestedTime / 30)
      );
      severeImpact.casesForVentilatorsByRequestedTime = Math.trunc(
        whatIs('2%').of(severeImpact.infectionsByRequestedTime / 30)
      );
      impact.dollarsInFlight = monthsRate(impact.infectionsByRequestedTime * region.avgDailyIncomePopulation)
      severeImpact.dollarsInFlight = monthsRate(severeImpact.infectionsByRequestedTime * region.avgDailyIncomePopulation)
      break;
    case 'weeks':
      impact.casesForICUByRequestedTime = Math.trunc(
        whatIs('5%').of(impact.infectionsByRequestedTime / 7)
      );
      severeImpact.casesForICUByRequestedTime = Math.trunc(
        whatIs('5%').of(severeImpact.infectionsByRequestedTime / 7)
      );
      impact.casesForVentilatorsByRequestedTime = Math.trunc(
        whatIs('2%').of(impact.infectionsByRequestedTime / 7)
      );
      severeImpact.casesForVentilatorsByRequestedTime = Math.trunc(
        whatIs('2%').of(severeImpact.infectionsByRequestedTime / 7)
      );
      impact.dollarsInFlight = weeksRate(impact.infectionsByRequestedTime * region.avgDailyIncomePopulation)
      severeImpact.dollarsInFlight = weeksRate(severeImpact.infectionsByRequestedTime * region.avgDailyIncomePopulation)
      break;
    default:
      impact.casesForICUByRequestedTime = Math.trunc(
        whatIs('5%').of(impact.infectionsByRequestedTime)
      );
      severeImpact.casesForICUByRequestedTime = Math.trunc(
        whatIs('5%').of(severeImpact.infectionsByRequestedTime)
      );
      impact.casesForVentilatorsByRequestedTime = Math.trunc(
        whatIs('2%').of(impact.infectionsByRequestedTime)
      );
      severeImpact.casesForVentilatorsByRequestedTime = Math.trunc(
        whatIs('2%').of(severeImpact.infectionsByRequestedTime)
      );
      impact.dollarsInFlight = daysRate(impact.infectionsByRequestedTime * region.avgDailyIncomePopulation)
      severeImpact.dollarsInFlight = daysRate(severeImpact.infectionsByRequestedTime * region.avgDailyIncomePopulation)
      break;
  }
  return input;
};

const covid19ImpactEstimator = (data) => {
  const estimatorFactory = compose(
    currentlyInfected,
    infectionsByRequestedTime,
    convertPercent,
    hospitalBedsByRequestedTime,
    dollarsInFlight
  );

  return estimatorFactory({
    data,
    impact: {},
    severeImpact: {}
  });
};
export default covid19ImpactEstimator;
