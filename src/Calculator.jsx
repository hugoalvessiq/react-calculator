import React, { useState } from "react";

import buttons from "./data";
import { Display } from "./Display";

const signals = ["AC", "+", "-", "*", "/", "="];

export const Calculator = () => {
  const [calc, setCalc] = useState({
    input: "0",
    formula: "",
    output: "",
  });

  const maxDigitWarning = () => {
    setTimeout(() => {
      setCalc({
        input: "Digit Limit Met",
        formula: "",
      });
    }, 1000);
  };

  const handleEqual = () => {
    let total = Math.round(1000000000000 * eval(calc.formula)) / 1000000000000;

    setCalc({
      ...calc,
      input: total,
      output: `${calc.formula} = ${total}`,
      formula: `${total}`,
    });
  };

  const handleClean = () => {
    setCalc({
      input: "0",
      formula: "",
      output: "0",
    });
  };

  const handleNumber = (e) => {
    let value = e.target.value;
    if (calc.input.length > 16) {
      maxDigitWarning();
    }

    if (!calc.formula.length) {
      setCalc({
        ...calc,
        input: `${value}`,
        formula: value !== "0" ? `${value}` : "",
        output: calc.formula,
      });
    } else {
      const caracter = calc.formula.charAt(calc.formula.length - 1);
      const lastOperator = signals.includes(caracter);
      setCalc({
        ...calc,
        input: lastOperator ? `${value}` : `${calc.input}${value}`,
        formula:
          value === "0" && (calc.formula === "0" || calc.input === "0")
            ? `${calc.formula}`
            : `${calc.formula}${value}`,
        output: calc.formula,
      });
    }
  };

  const handleDecimal = () => {
    const lastChar = calc.input.charAt(calc.input.length - 1);
    if (calc.formula.length) {
      setCalc({
        ...calc,
        input:
          lastChar === "." || calc.input.includes(".")
            ? `${calc.input}`
            : `${calc.input}.`,
        formula:
          lastChar === "." || calc.input.includes(".")
            ? `${calc.formula}`
            : `${calc.formula}.`,
        output: calc.formula,
      });
    } else {
      setCalc({
        ...calc,
        input: !calc.formula.length
          ? "0."
          : lastChar === "." || calc.input.includes(".")
          ? `${calc.input}`
          : `${calc.input}.`,
        formula: !calc.formula.length ? "0." : `${calc.formula} 0.`,
        output: calc.formula,
      });
    }
  };

  const handleOperator = (e) => {
    const value = e.target.value;
    if (calc.formula.length) {
      setCalc({ input: `${value}` });

      const penultimateChar = calc.formula.charAt(calc.formula.length - 2);
      const beforeOperator = signals.includes(penultimateChar);
      const lastChar = calc.formula.charAt(calc.formula.length - 1);
      const lastCharIsOperator = signals.includes(lastChar);

      if (
        (lastCharIsOperator && value !== "-") ||
        (beforeOperator && lastCharIsOperator)
      ) {
        setCalc({
          ...calc,
          formula: beforeOperator
            ? `${calc.formula.substring(0, calc.formula.length - 2)}${value}`
            : `${calc.formula.substring(0, calc.formula.length - 1)}${value}`,
          input: beforeOperator ? "" : value,
          output: calc.formula,
        });
      } else {
        setCalc({
          ...calc,
          formula: `${calc.formula}${value}`,
          input: value,
          output: calc.formula,
        });
      }
    }
  };

  const handleBack = () => {
    setCalc({
      ...calc,
      input:
        calc.input.length === 1
          ? "0"
          : `${calc.input.substring(0, calc.input.length - 1)}`,
      output: `${calc.output.substring(0, calc.output.length - 1)}`,
    });
  };

  return (
    <div id="editor">
      <h3 className="main--title">React Calculator</h3>

      <Display output={calc.output} input={calc.input} />

      <section id="pad--buttons">
        {buttons.map((item) => {
          const { id, value, classname, digit } = item;

          return (
            <button
              id={id}
              value={value}
              className={classname}
              key={item.id}
              onClick={
                value.match(/[0-9]/)
                  ? handleNumber
                  : value.match(/[*/+-]/)
                  ? handleOperator
                  : value === "="
                  ? handleEqual
                  : value === "."
                  ? handleDecimal
                  : value === "clear"
                  ? handleBack
                  : handleClean
              }
            >
              {digit}
            </button>
          );
        })}
      </section>
    </div>
  );
};
