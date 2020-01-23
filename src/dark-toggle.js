import React from "react";
import useDarkMode from "use-dark-mode";

const DarkModeToggle = () => {
  const darkMode = useDarkMode(false);

  const ToggleControl = ({ onClick }) => (
    <React.Fragment>
      <button
        className="muted-button"
        id="dark-status"
        icons={false}
        onClick={onClick}
      >
        toggle text colour
      </button>
    </React.Fragment>
  );

  return <ToggleControl onClick={darkMode.toggle} />;
};

export default DarkModeToggle;
