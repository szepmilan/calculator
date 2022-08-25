import { useState } from "react";

function App() {
  /* eslint no-eval: 0 */
  const [calc, setCalc] = useState("");
  const [result, setResult] = useState("");

  const ops = ["/", "*", "+", "-", "."];

  const themes = [
    {
      "color1": "red",
      "color2": "blue"
    },
    {
      "color1": "red",
      "color2": "white"
    },
    {
      "color1": "red",
      "color2": "black"
    },
    {
      "color1": "red",
      "color2": "green"
    },
  ]
  console.log(themes);

  const createThemes = () => {
    console.log("fradi");
    const newthemes = [];
    for (let elem of themes) {
      let string = "linear-gradient(135deg, "+elem.color1+" 20%,"+elem.color2+ " 80%)";
      newthemes.push(
        <button 
          onClick={() => changeTheme(themes.indexOf(elem))}
          style={{background: string}}>{themes.indexOf(elem)}
        </button>
      );
    }
    console.log(newthemes);
    return newthemes;
  };

  const changeTheme = (index) => {
    console.log(`Index: ${index}`)
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
      console.log(1);
      console.log(eval(calc+value));
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
    console.log(2);
    console.log(eval(calc));
    setCalc(eval(calc).toString())
  }

  const deleteLast = () => {
    if(calc === ''){
      return;
    }

    const value = calc.slice(0, -1);
    setCalc(value);
  }

  const setTheme = (theme) => {
    console.log("Error")
    console.log(theme)
    const first = theme.color1;
    const second = theme.color2;
    console.log(first)
    console.log(second)
    document.documentElement.style.setProperty('--primary', first);
    document.documentElement.style.setProperty('--dark', second);
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
        <div className="operators">
          <button onClick={() => updateCalc("/")}>/</button>
          <button onClick={() => updateCalc("*")}>*</button>
          <button onClick={() => updateCalc("+")}>+</button>
          <button onClick={() => updateCalc("-")}>-</button>

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
  );
}

export default App;
