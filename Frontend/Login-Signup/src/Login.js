let usernameSign = document.getElementById("UserName");
let emailSign = document.getElementById("Sign-Email");
let passwordSign = document.getElementById("Sign-pass");
let btnSign = document.getElementById("Sign");
let usernameLog = document.getElementById("Login-Email");
let passwordLog = document.getElementById("Login-Password");
let btnLog = document.getElementById("Login");
btnSign.addEventListener("click", function (e) {
  btnSign.dsabled = true;
  setTimeout(() => {
    btnSign.dsabled = false;
  }, 3 * 1000);
  e.preventDefault();
  let obj = {
    UserName: usernameSign.value,
    Email: emailSign.value,
    Password: passwordSign.value,
  };
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  };

  fetch("http://localhost:5000/route/NewUser", options)
    .then(() => {
      let div = document.createElement("div");
      div.classList.add("cardDone");
      div.innerHTML = `<div class="headerDone">
    <div class="imageDone"><svg xmlns="http://www.w3.org/2000/svg" height="1.25em" viewBox="0 0 448 512"><style>svg{fill:#ffffff}</style><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg></div>
    <div class="contentDone">
       <span class="titleDone">a User has been created</span>
     <div class="actionsDone">
       <button id="Done" class="cancelDone" type="button">Confirm</button>
    </div>
  </div> `;
      document.body.append(div);
      document.getElementById("Done").addEventListener("click", () => {
        document.getElementById("LoginPage").click();
        div.remove();
      });
    })
    .catch((err) => console.error(err));
});
btnLog.addEventListener("click", (e) => {
  btnLog.dsabled = true;
  setTimeout(() => {
    btnLog.dsabled = false;
  }, 3 * 1000);
  e.preventDefault();
  let obj = {
    UserName: usernameLog.value,
    Email: usernameLog.value,
    Password: passwordLog.value,
  };
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  };
  console.log(JSON.stringify(obj));
  fetch("http://localhost:5000/route/CheckUser", options)
    .then((response) => response.json())
    .then((res) => {
      console.log(res);
      let Condition = res.auth == "true";
      console.log(res);
      if (Condition) {
        localStorage.setItem("User_Id", res.User_Id);
        alert("successfull");
        location.href = "/Frontend/Dashboard/Index.html";
      } else throw new Error("error");
    })
    .catch((err) => {
      let div = document.createElement("div");
      div.classList.add("cardDone");
      div.innerHTML = `<div class="headerDone">
    <div class="imageDone"><svg aria-hidden="true" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" fill="none">
    <path d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" stroke-linejoin="round" stroke-linecap="round"></path>
  </svg></div>
    <div class="contentDone">
       <span class="titleDone">a User has been created</span>
     <div class="actionsDone">
       <button id="Done" class="cancelDone" type="button">Confirm</button>
    </div>
  </div> `;
      document.body.append(div);
      document.getElementById("Done").addEventListener("click", () => {
        div.remove();
      });
    });
});
document.getElementById("LoginPage").click();
