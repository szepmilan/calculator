import { useState } from "react";

function App() {
  /* eslint no-eval: 0 */
  const [calc, setCalc] = useState("");
  const [result, setResult] = useState("");

  const ops = ["/", "*", "+", "-", "."];

  const themes = [
    {
      "color1": "#d81e5b",
      "color2": "#131a26",
      "color3": "#888"
    },
    {
      "color1": "#262834",
      "color2": "#56cbdb",
      "color3": "#888"
    },
    {
      "color1": "#c83349",
      "color2": "#e06377",
      "color3": "#fff"
    },
    {
      "color1": "#622569",
      "color2": "#b8a9c9",
      "color3": "#888"
    },
    {
      "color1": "#96ceb4",
      "color2": "#5b9aa0",
      "color3": "#fff"
    },
  ]

  const createThemes = () => {
    const newthemes = [];
    for (let elem of themes) {
      let string = "linear-gradient(135deg, "+elem.color1+" 20%,"+elem.color2+ " 80%)";
      newthemes.push(
        <button 
          onClick={() => changeTheme(themes.indexOf(elem))}
          style={{background: string}}
          key={themes.indexOf(elem)}
        >
          {themes.indexOf(elem)+1}
        </button>
      );
    }
    return newthemes;
  };

  const changeTheme = (index) => {
    setTheme(themes[index]);
  }

  const updateCalc = (value) => {
    if(
      (ops.includes(value) && calc === ' ' ) ||
      (ops.includes(value) && ops.includes(calc.slice(-1)))
    ) {
      return
    }

    setCalc(calc + value);

    if(!ops.includes(value)){
      setResult(eval(calc+value).toString());
    }
  };

  const createDigits = () => {
    const digits = [];
    for (let i = 1; i < 10; i++) {
      digits.push(
        <button 
          onClick={() => updateCalc(i.toString())}
          key={i}>
          {i}
        </button>
      );
    }
    return digits;
  };

  const calculate = () => {
    setCalc(eval(calc).toString())
  }

  const deleteLast = () => {
    if(calc === ''){
      return;
    }

    const value = calc.slice(0, -1);
    setCalc(value);
    if(ops.includes(value[value.length-1])){
      setResult(value.slice(0, -1));
    } else{
      setResult(value);
    }
  }

  const deleteAll = () => {
    if(calc === ''){
      return;
    }

    const value = "";
    setCalc(value);
  }

  const setTheme = (theme) => {
    const first = theme.color1;
    const second = theme.color2;
    const third = theme.color3;
    document.documentElement.style.setProperty('--primary', first);
    document.documentElement.style.setProperty('--dark', second);
    document.documentElement.style.setProperty('--result', third);
  }

  return (
    <div className="App">
      <div id="text">
        Témák
      </div>
      <div className="themes">
        {createThemes()}
      </div>
      <br></br>
      <div className="calculator">
        <div className="display">
          {result ? <span>({result})</span> : ""}&nbsp;
          {calc || "0"}
        </div>
        <div className="keypad">
        <div className="operators">
          <button onClick={() => updateCalc("/")}>/</button>
          <button onClick={() => updateCalc("*")}>*</button>
          <button onClick={() => updateCalc("+")}>+</button>
          <button onClick={() => updateCalc("-")}>-</button>
          <button onClick={deleteAll}>AC</button>
          <button onClick={deleteLast}>DEL</button>
        </div>
        <div className="digits">
          {createDigits()}
          <button onClick={() => updateCalc("0")}>0</button>
          <button onClick={() => updateCalc(".")}>.</button>
          <button onClick={calculate}>=</button>
        </div>
        </div>
      </div>
    </div>
  );
}

export default App;
