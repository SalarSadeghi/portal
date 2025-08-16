import { Modal } from "../../../ui/Modal";
import { modalStore } from "../../../../store/ModalStore";
import DataGridTable from "../../../ui/DataGridTable";
import { isDesktop } from "../../../../utils";
import {
  GRID_CHECKBOX_SELECTION_COL_DEF,
  // GRID_CHECKBOX_SELECTION_COL_DEF,
  type GridColDef,
} from "@mui/x-data-grid";
import { useQuery } from "react-query";
import {
  Contractor,
  getSafetyFindingContractors,
} from "@/api/officeAutomation/safetyFinding";
import { RQKeys } from "@/constant/RQKeys";
import { safetyFindingStore } from "@/store/officeAutomation/SafetyFinding";
import { useState } from "react";
import { Button, Checkbox } from "@mui/material";

const SafetyFindingContractorModal = () => {
  const { isOpenModal, changeIsOpenModal } = modalStore();
  const isDesktopMode = isDesktop();
  const [selectedRow, setSelectedRow] = useState<Contractor>();
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });
  const { changeSelectedContractor } = safetyFindingStore();
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
      field: "contractor",
      headerName: "مشخصات پیمانکار",
      align: "center",
      headerAlign: "center",
      minWidth: 180,
      resizable: true,
      sortable: true,
      filterable: false,
    },
  ];

  const { data: contractorData, isLoading } = useQuery(
    RQKeys.officeAutomation.saftyFinding.getSafetyFindingContractors({
      page: paginationModel.page,
      size: paginationModel.pageSize,
    }),
    () =>
      getSafetyFindingContractors({
        page: paginationModel.page,
        size: paginationModel.pageSize,
      }),
    {
      keepPreviousData: true,
    }
  );

  const handleSelectRow = () => {
    if (selectedRow) {
      changeSelectedContractor(selectedRow);
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
      title={"نام پیمانکار"}
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
              rows: contractorData?.list || [],
              loading: isLoading,
              pageSizeOptions: [5, 10, 25, 50, 100],
              paginationModel,
              paginationMode: "server",
              onPaginationModelChange: setPaginationModel,
              rowCount: contractorData?.total ?? 0, // zero is very crucial!
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

export default SafetyFindingContractorModal;
