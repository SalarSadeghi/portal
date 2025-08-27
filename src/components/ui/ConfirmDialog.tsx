import { useDialogStore } from "@/store/dialogStore";
import { isDesktop } from "@/utils";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import Texts from "@/assets/json/Texts.json";

export function ConfirmDialog() {
  const isDesktopMode = isDesktop();
  const {
    isOpen,
    overflowY,
    changeOverflowY,
    changeOpen,
    title,
    body,
    onOk,
    onCancel,
    hasCancelBtn,
    hasOkBtn,
    maxWidth,
    isTransparentBackground,
    changeIsTransparentBackground,
  } = useDialogStore((state) => state);

  const handleToggle = () => {
    if (isOpen) {
      changeOverflowY("auto");
      changeIsTransparentBackground(false);
    }
    changeOpen(!isOpen);
  };

  const handleCancel = () => {
    handleToggle();
    if (onCancel) onCancel();
  };

  const handleOk = () => {
    handleToggle();
    if (onOk) onOk();
  };

  return (
    <Dialog
      open={isOpen}
      sx={{
        "& .MuiPaper-root": {
          background: isTransparentBackground ? "transparent" : undefined,
          boxShadow: isTransparentBackground ? "unset" : undefined,
        },
        "& .MuiDialog-paper": {
          maxWidth,
          margin: isDesktopMode ? "inherit" : 0,
          width: "100%",
        },
        "& .MuiDialogContent-root": {
          overflowY,
        },
      }}
      onClose={handleToggle}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        {typeof body === "string" ? (
          <DialogContentText id="alert-dialog-description">
            <Typography paragraph align="justify">
              {body}
            </Typography>
          </DialogContentText>
        ) : (
          <div> {body}</div>
        )}
      </DialogContent>
      <DialogActions sx={{ justifyContent: "flex-start" }}>
        {hasOkBtn && (
          <Button onClick={handleOk} autoFocus>
            {Texts.common.agree}
          </Button>
        )}

        {hasCancelBtn && (
          <Button onClick={handleCancel}>{Texts.common.cancel}</Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
