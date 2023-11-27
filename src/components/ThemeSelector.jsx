import React, { useContext } from "react";
import "./ThemeSelector.css";
import { ThemeContext } from "../context/ThemeContext";
import modeIcon from "../assets/mode-icon.svg";

//테마색 3가지로 정함
const themeColors = ["#fea1a1", "#FFCD4B", "#89CFF3"];

export default function ThemeSelector() {
  const { changeColor, changeMode, mode } = useContext(ThemeContext);

  const toggleMode = () => {
    changeMode(mode === "dark" ? "light" : "dark");
    console.log(mode);
  };

  return (
    <div className="theme-selector">
      <div className="mode-toggle">
        <img
          src={modeIcon}
          onClick={toggleMode}
          alt="mode-icon"
          style={{ filter: mode === "dark" ? "invert(100%)" : "invert(20%)" }}
        />
      </div>
      <div className="theme-buttons">
        {themeColors.map((color) => (
          <div
            key={color}
            onClick={() => changeColor(color)}
            style={{ background: color }}
          />
        ))}
      </div>
    </div>
  );
}
