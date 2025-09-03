import {
  Button,
  FormControl,
  //  InputAdornment,
  TextField,
} from "@mui/material";
import CustomTextInput from "../../../inputs/CustomTextInput";
import { isDesktop } from "../../../../utils";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { HygieneFindingFormSchema } from "../../../../validations/officeAutomation/HygieneFinding";
import CustomComboBox from "../../../inputs/CustomComboBox";
import CustomCheckboxInput from "../../../inputs/CustomCheckboxInput";
import { useEffect } from "react";
import { modalStore } from "../../../../store/ModalStore";
import HygieneFindingRegionModal from "./HygieneFindingRegionModal";
import HygieneFindingResponsiblePersonModal from "./HygieneFindingResponsiblePersonModal";
import HygieneFindingContractorModal from "./HygieneFindingContractorModal";
import { useMutation, useQuery } from "react-query";
import { RQKeys } from "@/constant/RQKeys";
import {
  getHasRoleIdByGroupId,
  RoleIdByGroupId,
} from "@/api/officeAutomation/safetyFinding";
import Texts from "@/assets/json/Texts.json";
import {
  getHygienePriority,
  getHygienHarmfulFactor,
  HygieneRequetstDto,
  postHygiene,
  postHygieneRefer,
} from "@/api/officeAutomation/hygienFinding";
import FallbackLazyLoad from "@/components/lazyLoad/FallbackLazyLoad";
import { hygienFindingStore } from "@/store/officeAutomation/HygienFinding";
import CardMessage from "@/components/ui/CardMessage";
import { useNotification } from "@/hooks/useNotification";
import { useDialogStore } from "@/store/dialogStore";

interface FormValues {
  region: string;
  unitManager: string;
  priority: { id: string; label: string; entityCode: number };
  harmfulFactor: { id: string; label: string };
  contractor: string;
  description: string;
  suggestionWork: string;
  correction: boolean;
}
enum ModalKeys {
  REGION = "REGION",
  RESPONSIBLE_PERSON = "RESPONSIBLE_PERSON",
  CONTRACTOR_NAME = "CONTRACTOR_NAME",
}

const LOW_PRIORITY_ENTITY_CODE: number = 539;
const CRITICAL_STATUS: number = 541;

