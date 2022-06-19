import { useCallback, useEffect, useMemo, useState } from "react";
import "./App.css";
import Canvas from "./Canvas";
import delay from "./delay";

function App() {
  const [shouldShowSmoke, setShouldShowSmoke] = useState<boolean>(false);
  const [sauceBgClass, setSauceBgClass] = useState<string>("Sauce1BG");
  const [animationClass, setAnimationClass] = useState<string>("timelapse-1");
  const [animationActive, setAnimationActive] = useState<boolean>(false);
  const [scoville, setScoville] = useState<number>(0);

  useEffect(() => {
    const triggerSmoke = async () => {
      await delay(500);
      setShouldShowSmoke(true);
    };

    if (scoville >= 2000000 && animationActive) {
      triggerSmoke();
    }
  }, [animationActive, scoville]);

  useEffect(() => {
    if (scoville >= 2000000) {
      setAnimationClass("timelapse-6");
      setSauceBgClass("Sauce6BG");
    } else if (scoville >= 250000) {
      setAnimationClass("timelapse-5");
      setSauceBgClass("Sauce5BG");
    } else if (scoville >= 150000) {
      setAnimationClass("timelapse-4");
      setSauceBgClass("Sauce4BG");
    } else if (scoville >= 60000) {
      setAnimationClass("timelapse-3");
      setSauceBgClass("Sauce3BG");
    } else if (scoville >= 17000) {
      setAnimationClass("timelapse-2");
      setSauceBgClass("Sauce2BG");
    } else {
      setAnimationClass("timelapse-1");
      setSauceBgClass("Sauce1BG");
    }
  }, [scoville]);

  const scovilleForDisplay = useMemo(() => {
    if (scoville >= 2000000) return `${scoville.toLocaleString("en-US")}+`;
    return scoville.toLocaleString("en-US");
  }, [scoville]);

  const handleReset = useCallback(() => {
    setAnimationActive(false);
    setShouldShowSmoke(false);
  }, []);

  const runAnimation = useCallback(async () => {
    console.log("running animation");
    setAnimationActive(true);
    await delay(5000);
    handleReset();
  }, [handleReset]);

  return (
    <div className="App">
      <header className={`App-header AppBg ${sauceBgClass}`}>
        <div className="CastShadow">
          {shouldShowSmoke && <Canvas />}
          <div className="scovilleContainer">
            <div className="scovilleBarContainer">
              <div className="scovilleBarGradient"></div>
              <div
                className={
                  animationActive
                    ? `blankScovilleBar ${animationClass}`
                    : "blankScovilleBar"
                }
              ></div>
            </div>
            <div className="scovilleInfo">
              <h1>Scoville Level</h1>
              <h1>{scovilleForDisplay}</h1>
            </div>
          </div>
        </div>

        {animationActive === false && (
          <div className="utilityContainer">
            <div className="inputContainer">
              <input
                onChange={(e) => {
                  setScoville((_) => {
                    const int = parseInt(e.target.value);
                    if (isNaN(int)) return 0;
                    return int;
                  });
                }}
                value={scoville}
                name="scollville"
                type="text"
              />
            </div>
            <div className="buttonsContainer">
              <button type="button" onClick={runAnimation}>
                Render Animation
              </button>
              <button type="button" onClick={handleReset}>
                Reset
              </button>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
