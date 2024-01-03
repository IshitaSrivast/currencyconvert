import {
  fetchSupportedCurrencies,
  fetchMarketData,
  calculatePrice,
} from "./Api";

export const fetchData = async (
  setSupportedOrig,
  setSupportedCurrencies,
  setMarketOrig,
  setMarketData
) => {
  const supportedCurrenciesData = await fetchSupportedCurrencies();
  if (supportedCurrenciesData.error) {
    console.log(supportedCurrenciesData.error);
  } else {
    let supp = [
      ...supportedCurrenciesData.fiat,
      ...supportedCurrenciesData.crypto,
      ...supportedCurrenciesData.others,
    ];
    setSupportedOrig(supp);
    setSupportedCurrencies(supp);
  }
  const marketDataResponse = await fetchMarketData();
  if (marketDataResponse.error) {
    console.log(marketDataResponse.error);
  } else {
    setMarketOrig(marketDataResponse);
    setMarketData(marketDataResponse);
  }
};

export const convertCurr = async (
  selectedCurr,
  selectedSupp,
  amount,
  setPriceDetails
) => {
  console.log(amount);

  if (amount === "") {
    alert("Please fill in the amount first");
    return;
  }

  if (isNaN(parseInt(amount))) {
    alert("Amount must be a number");
    return;
  }

  if (parseFloat(amount) <= 0) {
    alert("Amount must be a positive value");
    return;
  }

  try {
    const output = await calculatePrice(selectedCurr, selectedSupp, amount);

    if (output.error) {
      console.error(output.error);
      if (output.error.includes("429")) {
        alert("Too Many Requests");
      }
      // Handle other error scenarios if needed
    } else {
      // Assuming setPriceDet is a typo and it should be setPriceDetails
      setPriceDetails(output);
    }
  } catch (error) {
    console.error("Error in currency conversion:", error);
    // Handle unexpected errors
  }
};

export const handleSearch = (
  searchTerm,
  supportedOrig,
  marketOrig,
  marketData,
  supportedCurrencies,
  tokenS,
  setMarketData,
  setSupportedCurrencies
) => {
  if (searchTerm === "") {
    tokenS ? setMarketData(marketOrig) : setSupportedCurrencies(supportedOrig);

    //return
  } else {
    const filteredData = tokenS
      ? marketData.filter(
          (item) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.symbol.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : supportedCurrencies.filter((item) =>
          item.toLowerCase().includes(searchTerm.toLowerCase())
        );
    tokenS ? setMarketData(filteredData) : setSupportedCurrencies(filteredData);
  }
};
