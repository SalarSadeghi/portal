import { Close } from "@mui/icons-material";
import {
  Backdrop,
  Box,
  Button,
  Fade,
  IconButton,
  Modal as MuiModal,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import React, { type ReactNode } from "react";

type Props = {
  isOpen: boolean;
  children: React.ReactNode;
  color?: "primary" | "secondary" | "info" | "warning" | "error" | "success";
  title?: ReactNode;
  width?: string;
  maxHeight?: string;
  hasBottomCloseBtn?: boolean;
  onToggle?: (value: boolean) => void;
};

const contentParentStyle = {
  position: "absolute" as "absolute",
  top: "49%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 3,
  maxHeight: "94%",
  overflowY: "auto",
};

const topBorderStyle = {
  width: "80%",
  position: "absolute" as const,
  top: 0,
  borderBottomLeftRadius: "50%",
  borderBottomRightRadius: "50%",
};

export function Modal({
  children,
  title,
  width,
  isOpen,
  onToggle,
  color,
  maxHeight,
  hasBottomCloseBtn,
}: Props) {
  const [open, setOpen] = React.useState(isOpen);

  const theme = useTheme();
  const handleToggle = () => {
    setOpen((prevState) => !prevState);
    if (onToggle) onToggle(!open);
  };

  return (
    <div>
      <MuiModal
        aria-label="transition-modal"
        open={open}
        onClose={handleToggle}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box
            sx={{
              ...contentParentStyle,
              width: width || "unset",
              maxHeight: maxHeight || contentParentStyle.maxHeight,
              borderRadius: "10px",
            }}
          >
            {color && (
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    ...topBorderStyle,
                    borderBottom: `10px solid ${
                      color
                        ? theme.palette[color].main
                        : theme.palette.primary.main
                    }`,
                  }}
                />
              </div>
            )}
            <Tooltip title={"بستن"}>
              <IconButton
                style={{ backgroundColor: "#ebf5ff" }}
                onClick={handleToggle}
                sx={{
                  position: "absolute",
                  right: 15,
                  top: 15,
                }}
              >
                <Close />
              </IconButton>
            </Tooltip>
            <Box style={{ overflowX: "auto" }}>
              {title && (
                <Typography
                  id="transition-modal-title"
                  variant="h6"
                  component="h2"
                >
                  {title}
                </Typography>
              )}
              <div style={{ paddingTop: "25px" }}>{children}</div>
            </Box>

            {hasBottomCloseBtn && (
              <Button
                onClick={handleToggle}
                color={color || "primary"}
                variant="outlined"
                style={{ marginTop: theme.spacing(5) }}
              >
                {"بستن"}
              </Button>
            )}
          </Box>
        </Fade>
      </MuiModal>
    </div>
  );
}
