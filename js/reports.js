const changeMonth = document.querySelector(".title__btn");
const chartName = {
  oiling: "주유비",
  shopping: "장보기",
  mart: "상점",
  eatout: "식비",
  health: "건강관리비",
};
const iconName = {
  oiling: ["drive_eta", "#bd3169"],
  shopping: ["shopping_cart", "#265689"],
  mart: ["store_mall_directory", "#9bc63c"],
  eatout: ["restaurant", "#ff4c3f"],
  health: ["fitness_center", "#f59028"],
};

function makeReports(url, month) {
  const reportTitle = document.querySelectorAll(".report__title")[2];
  const doughnutText = document.querySelector("#doughnutText");
  const chart = { oiling: 0, shopping: 0, mart: 0, eatout: 0, health: 0 };
  const history = new Object();
  let expenSum = 0;

  const jsonMe = fetch(url).then(function (response) {
    return response.json();
  });

  jsonMe.then(function (myJson) {
    myJson.bankList.forEach((x) => {
      if (x.date.slice(5, 7) === month && x.classify !== "") {
        if (history[x.date.slice(8, 10)]) {
          history[x.date.slice(8, 10)] += x.price;
        } else {
          history[x.date.slice(8, 10)] = 1;
        }
        chart[x.classify] += x.price;
      }
    });
    console.log(history);
    console.log(chart);
    // BAR
    const labels = Object.keys(history);

    const data = {
      labels: labels,
      datasets: [
        {
          backgroundColor: "#38c976",
          data: Object.values(history),
        },
      ],
    };

    const config = {
      type: "bar",
      data: data,
      options: {
        responsive: false,
        plugins: {
          legend: {
            position: "none",
          },
        },
      },
    };

    const myChart = new Chart(document.getElementById("myChart"), config);

    // DOUGHNUT
    const data2 = {
      labels: Object.keys(chart),
      datasets: [
        {
          label: "Dataset 1",
          data: Object.values(chart),
          backgroundColor: [
            "#bd3169",
            "#265689",
            "#9bc63c",
            "#ff4c3f",
            "#f59028",
          ],
        },
      ],
    };

    const config2 = {
      type: "doughnut",
      data: data2,
      options: {
        responsive: false,
        width: 300,
        borderWidth: 0,
        cutout: 100,
        plugins: {
          legend: {
            position: "none",
          },
        },
      },
    };

    const myChart2 = new Chart(document.getElementById("myChart2"), config2);

    // DOUGHNUT CHART LIST
    const chartList = document.querySelector(".reports__graph--list");
    for (let [key, value] of Object.entries(chart)) {
      const li = document.createElement("li");
      const div = document.createElement("div");
      const icon = document.createElement("span");
      icon.classList.add("material-icons");
      const iconContent = document.createTextNode(iconName[key][0]);
      icon.appendChild(iconContent);
      icon.style.color = iconName[key][1];
      const title = document.createElement("strong");
      const titleContent = document.createTextNode(chartName[key]);
      title.appendChild(titleContent);
      div.appendChild(icon);
      div.appendChild(title);
      const expen = document.createElement("span");
      const expenContent = document.createTextNode(`${value}원`);
      expen.appendChild(expenContent);
      li.appendChild(div);
      li.appendChild(expen);
      chartList.appendChild(li);
      // ACCUMULATE EXPENDITURE
      expenSum += value;
    }
    reportTitle.innerText = `${month}월 지출 패턴`;
    doughnutText.innerText = `${expenSum}원`;
  });
}

function dataRenew(month) {}

let month = "12";

makeReports(
  "https://gyoheonlee.github.io/mobile-bank/data/bank-me.json",
  month
);

changeMonth.addEventListener("click", function () {
  if (month === "12") month === "11";
  else month === "12";
});
