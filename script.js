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

function addDetails(url, name) {
  $.getJSON(url, function (response) {
    console.log(`calling for ${name}`);
    let stockList = response.stocksProfileData[0];
    console.log(stockList);
    let stockDetails = stockList[name];
    if (stockDetails) {
      $detailsParaEle.text(stockDetails.summary);
    }
  });
}

$(document).ready(function () {
  stocks.forEach((stock) => {
    const $stockNameEle = $("<button></button>").text(stock);
    const $stockPriceEle = $("<span></span>").text(stock);
    const $stockProfitEle = $("<span></span>").text(stock);
    $stockNameEle.click(() => {
      //   addChartInfo();
      addDetails(
        "https://stocks3.onrender.com/api/stocks/getstocksprofiledata",
        stock
      );
    });
    const $stockEle = $("<div></div>", { class: "list-div" }).append(
      $stockNameEle,
      $stockPriceEle,
      $stockProfitEle
    );
    $stockContEle.append($stockEle);
  });
});
