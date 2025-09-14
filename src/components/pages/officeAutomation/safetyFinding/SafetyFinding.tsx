import { Controller, useForm, type SubmitHandler } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  FormControl,
  //  InputAdornment,
  TextField,
} from "@mui/material";
import SafetyFindingRegionModal from "./SafetyFindingRegionModal";
import SafetyFindngResponsiblePersonModal from "./SafetyFindngResponsiblePersonModal";
import SafetyFindingContractorModal from "./SafetyFindingContractorModal";
import { useMutation, useQuery } from "react-query";
import Texts from "@/assets/json/Texts.json";

import {
  getHasRoleIdByGroupId,
  getSafetyFindingPriority,
  getSafetyFindings,
  getSafetyFindingSubjects,
  postSafetyFinding,
  RoleIdByGroupId,
  SafetyFindingsRequestDto,
} from "@/api/officeAutomation/safetyFinding";
import FallbackLazyLoad from "@/components/lazyLoad/FallbackLazyLoad";
import { RQKeys } from "@/constant/RQKeys";
import { isDesktop } from "@/utils";
import CustomTextInput from "@/components/inputs/CustomTextInput";
// import { SafetyFindingFormSchema } from "@/validations/officeAutomation/SafetyFinding";
import CustomComboBox from "@/components/inputs/CustomComboBox";
import CustomCheckboxInput from "@/components/inputs/CustomCheckboxInput";
import { modalStore } from "@/store/ModalStore";
import CardMessage from "@/components/ui/CardMessage";
import { safetyFindingStore } from "@/store/officeAutomation/SafetyFinding";
import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { SafetyFindingFormSchema } from "@/validations/officeAutomation/SafetyFinding";
import { useNotification } from "@/hooks/useNotification";
import ReferModal from "./ReferModal";

interface FormValues {
  subject: { id: string; label: string };
  region: string;
  unitManager: string;
  priority: { id: string; label: string; entityCode: number };
  finded: { id: string; label: string };
  contractor: string;
  description: string;
  suggestionWork: string;
  correction: boolean;
}

enum ModalKeys {
  REGION = "SAFETY_FINDING_REGION",
  RESPONSIBLE_PERSON = "SAFETY_FINDING_RESPONSIBLE_PERSON",
  CONTRACTOR_NAME = "SAFETY_FINDING_CONTRACTOR_NAME",
  START_REFER = "START_REFER",
}
const LOW_PRIORITY_ENTITY_CODE: number = 447;
const ACCIDEN_POTENTIAL_ENTITY_CODE: number = 450;

