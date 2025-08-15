import { isDesktop } from "@/utils";
import Texts from "@/assets/json/Texts.json";
interface CardMessageProps {
  message?: string;
  className?: string; // Optional className for the second div
}
const CardMessage: React.FC<CardMessageProps> = ({
  message = Texts.common.noDataFoundMSG,
  className = "border-r-red-500",
}) => {
  const isDesktopMode = isDesktop();
  return (
    <div
      className={`flex ${
        isDesktopMode ? "w-2/3" : "w-full"
      }  min-h-60 items-center place-self-center`}
    >
      <div
        className={`flex bg-slate-100 w-full border-gray-300 border-solid border rounded-md border-r-8 ${className}`}
      >
        <div className="p-8">{message}</div>
      </div>
    </div>
  );
};

export default CardMessage;
