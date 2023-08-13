function newRow(str, date) {
  let tr = document.createElement("tr");
  tr.classList.add("text-gray-700");
  tr.classList.add("dark:text-gray-400");
  tr.innerHTML = `<td class="px-4 py-3">
  <div class="flex items-center text-sm">
      <div>
          <p class="font-semibold" style="font-size: 16px">
          <a href="${str}" style="all:unset;cursor: pointer;">${str}</a>
          </p>
      </div>
  </div>
  </td>
  <td class="px-4 py-3 text-sm"></td>
  <td class="px-4 py-3 text-xs"></td>
  <td class="px-4 py-3 text-sm">${new Date(date).toLocaleDateString()}</td>`;
  document.getElementById("tableBody").prepend(tr);
}
fetch(
  "http://localhost:5000/route/DashBoardData?id=" +
    localStorage.getItem("User_Id")
)
  .then((response) => response.json())
  .then((res) => {
    console.log(res);
    document.getElementById("DateJoined").innerText = new Date(
      res.DateJoined
    ).toLocaleDateString();
    document.getElementById("username").innerText = res.UserName;
    document.getElementById("surveyCreated").innerText = res.SureveyCount;
    document.getElementById("surveyResponse").innerText = res.SurveyResponse;
    for (let i of res.UserQuestionJoint)
      newRow(
        "http://127.0.0.1:5500/Frontend/takers/Index.html?cat=" + i.Q_Id,
        i.DateCreated
      );
  })
  .catch((err) => (location.href = "/Frontend/Login-Signup/index.html"));
let id = localStorage.getItem("User_Id");
document.getElementById("click").addEventListener("click", () => {
  localStorage.setItem("User_Id", id);
  location.href = "/Frontend/Creator/Index.html";
});
document.getElementById("logout").addEventListener("click", () => {
  location.href = "/Frontend/Login-Signup/index.html";
});
