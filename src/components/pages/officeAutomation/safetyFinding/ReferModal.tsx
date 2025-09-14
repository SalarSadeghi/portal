import { Modal } from "@/components/ui/Modal";
import { modalStore } from "@/store/ModalStore";
import Texts from "@/assets/json/Texts.json";
import { ErrorCode, FileRejection, useDropzone } from "react-dropzone";
import { MIMES } from "@/types/common/file";
import { Chip, IconButton, useTheme } from "@mui/material";
import { DeleteOutline, VerifiedOutlined } from "@mui/icons-material";
import CustomButton from "@/components/inputs/CustomButton";
import { isDesktop } from "@/utils";
import { useCallback, useState } from "react";
import { useMutation } from "react-query";
import { useNotification } from "@/hooks/useNotification";
import { postSafetyFindingRefer } from "@/api/officeAutomation/safetyFinding";

interface ReferProps {
  entityNumber?: string;
  id?: string;
}
const ReferModal = ({ id, entityNumber }: ReferProps) => {
  const { isOpenModal, changeIsOpenModal, changeKey } = modalStore(
    (state) => state
  );
  const theme = useTheme();
  const isDesktopMode = isDesktop();
  const [localFiles, setLocalFiles] = useState<File[]>([]);
  const handleFileRejections = (fileRejections: FileRejection[]) => {
    if (fileRejections.length === 0) return;
    const err = fileRejections[0].errors[0];
    switch (err.code) {
      case ErrorCode.FileTooLarge:
        error(Texts.common.fileTooLargeMSG);
        break;
      case ErrorCode.TooManyFiles:
        error(Texts.common.tooManyFilesMSG);
        break;
      default:
        error(Texts.common.errorFileUploadMSG);
    }
  };

  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      handleFileRejections(fileRejections);
      setLocalFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
    },
    []
  );

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      [MIMES.jpg]: [],
      [MIMES.pdf]: [],
      [MIMES.png]: [],
      [MIMES.mp4]: [],
      [MIMES.mpeg]: [],
      [MIMES.ogv]: [],
      [MIMES.webm]: [],
      [MIMES.avi]: [],
    },
    maxFiles: 4,
    maxSize: 20 * 1024 * 1024, // 20 MB,
    multiple: true,
    onDrop,
  });

  const removeFile = (fileToRemove: File) => {
    setLocalFiles((prevFiles) =>
      prevFiles.filter((file) => file !== fileToRemove)
    );
  };
  const acceptedFileText = ["jpg", "png", "pdf", "mp4"];
  const toggle = () => {
    changeIsOpenModal(false);
    changeKey(null);
  };
  const { error, success } = useNotification();
  const { mutate: createSafetyFindngRefer, isLoading } = useMutation({
    mutationFn: postSafetyFindingRefer,
    onSuccess: () => {
      success(Texts.pages.hse.startReferSuccessMSG);
      toggle();
    },
    onError: () => {
      error(Texts.common.errorOperationMSG);
    },
  });

  const onSubmit = () => {
    const dataTosend = new FormData();
    id && dataTosend.append("id", id);
    localFiles.forEach((f) => dataTosend.append("file", f));
    createSafetyFindngRefer(dataTosend);
  };

  return (
    <Modal
      width="95%"
      maxHeight="85%"
      isOpen={isOpenModal}
      onToggle={toggle}
      title={Texts.pages.hse.startRefer}
    >
      <>
        <div className="flex flex-col gap-4 p-4">
          <div className="flex items-center gap-4">
            <div className="flex gap-1 items-center">
              <VerifiedOutlined color="success" />
              <span>{Texts.pages.hse.entityNumber}:</span>
            </div>
            <span className="text-gray-500">{entityNumber || "-"}</span>
          </div>
          <div
            {...getRootProps({
              className: "dropzone text-sm",
              style: {
                padding: theme.spacing(2),
                border: `2px ${
                  localFiles.length > 0 ? "darkblue" : "lightgray"
                } dashed`,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
              },
            })}
          >
            <input {...getInputProps()} />
            <p
              style={{
                color: theme.palette.primary.main,
              }}
            >
              {Texts.common.attachFileHintTitle}
            </p>
            <p
              style={{
                color: theme.palette.primary.main,
              }}
            >
              {Texts.common.attachFileHintType}:{" "}
              <strong className="text-sm">{acceptedFileText.join(",")}</strong>
            </p>
            <p
              style={{
                color: theme.palette.primary.main,
              }}
            >
              {Texts.common.attchFileHintSize}:{" "}
              <strong className="text-sm">20 مگابایت</strong>
            </p>
          </div>
          <div>
            <ul className="gap-2 flex flex-col">
              {localFiles?.map((file) => (
                <li
                  className="flex items-center"
                  style={{ color: theme.palette.primary.main }}
                >
                  <div className="flex gap-2 items-center">
                    {/* <FilePresentOutlined sx={{ color: 'gray' }} /> */}
                    <Chip
                      sx={{
                        "& .MuiChip-label": {
                          display: "flex",
                          overflow: "hidden",
                        },
                        maxWidth: "100%",
                      }}
                      icon={
                        <>
                          <IconButton
                            color="error"
                            onClick={() => removeFile(file)}
                          >
                            <DeleteOutline />
                          </IconButton>
                        </>
                      }
                      label={
                        <div
                          className={`flex gap-1 ${
                            isDesktopMode ? "max-w-[700px]" : "max-w-[200px]"
                          }`}
                        >
                          <span className="truncate">{file.name}</span>
                          <span className="whitespace-nowrap">
                            (
                            <b>
                              {(file.size / 1024 / 1024).toFixed(2)}
                              MB
                            </b>
                            )
                          </span>
                        </div>
                      }
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex justify-end w-full py-4 gap-4">
            <CustomButton
              type="button"
              color="error"
              variant="outlined"
              label={Texts.common.cancel}
              onClick={toggle}
            />
            <CustomButton
              disabled={isLoading}
              isLoading={isLoading}
              color="success"
              variant="outlined"
              label={Texts.common.agree}
              onClick={onSubmit}
              type="button"
            />
          </div>
        </div>
      </>
    </Modal>
  );
};

export default ReferModal;