interface ReferProps {
  entityNumber?: string;
  id?: string;
}
const SafetyFinding = () => {
  const isDesktopMode = isDesktop();
  const { success, error } = useNotification();
  const { changeIsOpenModal, isOpenModal, changeKey, modalKey } = modalStore();
  const [referData, setReferData] = useState<ReferProps>();
  const {
    selectedRegion,
    selectedUnitManager,
    selectedContractor,
    changeSelectedContractor,
    changeSelectedRegion,
    changeSelectedUnitManager,
  } = safetyFindingStore();

  const defaultValues = {
    region: null,
    subject: null,
    unitManager: undefined,
    description: undefined,
    suggestionWork: undefined,
    correction: false,
    contractor: undefined,
    priority: null,
    finded: null,
  };

  const {
    handleSubmit,
    control,
    watch,
    // reset,
    setValue,
    // formState: { errors },
  } = useForm<FormValues | any>({
    resolver: yupResolver(SafetyFindingFormSchema),
    defaultValues,
  });
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

  const {
    mutate: createSafetyFinding,
    isLoading: isLoadingCreateSafetyFinding,
  } = useMutation({
    mutationFn: postSafetyFinding,
    onSuccess: (data) => {
      success("ثبت فرم با موفقیت انجام شد.");
      changeSelectedContractor(null);
      changeSelectedRegion(null);
      changeSelectedUnitManager(null);
      setValue("description", "");
      setValue("suggestionWork", "");
      setValue("priority", null);
      setValue("subject", null);
      setValue("finded", null);
      setValue("correction", false);
      setReferData({ id: data?.id, entityNumber: data?.entityNumber });
      changeIsOpenModal(true);
      changeKey(ModalKeys.START_REFER);
    },
    onError: () => {
      error(Texts.common.errorOperationMSG);
    },
  });

  const { priority } = watch();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const dataTosend: SafetyFindingsRequestDto = {
      contractor: selectedContractor?.id as string,
      region: selectedRegion?.id as string,
      unitManager: selectedUnitManager?.id as string,
      correction: data.correction,
      description: data.description,
      suggestionWork: data.suggestionWork,
      finded: data.finded.id,
      subject: data.subject.id,
      priority: data.priority.id,
    };
    createSafetyFinding(dataTosend);
  };

  useEffect(() => {
    setValue("region", selectedRegion?.unitName);
  }, [selectedRegion?.id]);

  useEffect(() => {
    setValue("unitManager", selectedUnitManager?.title);
  }, [selectedUnitManager?.id]);

  useEffect(() => {
    setValue("contractor", selectedContractor?.contractorName);
  }, [selectedContractor?.id]);

  useEffect(() => {
    if (
      priority?.entityCode === LOW_PRIORITY_ENTITY_CODE ||
      priority?.entityCode === ACCIDEN_POTENTIAL_ENTITY_CODE
    ) {
      setValue("correction", true);
    } else {
      setValue("correction", false);
    }
  }, [priority?.id]);

  if (isLoadingHasRoleByIdGroupId) {
    return <FallbackLazyLoad />;
  }

  return (
    <>
      {hasRoleIdByGroupId && !hasRoleIdByGroupId.hasRole ? (
        <div>
          <CardMessage message="دسترسی لازم برای انجام عملیات وجود ندارد." />
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <div className="bg-[#13678a] flex flex-col gap-2 p-4 rounded-md">
            <h1 className="text-white text-center text-2xl">
              سیستم جامع اقدامات اصلاحی
            </h1>
            <h3 className="text-white text-center text-base">
              ثبت یافته‌های ایمنی
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
                          id: s.id,
                          label: s.name,
                        }))
                      : []
                  }
                />
              </div>
              {/* region */}
              <div>
                {/* <CustomTextInput
                  control={control}
                  label="نام ناحیه / نام واحد"
                  name="region"
                  disabled
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
                /> */}
                <Controller
                  name={"region"}
                  control={control}
                  render={({ field, fieldState }) => (
                    <FormControl aria-label="" fullWidth>
                      <TextField
                        {...field}
                        fullWidth
                        value={
                          selectedRegion
                            ? `${selectedRegion.unitName} - ${selectedRegion.committeeName}`
                            : ""
                        }
                        label="نام ناحیه / نام واحد"
                        variant="outlined"
                        onClick={() => handleModalClick(ModalKeys.REGION)}
                        error={!!fieldState.error}
                        helperText={fieldState?.error?.message}
                        // InputProps={{
                        //   endAdornment: (
                        //     <InputAdornment position="end">
                        //       <Button
                        //         variant="contained"
                        //         color="info"
                        //         size="small"
                        //         onClick={}
                        //       >
                        //         {

                        //         }
                        //       </Button>
                        //     </InputAdornment>
                        //   ),
                        // }}
                      />
                    </FormControl>
                  )}
                />
              </div>
              {/* responsble person */}
              <div>
                {/* <CustomTextInput
                  control={control}
                  label="مسئول واحد"
                  name="unitManager"
                  disabled
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
                /> */}
                <Controller
                  name={"unitManager"}
                  control={control}
                  render={({ field, fieldState }) => (
                    <FormControl aria-label="" fullWidth>
                      <TextField
                        fullWidth
                        {...field}
                        value={
                          selectedUnitManager ? selectedUnitManager.title : ""
                        }
                        label="مسئول واحد"
                        variant="outlined"
                        onClick={() =>
                          handleModalClick(ModalKeys.RESPONSIBLE_PERSON)
                        }
                        error={!!fieldState.error}
                        helperText={fieldState?.error?.message}
                        // InputProps={{
                        //   endAdornment: (
                        //     <InputAdornment position="end">
                        //       <Button
                        //         variant="contained"
                        //         color="info"
                        //         size="small"
                        //         onClick={}
                        //       >
                        //         {

                        //         }
                        //       </Button>
                        //     </InputAdornment>
                        //   ),
                        // }}
                      />
                    </FormControl>
                  )}
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
                            id: c.id,
                            label: c.name,
                            entityCode: c.entityCode,
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
                            id: c.id,
                            label: c.name,
                          }))
                        : []
                    }
                  />
                </div>
              </div>
              {/* contractor  name*/}
              <div>
                {/* <CustomTextInput
                  control={control}
                  label="نام پیمانکار"
                  disabled
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
                /> */}
                <Controller
                  name={"contractor"}
                  control={control}
                  render={({ field, fieldState }) => (
                    <FormControl aria-label="" fullWidth>
                      <TextField
                        fullWidth
                        {...field}
                        value={
                          selectedContractor
                            ? selectedContractor.contractorName
                            : ""
                        }
                        label="نام پیمانکار"
                        variant="outlined"
                        onClick={() =>
                          handleModalClick(ModalKeys.CONTRACTOR_NAME)
                        }
                        error={!!fieldState.error}
                        helperText={fieldState?.error?.message}
                        // InputProps={{
                        //   endAdornment: (
                        //     <InputAdornment position="end">
                        //       <Button
                        //         variant="contained"
                        //         color="info"
                        //         size="small"
                        //         onClick={}
                        //       >
                        //         {

                        //         }
                        //       </Button>
                        //     </InputAdornment>
                        //   ),
                        // }}
                      />
                    </FormControl>
                  )}
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
                  name="suggestionWork"
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
                    disabled={true}
                  />
                </div>
              </div>

              <div
                className={`py-8 ${isDesktopMode ? "self-end" : "fullWidth"}`}
              >
                <Button
                  fullWidth
                  // sx={{ backgroundColor: "rgb(138, 81, 19)" }}
                  color="success"
                  variant="contained"
                  type="submit"
                  loading={isLoadingCreateSafetyFinding}
                  disabled={isLoadingCreateSafetyFinding}
                  // onClick={handleClickOnSave}
                >
                  ثبت
                </Button>
                {/* <Button
                    fullWidth
                    sx={{ backgroundColor: "rgb(19, 138, 129)" }}
                    // color="success"
                    variant="contained"
                    type="submit"
                    // disabled={isLoading}
                    // onClick={handleClickOnSave}
                  >
                    ثبت
                  </Button>
                  <Button
                    fullWidth
                    sx={{ backgroundColor: "rgb(138,19,103)" }}
                    // color="success"
                    variant="contained"
                    type="submit"
                    // disabled={isLoading}
                    // onClick={handleClickOnSave}
                  >
                    ثبت
                  </Button>
                  <Button
                    fullWidth
                    sx={{ backgroundColor: "rgb(240,240,240)" }}
                    // color="success"
                    variant="contained"
                    type="submit"
                    // disabled={isLoading}
                    // onClick={handleClickOnSave}
                  >
                    ثبت
                  </Button>

                  <Button
                    fullWidth
                    sx={{ backgroundColor: "rgb(50,50,50)" }}
                    // color="success"
                    variant="contained"
                    type="submit"
                    // disabled={isLoading}
                    // onClick={handleClickOnSave}
                  >
                    ثبت
                  </Button> */}
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
      {isOpenModal && modalKey === ModalKeys.START_REFER && referData?.id && (
        <ReferModal {...referData} />
      )}
    </>
  );
};

export default SafetyFinding;
