import React from "react";
import useDarkMode from "use-dark-mode";
import Toggle from "react-toggle";

const DarkModeToggle = () => {
  const darkMode = useDarkMode(false);

  const ToggleControl = ({ defaultChecked, onChange }) => (
    <label>
      <Toggle
        defaultChecked={defaultChecked}
        icons={false}
        onChange={onChange}
      />
      <span>Dark mode</span>
    </label>
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
