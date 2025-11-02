import { Modal } from "@/components/ui/Modal";
import { modalStore } from "@/store/ModalStore";
import Texts from "@/assets/json/Texts.json";
import { ErrorCode, FileRejection, useDropzone } from "react-dropzone";
import { MIMES } from "@/types/common/file";
import { Chip, IconButton, useTheme } from "@mui/material";
import {
  CloseOutlined,
  DeleteOutline,
  Done,
  VerifiedOutlined,
} from "@mui/icons-material";
import CustomButton from "@/components/inputs/CustomButton";
import { isDesktop, sha256 } from "@/utils";
import { useCallback, useMemo, useState } from "react";
import { useMutation } from "react-query";
import { useNotification } from "@/hooks/useNotification";
import {
  ErrorAttachmentDto,
  postHygieneRefer,
} from "@/api/officeAutomation/hygienFinding";
import { AxiosError } from "axios";
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
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [errorFiles, setErrorFiles] = useState<File[]>([]);
  const [hasErrorFile, setHasErrorFile] = useState<Boolean>(false);
  const { error, success } = useNotification();
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
    maxFiles: 6,
    maxSize: 50 * 1024 * 1024, // 50 MB,
    multiple: true,
    onDrop,
  });

  const removeFile = useCallback((fileToRemove: File) => {
    setLocalFiles((prevFiles) =>
      prevFiles.filter((file) => file !== fileToRemove)
    );
  }, []);

  const acceptedFileText = useMemo(() => ["jpg", "png", "pdf", "mp4"], []);
  const toggle = () => {
    changeIsOpenModal(false);
    changeKey(null);
  };

  const { mutate: createHygieneRefer, isLoading } = useMutation({
    mutationFn: postHygieneRefer,
    onSuccess: () => {
      success(Texts.pages.hse.startReferSuccessMSG);
      toggle();
    },
    onError: async (err: AxiosError) => {
      if (err.response?.status === 503) {
        const attachments = err.response.data as ErrorAttachmentDto[];
        // const invalidFilesNames = attachments.map((a) => a.fileName).join(", ");
        error(`بارگذاری ${attachments?.length} فایل با خطا مواجه شد.`);
        const invalidIds = new Set(attachments.map((e) => e.id));
        const localFileHashes = await Promise.all(
          localFiles.map(async (file) => ({
            file,
            id: await sha256(file),
          }))
        );
        const invalidLocalFiles = localFileHashes
          ?.filter((f) => invalidIds.has(f.id))
          .map((f) => f.file);
        const successUploadedFiles = localFileHashes
          ?.filter((f) => !invalidIds.has(f?.id))
          .map((f) => f.file);
        setUploadedFiles((prev) => [...prev, ...successUploadedFiles]);
        setLocalFiles(invalidLocalFiles);
        setErrorFiles(invalidLocalFiles);
        setHasErrorFile(true);
      } else {
        error(Texts.common.errorOperationMSG);
      }
    },
  });

  const onSubmit = () => {
    const dataTosend = new FormData();
    id && dataTosend.append("id", id);
    localFiles.forEach((f) => dataTosend.append("file", f));
    createHygieneRefer(dataTosend);
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
              <strong className="text-sm">50 مگابایت</strong>
            </p>
          </div>
          <div>
            <ul className="gap-2 flex flex-col">
              {uploadedFiles?.map((file, i) => (
                <li
                  key={i}
                  className="flex items-center"
                  style={{ color: theme.palette.primary.main }}
                >
                  <div className="flex gap-2 items-center">
                    <Chip
                      sx={{
                        "& .MuiChip-label": {
                          display: "flex",
                          overflow: "hidden",
                        },
                        maxWidth: "100%",
                      }}
                      icon={<Done color="success" />}
                      label={
                        <div
                          className={`flex gap-1 ${
                            isDesktopMode ? "max-w-[700px]" : "max-w-[200px]"
                          }`}
                        >
                          <span className="truncate">{file.name}</span>
                        </div>
                      }
                    />
                  </div>
                </li>
              ))}
            </ul>
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
                        <div>
                          {hasErrorFile && errorFiles?.includes(file) ? (
                            <CloseOutlined color="error" />
                          ) : null}
                          <IconButton
                            color="error"
                            onClick={() => removeFile(file)}
                          >
                            <DeleteOutline />
                          </IconButton>
                        </div>
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
