function randomNormal(mean, sd) {
  const u = 1 - Math.random();
  const v = 1 - Math.random();
  return mean + sd * Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

function generateConditionData(condition, count, areaMean, areaSD, dMean, dSD) {
  const arr = [];
  for (let i = 0; i < count; i++) {
    arr.push({
      Area: randomNormal(areaMean, areaSD),
      D: randomNormal(dMean, dSD),
      Condition: condition
    });
  }
  return arr;
}

// 150 points * 3 conditions = 450 synthetic rows
export const mockData = [
  ...generateConditionData("Standard", 150, 1.7, 0.20, 1.0, 0.15),
  ...generateConditionData("Hypoxia", 150, 1.9, 0.25, 1.4, 0.18),
  ...generateConditionData("LowTemp", 150, 2.2, 0.30, 1.7, 0.20),
];