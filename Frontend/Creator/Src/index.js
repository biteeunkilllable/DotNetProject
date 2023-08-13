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
            console.log(parseInt(forNames[1]));
          } else {
            console.log(parseInt(forNames));
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
let questions = [];
for (let i of questions) NewQuestion(i);
function NewQuestion(questionString = "") {
  if (!questionString.length) questionString = prompt("insert the question");
  Question.push(questionString);
  let char = CharGen.next().value;
  let div = document.createElement("div");
  div.setAttribute("class", "question");
  div.setAttribute("id", char + NumGen.next());
  let p = document.createElement("p");
  p.innerText = questionString;
  let deleteButton = document.createElement("button");
  deleteButton.setAttribute("style", "margin-left: 10px");
  deleteButton.innerHTML = `<i class="fa-sharp fa-solid fa-trash-can fa-2x" style="color: #000000"></i>`;
  let editButton = document.createElement("button");
  deleteButton.addEventListener("click", async (e) => {
    deleteButton.dsabled = true;
    setTimeout(() => {
      deleteButton.dsabled = false;
    }, 3 * 1000);
    console.log(e.target.parentElement);
    console.log(e.target.parentElement.parentElement);
    if (e.target.tagName == "I")
      confirm(e.target.parentElement.parentElement.parentElement);
    else confirm(e.target.parentElement.parentElement);
  });
  editButton.addEventListener("click", (e) => {
    editButton.dsabled = true;
    setTimeout(() => {
      editButton.dsabled = false;
    }, 3 * 1000);
    let p = e.target.parentElement.parentElement;
    if (e.target.tagName != "I")
      p = e.target.parentElement.parentElement.parentElement;
    prompt(p, deleteButton, editButton);
  });
  editButton.setAttribute("style", "margin-left: 10px");
  editButton.innerHTML = `<i class="fa-sharp fa-regular fa-pen-to-square fa-2x" style="color: #000000"></i>`;
  p.appendChild(deleteButton);
  p.appendChild(editButton);
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
document.getElementById("new").addEventListener("click", NewQuestion);
document.getElementById("submit").addEventListener("click", () => {
  document.getElementById("submit").dsabled = true;
  setTimeout(() => {
    document.getElementById("submit").dsabled = false;
  }, 3 * 1000);
  let divs = document.querySelectorAll(".question");
  let Questions = [];
  for (let div of divs) {
    Questions.push(div.children[0].innerText);
  }
  let obj = {
    User_Id: localStorage.getItem("User_Id"),
    Question: JSON.stringify(Questions),
  };
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  };

  fetch("http://localhost:5000/route/Sumbiton", options)
    .then((response) => response.text())
    .then((res) => {
      let Q_Id = parseInt(res);
      console.log(
        "http://127.0.0.1:5500/Frontend/takers/Index.html?cat=" + res
      );
    })
    .catch((err) => (location.href = "/Frontend/Login-Signup/index.html"));

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
    .addEventListener("click", () => document.getElementById("back").click());
});
document
  .getElementById("back")
  .addEventListener(
    "click",
    () => (location.href = "/Frontend/Dashboard/index.html")
  );
window.confirm = function (el, timeout) {
  let div = document.createElement("div");
  div.classList.add("cardConfirm");
  let x = `
    <div class="headerConfirm">
      <div class="imageConfirm">
        <svg
          aria-hidden="true"
          stroke="currentColor"
          stroke-width="1.5"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
            stroke-linejoin="round"
            stroke-linecap="round"
          ></path>
        </svg>
      </div>
      <div class="contentConfirm">
        <span class="titleConfirm">Delete Question</span>
        <p class="messageConfirm">
          Are you sure you want to delete the question selected ?
        </p>
      </div>
      <div class="actionsConfirm">
        <button class="desactivateConfirm" id="Delete" type="button">
          Delete
        </button>
        <button class="cancelConfirm" id="Cancel" type="button">
          Cancel
        </button>
      </div>
    </div>
    `;
  div.innerHTML = x;
  console.log(div);
  document.body.append(div);
  document.getElementById("Cancel").addEventListener("click", () => {
    div.remove();
  });
  document.getElementById("Delete").addEventListener("click", () => {
    el.remove();
    div.remove();
  });
};
window.prompt = function (p, deleteButton, editButton) {
  // console.log(id);
  let div = document.createElement("div");
  div.classList.add("cardEdit");
  div.innerHTML = `<div class="headerEdit">
  <div class="imageEdit">
  <i class="fa-sharp fa-regular fa-pen-to-square fa-2x" style="color: #000000"></i>
  </div>
  <div class="contentEdit">
     <span class="titleEdit">Edit questions</span>
     <br/>
     <br/>
     <br/>
  </div>
   <div class="actionsEdit">
   <div class="input-containerEdit" style="background-color:transparent;">
   <input placeholder="Enter text" class="input-fieldEdit" id="txt" type="text">
   <br/>
   <br/>
   <button class="desactivateEdit" id="Change" type="button">Change</button>
   <button class="cancelEdit" type="button" id="Cancel">Cancel</button>
<span class="input-highlightEdit"></span>
</div>

  </div>
</div>`;
  document.body.append(div);
  let input = document.getElementById("txt");
  input.focus();
  let change = document.getElementById("Change");
  change.addEventListener("click", () => {
    change.dsabled = true;
    setTimeout(() => {
      change.dsabled = false;
    }, 3 * 1000);
    if (input.value.length) {
      p.innerText = input.value;
      p.append(deleteButton);
      p.append(editButton);
    }
    div.remove();
  });
  document.getElementById("Cancel").addEventListener("click", () => {
    div.remove();
  });
  document.addEventListener(
    "keypress",
    (k) => k.key == "Enter" && change.click()
  );
};
