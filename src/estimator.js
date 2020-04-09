const compose = (...fns) => (...args) => fns.reduce((res, fn) => [fn.call(null, ...res)], args)[0];

const giveValue = (value) => (d) => parseInt(value, 10) * d;
const currentlyInfected = (input) => {
  const { data, impact, severeImpact } = input;
  const reported = giveValue(data.reportedCases);

  impact.currentlyInfected = reported(10);
  severeImpact.currentlyInfected = reported(50);
  return input;
};
const getInfactions = (t) => (d) => {
  let i = 0;
  for (i; t > 2; i++){
    t = Math.floor(parseInt(t, 10) / 3)
  };
  const factor = i * 3;
  return d * (2 ** factor);
}
const infectionsByRequestedTime = (input) => {
  const { data, impact, severeImpact } = input;
  const periodType = data.periodType.trim().toLowerCase();
  switch (periodType) {
    case 'months':
      const monthsInfection = getInfactions(data.timeToElapse * 30);
      impact.infectionsByRequestedTime = monthsInfection(impact.currentlyInfected );
      severeImpact.infectionsByRequestedTime = monthsInfection(severeImpact.currentlyInfected);
      break;
    case 'years':
      const yearsInfaction = getInfactions(data.timeToElapse * 360);
      impact.infectionsByRequestedTime = yearsInfaction(impact.currentlyInfected);
      severeImpact.infectionsByRequestedTime = yearsInfaction(severeImpact.currentlyInfected);
      break;
    default:
      const daysInfaction = getInfactions(data.timeToElapse);
      impact.infectionsByRequestedTime = daysInfaction(impact.currentlyInfected);
      severeImpact.infectionsByRequestedTime = daysInfaction(severeImpact.currentlyInfected);
      break;
  };
  return input;
};

// const amount = (percentValue, amt) => percentValue/100 * amt
const whatIs = (percentage) => ({of:(amount) => parseFloat(percentage)/100 * amount});
const convertPercent = (input) => {
  const { impact, severeImpact } = input;
  impact.severeCasesByRequestedTime = whatIs('15%').of(impact.infectionsByRequestedTime);
  severeImpact.severeCasesByRequestedTime = whatIs('15%').of(severeImpact.infectionsByRequestedTime);
  impact.casesForICUByRequestedTime = whatIs('5%').of(impact.infectionsByRequestedTime);
  severeImpact.casesForICUByRequestedTime = whatIs('5%').of(severeImpact.infectionsByRequestedTime);
  impact.casesForVentilatorsByRequestedTime = whatIs('2%').of(impact.infectionsByRequestedTime);
  severeImpact.casesForVentilatorsByRequestedTime = whatIs('2%').of(severeImpact.infectionsByRequestedTime);
  return input;
};

const hospitalBedsByRequestedTime = (input) => {
  const { data, impact, severeImpact } = input;
  const avarageCase = whatIs('65%').of(data.totalHospitalBeds);
  const expectCase = whatIs('35%', data.totalHospitalBeds - avarageCase);
  impact.hospitalBedsByRequestedTime = expectCase - impact.severeCasesByRequestedTime;
  severeImpact.hospitalBedsByRequestedTime = expectCase - severeImpact.severeCasesByRequestedTime;
  return input;
};

const rateDollar = (...args) => (d) => (d * args.reduce((acc, preV) => ((acc * preV))))
const dollarsInFlight = (input) => {
  const { data, impact, severeImpact } = input
  const periodType = data.periodType.trim().toLowerCase()
  switch (periodType) {
    case 'months':
      const monthsRate = rateDollar(region.avgDailyIncomeInUSD, region.avgDailyIncomePopulation, data.timeToElapse * 30);
      impact.dollarsInFlight = monthsRate(impact.infectionsByRequestedTime);
      severeImpact.dollarsInFlight = monthsRate(severeImpact.infectionsByRequestedTime);
      break;
    case 'years':
      yearsRate = rateDollar(region.avgDailyIncomeInUSD, region.avgDailyIncomePopulation, data.timeToElapse * 360)
      impact.dollarsInFlight = yearsRate(impact.infectionsByRequestedTime);
      severeImpact.dollarsInFlight = yearsRate(severeImpact.infectionsByRequestedTime);
      break;
    default:
      const daysRate = rateDollar(region.avgDailyIncomeInUSD, region.avgDailyIncomePopulation, data.timeToElapse);
      impact.dollarsInFlight = daysRate(impact.infectionsByRequestedTime);
      severeImpact.dollarsInFlight = daysRate(severeImpact.infectionsByRequestedTime);
      break;
  };
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
}
export default covid19ImpactEstimator;
