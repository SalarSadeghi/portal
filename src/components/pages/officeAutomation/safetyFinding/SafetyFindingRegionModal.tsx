import { Modal } from "../../../ui/Modal";
import { modalStore } from "../../../../store/ModalStore";
import DataGridTable from "../../../ui/DataGridTable";
import { isDesktop } from "../../../../utils";
import type { GridColDef } from "@mui/x-data-grid";
import { useQuery } from "react-query";

const SafetyFindingRegionModal = () => {
  const { isOpenModal, changeIsOpenModal } = modalStore();
  const isDesktopMode = isDesktop();
  const columns: GridColDef[] = [
    // {
    //   ...GRID_CHECKBOX_SELECTION_COL_DEF,
    //   minWidth: 70,
    //   cellClassName: "dataGridCheckBoxContainer",
    //   renderCell: (params) => {
    //     const rowId = Number(params.id);
    //     return (
    //       <Checkbox
    //         color="secondary"
    //         sx={{ color: theme.palette.secondary.main }}
    //         checked={localRelatedExperiences.includes(rowId)}
    //         onChange={(event) => {
    //           if (event?.target?.checked) {
    //             setLocalRelatedExperiences([...localRelatedExperiences, rowId]);
    //           } else {
    //             setLocalRelatedExperiences(
    //               localRelatedExperiences.filter((item) => item !== rowId)
    //             );
    //           }
    //         }}
    //       />
    //     );
    //   },
    // },
    {
      field: "region",
      headerName: "ناحیه / واحد",
      align: "center",
      headerAlign: "center",
      minWidth: 180,
      resizable: true,
      sortable: true,
      filterable: false,
    },
    {
      field: "commite",
      headerName: "کمیته",
      align: "center",
      headerAlign: "center",
      minWidth: 180,
      resizable: true,
      sortable: true,
      filterable: false,
    },
  ];

  // const { data: safetyFindingsPriority } = useQuery(
  //   RQKeys.officeAutomation.saftyFinding.getSafetyFindingPriority(),
  //   () => getSafetyFindingPriority()
  // );


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
              rows: [],
              // loading: isLoading,
              pageSizeOptions: [5, 10, 25, 50, 100],
              // paginationModel,
              paginationMode: "server",
              // onPaginationModelChange: setPaginationModel,
              rowCount: 0, // zero is very crucial!
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
      </div>
    </Modal>
  );
};

export default SafetyFindingRegionModal;
