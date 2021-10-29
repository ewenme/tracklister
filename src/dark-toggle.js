import React from "react";
import useDarkMode from "use-dark-mode";

const DarkModeToggle = () => {
  const darkMode = useDarkMode(false);

  const ToggleControl = ({ onClick }) => (
    <React.Fragment>
      <button
        className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
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
