/**
 * For usage, visit Chart.js docs https://www.chartjs.org/docs/latest/
 */
fetch(
  "http://localhost:5000/route/DashBoardData?id=" +
    localStorage.getItem("User_Id")
)
  .then((res) => res.json())
  .then((res) => {
    let avgs = [];
    let Data = parseData(res.QuestionAnswersJoint);
    for (let i of Data) {
      avgs.push(sum(i) / i.length);
    }
    // console.log(avgs);
    const lineConfig = {
      type: "line",
      data: {
        labels: Array.from({ length: avgs.length }, (_, index) => index + 1), //* bottom
        datasets: [
          {
            label: "Survey taken",
            fill: false,
            /**
             * These colors come from Tailwind CSS palette
             * https://tailwindcss.com/docs/customizing-colors/#default-color-palette
             */
            backgroundColor: "#7e3af2",
            borderColor: "#7e3af2",
            data: avgs, //* the data
          },
        ],
      },
      options: {
        responsive: true,
        /**
         * Default legends are ugly and impossible to style.
         * See examples in charts.html to add your own legends
         *  */
        legend: {
          display: false,
        },
        tooltips: {
          mode: "index",
          intersect: false,
        },
        hover: {
          mode: "nearest",
          intersect: true,
        },
        scales: {
          x: {
            display: true,
            scaleLabel: {
              display: true,
              labelString: "Month",
            },
          },
          y: {
            display: true,
            scaleLabel: {
              display: true,
              labelString: "Value",
            },
          },
        },
      },
    };

    const lineCtx = document.getElementById("line");
    window.myLine = new Chart(lineCtx, lineConfig);
  })
  .catch((err) => console.log(err));
function parseData(arr) {
  let res = [];
  for (let i of arr) {
    res.push(JSON.parse(i));
  }
  console.log(res);
  return res;
}
function sum(nums) {
  let sum = 0;
  for (let i of nums) sum += i;
  return sum;
}
