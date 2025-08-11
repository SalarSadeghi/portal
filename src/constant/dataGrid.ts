export const dataGridLocaleTexts = {
  noRowsLabel: "هیچ ردیفی وجود ندارد",
  noResultsOverlayLabel: "نتیجه‌ای یافت نشد.",

  toolbarDensity: "فشردگی",
  toolbarDensityLabel: "فشردگی",
  toolbarDensityCompact: "فشرده",
  toolbarDensityStandard: "استاندارد",
  toolbarDensityComfortable: "راحت",

  toolbarColumns: "ستون‌ها",
  toolbarColumnsLabel: "انتخاب ستون‌ها",

  toolbarFilters: "فیلترها",
  toolbarFiltersLabel: "نمایش فیلترها",
  toolbarFiltersTooltipHide: "پنهان کردن فیلترها",
  toolbarFiltersTooltipShow: "نمایش فیلترها",
  toolbarFiltersTooltipActive: (count: number) =>
    count !== 1 ? `${count} فیلتر فعال` : `${count} فیلتر فعال`,

  toolbarQuickFilterPlaceholder: "جستجو...",
  toolbarQuickFilterLabel: "جستجو",
  toolbarQuickFilterDeleteIconLabel: "پاک کردن",

  toolbarExport: "خروجی",
  toolbarExportLabel: "خروجی",
  toolbarExportCSV: "دانلود به صورت CSV",
  toolbarExportPrint: "چاپ",
  toolbarExportExcel: "دانلود به صورت Excel",

  columnsPanelTextFieldLabel: "یافتن ستون",
  columnsPanelTextFieldPlaceholder: "عنوان ستون",
  columnsPanelDragIconLabel: "تغییر ترتیب ستون",
  columnsPanelShowAllButton: "نمایش همه",
  columnsPanelHideAllButton: "پنهان کردن همه",

  filterPanelAddFilter: "افزودن فیلتر",
  filterPanelRemoveAll: "حذف همه",
  filterPanelDeleteIconLabel: "حذف",
  filterPanelLogicOperator: "اپراتور منطقی",
  filterPanelOperator: "اپراتور",
  filterPanelOperatorAnd: "و",
  filterPanelOperatorOr: "یا",
  filterPanelColumns: "ستون‌ها",
  filterPanelInputLabel: "مقدار",
  filterPanelInputPlaceholder: "مقدار فیلتر",

  filterOperatorContains: "حاوی",
  filterOperatorEquals: "برابر با",
  filterOperatorStartsWith: "شروع شود با",
  filterOperatorEndsWith: "پایان یابد با",
  filterOperatorIs: "برابر است با",
  filterOperatorNot: "برابر نیست با",
  filterOperatorAfter: "بعد از",
  filterOperatorOnOrAfter: "بعد از یا برابر با",
  filterOperatorBefore: "قبل از",
  filterOperatorOnOrBefore: "قبل از یا برابر با",
  filterOperatorIsEmpty: "خالی است",
  filterOperatorIsNotEmpty: "خالی نیست",
  filterOperatorIsAnyOf: "هرکدام از",
  "filterOperator=": "=",
  "filterOperator!=": "!=",
  "filterOperator>": ">",
  "filterOperator>=": ">=",
  "filterOperator<": "<",
  "filterOperator<=": "<=",

  headerFilterOperatorContains: "حاوی",
  headerFilterOperatorEquals: "برابر با",
  headerFilterOperatorStartsWith: "شروع شود با",
  headerFilterOperatorEndsWith: "پایان یابد با",
  headerFilterOperatorIs: "برابر است با",
  headerFilterOperatorNot: "برابر نیست با",
  headerFilterOperatorAfter: "بعد از",
  headerFilterOperatorOnOrAfter: "بعد از یا برابر با",
  headerFilterOperatorBefore: "بعد از",
  headerFilterOperatorOnOrBefore: "قبل از یا برابر با",
  headerFilterOperatorIsEmpty: "خالی است",
  headerFilterOperatorIsNotEmpty: "خالی نیست",
  headerFilterOperatorIsAnyOf: "هرکدام از",
  "headerFilterOperator=": "برابر با",
  "headerFilterOperator!=": "برابر نیست با",
  "headerFilterOperator>": "بزرگتر از",
  "headerFilterOperator>=": "بزرگتر یا برابر با",
  "headerFilterOperator<": "کوچکتر از",
  "headerFilterOperator<=": "کوچکتر یا برابر با",

  filterValueAny: "هرکدام",
  filterValueTrue: "صحیح",
  filterValueFalse: "غلط",

  columnMenuLabel: "منو",
  columnMenuShowColumns: "نمایش ستون‌ها",
  columnMenuManageColumns: "مدیریت ستون‌ها",
  columnMenuFilter: "فیلتر",
  columnMenuHideColumn: "پنهان کردن ستون",
  columnMenuUnsort: "حذف مرتب سازی",
  columnMenuSortAsc: "مرتب‌سازی صعودی",
  columnMenuSortDesc: "مرتب‌سازی نزولی",

  columnHeaderFiltersTooltipActive: (count: number) =>
    count !== 1 ? `${count} فیلتر فعال` : `${count} فیلتر فعال`,
  columnHeaderFiltersLabel: "نمایش فیلترها",
  columnHeaderSortIconLabel: "مرتب‌سازی",

  footerRowSelected: (count: number) =>
    count !== 1
      ? `${count.toLocaleString()} ردیف انتخاب شده`
      : `${count.toLocaleString()} ردیف انتخاب شده`,

  footerTotalRows: "کل ردیف‌ها:",
  footerTotalVisibleRows: (
    visibleCount: { toLocaleString: () => any },
    totalCount: { toLocaleString: () => any }
  ) => `${visibleCount.toLocaleString()} از ${totalCount.toLocaleString()}`,

  checkboxSelectionHeaderName: "انتخاب با چک‌باکس",
  checkboxSelectionSelectAllRows: "انتخاب همه ردیف‌ها",
  checkboxSelectionUnselectAllRows: "عدم انتخاب همه ردیف‌ها",
  checkboxSelectionSelectRow: "انتخاب ردیف",
  checkboxSelectionUnselectRow: "عدم انتخاب ردیف",

  booleanCellTrueLabel: "بله",
  booleanCellFalseLabel: "خیر",

  actionsCellMore: "بیشتر",

  pinToLeft: "پین به چپ",
  pinToRight: "پین به راست",
  unpin: "حذف پین",

  treeDataGroupingHeaderName: "گروه",
  treeDataExpand: "نمایش زیرمجموعه‌ها",
  treeDataCollapse: "پنهان کردن زیرمجموعه‌ها",

  groupingColumnHeaderName: "گروه",
  groupColumn: (name: any) => `گروه‌بندی بر اساس ${name}`,
  unGroupColumn: (name: any) => `قطع گروه‌بندی بر اساس ${name}`,

  detailPanelToggle: "تغییر وضعیت پنل جزئیات",
  expandDetailPanel: "باز کردن",
  collapseDetailPanel: "بستن",

  MuiTablePagination: {
    labelRowsPerPage: "تعداد ردیف در هر صفحه:",
    labelDisplayedRows: ({ from, to, count }: any) =>
      `${from}-${to === -1 ? count : to} از ${count}`,
    firstAriaLabel: "صفحهٔ اول",
    firstTooltip: "صفحهٔ اول",
    previousAriaLabel: "صفحهٔ قبلی",
    previousTooltip: "صفحهٔ قبلی",
    nextAriaLabel: "صفحهٔ بعدی",
    nextTooltip: "صفحهٔ بعدی",
    lastAriaLabel: "صفحهٔ آخر",
    lastTooltip: "صفحهٔ آخر",
  },

  rowReorderingHeaderName: "تغییر ترتیب ردیف‌ها",

  aggregationMenuItemHeader: "تجمیع",
  aggregationFunctionLabelSum: "جمع",
  aggregationFunctionLabelAvg: "میانگین",
  aggregationFunctionLabelMin: "کمترین",
  aggregationFunctionLabelMax: "بیشترین",
  aggregationFunctionLabelSize: "تعداد",
};