const HygieneFinding = () => {
  const isDesktopMode = isDesktop();
  // const [date, setDate] = useState<Date>();
  const { changeIsOpenModal, isOpenModal, changeKey, modalKey } = modalStore();
  const { success, error } = useNotification();

  const {
    selectedContractor,
    selectedRegion,
    selectedUnitManager,
    changeSelectedContractor,
    changeSelectedUnitManager,
    changeSelectedRegion,
  } = hygienFindingStore();

  const defaultValues = {
    region: undefined,
    unitManager: undefined,
    description: "",
    suggestionWork: "",
    correction: false,
    contractor: undefined,
    priority: null,
    harmfulFactor: null,
  };

  const {
    handleSubmit,
    control,
    watch,
    // reset,
    setValue,
    // formState: { errors },
  } = useForm<FormValues | any>({
    resolver: yupResolver(HygieneFindingFormSchema),
    defaultValues,
  });

  const { priority } = watch();

  const {
    changeOpen: changeDialogOpen,
    changeBody: changeDialogText,
    changeTitle: changeDialogTitle,
    changeOnOk: changeDialogOnOk,
  } = useDialogStore((state) => state);

  const { data: hasRoleIdByGroupId, isLoading: isLoadingHasRoleByIdGroupId } =
    useQuery(
      RQKeys.officeAutomation.saftyFinding.getHasRoleIdByGroupId(
        RoleIdByGroupId.ROLE_PROFESSIONAL_HEALTH
      ),
      () => getHasRoleIdByGroupId(RoleIdByGroupId.ROLE_PROFESSIONAL_HEALTH)
    );

  const { data: hygieneFindingPriority } = useQuery(
    RQKeys.officeAutomation.hygieneFinding.getHygienePriority(),
    () => getHygienePriority(),
    {
      enabled: Boolean(hasRoleIdByGroupId?.hasRole),
    }
  );

  const { data: harmfulFactorsData } = useQuery(
    RQKeys.officeAutomation.hygieneFinding.getHygienHarmfulFactor(),
    () => getHygienHarmfulFactor(),
    {
      enabled: Boolean(hasRoleIdByGroupId?.hasRole),
    }
  );

  const { mutate: createHygieneRefer } = useMutation({
    mutationFn: postHygieneRefer,
    onSuccess: () => {
      success("شروع فرآیند با موفقیت انجام شد");
    },
    onError: () => {
      error("عملیات با خطا مواجه شد.");
    },
  });

  const { mutate: createHygineForm, isLoading: isLoadingCreateHugienForm } =
    useMutation({
      mutationFn: postHygiene,
      onSuccess: (data) => {
        success("ثبت فرم با موفقیت انجام شد.");
        changeSelectedContractor(null);
        changeSelectedRegion(null);
        changeSelectedUnitManager(null);
        setValue("description", "");
        setValue("suggestionWork", "");
        setValue("priority", null);
        setValue("harmfulFactor", null);
        setValue("correction", false);
        changeDialogOpen(true);
        changeDialogTitle(`${Texts.pages.hse.startRefer}`);
        changeDialogText(Texts.pages.hse.startReferMSG);
        changeDialogOnOk(() => {
          createHygieneRefer(data.id);
        });
      },
      onError: () => {
        error("عملیات با خطا مواجه شد.");
      },
    });

  const handleModalClick = (key: ModalKeys) => {
    changeIsOpenModal(true);
    changeKey(key);
  };

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const dateToSend: HygieneRequetstDto = {
      contractorId: selectedContractor?.id as string,
      correction: data.correction,
      description: data.description,
      harmfulFactorId: data.harmfulFactor.id,
      priorityId: data.priority.id,
      regionId: selectedRegion?.id as string,
      suggestionWork: data.suggestionWork,
      unitManagerId: selectedUnitManager?.id as string,
    };
    createHygineForm(dateToSend);
  };

  useEffect(() => {
    setValue("region", selectedRegion?.committeeName);
  }, [selectedRegion?.id]);

  useEffect(() => {
    setValue("unitManager", selectedUnitManager?.firstName);
  }, [selectedUnitManager?.id]);

  useEffect(() => {
    setValue("contractor", selectedContractor?.contractorName);
  }, [selectedContractor?.id]);

  useEffect(() => {
    if (
      priority?.entityCode === LOW_PRIORITY_ENTITY_CODE ||
      priority?.entityCode === CRITICAL_STATUS
    ) {
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
              ثبت یافته‌های بهداشت حرفه‌ای و ارگونومی
            </h3>
          </div>
          <div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
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
              {/* unitManager */}
              <div>
                {/* <CustomTextInput
                  control={control}
                  label="مسئول واحد"
                  disabled
                  name="unitManager"
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
                          selectedUnitManager
                            ? `${selectedUnitManager?.firstName} ${selectedUnitManager?.lastName} (${selectedUnitManager?.roleName})`
                            : ""
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

              <div
                className={`flex ${
                  isDesktopMode ? "flex-row gap-2" : "flex-col gap-4"
                }`}
              >
                {/* priority */}
                <div className={`${isDesktopMode ? "w-1/2" : "w-full"}`}>
                  <CustomComboBox
                    options={
                      hygieneFindingPriority?.map((c) => ({
                        id: c.id,
                        label: c.name,
                        entityCode: c.entityCode,
                      })) || []
                    }
                    control={control}
                    label="نوع اولویت"
                    name="priority"
                  />
                </div>
                {/* harmful Factor */}
                <div className={`${isDesktopMode ? "w-1/2" : "w-full"}`}>
                  <CustomComboBox
                    options={
                      harmfulFactorsData?.map((c) => ({
                        id: c.id,
                        label: c.name,
                      })) || []
                    }
                    control={control}
                    label="عوامل زیان‌آور"
                    name="harmfulFactor"
                  />
                </div>
              </div>

              <div>
                {/* <CustomTextInput
                  control={control}
                  label="نام پیمانکار"
                  name="contractor"
                  disabled
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
                  name="suggestionWork"
                  control={control}
                  label="اقدام اصلاحی انجام شده / اقدام اصلاحی پیشنهادی"
                />
              </div>

              <div
                className={`flex ${
                  isDesktopMode
                    ? "flex-row gap-4"
                    : "flex-col gap-4 items-center"
                }`}
              >
                {/* <div className={`${isDesktopMode ? "w-1/2" : "w-full"}`}>
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
              </div> */}
                <div
                  className={`flex items-center ${
                    isDesktopMode ? "w-1/2" : "w-full "
                  }`}
                >
                  <CustomCheckboxInput
                    disabled={
                      priority?.entityCode === LOW_PRIORITY_ENTITY_CODE ||
                      priority?.entityCode === CRITICAL_STATUS
                    }
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
                  disabled={isLoadingCreateHugienForm}
                  loading={isLoadingCreateHugienForm}
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
