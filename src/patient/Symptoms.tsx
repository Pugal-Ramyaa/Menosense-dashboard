import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import faker from 'faker';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
interface Props {
  averageSymptoms: any[];
  currentSymptom: string;
}

export function Symptoms({ averageSymptoms, currentSymptom }: Props) {
  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'June',
    'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const labels = averageSymptoms.map((item) => `${monthNames[item.month - 1]}`);
  const data = {
    labels,
    datasets: [
      {
        label: currentSymptom,
        data: averageSymptoms.map((item) => item.symptoms[currentSymptom]),
        backgroundColor: '#79305a',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  };

  return <Bar options={options} data={data} />;
}
