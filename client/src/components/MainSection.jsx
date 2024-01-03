import React from "react";
import Icon from "../assets/icon.png";
const MainSec = ({
  selectedCurr,
  selectedSupp,
  setTokenS,
  setPopup,
  amount,
  setAmount,
  convert,
  priceDet,
  setSearchTerm,
}) => {
  return (
    <div className="left">
      <div className="left-inner">
        <div className="top">Currency Converter</div>
        {/* Cryptocurrency selection */}
        <div className="currency">
          <div
            className="item head"
            onClick={() => {
              setTokenS(true);
              setSearchTerm("");
              setPopup(true);
            }}
          >
            {" "}
            Select a token
            <img alt="" src={Icon}></img>
          </div>
          {selectedCurr !== "" && (
            <div className="item val">{selectedCurr.toUpperCase()}</div>
          )}
        </div>
        {/* Fiat currency selection */}
        <div className="currency">
          <div
            className="item head"
            onClick={() => {
              setTokenS(false);
              setSearchTerm("");
              setPopup(true);
            }}
          >
            {" "}
            Select the currency
            <img alt="" src={Icon}></img>
          </div>
          {selectedSupp !== "" && (
            <div className="item val">{selectedSupp.toUpperCase()}</div>
          )}
        </div>
        {/* Amount input */}
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
        {/* Convert button */}
        <div className="convert" onClick={convert}>
          Convert
        </div>

        {/* Displaying conversion result */}
        {priceDet.length !== 0 && (
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
                Price Per Token : {priceDet.currentPriceData}
              </div>

              <div className="item val">Total Amount : {priceDet.total}</div>
            </>
          </div>
        )}
      </div>
    </div>
  );
};
export default MainSec;
