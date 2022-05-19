import { useState, useEffect } from 'react';
import { json } from 'd3';
const jsonUrl =
  'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json';

export const useData = () => {
  const [data, setData] = useState(null);
  if (data) {
    console.log(data[0]);
  }

  useEffect(() => {
    const row = (d) => {
      d['baseTemperature'] = +d[
        'baseTemperature'
      ];
      d['Reported Date'] = d['Reported Date'];
      d['data'] = d['monthlyVariance'];
      return d;
    };
    json(jsonUrl).then((data) => {
      const {baseTemperature,monthlyVariance} = data
      setData({
        temp:baseTemperature,
        data:monthlyVariance,
        year: monthlyVariance.map(a=>a["year"]),
        month: monthlyVariance.map(a=>a["month"]),
      });
    });
  }, []);
  return data;
};
