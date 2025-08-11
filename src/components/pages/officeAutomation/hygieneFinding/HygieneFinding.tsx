import { Button, InputAdornment } from "@mui/material";
import CustomTextInput from "../../../inputs/CustomTextInput";
import { isDesktop } from "../../../../utils";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { HygieneFindingFormSchema } from "../../../../validations/officeAutomation/HygieneFinding";
import CustomComboBox from "../../../inputs/CustomComboBox";
import CustomCheckboxInput from "../../../inputs/CustomCheckboxInput";
import { DatePicker } from "../../../inputs/date/DatePicker";
import { useState } from "react";
import { modalStore } from "../../../../store/ModalStore";
import HygieneFindingRegionModal from "./HygieneFindingRegionModal";
import HygieneFindingResponsiblePersonModal from "./HygieneFindingResponsiblePersonModal";
import HygieneFindingContractorModal from "./HygieneFindingContractorModal";
import {
  priorityOptions,
  type PriorityOption,
} from "../../../../api/officeAutomation/hygienFinding";

interface FormValues {
  priority: PriorityOption;
  correction: boolean;
  description: string;
  region: string;
  contractor: string;
  date: string;
}
enum ModalKeys {
  REGION = "REGION",
  RESPONSIBLE_PERSON = "RESPONSIBLE_PERSON",
  CONTRACTOR_NAME = "CONTRACTOR_NAME",
}
const defaultValues = {};
const HygieneFinding = () => {
  const isDesktopMode = isDesktop();
  const [date, setDate] = useState<Date>();
  const { changeIsOpenModal, isOpenModal, changeKey, modalKey } = modalStore();
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

  const handleModalClick = (key: ModalKeys) => {
    changeIsOpenModal(true);
    changeKey(key);
  };

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log("submit called", data);
  };

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="bg-[#13678a] flex flex-col gap-2 p-4 rounded-md">
          <h1 className="text-white text-center text-2xl">
            سیستم جامع اقدامات اصلاحی
          </h1>
          <h3 className="text-white text-center text-base">
            فرم گزارش و اصلاح یافته‌های بهداشت حرفه‌ای و ارگونومی
          </h3>
        </div>
        <div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
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
                        onClick={() => handleModalClick(ModalKeys.REGION)}
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
                        onClick={() =>
                          handleModalClick(ModalKeys.RESPONSIBLE_PERSON)
                        }
                        variant="contained"
                        color="primary"
                        size="small"
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
                  options={priorityOptions}
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
                        color="primary"
                        size="small"
                        onClick={() =>
                          handleModalClick(ModalKeys.CONTRACTOR_NAME)
                        }
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
                <Controller
                  control={control}
                  name="date"
                  render={({ field, fieldState }) => (
                    <DatePicker
                      {...field}
                      className="w-full"
                      // disableFuture
                      // openTo="day"
                      value={date}
                      label={`تاریخ پیشنهادی اقدام`}
                      // helperText={Texts.common.selectSearchDate}
                      onChange={(value) => {
                        value ? setDate(value) : setDate(undefined);
                      }}
                      slotProps={{
                        actionBar: { actions: ["accept", "cancel", "clear"] },
                      }}
                      error={!!fieldState.error}
                      helperText={fieldState?.error?.message}
                    />
                  )}
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
      {isOpenModal && modalKey === ModalKeys.REGION && (
        <HygieneFindingRegionModal />
      )}
      {isOpenModal && modalKey === ModalKeys.RESPONSIBLE_PERSON && (
        <HygieneFindingResponsiblePersonModal />
      )}
      {isOpenModal && modalKey === ModalKeys.CONTRACTOR_NAME && (
        <HygieneFindingContractorModal />
      )}
    </>
  );
};

export default HygieneFinding;
