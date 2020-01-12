import React from "react";
import useDarkMode from "use-dark-mode";
import Toggle from "react-toggle";

const DarkModeToggle = () => {
  const darkMode = useDarkMode(true);

  const ToggleControl = ({ defaultChecked, onChange }) => (
    <React.Fragment>
      <Toggle
        id="dark-status"
        defaultChecked={defaultChecked}
        icons={false}
        onChange={onChange}
      />
      <label htmlFor="dark-status">Dark mode</label>
    </React.Fragment>
  );

  return (
    <ToggleControl defaultChecked={darkMode.value} onChange={darkMode.toggle} />
  );
};

export default DarkModeToggle;
