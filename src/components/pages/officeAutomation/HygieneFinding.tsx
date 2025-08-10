import { Button, InputAdornment } from "@mui/material";
import CustomTextInput from "../../inputs/CustomTextInput";
import { isDesktop } from "../../../utils";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { HygieneFindingFormSchema } from "../../../validations/officeAutomation/HygieneFinding";
import CustomComboBox from "../../inputs/CustomComboBox";
import CustomCheckboxInput from "../../inputs/CustomCheckboxInput";

interface FormValues {}

const defaultValues = {};
const HygieneFinding = () => {
  const isDesktopMode = isDesktop();
  const {
    handleSubmit,
    control,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormValues | any>({
    resolver: yupResolver(HygieneFindingFormSchema),
    defaultValues,
  });
  return (
    <div className="flex flex-col gap-4">
      <div className="bg-blue-400 flex flex-col gap-2 p-4 rounded-md">
        <h1 className="text-white text-center text-2xl">
          سیستم جامع اقدامات اصلاحی
        </h1>
        <h3 className="text-white text-center text-base">
          فرم گزارش و اصلاح یافته‌های بهداشت حرفه‌ای و ارگونومی
        </h3>
      </div>
      <div>
        <form className="flex flex-col gap-4">
          <div>
            <CustomTextInput
              control={control}
              label="نام ناحیه / نام واحد"
              name="region"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Button
                      variant="contained"
                      color="info"
                      size="small"
                      //   onClick={handleShowBanksClick}
                    >
                      انتخاب
                    </Button>
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div>
            <CustomTextInput
              control={control}
              label="مسئول واحد"
              name="region"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Button
                      variant="contained"
                      color="info"
                      size="small"
                      //   onClick={handleShowBanksClick}
                    >
                      انتخاب
                    </Button>
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div
            className={`flex ${
              isDesktopMode ? "flex-row gap-2" : "flex-col gap-4"
            }`}
          >
            <div className={`${isDesktopMode ? "w-1/2" : "w-full"}`}>
              <CustomComboBox
                control={control}
                label="نوع اولویت"
                name="priority"
              />
            </div>
            <div className={`${isDesktopMode ? "w-1/2" : "w-full"}`}>
              <CustomComboBox
                control={control}
                label="عوامل زیان‌آور"
                name="finded"
              />
            </div>
          </div>
          <div>
            <CustomTextInput
              control={control}
              label="نام پیمانکار"
              name="contractor"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Button
                      variant="contained"
                      color="info"
                      size="small"
                      //   onClick={handleShowBanksClick}
                    >
                      انتخاب
                    </Button>
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div>
            <CustomTextInput
              multiline
              rows={isDesktopMode ? 4 : 3}
              name="description"
              control={control}
              label="شرح یافته"
            />
          </div>
          <div>
            <CustomTextInput
              multiline
              rows={isDesktopMode ? 4 : 3}
              name="description"
              control={control}
              label="اقدام اصلاحی انجام شده / اقدام اصلاحی پیشنهادی"
            />
          </div>
          <div
            className={`flex ${
              isDesktopMode ? "flex-row gap-4" : "flex-col gap-4 items-center"
            }`}
          >
            <div className={`${isDesktopMode ? "w-1/2" : "w-full"}`}>
              <CustomComboBox
                control={control}
                label="اولویت"
                name="priority"
              />
            </div>
            <div
              className={`flex items-center ${
                isDesktopMode ? "w-1/2" : "w-full "
              }`}
            >
              <CustomCheckboxInput
                control={control}
                name="correction"
                label="اصلاح در محل انجام پذیرفت"
              />
            </div>
          </div>
          <div className={`py-8 ${isDesktopMode ? "self-end" : "fullWidth"}`}>
            <Button
              fullWidth
              color="success"
              variant="contained"
              // disabled={isLoading}
              // onClick={handleClickOnSave}
            >
              ثبت
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HygieneFinding;
