import React, { useContext } from "react";
import "./ThemeSelector.css";
import { ThemeContext } from "../context/ThemeContext";

//테마색 3가지로 정함
const themeColors = ["#fea1a1", "#FFCD4B", "#89CFF3"];

export default function ThemeSelector() {
  const { changeColor } = useContext(ThemeContext);

  return (
    <div className="theme-selector">
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
