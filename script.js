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

function addDetails(name) {
  const summaryUrl =
    "https://stocks3.onrender.com/api/stocks/getstocksprofiledata";
  const profitUrl = "https://stocks3.onrender.com/api/stocks/getstockstatsdata";

  console.log("inside addDetails");

  //make both API call in parallel using Promise.all
  Promise.all([$.getJSON(summaryUrl), $.getJSON(profitUrl)])
    .then(([detailsResponse, profitResponse]) => {
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
    })
    .catch((error) => {
      console.error("error fetching details", error);
    });
}

$(document).ready(function () {
  stocks.forEach((stock) => {
    const $stockNameEle = $("<button></button>").text(stock);
    const $stockPriceEle = $("<span></span>").text(stock);
    const $stockProfitEle = $("<span></span>").text(stock);
    $stockNameEle.click(() => {
      console.log("onclick event listner");
      addDetails(stock);
    });
    const $stockEle = $("<div></div>", { class: "list-div" }).append(
      $stockNameEle,
      $stockPriceEle,
      $stockProfitEle
    );
    $stockContEle.append($stockEle);
  });
});
