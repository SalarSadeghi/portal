import { Modal } from "../../../ui/Modal";
import { modalStore } from "../../../../store/ModalStore";
import DataGridTable from "../../../ui/DataGridTable";
import {
  // GRID_CHECKBOX_SELECTION_COL_DEF,
  GridRowParams,
  type GridColDef,
} from "@mui/x-data-grid";
import { isDesktop, normalizePersianToArabic } from "../../../../utils";
import { useQuery } from "react-query";
import {
  getSafetyFindingUnitManagers,
  // UnitManager,
} from "../../../../api/officeAutomation/safetyFinding";
import { RQKeys } from "../../../../constant/RQKeys";
import {
  // Button,
  // Checkbox,
  IconButton,
  InputAdornment,
  TextField,
  useTheme,
} from "@mui/material";
import { useRef, useState } from "react";
import { safetyFindingStore } from "@/store/officeAutomation/SafetyFinding";
import Loading from "@/components/lazyLoad/Loading";
import { CloseOutlined, SearchOutlined } from "@mui/icons-material";
import { useNotification } from "@/hooks/useNotification";
import { useDebounce } from "@/hooks/useDebounce";

const SafetyFindngResponsiblePersonModal = () => {
  const { isOpenModal, changeIsOpenModal } = modalStore();
  const isDesktopMode = isDesktop();
  // const [selectedRow, setSelectedRow] = useState<UnitManager>();
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });
  const { changeSelectedUnitManager } = safetyFindingStore();

  const theme = useTheme();
  const [searchValue, setSearchValue] = useState<string>("");
  const debouncedSearchValue = useDebounce(searchValue, 500);
  const searchInputRef = useRef<HTMLInputElement>();

  const columns: GridColDef[] = [
    // {
    //   ...GRID_CHECKBOX_SELECTION_COL_DEF,
    //   maxWidth: 50,
    //   cellClassName: "dataGridCheckBoxContainer",
    //   renderCell: (params) => {
    //     const rowId = params.id;
    //     return (
    //       <Checkbox
    //         color="primary"
    //         checked={selectedRow?.id === rowId}
    //         onChange={(event) => {
    //           if (event?.target?.checked) {
    //             setSelectedRow(params.row);
    //           } else {
    //             setSelectedRow(undefined);
    //           }
    //         }}
    //       />
    //     );
    //   },
    // },
    {
      field: "title",
      headerName: "مسئول واحد",
      align: "center",
      headerAlign: "center",
      minWidth: 280,
      resizable: true,
      sortable: true,
      filterable: false,
    },
  ];
  const { data: safetyFindingsUnitManagers, isLoading } = useQuery(
    RQKeys.officeAutomation.saftyFinding.getSafetyFindingUnitManagers({
      page: paginationModel.page,
      size: paginationModel.pageSize,
      search:
        debouncedSearchValue?.length > 2 ? debouncedSearchValue : undefined,
    }),
    () =>
      getSafetyFindingUnitManagers({
        page: paginationModel.page,
        size: paginationModel.pageSize,
        search: debouncedSearchValue || undefined,
      }),
    {
      keepPreviousData: true,
    }
  );

  const handleSelectRow = (params: GridRowParams<any>) => {
    if (params) {
      changeSelectedUnitManager(params.row);
      changeIsOpenModal(false);
    }
  };
  const { info } = useNotification();
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(normalizePersianToArabic(value));
  };

  const handleClearSearch = () => {
    setSearchValue("");
  };

  const handleSearchIcon = () => {
    if (!searchValue || searchValue.trim().length < 3) {
      info("حداقل 3 کاراکتر برای جستجو نیاز است");
      return;
    }
  };
  return (
    <Modal
      width="95%"
      maxHeight="85%"
      isOpen={isOpenModal}
      onToggle={() => {
        changeIsOpenModal(false);
      }}
      title={"مسئول واحد"}
    >
      <div className="flex flex-col gap-8 p-4">
        <div className={`${isDesktopMode ? "w-full" : "w-full"}`}>
          <TextField
            fullWidth
            label={"جستجو"}
            onChange={handleSearch}
            inputRef={searchInputRef}
            value={searchValue}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  {isLoading ? (
                    <InputAdornment
                      position="start"
                      style={{ paddingLeft: theme.spacing(2) }}
                    >
                      <Loading size={20} />
                    </InputAdornment>
                  ) : undefined}
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <InputAdornment
                    position="end"
                    style={{ paddingRight: theme.spacing(2) }}
                  >
                    <IconButton onClick={handleSearchIcon}>
                      <SearchOutlined />
                    </IconButton>
                    <IconButton onClick={handleClearSearch}>
                      <CloseOutlined />
                    </IconButton>
                  </InputAdornment>
                </InputAdornment>
              ),
            }}
          />
        </div>
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
              onRowClick: (params) => handleSelectRow(params),
              // checkboxSelection: true,
              // rowSelectionModel: localRelatedExperiences,
              // onRowClick: (params) => handleRowClick(params),
              // onRowSelectionModelChange: (newRowSelectionModel) => {
              //     // changeRelatedExperiences(newRowSelectionModel as number[]);
              // }
            }}
          />
        </div>
        {/* <div className="w-full flex justify-end">
          <Button
            disabled={!selectedRow}
            onClick={handleSelectRow}
            variant="contained"
          >
            ثبت
          </Button>
        </div> */}
      </div>
    </Modal>
  );
};

export default SafetyFindngResponsiblePersonModal;
