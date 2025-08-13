import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, InputAdornment } from "@mui/material";
import SafetyFindingRegionModal from "./SafetyFindingRegionModal";
import SafetyFindngResponsiblePersonModal from "./SafetyFindngResponsiblePersonModal";
import SafetyFindingContractorModal from "./SafetyFindingContractorModal";
import { useQuery } from "react-query";

import {
  getHasRoleIdByGroupId,
  getSafetyFindingPriority,
  getSafetyFindings,
  getSafetyFindingSubjects,
  RoleIdByGroupId,
} from "@/api/officeAutomation/safetyFinding";
import FallbackLazyLoad from "@/components/lazyLoad/FallbackLazyLoad";
import { RQKeys } from "@/constant/RQKeys";
import { isDesktop } from "@/utils";
import CustomTextInput from "@/components/inputs/CustomTextInput";
import { SafetyFindingFormSchema } from "@/validations/officeAutomation/SafetyFinding";
import CustomComboBox from "@/components/inputs/CustomComboBox";
import CustomCheckboxInput from "@/components/inputs/CustomCheckboxInput";
import { modalStore } from "@/store/ModalStore";

interface FormValues {
  subject: { id: string; label: string };
  region: string;
  unitManager: string;
  oriority: { id: string; label: string };
  finded: { id: string; label: string };
  contractorName: string;
  descriprion: string;
  suggestionWork: string;
}
const defaultValues = {};
enum ModalKeys {
  REGION = "SAFETY_FINDING_REGION",
  RESPONSIBLE_PERSON = "SAFETY_FINDING_RESPONSIBLE_PERSON",
  CONTRACTOR_NAME = "SAFETY_FINDING_CONTRACTOR_NAME",
}

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

  const { changeIsOpenModal, isOpenModal, changeKey, modalKey } = modalStore();

  const handleModalClick = (key: ModalKeys) => {
    changeIsOpenModal(true);
    changeKey(key);
  };

  const { data: hasRoleIdByGroupId, isLoading: isLoadingHasRoleByIdGroupId } =
    useQuery(
      RQKeys.officeAutomation.saftyFinding.getHasRoleIdByGroupId(
        RoleIdByGroupId.ROLE_SAFETY_FINDINGS
      ),
      () => getHasRoleIdByGroupId(RoleIdByGroupId.ROLE_SAFETY_FINDINGS)
    );

  const { data: safetyFindingsSubjects } = useQuery(
    RQKeys.officeAutomation.saftyFinding.getSafetyFindingSubjects(),
    () => getSafetyFindingSubjects(),
    {
      enabled: Boolean(hasRoleIdByGroupId?.hasRole),
    }
  );

  const { data: safetyFindingsPriority } = useQuery(
    RQKeys.officeAutomation.saftyFinding.getSafetyFindingPriority(),
    () => getSafetyFindingPriority(),
    {
      enabled: Boolean(hasRoleIdByGroupId?.hasRole),
    }
  );

  const { data: safetyFindingsData } = useQuery(
    RQKeys.officeAutomation.saftyFinding.getSafetyFindings(),
    () => getSafetyFindings(),
    {
      enabled: Boolean(hasRoleIdByGroupId?.hasRole),
    }
  );
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log("submit called", data);
  };

  {
    isLoadingHasRoleByIdGroupId && <FallbackLazyLoad />;
  }

  return (
    <>
      {hasRoleIdByGroupId && !hasRoleIdByGroupId.hasRole ? (
        <span>برو بیرون</span>
      ) : (
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
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              {/* subject */}
              <div className={``}>
                <CustomComboBox
                  name="subject"
                  control={control}
                  label="موضوع یافته"
                  options={
                    Array.isArray(safetyFindingsSubjects)
                      ? safetyFindingsSubjects?.map((s) => ({
                          id: s.entityCode,
                          label: s.name,
                        }))
                      : []
                  }
                />
              </div>
              {/* region */}
              <div>
                <CustomTextInput
                  control={control}
                  label="نام ناحیه / نام واحد"
                  name="region"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Button
                          onClick={() => handleModalClick(ModalKeys.REGION)}
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
              {/* responsble person */}
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
                          onClick={() =>
                            handleModalClick(ModalKeys.RESPONSIBLE_PERSON)
                          }
                        >
                          انتخاب
                        </Button>
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
              {/* priority and findings */}
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
                    options={
                      Array.isArray(safetyFindingsPriority)
                        ? safetyFindingsPriority?.map((c) => ({
                            id: c.entityCode,
                            label: c.name,
                          }))
                        : []
                    }
                  />
                </div>
                <div className={`${isDesktopMode ? "w-1/2" : "w-full"}`}>
                  <CustomComboBox
                    control={control}
                    label="یافته‌ها"
                    name="finded"
                    options={
                      Array.isArray(safetyFindingsData)
                        ? safetyFindingsData?.map((c) => ({
                            id: c.entityCode,
                            label: c.name,
                          }))
                        : []
                    }
                  />
                </div>
              </div>
              {/* contractor  name*/}
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
              {/* description */}
              <div>
                <CustomTextInput
                  multiline
                  rows={isDesktopMode ? 4 : 3}
                  name="description"
                  control={control}
                  label="شرح یافته"
                />
              </div>
              {/* suggestion work */}
              <div>
                <CustomTextInput
                  multiline
                  rows={isDesktopMode ? 4 : 3}
                  name="description"
                  control={control}
                  label="اقدام اصلاحی انجام شده / اقدام اصلاحی پیشنهادی"
                />
              </div>
              {/* tme and checkbox */}
              <div
                className={`flex ${
                  isDesktopMode
                    ? "flex-row gap-4"
                    : "flex-col gap-4 items-center"
                }`}
              >
                {/* <div className={`${isDesktopMode ? "w-1/2" : "w-full"}`}>
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
              </div> */}
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

              <div
                className={`py-8 ${isDesktopMode ? "self-end" : "fullWidth"}`}
              >
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
      )}
      {isOpenModal && modalKey === ModalKeys.REGION && (
        <SafetyFindingRegionModal />
      )}
      {isOpenModal && modalKey === ModalKeys.RESPONSIBLE_PERSON && (
        <SafetyFindngResponsiblePersonModal />
      )}
      {isOpenModal && modalKey === ModalKeys.CONTRACTOR_NAME && (
        <SafetyFindingContractorModal />
      )}
    </>
  );
};

export default SafetyFinding;
