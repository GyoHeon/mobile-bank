//import fetch from "../node_modules/node-fetch";
//import 로 바꿔서 실행할 예정

const histOut = document.querySelector(".contents__history--ul__outer");

fetch("https://gyoheonlee.github.io/mobile-bank/data/bank.json")
  .then(function (response) {
    return response.json();
  })
  .then(function (myJson) {
    myJson.bankList.reverse().forEach((x, i) => {
      //날짜 바뀌면 ul-inner 생성
      if (i === 0 || myJson.bankList[i - 1].date !== myJson.bankList[i].date) {
        // 하루의 li, ul 만들기
        const liOut = document.createElement("li");
        liOut.classList.add(
          `contents__history--li__outer`,
          "date" + `${x.date}`
        );
        const ul = document.createElement("ul");
        ul.classList.add(`contents__history--ul__inner`, "date" + `${x.date}`);
        // li outer header 만들기
        const div = document.createElement("div");
        div.classList.add("contents__history--li__outer__header");
        const strong = document.createElement("strong");
        strong.classList.add("contents__history--date");
        const strongContent = document.createTextNode(`${x.date}`);
        strong.appendChild(strongContent);
        const span = document.createElement("span");
        span.classList.add("contents__history--total-expen");
        const spanContent = document.createTextNode(`X원 지출`);
        span.appendChild(spanContent);
        div.appendChild(strong);
        div.appendChild(span);
        liOut.appendChild(div);
        // li inner 만들기
        const li = document.createElement("li");
        li.classList.add("contents__history--li__inner");
        const spanTitle = document.createElement("span");
        const spanTitleContent = document.createTextNode(x.history);
        spanTitle.appendChild(spanTitleContent);
        const spanPrice = document.createElement("span");
        // in, out 구분
        if (x.income === "in") {
          const spanPriceContent = document.createTextNode(`+${x.price}`);
          spanPrice.classList.add("income");
          spanPrice.appendChild(spanPriceContent);
        } else {
          const spanPriceContent = document.createTextNode(x.price);
          spanPrice.appendChild(spanPriceContent);
        }
        li.appendChild(spanTitle);
        li.appendChild(spanPrice);
        ul.appendChild(li);
        liOut.appendChild(ul);
        histOut.appendChild(liOut);
      } else {
        const histIn = document.querySelector(
          `.contents__history--ul__inner.date${x.date}`
        );
        // li inner 만들기
        const li = document.createElement("li");
        li.classList.add("contents__history--li__inner");
        const spanTitle = document.createElement("span");
        const spanTitleContent = document.createTextNode(x.history);
        spanTitle.appendChild(spanTitleContent);
        const spanPrice = document.createElement("span");
        // in, out 구분
        if (x.income === "in") {
          const spanPriceContent = document.createTextNode(`+${x.price}`);
          spanPrice.classList.add("income");
          spanPrice.appendChild(spanPriceContent);
        } else {
          const spanPriceContent = document.createTextNode(x.price);
          spanPrice.appendChild(spanPriceContent);
        }
        li.appendChild(spanTitle);
        li.appendChild(spanPrice);
        histIn.appendChild(li);
      }
    });
  });
