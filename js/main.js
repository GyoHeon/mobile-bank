//import fetch from "../node_modules/node-fetch";
//import 로 바꿔서 실행할 예정
const data = require("../data/bank.json");

const history = document.querySelector(".contents__history--ul__outer");
const li = document.createElement("li");

history.append("test");

console.log(data["bankList"][0]);
