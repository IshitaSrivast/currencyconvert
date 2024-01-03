import React from "react";
import Header from "../components/Header";
import MainSection from "../components/MainSection";
import Currencypop from "../components/Currencypop";
import "./home.scss";
import { useState, useEffect, useRef } from "react";
import { fetchData, convertCurr, handleSearch } from "./utils/helperFunctions";

const Home = () => {
  // State variables
  const [selectedCurr, setSelectedCurr] = useState("bitcoin"); // Selected cryptocurrency
  const [selectedSupp, setSelectedSupp] = useState("usd"); // Selected fiat currency
  const [tokenS, setTokenS] = useState(false); // Toggle for token selection state
  const [popup, setPopup] = useState(false); // Popup display state
  const [supportedCurrencies, setSupportedCurrencies] = useState([]); // List of supported fiat currencies
  const [supportedOrig, setSupportedOrig] = useState([]);
  const [marketData, setMarketData] = useState([]); // Market data for cryptocurrencies
  const [marketOrig, setMarketOrig] = useState([]);
  const [amount, setAmount] = useState(null); // Amount for conversion
  const [priceDet, setPriceDet] = useState([]); // Details of calculated price
  const [searchTerm, setSearchTerm] = useState("");
  // Effect hook for fetching initial data
  useEffect(() => {
    const fetchDataEffect = async () => {
      await fetchData(
        setSupportedOrig,
        setSupportedCurrencies,
        setMarketOrig,
        setMarketData
      );
    };

    fetchDataEffect();
  }, []);

  useEffect(() => {
    handleSearch(
      searchTerm,
      supportedOrig,
      marketOrig,
      marketData,
      supportedCurrencies,
      tokenS,
      setMarketData,
      setSupportedCurrencies
    );
  }, [
    searchTerm,
    supportedOrig,
    marketOrig,
    marketData,
    supportedCurrencies,
    tokenS,
  ]);

  //close the popup
  const popupRef = useRef();
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        popup &&
        popupRef.current &&
        !popupRef.current.contains(event.target)
      ) {
        setPopup(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [popup]); // dependency array includes popup to re-run effect when it changes

  const convert = async () => {
    await convertCurr(selectedCurr, selectedSupp, amount, setPriceDet);
  };

  return (
    <>
      <Header />
      <div className="main">
        {popup && (
          <Currencypop
            popupRef={popupRef}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            tokenS={tokenS}
            setPopup={setPopup}
            setTokenS={setTokenS}
            supportedCurrencies={supportedCurrencies}
            marketData={marketData}
            setSelectedCurr={setSelectedCurr}
            setSelectedSupp={setSelectedSupp}
          />
        )}
        <MainSection
          selectedCurr={selectedCurr}
          selectedSupp={selectedSupp}
          setTokenS={setTokenS}
          setPopup={setPopup}
          amount={amount}
          setAmount={setAmount}
          convert={convert}
          priceDet={priceDet}
          setSearchTerm={setSearchTerm}
        />
      </div>
    </>
  );
};

export default Home;
