import { Modal } from "../../../ui/Modal";
import { modalStore } from "../../../../store/ModalStore";
import DataGridTable from "../../../ui/DataGridTable";
import { isDesktop } from "../../../../utils";
import {
  GRID_CHECKBOX_SELECTION_COL_DEF,
  GridRowSelectionModel,
  type GridColDef,
} from "@mui/x-data-grid";
import { useQuery } from "react-query";
import { RQKeys } from "@/constant/RQKeys";
import { getSaftyFindingAllregion } from "@/api/officeAutomation/safetyFinding";
import { useState } from "react";
import { Checkbox } from "@mui/material";

const SafetyFindingRegionModal = () => {
  const { isOpenModal, changeIsOpenModal } = modalStore();
  const isDesktopMode = isDesktop();
  const [selectedRow, setSelectedRow] = useState<GridRowSelectionModel>();
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });

  const columns: GridColDef[] = [
    {
      ...GRID_CHECKBOX_SELECTION_COL_DEF,
      minWidth: 70,
      cellClassName: "dataGridCheckBoxContainer",
      renderCell: (params) => {
        console.log(params);
        const rowId = Number(params.id);
        // return (
        //   <Checkbox
        //     color="secondary"
        //     // sx={{ color: theme.palette.secondary.main }}
        //     checked={selectedRow?.includes(rowId)}
        //     onChange={(event) => {
        //       if (event?.target?.checked) {
        //         selectedRow([...selectedRow, rowId]);
        //       } else {
        //         selectedRow(selectedRow?.filter((item) => item !== rowId));
        //       }
        //     }}
        //   />
        // );
        return 0;
      },
    },
    {
      field: "unitName",
      headerName: "ناحیه / واحد",
      align: "center",
      headerAlign: "center",
      minWidth: 180,
      resizable: true,
      sortable: true,
      filterable: false,
    },
    {
      field: "committeeName",
      headerName: "کمیته",
      align: "center",
      headerAlign: "center",
      minWidth: 180,
      resizable: true,
      sortable: true,
      filterable: false,
    },
  ];

  const { data: allRegionData, isLoading } = useQuery(
    RQKeys.officeAutomation.saftyFinding.getSaftyFindingAllregion(),
    () => getSaftyFindingAllregion()
  );

  return (
    <Modal
      width="80%"
      maxHeight="85%"
      isOpen={isOpenModal}
      onToggle={() => {
        changeIsOpenModal(false);
      }}
      title={"نام ناحیه / نام واحد"}
    >
      <div className="flex flex-col gap-4 p-4">
        <div>
          <DataGridTable
            hasToolbar={!isDesktopMode}
            dataGridProps={{
              columns: columns.map((c) => ({
                ...c,
                ...(isDesktopMode && {
                  flex: 1,
                  maxWidth: undefined,
                }),
              })),
              rows: allRegionData?.list || [],
              loading: isLoading,
              pageSizeOptions: [5, 10, 25, 50, 100],
              paginationModel,
              paginationMode: "server",
              onPaginationModelChange: setPaginationModel,
              rowCount: allRegionData?.total ?? 0, // zero is very crucial!
              disableEval: true,
              disableColumnMenu: !isDesktopMode,
              disableVirtualization: true,
              disableRowSelectionOnClick: true,
              disableColumnFilter: true,
              rowHeight: 80,
              checkboxSelection: true,
              // rowSelectionModel: selectedRow,
              // onRowSelectionModelChange: (newSelection) => {
              //   const lastSelected = newSelection.slice(-1);
              //   setSelectedRow(lastSelected);
              // },
            }}
          />
        </div>
      </div>
    </Modal>
  );
};

export default SafetyFindingRegionModal;
