window.onload = function () {
  //////////じゃんけん
  console.log("Hello!");

  //htmlの取得
  const welcome = document.getElementById("welcome");
  const aite = document.getElementById("aite");
  const message = document.getElementById("message");
  const histories = document.getElementById("results");
  const save = document.getElementById("save_button");
  const send = document.getElementById("send_button");
  const del = document.getElementById("delete_button");
  const name_input = document.getElementById("name_input");
  let pastUsers = [];
  let username;
  let experienced = false;
  getResults();

  //nameの名前の取得
  send.addEventListener("click", getUsername);
  function getUsername() {
    username = name_input.value;
    experienced = pastUsers.includes(username);
    console.log(experienced);
    welcome.innerText = `ようこそ${username}さん！`;
  }

  // rock scissors paper
  const weapons = ["✊", "✌", "✋"];
  const results = { win: 0, lose: 0 };
  const rock = document.getElementById("rock");
  const scissors = document.getElementById("scissors");
  const paper = document.getElementById("paper");

  rock.addEventListener("click", doJanken_rock);
  scissors.addEventListener("click", doJanken_scissors);
  paper.addEventListener("click", doJanken_paper);

  function doJanken() {
    const i = Math.floor(Math.random() * 3);
    const weapon = weapons[i];
    console.log("相手", weapon);
    aite.innerText = weapon;
    message.innerText = "ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ";
    return i;
  }

  function doJanken_rock() {
    const aite = doJanken();
    if (aite === 1) {
      results.win++;
      message.innerText = "you win!";
    }
    if (aite === 2) {
      results.lose++;
    }
    console.log("results : ", results);
  }
  function doJanken_scissors() {
    const aite = doJanken();
    if (aite === 2) {
      results.win++;
      message.innerText = "you win!";
    }
    if (aite === 0) {
      results.lose++;
    }
    console.log("results : ", results);
  }
  function doJanken_paper() {
    const aite = doJanken();
    if (aite === 0) {
      results.win++;
      message.innerText = "you win!";
    }
    if (aite === 1) {
      results.lose++;
    }
    console.log("results : ", results);
  }

  ////////////////////////
  //これまでの結果取得、表示
  async function getResults() {
    histories.innerHTML = "";
    pastUsers = [];
    const result = [];
    await fetch("http://localhost:3000/result")
      .then((response) => response.json())
      .then((json) => json.forEach((json) => result.push(json)));
    for (let history of result) {
      pastUsers.push(history.username);
      let historyEl = document.createElement("p");
      let historyText = `${history.username} 　: 　${history.result}`;
      historyEl.innerText = historyText;
      histories.appendChild(historyEl);
    }
    console.log(pastUsers);
  }

  /////////// patch,post
  save.addEventListener("click", saveResults);
  async function saveResults() {
    const win = results.win;
    const sum = results.win + results.lose;
    const winRate = Math.floor((win / sum) * 100);
    message.innerText = `あなたの勝率は${winRate}%でした！！`;
    console.log(experienced);
    if (experienced) {
      await fetch(`http://localhost:3000/result/${username}/${winRate}`, {
        method: "PATCH",
      })
        .then((response) => response.json())
        .then((json) => console.log(json));
    } else {
      // await fetch(`http://localhost:3000/result/${username}/${winRate}`, {
      //   method: "POST",
      //   body: JSON.stringify({
      //     username: username,
      //     score: 40,
      //   }),
      // })
      //   .then((response) => response.json())
      //   .then((json) => console.log(json));
      function sendToAPI() {
        console.log("api");
        const data = { name: username, result: winRate };
        $.post("/result", data, updateResults);
      }
      function updateResults(res) {
        console.log("!!!!!!!!");
        console.log(res);
      }
      sendToAPI();
    }
    getResults();
  }

  //////////delete
  del.addEventListener("click", deleteUser);
  async function deleteUser() {
    username = name_input.value;
    experienced = pastUsers.includes(username);
    console.log(pastUsers);
    console.log("experienced", experienced);
    if (experienced) {
      await fetch(`http://localhost:3000/result/${username}`, {
        method: "DELETE",
      });
    }
    console.log("deleted ", username);
    getResults();
  }
};
