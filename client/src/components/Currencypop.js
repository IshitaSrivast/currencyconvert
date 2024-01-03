import React from "react";

const Currencypop = ({
  popupRef,
  searchTerm,
  setSearchTerm,
  tokenS,
  setPopup,
  setTokenS,
  supportedCurrencies,
  marketData,
  setSelectedCurr,
  setSelectedSupp,
}) => {
  return (
    <div className="overlay">
      <div className="popup" ref={popupRef}>
        <div className="search">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="player-list">
          {/* Display market data or supported currencies based on tokenS state */}
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
  );
};

export default Currencypop;
