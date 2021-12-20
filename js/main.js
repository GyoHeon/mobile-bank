//import fetch from "../node_modules/node-fetch";
//import 로 바꿔서 실행할 예정

const history = document.querySelector(".contents__history--ul__inner");

fetch("https://eulsoo.github.io/generated_1.json")
  .then(function (response) {
    return response.json();
  })
  .then(function (myJson) {
    myJson.forEach((x) => {
      const li = document.createElement("li");
      const content = document.createTextNode(`${x.date} ${x.item} ${x.price}`);
      li.appendChild(content);
      history.appendChild(li);
    });
  });
