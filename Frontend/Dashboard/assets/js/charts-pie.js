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
fetch(
  "http://localhost:5000/route/DashBoardData?id=" +
    localStorage.getItem("User_Id")
)
  .then((res) => res.json())
  .then((res) => {
    let chartData = [0, 0, 0, 0, 0];
    let Data = parseData(res.QuestionAnswersJoint);
    let sumed = 0;
    for (let i of Data) sumed += sum(i);
    for (let i of Data) {
      let avg = sum(i) / i.length;
      console.log(avg);
      if (avg <= 1) chartData[4]++;
      else if (avg <= 2) chartData[3]++;
      else if (avg <= 3) chartData[2]++;
      else if (avg <= 4) chartData[1]++;
      else if (avg <= 5) chartData[0]++;
    }
    const pieConfig = {
      type: "doughnut",
      data: {
        datasets: [
          {
            data: chartData,
            /**
             * These colors come from Tailwind CSS palette
             * https://tailwindcss.com/docs/customizing-colors/#default-color-palette
             */
            backgroundColor: [
              "#6050dc",
              "#d52db7",
              "#ff2e7e",
              "#ff6b45",
              "#ffab05",
            ],
            label: "Dataset 1",
          },
        ],
        labels: [
          "Very Positive",
          "Positive",
          "Neutral",
          "Negative",
          "Very Negative",
        ],
      },
      options: {
        responsive: true,
        cutoutPercentage: 80,
        /**
         * Default legends are ugly and impossible to style.
         * See examples in charts.html to add your own legends
         *  */
        legend: {
          display: false,
        },
      },
    };

    // change this to the id of your chart element in HMTL
    const pieCtx = document.getElementById("pie");
    window.myPie = new Chart(pieCtx, pieConfig);
  })
  .catch((err) => console.log(err));
