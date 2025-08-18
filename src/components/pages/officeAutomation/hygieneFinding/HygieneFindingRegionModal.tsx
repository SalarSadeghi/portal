import {
  getSaftyFindingAllregion,
  SafetyFindingsCommitteeDto,
} from "@/api/officeAutomation/safetyFinding";
import Loading from "@/components/lazyLoad/Loading";
import DataGridTable from "@/components/ui/DataGridTable";
import { Modal } from "@/components/ui/Modal";
import { RQKeys } from "@/constant/RQKeys";
import { useDebounce } from "@/hooks/useDebounce";
import { useNotification } from "@/hooks/useNotification";
import { modalStore } from "@/store/ModalStore";
import { hygienFindingStore } from "@/store/officeAutomation/HygienFinding";
import { isDesktop } from "@/utils";
import { CloseOutlined, SearchOutlined } from "@mui/icons-material";
import {
  Button,
  Checkbox,
  IconButton,
  InputAdornment,
  TextField,
  useTheme,
} from "@mui/material";
import { GRID_CHECKBOX_SELECTION_COL_DEF, GridColDef } from "@mui/x-data-grid";
import { useRef, useState } from "react";
import { useQuery } from "react-query";

const HygieneFindingRegionModal = () => {
  const { isOpenModal, changeIsOpenModal } = modalStore();
  const [selectedRow, setSelectedRow] = useState<SafetyFindingsCommitteeDto>();
  const isDesktopMode = isDesktop();

  const theme = useTheme();
  const [searchValue, setSearchValue] = useState<string>("");
  const debouncedSearchValue = useDebounce(searchValue, 500);
  const searchInputRef = useRef<HTMLInputElement>();

  const { changeSelectedRegion } = hygienFindingStore();
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
      field: "unitName",
      headerName: "ناحیه / واحد",
      align: "center",
      headerAlign: "center",
      minWidth: 250,
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
    RQKeys.officeAutomation.saftyFinding.getSaftyFindingAllregion({
      page: paginationModel.page,
      size: paginationModel.pageSize,
      search:
        debouncedSearchValue?.length > 2 ? debouncedSearchValue : undefined,
    }),
    () =>
      getSaftyFindingAllregion({
        page: paginationModel.page,
        size: paginationModel.pageSize,
        search: debouncedSearchValue || undefined,
      }),
    {
      keepPreviousData: true,
    }
  );

  const handleSelectRow = () => {
    if (selectedRow) {
      changeSelectedRegion(selectedRow);
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
      width="80%"
      maxHeight="85%"
      isOpen={isOpenModal}
      onToggle={() => {
        changeIsOpenModal(false);
      }}
      title={"نام ناحیه / نام واحد"}
    >
      <div className="flex flex-col gap-8 p-4">
        <div className={`${isDesktopMode ? "w-full" : "w-full"}`}>
          <TextField
            fullWidth
            label={"جستجو"}
            // helperText={`${Texts.common.searchInAllFields} (${Texts.common.searchCharactersHelp})`}
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
              disableMultipleRowSelection: true,
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

export default HygieneFindingRegionModal;
