import { useSnackbar } from "notistack";

export function useNotification() {
  const { enqueueSnackbar } = useSnackbar();

  const notify = {
    success: (msg: string) => enqueueSnackbar(msg, { variant: "success" }),
    error: (msg: string) => enqueueSnackbar(msg, { variant: "error" }),
    warning: (msg: string) => enqueueSnackbar(msg, { variant: "warning" }),
    info: (msg: string) => enqueueSnackbar(msg, { variant: "info" }),
  };

  return notify;
}
