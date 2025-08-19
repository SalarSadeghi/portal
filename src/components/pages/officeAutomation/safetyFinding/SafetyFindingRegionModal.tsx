import { Modal } from "../../../ui/Modal";
import { modalStore } from "../../../../store/ModalStore";
import DataGridTable from "../../../ui/DataGridTable";
import { isDesktop } from "../../../../utils";
import {
  // GRID_CHECKBOX_SELECTION_COL_DEF,
  GridRowParams,
  // GridRowSelectionModel,
  type GridColDef,
} from "@mui/x-data-grid";
import { useQuery } from "react-query";
import { RQKeys } from "@/constant/RQKeys";
import {
  getSaftyFindingAllregion,
  // SafetyFindingsCommitteeDto,
} from "@/api/officeAutomation/safetyFinding";
import { useRef, useState } from "react";
import {
  // Button,
  // Checkbox,
  IconButton,
  InputAdornment,
  TextField,
  useTheme,
} from "@mui/material";
import { safetyFindingStore } from "@/store/officeAutomation/SafetyFinding";
import Loading from "@/components/lazyLoad/Loading";
import { CloseOutlined, SearchOutlined } from "@mui/icons-material";
import { useNotification } from "@/hooks/useNotification";
import { useDebounce } from "@/hooks/useDebounce";

const SafetyFindingRegionModal = () => {
  const { isOpenModal, changeIsOpenModal } = modalStore();
  const [searchValue, setSearchValue] = useState<string>("");
  const isDesktopMode = isDesktop();
  // const [selectedRow, setSelectedRow] = useState<SafetyFindingsCommitteeDto>();
  const searchInputRef = useRef<HTMLInputElement>();
  const debouncedSearchValue = useDebounce(searchValue, 500);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });
  const { changeSelectedRegion } = safetyFindingStore();
  const columns: GridColDef[] = [
    // {
    //   ...GRID_CHECKBOX_SELECTION_COL_DEF,
    //   cellClassName: "dataGridCheckBoxContainer",
    //   maxWidth: 70,
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
      field: "unitName",
      headerName: "ناحیه / واحد",
      align: "center",
      headerAlign: "center",
      minWidth: 400,
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
  const theme = useTheme();
  const { data: allRegionData, isLoading } = useQuery(
    RQKeys.officeAutomation.saftyFinding.getSaftyFindingAllregion({
      search:
        debouncedSearchValue?.length > 2 ? debouncedSearchValue : undefined,
      page: paginationModel.page,
      size: paginationModel.pageSize,
    }),
    () =>
      getSaftyFindingAllregion({
        search: debouncedSearchValue || undefined,
        page: paginationModel.page,
        size: paginationModel.pageSize,
      }),
    {
      keepPreviousData: true,
    }
  );

  const handleSelectRow = (params: GridRowParams<any>) => {
    if (params) {
      changeSelectedRegion(params.row);
      changeIsOpenModal(false);
    }
  };
  const { info } = useNotification();
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
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
      title={"نام ناحیه / نام واحد"}
    >
      <div className="flex flex-col gap-8 p-4">
        <div>
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
              // checkboxSelection: true,
              disableMultipleRowSelection: true,
              onRowClick: (params) => handleSelectRow(params),
              // rowSelectionModel: selectedRow,
              // onRowSelectionModelChange: setSelectedRow,
              // onRowSelectionModelChange: (newSelection) => {
              //   console.log(newSelection);
              //   // const lastSelected = newSelection.slice(-1);
              //   // setSelectedRow(lastSelected);
              // },
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

export default SafetyFindingRegionModal;
