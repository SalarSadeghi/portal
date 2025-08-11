import { memo, type ReactNode } from "react";
import {
  DataGrid as MuiDataGrid,
  gridClasses,
  GridToolbar,
  type DataGridProps, 
} from "@mui/x-data-grid";
import { alpha, Box, styled } from "@mui/material";
import { dataGridLocaleTexts } from "../../constant/dataGrid";

type Props = {
  dataGridProps: DataGridProps;
  fallback?: ReactNode;
  hasToolbar?: boolean;
};

const ODD_OPACITY = 0.2;

const CustomDataGrid = styled(MuiDataGrid)(({ theme, loading, rows }) => ({
  height: loading || rows?.length === 0 ? "300px" : undefined,
  "& .MuiDataGrid-columnHeaders": {
    backgroundColor: theme.palette.primary.main,
    // color: theme.palette.background.default,
  },
  "& .MuiDataGrid-iconButtonContainer .MuiIconButton-root": {
    color: theme.palette.background.default,
  },

  "& .MuiDataGrid-menuIcon .MuiIconButton-root": {
    color: theme.palette.background.default,
  },

  "& .MuiDataGrid-cell .MuiTypography-root": {
    textWrap: "inherit",
    lineBreak: "auto",
  },

  "& .MuiDataGrid-cell--withRenderer": {
    overflowX: "auto !important",
  },

  "& .MuiDataGrid-cellContent": {
    textWrap: "auto",
    lineBreak: "loose",
  },

  [`& .${gridClasses.row}.even`]: {
    backgroundColor:
      theme.palette.mode === "light"
        ? theme.palette.grey[200]
        : theme.palette.grey[600],
    "&:hover, &.Mui-hovered": {
      backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
      "@media (hover: none)": {
        backgroundColor: "transparent",
      },
    },
    "&.Mui-selected": {
      backgroundColor: alpha(
        theme.palette.primary.main,
        ODD_OPACITY + theme.palette.action.selectedOpacity
      ),
      "&:hover, &.Mui-hovered": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          ODD_OPACITY +
            theme.palette.action.selectedOpacity +
            theme.palette.action.hoverOpacity
        ),
        // Reset on touch devices, it doesn't add specificity
        "@media (hover: none)": {
          backgroundColor: alpha(
            theme.palette.primary.main,
            ODD_OPACITY + theme.palette.action.selectedOpacity
          ),
        },
      },
    },
  },
}));

function DataGrid({ dataGridProps, fallback, hasToolbar }: Props) {
  const { localeText, ...rest } = dataGridProps;

  if (!dataGridProps?.rows?.length && fallback) return <>{fallback}</>;

  return (
    <Box sx={{ width: "100%" }}>
      <CustomDataGrid
        // getRowHeight={() => 'auto'}
        {...rest}
        getRowClassName={(params) =>
          // @ts-ignore
          params?.indexRelativeToCurrentPage % 2 !== 0 ? "even" : "odd"
        }
        disableColumnMenu
        // {...rest}
        localeText={dataGridLocaleTexts}
        slots={{
          toolbar: hasToolbar ? GridToolbar : undefined,
        }}
        slotProps={{
          toolbar: {
            csvOptions: { disableToolbarButton: true },
            printOptions: { disableToolbarButton: true },
            // filterOptions: { disableToolbarButton: true },
            showQuickFilter: false,
          },
        }}
        rowSpacingType="border"
        rowHeight={dataGridProps.rowHeight}
      />
    </Box>
  );
}

export default memo(DataGrid);
