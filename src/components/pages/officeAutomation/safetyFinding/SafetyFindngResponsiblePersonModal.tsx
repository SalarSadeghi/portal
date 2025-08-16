import { Modal } from "../../../ui/Modal";
import { modalStore } from "../../../../store/ModalStore";
import DataGridTable from "../../../ui/DataGridTable";
import {
  GRID_CHECKBOX_SELECTION_COL_DEF,
  type GridColDef,
} from "@mui/x-data-grid";
import { isDesktop } from "../../../../utils";
import { useQuery } from "react-query";
import {
  getSafetyFindingUnitManagers,
  UnitManager,
} from "../../../../api/officeAutomation/safetyFinding";
import { RQKeys } from "../../../../constant/RQKeys";
import { Button, Checkbox } from "@mui/material";
import { useState } from "react";
import { safetyFindingStore } from "@/store/officeAutomation/SafetyFinding";

const SafetyFindngResponsiblePersonModal = () => {
  const { isOpenModal, changeIsOpenModal } = modalStore();
  const isDesktopMode = isDesktop();
  const [selectedRow, setSelectedRow] = useState<UnitManager>();
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });
  const { changeSelectedUnitManager } = safetyFindingStore();

  const columns: GridColDef[] = [
    {
      ...GRID_CHECKBOX_SELECTION_COL_DEF,
      minWidth: 70,
      cellClassName: "dataGridCheckBoxContainer",
      renderCell: (params) => {
        const rowId = params.id;
        return (
          <Checkbox
            color="primary"
            checked={selectedRow?.id === rowId}
            onChange={(event) => {
              if (event?.target?.checked) {
                setSelectedRow(params.row);
              } else {
                setSelectedRow(undefined);
              }
            }}
          />
        );
      },
    },
    {
      field: "unitManager",
      headerName: "مسئول واحد",
      align: "center",
      headerAlign: "center",
      minWidth: 180,
      resizable: true,
      sortable: true,
      filterable: false,
    },
  ];
  const { data: safetyFindingsUnitManagers, isLoading } = useQuery(
    RQKeys.officeAutomation.saftyFinding.getSafetyFindingUnitManagers({
      page: paginationModel.page,
      size: paginationModel.pageSize,
    }),
    () =>
      getSafetyFindingUnitManagers({
        page: paginationModel.page,
        size: paginationModel.pageSize,
      }),
    {
      keepPreviousData: true,
    }
  );

  const handleSelectRow = () => {
    if (selectedRow) {
      changeSelectedUnitManager(selectedRow);
      changeIsOpenModal(false);
    }
  };

  return (
    <Modal
      width="80%"
      maxHeight="85%"
      isOpen={isOpenModal}
      onToggle={() => {
        changeIsOpenModal(false);
      }}
      title={"مسئول واحد"}
    >
      <div className="flex flex-col gap-8 p-4">
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
              rows: safetyFindingsUnitManagers?.list || [],
              loading: isLoading,
              pageSizeOptions: [5, 10, 25, 50, 100],
              paginationModel,
              paginationMode: "server",
              onPaginationModelChange: setPaginationModel,
              rowCount: safetyFindingsUnitManagers?.total ?? 0, // zero is very crucial!
              disableEval: true,
              disableColumnMenu: !isDesktopMode,
              disableVirtualization: true,
              disableRowSelectionOnClick: true,
              disableColumnFilter: true,
              rowHeight: 80,
              checkboxSelection: true,
              // rowSelectionModel: localRelatedExperiences,
              // onRowClick: (params) => handleRowClick(params),
              // onRowSelectionModelChange: (newRowSelectionModel) => {
              //     // changeRelatedExperiences(newRowSelectionModel as number[]);
              // }
            }}
          />
        </div>
        <div className="w-full flex justify-end">
          <Button
            disabled={!selectedRow}
            onClick={handleSelectRow}
            variant="contained"
          >
            ثبت
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default SafetyFindngResponsiblePersonModal;
