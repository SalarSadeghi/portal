import { Paper } from "@mui/material";
import { useLocation } from "react-router-dom";
import { isAuthLayout } from "../../../utils";
import { ThemeIcon } from "./HeaderItems";

function Header() {
  const location = useLocation();
  return (
    <Paper
      // style={{ backgroundColor: "#f1f5f9" }}
      square
      className="h-16 w-full dark:bg-dark-background dark:text-dark-text  dark:shadow-none dark:border-b dark:border-b-dark-border"
    >
      <div className="flex items-center justify-between h-full px-4">
        <div className="flex gap-4">
          {!isAuthLayout(location) && (
            <>
              {/* <div>item2</div>
              <div>item3</div>
              <div>item4</div> */}
            </>
          )}
        </div>
        <div className="flex gap-4">
          {/* <Language /> */}
          <ThemeIcon />
        </div>
      </div>
    </Paper>
  );
}

export default Header;
