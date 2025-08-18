import { Line } from "react-chartjs-2";

export default function LineChart({datas}) {
  const data = () => {
    return {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      datasets: [
        {
          fill: 'start',
          borderColor: "rgba(29, 78, 216, 1)",
          data: datas
        }
      ]
    }
  }

  const options = {
    scales: {
      y: { beginAtZero: true }
    },
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
    },
    pointRadius: false,
    elements: { line: { tension: 0.4 } }
  }

  return (
    <div>
      <Line data={data()} options={options} />
    </div>
  );
}
// export const dat = {
//   labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
//   datasets: [
//     {
//       data: [
//         getRand(),
//         getRand(),
//         getRand(),
//         getRand(),
//         getRand(),
//         getRand(),
//       ],
//       fill: true,
//       pointBackgroundColor: 'rgba(29, 78, 216, 1)',
//       backgroundColor: 'rgba(29, 78, 216, 0.53)',
//       tension: 0.4,
//     },
//   ]
// };

function getRand() { return Math.floor(Math.random() * 300) + 400; }