function* nextChar() {
  let str = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";
  let count = 0;
  let repeation = 0;
  while (true) {
    if (count % 52 == 0) {
      repeation++;
      count = 0;
    }
    let ret = "";

    for (let i = 0; i < repeation; i++) ret += str[count];
    count++;
    yield ret;
  }
}
function* nextNum() {
  let num = 0;
  while (true) yield ++num;
}
function starCounting() {
  var radioInputs = document.querySelectorAll('input[type="radio"]');
  radioInputs.forEach(function (input) {
    input.addEventListener("click", function () {
      input.dsabled = true;
      setTimeout(() => {
        input.dsabled = false;
      }, 3 * 1000);
      let level = input.value;
      let stars = [];
      for (let star of input.parentElement.children) {
        try {
          let forNames = star.getAttribute("for")[1];
          let levelBreachment = parseInt(forNames) <= level;
          if (forNames && levelBreachment) {
            star.classList.add("on");
            // console.log(parseInt(forNames[1]));
          } else {
            // console.log(parseInt(forNames));
            star.classList.remove("on");
          }
        } catch (err) {}
      }
    });
  });
}
let CharGen = nextChar();
let NumGen = nextNum();
let Question = [];
let QuestionId;
function NewQuestion(questionString = "") {
  if (!questionString.length) questionString = prompt("insert the question");
  Question.push(questionString);
  let char = CharGen.next().value;
  let div = document.createElement("div");
  div.setAttribute("class", "question");
  div.setAttribute("id", char + NumGen.next());
  let p = document.createElement("p");
  p.innerText = questionString;
  div.appendChild(p);
  for (let i = 0; i < 5; i++) {
    let radio = document.createElement("input");
    radio.setAttribute("type", "radio");
    radio.setAttribute("name", "needs");
    radio.setAttribute("id", char + i);
    radio.setAttribute("value", `${i}`);
    let label = document.createElement("label");
    label.setAttribute("for", char + i);
    div.appendChild(radio);
    div.appendChild(label);
  }
  document.body.prepend(div);
  starCounting();
}
document.getElementById("submit").addEventListener("click", async () => {
  document.getElementById("submit").dsabled = true;
  setTimeout(() => {
    document.getElementById("submit").dsabled = false;
  }, 3 * 1000);
  const divs = document.querySelectorAll(".question");
  let rates = [];
  for (let div of divs) rates.push(div.querySelectorAll(".on").length);
  console.log(QuestionId);
  console.log(JSON.stringify(rates));
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: `{"q_Id":"${QuestionId}","values":"${JSON.stringify(rates)}"}`,
  };
  fetch("http://localhost:5000/route/SaveSubmit", options).catch((err) =>
    console.error(err)
  );

  let div = document.createElement("div");
  div.classList.add("cardDone");
  div.innerHTML = `  <div class="headerDone">
  <div class="imageDone"><svg xmlns="http://www.w3.org/2000/svg" height="1.25em" viewBox="0 0 448 512"><style>svg{fill:#ffffff}</style><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg></div>
  <div class="contentDone">
     <span class="titleDone">Survey sumitted</span>
   <div class="actionsDone">
     <button id="Done" class="cancelDone" type="button">Confirm</button>
  </div>
</div>`;
  document.body.append(div);
  document
    .getElementById("Done")
    .addEventListener(
      "click",
      () => (location.href = "/Frontend/Thanks/index.html")
    ); //! new page to Thank them
});
let SurveyNumber = parseInt(location.href.split("=")[1]);
fetch("http://localhost:5000/route/GetQuestions?Q_Id=" + SurveyNumber)
  .then((res) => res.json())
  .then((res) => {
    console.log(res[0].question);
    console.log(JSON.parse(res[0].question));
    let Qs = res[0].question;
    QuestionId = res[0].q_Id;
    console.log(QuestionId);
    try {
      Qs = JSON.parse(Qs.replaceAll("'", '"'));
      for (let Q of Qs) NewQuestion(Q);
    } catch (err) {
      console.log(err);
      location.href = "/Frontend/Error/404.html";
    }
  })
  .catch((err) => (location.href = "/Frontend/Error/404.html"));
