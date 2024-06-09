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
$(document).ready(function () {
  stocks.forEach((stock) => {
    const $stockNameEle = $("<h5></h5>").text(stock);
    const $stockEle = $("<div></div>").append($stockNameEle);
    $stockContEle.append($stockEle);
  });
});
