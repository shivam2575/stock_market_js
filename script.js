const stocks = [
  "AAPL",
  "MSFT",
  "GOOGL",
  "AMZN",
  "PYPL",
  "TSLA",
  "JPM",
  "NVDA",
  "NFLX",
  "DIS",
];
const $stockContEle = $("#stock-cont");
const $detailsParaEle = $("#details-para");
const $priceSpanEle = $("#price-span");
const $profitSpanEle = $("#profit-span");
const $nameSpanEle = $("#name-span");
const $timeBtnContainer = $("#time-btn-container");
const summaryUrl =
  "https://stocks3.onrender.com/api/stocks/getstocksprofiledata";
const profitUrl = "https://stocks3.onrender.com/api/stocks/getstockstatsdata";
const charUrl = "https://stocks3.onrender.com/api/stocks/getstocksdata";

function convert(timestampList) {
  timestampList.forEach((timeStamp, index) => {
    timestampList[index] = new Date(timeStamp * 1000).toLocaleDateString();
  });
}

function changeChart(timeline) {
  console.log("inside changeChart");
  let duration;
  if (timeline === "1 Month") {
    duration = "1mo";
  } else if (timeline === "3 Month") {
    duration = "3mo";
  } else if (timeline === "1 Year") {
    duration = "1y";
  } else {
    duration = "5y";
  }
  let name = $nameSpanEle.text();
  $.getJSON(charUrl).then(async (chartResponse) => {
    let chartList = chartResponse.stocksData[0];
    console.log(chartList);
    let chartData = chartList[name][duration];
    console.log(chartData);
    let xValues = chartData.timeStamp;
    let yValues = chartData.value;
    convert(xValues);
    console.log(`xValues List is: `, xValues);
    console.log(`yValues List is: `, yValues);
    if (chartData) {
      new Chart("myChart", {
        type: "line",
        data: {
          labels: xValues,
          datasets: [
            {
              fill: false,
              lineTension: 0,
              backgroundColor: "blue",
              borderColor: "red",
              data: yValues,
            },
          ],
        },
        options: {},
      });
    }
  });
}

function addDetails(name, duration) {
  console.log("inside addDetails");

  //make both API call in parallel using Promise.all
  Promise.all([$.getJSON(summaryUrl), $.getJSON(profitUrl), $.getJSON(charUrl)])
    .then(async ([detailsResponse, profitResponse, chartResponse]) => {
      console.log(`calling for ${name}`);

      //add summary details
      let summaryList = detailsResponse.stocksProfileData[0];
      console.log(summaryList);
      let summaryDetails = summaryList[name];
      console.log(summaryDetails);
      if (summaryDetails) {
        $detailsParaEle.text(summaryDetails.summary);
      }

      //add profit details
      let profitList = profitResponse.stocksStatsData[0];
      console.log(profitList);
      let profitDetails = profitList[name];
      console.log(profitDetails);
      if (profitDetails) {
        $nameSpanEle.text(name);
        $priceSpanEle.text(profitDetails.bookValue);
        $profitSpanEle.text(profitDetails.profit);
      }

      //add chart details
      let chartList = chartResponse.stocksData[0];
      console.log(chartList);
      let chartData = chartList[name][duration];
      console.log(chartData);
      let xValues = chartData.timeStamp;
      let yValues = chartData.value;
      convert(xValues);
      console.log(`xValues List is: `, xValues);
      console.log(`yValues List is: `, yValues);
      if (chartData) {
        new Chart("myChart", {
          type: "line",
          data: {
            labels: xValues,
            datasets: [
              {
                fill: false,
                lineTension: 0,
                backgroundColor: "blue",
                borderColor: "red",
                data: yValues,
              },
            ],
          },
          options: {},
        });
      }
    })
    .catch((error) => {
      console.error("error fetching details", error);
    });
}

function getList() {
  console.log("inside get list");

  $.getJSON(profitUrl).then(async (profitResponse) => {
    let profitList = profitResponse.stocksStatsData[0];

    stocks.forEach((stock) => {
      let profitDetails = profitList[stock];
      if (profitDetails) {
        const $stockNameEle = $("<button></button>").text(stock);
        const $stockPriceEle = $("<span></span>").text(profitDetails.bookValue);
        const $stockProfitEle = $("<span></span>").text(profitDetails.profit);
        $stockNameEle.click(() => {
          console.log("onclick event listner");
          addDetails(stock, "5y");
        });
        const $stockEle = $("<div></div>", { class: "list-div" }).append(
          $stockNameEle,
          $stockPriceEle,
          $stockProfitEle
        );
        $stockContEle.append($stockEle);
      }
    });
  });
}

$(document).ready(function () {
  getList();
  addDetails(stocks[0], "5y");
  $("#time-btn-container button").on("click", function () {
    let btnText = $(this).text();
    changeChart(btnText);
  });
});
