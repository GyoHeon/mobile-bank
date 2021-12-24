const histOut = document.querySelector(".contents__history--ul__outer");
const moneyBoxUl = document.querySelector(".contents__money-box--ul");
const moneyBoxBtn = document.querySelector(".contents__money-box--add");
const moneyBoxColor = ["#8cabd9", "#f6a7b8", "#f1ec7a", "#1d4d9f", "#f08838"];
const history = new Object();

const jsonMe = fetch(
  "https://gyoheonlee.github.io/mobile-bank/data/bank-me.json"
).then(function (response) {
  return response.json();
});

jsonMe.then(function (myJson) {
  // ACCOUNT
  document.querySelector(".account__header--name").innerText = myJson.accountId;
  document.querySelector(".account__main--number").innerText =
    myJson.accountNumber;
  document.querySelector(
    ".account__main--balance--money"
  ).innerHTML = `${myJson.deposit} <span>원</span>`;
  // CONTENTS
  //MONEY BANK
  myJson.moneyBox.forEach((x, i) => {
    const li = document.createElement("li");
    li.classList.add("contents__money-box--li");
    const div = document.createElement("div");
    div.classList.add("contents__money-box--li-1", `moneyBox-${i}`);
    div.style.width = `${(x.fundAmount * 100) / x.targetAmount}%`;
    div.style.backgroundColor = moneyBoxColor[i];
    const title = document.createElement("span");
    title.classList.add("contents__money-box--li-1__title");
    const titleContent = document.createTextNode(x.title);
    title.appendChild(titleContent);
    const fund = document.createElement("span");
    fund.classList.add("contents__money-box--li-1__money");
    const fundContent = document.createTextNode(x.fundAmount);
    fund.appendChild(fundContent);
    div.appendChild(title);
    div.appendChild(fund);
    li.appendChild(div);
    moneyBoxUl.insertBefore(li, moneyBoxBtn);
  });
  // HISTORY
  myJson.bankList.reverse().forEach((x, i) => {
    //날짜 바뀌면 ul-inner 생성
    if (i === 0 || myJson.bankList[i - 1].date !== myJson.bankList[i].date) {
      // 하루의 li, ul 만들기
      history[x.date] = [];
      const liOut = document.createElement("li");
      liOut.classList.add(`contents__history--li__outer`, `date${x.date}`);
      const ul = document.createElement("ul");
      ul.classList.add(`contents__history--ul__inner`, `date${x.date}`);
      // li outer header 만들기
      const div = document.createElement("div");
      div.classList.add("contents__history--li__outer__header");
      const strong = document.createElement("strong");
      strong.classList.add("contents__history--date");
      const strongContent = document.createTextNode(`${x.date}`);
      strong.appendChild(strongContent);
      const span = document.createElement("span");
      span.classList.add("contents__history--total-expen", `date${x.date}`);
      const spanContent = document.createTextNode(`X원 지출`);
      span.appendChild(spanContent);
      div.appendChild(strong);
      div.appendChild(span);
      liOut.appendChild(div);
      // li inner 만들기
      history[x.date].push(x.price);
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
      history[x.date].push(x.price);
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
  // DAILY TOTAL SUM
  for (const i in history) {
    const totalSum = history[i].reduce((acc, cur) => acc + cur, 0);
    const totalExpen = document.querySelector(
      `.contents__history--total-expen.date${i}`
    );
    totalExpen.innerHTML = `${totalSum}원 지출`;
  }
});
