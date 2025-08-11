import { useForm, type SubmitHandler } from "react-hook-form";
import CustomComboBox from "../../inputs/CustomComboBox";
import { yupResolver } from "@hookform/resolvers/yup";
import { SafetyFindingFormSchema } from "../../../validations/officeAutomation/SafetyFinding";
import CustomTextInput from "../../inputs/CustomTextInput";
import { Button, InputAdornment, useTheme } from "@mui/material";
import { isDesktop } from "../../../utils";
import CustomCheckboxInput from "../../inputs/CustomCheckboxInput";
import { DatePicker } from "../../inputs/date/DatePicker";

interface FormValues {}

const defaultValues = {};

const SafetyFinding = () => {
  const isDesktopMode = isDesktop();
  const {
    handleSubmit,
    control,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormValues | any>({
    // resolver: yupResolver(SafetyFindingFormSchema),
    defaultValues,
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log("submit called");
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-[#13678a] flex flex-col gap-2 p-4 rounded-md">
        <h1 className="text-white text-center text-2xl">
          سیستم جامع اقدامات اصلاحی
        </h1>
        <h3 className="text-white text-center text-base">
          فرم گزارش و اصلاح یافته‌های ایمنی
        </h3>
      </div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className={``}>
            <CustomComboBox
              name="subject"
              control={control}
              label="موضوع یافته"
            />
          </div>
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
                      color="primary"
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
                      color="primary"
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
                label="اولویت"
                name="priority"
              />
            </div>
            <div className={`${isDesktopMode ? "w-1/2" : "w-full"}`}>
              <CustomComboBox
                control={control}
                label="یافته‌ها"
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
                      color="primary"
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
              <DatePicker
                className="w-full"
                // disableFuture
                // openTo="day"
                // value={dateFilter as unknown as Date}
                label={`تاریخ پیشنهادی اقدام`}
                // helperText={Texts.common.selectSearchDate}
                // onChange={(value) => {
                //   setDateFilter(value);
                //   setPaginationModel((prev) => ({ ...prev, page: 0 }));
                // }}
                // slotProps={{
                //   actionBar: { actions: ["accept", "cancel", "clear"] },
                // }}
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
              type="submit"
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

export default SafetyFinding;
