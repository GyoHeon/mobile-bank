const chart = { "": 0, oiling: 0, shopping: 0, mart: 0, eatout: 0, health: 0 };
const history = new Object();
const jsonMe = fetch(
  "https://gyoheonlee.github.io/mobile-bank/data/bank-new.json"
).then(function (response) {
  return response.json();
});

jsonMe.then(function (myJson) {
  myJson.bankList.forEach((x) => {
    if (x.date.slice(5, 7) === "12") {
      if (history[x.date.slice(8, 10)]) {
        history[x.date.slice(8, 10)] += x.price;
      } else {
        history[x.date.slice(8, 10)] = 1;
      }
      chart[x.classify] += x.price;
    }
  });
  console.log(history);
  const ordered = Object.keys(history)
    .sort((a, b) => parseInt(a) - parseInt(b))
    .reduce((obj, key) => {
      obj[key] = history[key];
      return obj;
    }, {});

  console.log(ordered);

  // DOUGHNUT
  const data2 = {
    labels: Object.keys(chart),
    datasets: [
      {
        label: "Dataset 1",
        data: Object.values(chart),
        backgroundColor: [
          "#c4c4c4",
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
    options: {
      responsive: false,
      plugins: {
        legend: {
          display: false,
        },
      },
    },
  };
  const config = {
    type: "bar",
    data: data,
    options: {},
  };
  const myChart = new Chart(document.getElementById("myChart"), config);
});
