import React from "react";
import Header from "../components/Header";
import "./home.scss";
import { useState, useEffect } from "react";
import {
  fetchSupportedCurrencies,
  fetchMarketData,
  calculatePrice,
} from "./Utils";

const Home = () => {
  const [selectedCurr, setSelectedCurr] = useState("bitcoin");
  const [selectedSupp, setSelectedSupp] = useState("usd");
  const [tokenS, setTokenS] = useState(false);
  const [popup, setPopup] = useState(false);
  const [supportedCurrencies, setSupportedCurrencies] = useState([]);
  const [marketData, setMarketData] = useState([]);
  const [amount, setAmount] = useState(null);
  const [priceDetails, setPriceDetails] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (supportedCurrencies.length === 0) {
        const supportedCurrenciesData = await fetchSupportedCurrencies();
        if (supportedCurrenciesData.error) {
          // setError(supportedCurrenciesData.error);
        } else {
          setSupportedCurrencies(supportedCurrenciesData.fiat);
        }
      }

      if (marketData.length === 0) {
        const marketDataResponse = await fetchMarketData();
        if (marketDataResponse.error) {
          //setError(marketDataResponse.error);
        } else {
          setMarketData(marketDataResponse);
        }
      }
    };
    fetchData();
  }, []);

  const convert = async () => {
    const output = await calculatePrice(selectedCurr, selectedSupp, amount);
    if (output.error) {
      //setError(marketDataResponse.error);
    } else {
      setPriceDetails(output);
    }
  };

  return (
    <>
      <Header />
      <div className="main">
        {popup && (
          <div className="overlay">
            <div className="popup">
              <div className="player-list">
                {tokenS
                  ? marketData.map((item, index) => (
                      <div
                        key={index}
                        className="play"
                        onClick={() => {
                          setPopup(false);
                          setSelectedCurr(item.id);
                        }}
                      >
                        <div className="left">
                          <img src={item.image} alt={item.name} />{" "}
                          <div className="left-r">
                            <div className="upper">{item.name}</div>
                            <div className="lower">{item.symbol}</div>
                          </div>
                        </div>
                      </div>
                    ))
                  : supportedCurrencies.map((item, index) => (
                      <div
                        key={index}
                        className="play"
                        onClick={() => {
                          setPopup(false);
                          setSelectedSupp(item);
                        }}
                      >
                        <div className="left">
                          <div className="left-r">
                            <div className="upper">{item.toUpperCase()}</div>
                          </div>
                        </div>
                      </div>
                    ))}
              </div>
            </div>
          </div>
        )}

        <div className="left">
          <div className="left-inner">
            <div className="top">Currency Converter</div>
            <div className="currency">
              <div
                className="item"
                onClick={() => {
                  setTokenS(true);
                  setPopup(true);
                }}
              >
                {" "}
                Select a token
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                  fill="#fff"
                  height="20px"
                >
                  {" "}
                  <defs></defs>
                  <g id="Layer_2" data-name="Layer 2">
                    <g id="_1" data-name="1">
                      <path
                        class="cls-1"
                        d="M24 48a24 24 0 1 1 24-24 24 24 0 0 1-24 24zm0-46a22 22 0 1 0 22 22A22 22 0 0 0 24 2z"
                      />
                      <path
                        class="cls-1"
                        d="M4 23h4v2H4zM40 23h4v2h-4zM23 4h2v4h-2zM23 40h2v4h-2z"
                      />
                      <path
                        class="cls-1"
                        transform="rotate(-29.99 8.406 33)"
                        d="M6.41 32h4v2h-4z"
                      />
                      <path
                        class="cls-1"
                        transform="rotate(-29.99 39.594 15.007)"
                        d="M37.59 14h4v2h-4z"
                      />
                      <path
                        class="cls-1"
                        transform="rotate(-60.01 14.996 39.591)"
                        d="M13 38.59h4v2h-4z"
                      />
                      <path
                        class="cls-1"
                        transform="rotate(-60.01 33.001 8.412)"
                        d="M31 7.41h4v2h-4z"
                      />
                      <path
                        class="cls-1"
                        transform="rotate(-30 15.004 8.42)"
                        d="M14 6.41h2v4h-2z"
                      />
                      <path
                        class="cls-1"
                        transform="rotate(-30 33.013 39.586)"
                        d="M32 37.59h2v4h-2z"
                      />
                      <path
                        class="cls-1"
                        transform="rotate(-60 8.41 14.994)"
                        d="M7.41 13h2v4h-2z"
                      />
                      <path
                        class="cls-1"
                        transform="rotate(-60 39.582 33.002)"
                        d="M38.59 31h2v4h-2z"
                      />
                      <path
                        class="cls-1"
                        d="M24 34a1 1 0 0 1-.45-.11A1 1 0 0 1 23 33v-4l-6.4 4.8A1 1 0 0 1 15 33V15a1 1 0 0 1 1.6-.8L23 19v-4a1 1 0 0 1 1.6-.8l12 9a1 1 0 0 1 0 1.6l-12 9a1 1 0 0 1-.6.2zm0-8a1 1 0 0 1 .45.11A1 1 0 0 1 25 27v4l9.33-7L25 17v4a1 1 0 0 1-1.6.8L17 17v14l6.4-4.8a1 1 0 0 1 .6-.2z"
                      />
                    </g>
                  </g>
                </svg>
              </div>
              {selectedCurr !== "" && (
                <div className="item val">{selectedCurr.toUpperCase()}</div>
              )}
            </div>

            <div className="currency">
              <div
                className="item"
                onClick={() => {
                  setTokenS(false);
                  setPopup(true);
                }}
              >
                {" "}
                Select the currency
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                  fill="#fff"
                  height="20px"
                >
                  {" "}
                  <defs></defs>
                  <g id="Layer_2" data-name="Layer 2">
                    <g id="_1" data-name="1">
                      <path
                        class="cls-1"
                        d="M24 48a24 24 0 1 1 24-24 24 24 0 0 1-24 24zm0-46a22 22 0 1 0 22 22A22 22 0 0 0 24 2z"
                      />
                      <path
                        class="cls-1"
                        d="M4 23h4v2H4zM40 23h4v2h-4zM23 4h2v4h-2zM23 40h2v4h-2z"
                      />
                      <path
                        class="cls-1"
                        transform="rotate(-29.99 8.406 33)"
                        d="M6.41 32h4v2h-4z"
                      />
                      <path
                        class="cls-1"
                        transform="rotate(-29.99 39.594 15.007)"
                        d="M37.59 14h4v2h-4z"
                      />
                      <path
                        class="cls-1"
                        transform="rotate(-60.01 14.996 39.591)"
                        d="M13 38.59h4v2h-4z"
                      />
                      <path
                        class="cls-1"
                        transform="rotate(-60.01 33.001 8.412)"
                        d="M31 7.41h4v2h-4z"
                      />
                      <path
                        class="cls-1"
                        transform="rotate(-30 15.004 8.42)"
                        d="M14 6.41h2v4h-2z"
                      />
                      <path
                        class="cls-1"
                        transform="rotate(-30 33.013 39.586)"
                        d="M32 37.59h2v4h-2z"
                      />
                      <path
                        class="cls-1"
                        transform="rotate(-60 8.41 14.994)"
                        d="M7.41 13h2v4h-2z"
                      />
                      <path
                        class="cls-1"
                        transform="rotate(-60 39.582 33.002)"
                        d="M38.59 31h2v4h-2z"
                      />
                      <path
                        class="cls-1"
                        d="M24 34a1 1 0 0 1-.45-.11A1 1 0 0 1 23 33v-4l-6.4 4.8A1 1 0 0 1 15 33V15a1 1 0 0 1 1.6-.8L23 19v-4a1 1 0 0 1 1.6-.8l12 9a1 1 0 0 1 0 1.6l-12 9a1 1 0 0 1-.6.2zm0-8a1 1 0 0 1 .45.11A1 1 0 0 1 25 27v4l9.33-7L25 17v4a1 1 0 0 1-1.6.8L17 17v14l6.4-4.8a1 1 0 0 1 .6-.2z"
                      />
                    </g>
                  </g>
                </svg>
              </div>
              {selectedSupp !== "" && (
                <div className="item val">{selectedSupp.toUpperCase()}</div>
              )}
            </div>

            <div className="currency">
              <div className="item">
                <input
                  type="text"
                  value={amount}
                  onChange={(e) => {
                    setAmount(e.target.value);
                  }}
                  placeholder="Enter amount"
                />
              </div>{" "}
            </div>

            <div className="convert" onClick={convert}>
              Convert
            </div>

            {priceDetails.length !== 0 && (
              <div className="currency">
                <>
                  <div
                    className="item"
                    onClick={() => {
                      setTokenS(true);
                      setPopup(true);
                    }}
                  >
                    {" "}
                    Price Per Token : {priceDetails.currentPriceData}
                  </div>

                  <div className="item val">
                    Total Amount : {priceDetails.total}
                  </div>
                </>
              </div>
            )}
          </div>
        </div>

        {/* <div className="right">
                <div className="inner"></div> 
                    
                 </div> */}
      </div>
    </>
  );
};

export default Home;
