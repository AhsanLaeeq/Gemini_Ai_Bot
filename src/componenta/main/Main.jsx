import React, { useContext } from "react";
import "./Main.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";

const Main = () => {
  const {
    onSent,
    recentInput,
    showResult,
    loading,
    resultData,
    setInput,
    input,
    handleKeyDown,
    totalResultDataCount,
    newChat,
  } = useContext(Context);

  return (
    <div className="main">
      <div className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon} alt="User Icon" />
      </div>

      <div className="main-container">
        {!showResult ? (
          <div>
            <div className="greet">
              <p>
                <span>Hello, Dev</span>
              </p>
              <p>How can I help you today?</p>
            </div>
            <div className="cards">
              <div className="card" onClick={() => onSent("Suggest beautiful places to see on an upcoming road trip in Saudia Arabia")}>
                <p>Suggest beautiful places to see on an upcoming trip in Saudia Arabia</p>
                <img src={assets.compass_icon} alt="Compass Icon" />
              </div>
              <div className="card" onClick={() => onSent("Briefly summarize this concept: urban planning")}>
                <p>Briefly summarize this concept: urban planning</p>
                <img src={assets.bulb_icon} alt="Bulb Icon" />
              </div>
            </div>
          </div>
        ) : (
          <div className="result">
            <div className="result-title">
              <img src={assets.user_icon} alt="Code Icon" />
              <p>{recentInput}</p>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} alt="Gemini Icon" />
              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }} />
              )}
            </div>
          </div>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="Enter a prompt here"
              onKeyDown={handleKeyDown}
            />

            <div>
              <img src={assets.gallery_icon} alt="Gallery Icon" />
              <img src={assets.mic_icon} alt="Mic Icon" />

              <img
                onClick={() => {
                  if (resultData.length < totalResultDataCount) {
                    newChat(); // Call newChat if the resultData length is less than totalResultDataCount
                  } else {
                    onSent(input); // Otherwise, send the current input to onSent
                  }
                }}
                src={loading || input === "" ? assets.stop_icon : assets.send_icon}
                alt={loading || input === "" ? "Stop icon" : "Send icon"}
              />
            </div>
          </div>
          <p className="bottom-info">
            Gemini may display inaccurate info, including about people, so double-check its responses. Your privacy and Gemini App.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
