import { useMediaQuery, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface ICard {
  title: string;
  href: string;
}

const CardOptions: ICard[] = [
  { title: "فرم گزارش و اصلاح یافته‌های ایمنی", href: "safety-finding-form" },
  {
    title: "فرم یافته‌های بهداشت حرفه‌ای و ارگونومی",
    href: "hygiene-finding-form",
  },
];

function Home() {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("sm"));
  const navigate = useNavigate();
  const handleNavigate = (c: ICard) => {
    navigate(c.href);
  };

  return (
    <div>
      <div className={`flex gap-4 ${isDesktop ? "flex-row" : "flex-col"}`}>
        {CardOptions.map((c) => (
          <>
            <div
              onClick={() => handleNavigate(c)}
              className="flex text-gray-800 min-w-1/5 items-center cursor-pointer border-blue-600 border border-solid p-4 rounded-lg min-h-[100px] hover:bg-blue-50"
            >
              {c.title}
            </div>
          </>
        ))}
      </div>
    </div>
  );
}

export default Home;
