import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center items-center flex-col h-full">
      <span>تو یه جای مخفی رو پیدا کردی، بهتره از اینجا بریم!</span>
      <Button variant="contained" color="info" onClick={() => navigate("/")}>
        بزن بریم
      </Button>
    </div>
  );
}

export default NotFound;
