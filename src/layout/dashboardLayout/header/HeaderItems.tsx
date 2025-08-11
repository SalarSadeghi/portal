import { DarkMode, LightMode } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useEffect, useState } from "react";
// import { changeLanguage, LANGUAGE_LIST } from "../../../utils";
// import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
// import { t } from "i18next";

// Language Component
// const Language = React.memo(function Language() {
//   const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
//   const open = Boolean(anchorEl);
//   const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
//     setAnchorEl(event.currentTarget);
//   };
//   const handleClose = () => {
//     setAnchorEl(null);
//   };
//   const handleChangeLanguage = (lng: string) => {
//     changeLanguage(lng);
//     handleClose();
//   };

//   return (
//     <div>
//       <Button
//         id="demo-customized-button"
//         aria-controls={open ? "demo-customized-menu" : undefined}
//         aria-haspopup="true"
//         aria-expanded={open ? "true" : undefined}
//         variant="outlined"
//         disableElevation
//         onClick={handleClick}
//         endIcon={<KeyboardArrowDownIcon />}
//       >
//         <LanguageOutlined />
//       </Button>
//       <Menu
//         id="basic-menu"
//         anchorEl={anchorEl}
//         open={open}
//         onClose={handleClose}
//         MenuListProps={{
//           "aria-labelledby": "basic-button",
//         }}
//       >
//         {LANGUAGE_LIST.map((i) => (
//           <>
//             <MenuItem onClick={() => handleChangeLanguage(i.lang)}>
//               {i.name}
//             </MenuItem>
//           </>
//         ))}
//       </Menu>
//     </div>
//   );
// });

// Change Theme Component
const ThemeIcon = function ThemeIcon() {
  
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    // Check local storage for theme preference
    return (
      localStorage.getItem("theme") === "dark" ||
      (!localStorage.getItem("theme") &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
  });

  useEffect(() => {
    // Toggle dark mode by adding/removing the `dark` class on the root HTML element
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  return (
    <>
      <IconButton onClick={() => setIsDarkMode(!isDarkMode)}>
        {isDarkMode ? <LightMode /> : <DarkMode />}
      </IconButton>
    </>
  );
};

export { ThemeIcon };
