import React from "react";
import useDarkMode from "use-dark-mode";
import Toggle from "react-toggle";

const DarkModeToggle = () => {
  const darkMode = useDarkMode(false);

  const ToggleControl = ({ defaultChecked, onChange }) => (
    <span className="toggle-control">
      <Toggle
        className="dmcheck"
        type="checkbox"
        defaultChecked={defaultChecked}
        onChange={onChange}
        id="dmcheck"
      />
      <label htmlFor="dmcheck" />
    </span>
  );

  return (
    <div className="dark-toggle">
      <ToggleControl
        defaultChecked={darkMode.value}
        onChange={darkMode.toggle}
      />
    </div>
  );
};

export default DarkModeToggle;
