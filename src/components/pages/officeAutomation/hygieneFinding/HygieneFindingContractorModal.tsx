import {
  Contractor,
  getSafetyFindingContractors,
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

const HygieneFindingContractorModal = () => {
  const { isOpenModal, changeIsOpenModal } = modalStore();
  const isDesktopMode = isDesktop();
  const [selectedRow, setSelectedRow] = useState<Contractor>();
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });
  const theme = useTheme();
  const [searchValue, setSearchValue] = useState<string>("");
  const debouncedSearchValue = useDebounce(searchValue, 500);
  const searchInputRef = useRef<HTMLInputElement>();
  const { changeSelectedContractor } = hygienFindingStore();
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
      field: "contractorName",
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
      search:
        debouncedSearchValue?.length > 2 ? debouncedSearchValue : undefined,
    }),
    () =>
      getSafetyFindingContractors({
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
      changeSelectedContractor(selectedRow);
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
      title={"نام پیمانکار"}
    >
      <div className="flex flex-col gap-4 p-4">
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

export default HygieneFindingContractorModal;
