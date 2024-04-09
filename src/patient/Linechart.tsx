// import React from 'react';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';
// import { Line } from 'react-chartjs-2';

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );
// interface Props {
//   averageValues: any[];
// }
// export function Linechart({averageValues}: Props){
//   const monthNames = [
//     'Jan', 'Feb', 'Mar', 'Apr', 'May', 'June',
//     'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
//   ];
//   const labels = averageValues.map((item) => `${monthNames[item.month - 1]}`);
//   console.log("averageValues:");
//   console.log(averageValues);
//   const data1 = {
//     labels,
//     datasets: [
//       {
//         label: 'Heart Rate',
//         data: averageValues.map((item) => item.values["heartRate"]),
//         borderColor: '#DFC5E0',
//         backgroundColor: '#DFC5E0',
//         yAxisID: 'y',
//       },
//       {
//         label: 'Weight',
//         data: averageValues.map((item) => item.values["weight"]),
//         borderColor: '#630342',
//         backgroundColor: '#630342',
//         yAxisID: 'y1',
//       },
//     ],
//   };


//  const options1 = {
//   responsive: true,
//   interaction: {
//     mode: 'index' as const,
//   },
//   stacked: false,
//   scales: {
//     y: {
//       type: 'linear' as const,
//       display: true,
//       position: 'left' as const,
//       grid: {
//         display: false, // Disable gridlines for the y axis
//       },
//     },
//     y1: {
//       type: 'linear' as const,
//       display: true,
//       position: 'right' as const,
//       grid: {
//         display: false, // Disable gridlines for the y axis
//       },
//     },
//   },
// };

//   return <Line options={options1} data={data1} />;
// }


import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import faker from 'faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


export const options = {
  responsive: true,
  interaction: {
    mode: 'index' as const,
  },
  stacked: false,
  scales: {
    y: {
      type: 'linear' as const,
      display: true,
      position: 'left' as const,
      grid: {
        display: false, // Disable gridlines for the y axis
      },
    },
    y1: {
      type: 'linear' as const,
      display: true,
      position: 'right' as const,
      grid: {
        display: false, // Disable gridlines for the y axis
      },
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July','August','September','October','November','December'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Heart Rate',
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: '#DFC5E0',
      backgroundColor: '#DFC5E0',
      yAxisID: 'y',
    },
    {
      label: 'Weight',
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: '#630342',
      backgroundColor: '#630342',
      yAxisID: 'y1',
    },
  ],
};

export function Linechart() {
  return <Line options={options} data={data} />;
}