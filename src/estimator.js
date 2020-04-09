const compose = (...fns) => (...args) => fns.reduce((res, fn) => [fn.call(null, ...res)], args)[0];

const giveValue = (value) => (d) => parseInt(value, 10) * d;
const currentlyInfected = (input) => {
  const { data, impact, severeImpact } = input;
  const reported = giveValue(data.reportedCases);

  impact.currentlyInfected = reported(10);
  severeImpact.currentlyInfected = reported(50);
  return input;
};

function infectionsByRequestedTime (input) {
  const { data, impact, severeImpact } = input;

  const factorsNum = (period) =>{
    let count = 0;
    while (period > 2) {
      pariod = Math.floor(parseInt(period, 10) / 3);
      count++;
    };
    return 3 * count;
  };

  let periodType = data.periodType.trim().toLowerCase();
  switch(periodType){
    case 'days':
      impact.infectionsByRequestedTime = impact.currentlyInfected * Math.pow(2, factorsNum(data.timeToElapse));
      severeImpact.infectionsByRequestedTime = severeImpact.currentlyInfected * Math.pow(2, factorsNum(data.timeToElapse));
      return input;
    case 'months':
      impact.infectionsByRequestedTime = impact.currentlyInfected * Math.pow(2, factorsNum(data.timeToElapse*30));
      severeImpact.infectionsByRequestedTime = severeImpact.currentlyInfected * Math.pow(2, factorsNum(data.timeToElapse*30));
      return input;
    case 'years':
      impact.infectionsByRequestedTime = impact.currentlyInfected * Math.pow(2, factorsNum(data.timeToElapse*360));
      severeImpact.infectionsByRequestedTime = severeImpact.currentlyInfected * Math.pow(2, factorsNum(data.timeToElapse*360));
      return input;
  };
};

// const amount = (percentValue, amt) => percentValue/100 * amt
const whatIs = (percentage) => ({of:(amount) => parseFloat(percentage)/100 * amount});
const convertPercent = (input) => {
  const { impact, severeImpact } = input;
  impact.severeCasesByRequestedTime         =  whatIs('15%').of(impact.infectionsByRequestedTime);
  severeImpact.severeCasesByRequestedTime   =  whatIs('15%').of(severeImpact.infectionsByRequestedTime);
  impact.casesForICUByRequestedTime         =  whatIs('5%').of(impact.infectionsByRequestedTime);
  severeImpact.casesForICUByRequestedTime   =  whatIs('5%').of(severeImpact.infectionsByRequestedTime);
  impact.casesForVentilatorsByRequestedTime =  whatIs('2%').of(impact.infectionsByRequestedTime);
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

const dollarsInFlight = (input) => {
  const { data, impact, severeImpact } = input
  let periodType = data.periodType.trim().toLowerCase()
  switch(periodType){
    case 'days':
      impact.dollarsInFlight = impact.infectionsByRequestedTime * region.avgDailyIncomeInUSD * region.avgDailyIncomePopulation * data.timeToElapse;
      severeImpact.dollarsInFlight = severeImpact.infectionsByRequestedTime * region.avgDailyIncomeInUSD * region.avgDailyIncomePopulation * data.timeToElapse;
      return input;
    case 'months':
      impact.dollarsInFlight = impact.infectionsByRequestedTime * region.avgDailyIncomeInUSD * region.avgDailyIncomePopulation * data.timeToElapse*30;
      severeImpact.dollarsInFlight = severeImpact.infectionsByRequestedTime * region.avgDailyIncomeInUSD * region.avgDailyIncomePopulation * data.timeToElapse*30;
      return input;
    case 'years':
      impact.dollarsInFlight = impact.infectionsByRequestedTime * region.avgDailyIncomeInUSD * region.avgDailyIncomePopulation * data.timeToElapse*360;
      severeImpact.dollarsInFlight = severeImpact.infectionsByRequestedTime * region.avgDailyIncomeInUSD * region.avgDailyIncomePopulation * data.timeToElapse*360;
      return input;
  };
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
