import type { GridLocaleText } from "@mui/x-data-grid";

export const dataGridLocaleTexts: Partial<GridLocaleText> = {
  // noRowsLabel: "هیچ ردیفی وجود ندارد",
  // noResultsOverlayLabel: "نتیجه‌ای یافت نشد.",

  // toolbarDensity: "فشردگی",
  // toolbarDensityLabel: "فشردگی",
  // toolbarDensityCompact: "فشرده",
  // toolbarDensityStandard: "استاندارد",
  // toolbarDensityComfortable: "راحت",

  // toolbarColumns: "ستون‌ها",
  // toolbarColumnsLabel: "انتخاب ستون‌ها",

  // toolbarFilters: "فیلترها",
  // toolbarFiltersLabel: "نمایش فیلترها",
  // toolbarFiltersTooltipHide: "پنهان کردن فیلترها",
  // toolbarFiltersTooltipShow: "نمایش فیلترها",
  // toolbarFiltersTooltipActive: (count: number) =>
  //   count !== 1 ? `${count} فیلتر فعال` : `${count} فیلتر فعال`,

  // toolbarQuickFilterPlaceholder: "جستجو...",
  // toolbarQuickFilterLabel: "جستجو",
  // toolbarQuickFilterDeleteIconLabel: "پاک کردن",

  // toolbarExport: "خروجی",
  // toolbarExportLabel: "خروجی",
  // toolbarExportCSV: "دانلود به صورت CSV",
  // toolbarExportPrint: "چاپ",
  // toolbarExportExcel: "دانلود به صورت Excel",

  // columnsPanelTextFieldLabel: "یافتن ستون",
  // columnsPanelTextFieldPlaceholder: "عنوان ستون",
  // columnsPanelDragIconLabel: "تغییر ترتیب ستون",
  // columnsPanelShowAllButton: "نمایش همه",
  // columnsPanelHideAllButton: "پنهان کردن همه",

  // filterPanelAddFilter: "افزودن فیلتر",
  // filterPanelRemoveAll: "حذف همه",
  // filterPanelDeleteIconLabel: "حذف",
  // filterPanelLogicOperator: "اپراتور منطقی",
  // filterPanelOperator: "اپراتور",
  // filterPanelOperatorAnd: "و",
  // filterPanelOperatorOr: "یا",
  // filterPanelColumns: "ستون‌ها",
  // filterPanelInputLabel: "مقدار",
  // filterPanelInputPlaceholder: "مقدار فیلتر",

  // filterOperatorContains: "حاوی",
  // filterOperatorEquals: "برابر با",
  // filterOperatorStartsWith: "شروع شود با",
  // filterOperatorEndsWith: "پایان یابد با",
  // filterOperatorIs: "برابر است با",
  // filterOperatorNot: "برابر نیست با",
  // filterOperatorAfter: "بعد از",
  // filterOperatorOnOrAfter: "بعد از یا برابر با",
  // filterOperatorBefore: "قبل از",
  // filterOperatorOnOrBefore: "قبل از یا برابر با",
  // filterOperatorIsEmpty: "خالی است",
  // filterOperatorIsNotEmpty: "خالی نیست",
  // filterOperatorIsAnyOf: "هرکدام از",
  // "filterOperator=": "=",
  // "filterOperator!=": "!=",
  // "filterOperator>": ">",
  // "filterOperator>=": ">=",
  // "filterOperator<": "<",
  // "filterOperator<=": "<=",

  // headerFilterOperatorContains: "حاوی",
  // headerFilterOperatorEquals: "برابر با",
  // headerFilterOperatorStartsWith: "شروع شود با",
  // headerFilterOperatorEndsWith: "پایان یابد با",
  // headerFilterOperatorIs: "برابر است با",
  // headerFilterOperatorNot: "برابر نیست با",
  // headerFilterOperatorAfter: "بعد از",
  // headerFilterOperatorOnOrAfter: "بعد از یا برابر با",
  // headerFilterOperatorBefore: "بعد از",
  // headerFilterOperatorOnOrBefore: "قبل از یا برابر با",
  // headerFilterOperatorIsEmpty: "خالی است",
  // headerFilterOperatorIsNotEmpty: "خالی نیست",
  // headerFilterOperatorIsAnyOf: "هرکدام از",
  // "headerFilterOperator=": "برابر با",
  // "headerFilterOperator!=": "برابر نیست با",
  // "headerFilterOperator>": "بزرگتر از",
  // "headerFilterOperator>=": "بزرگتر یا برابر با",
  // "headerFilterOperator<": "کوچکتر از",
  // "headerFilterOperator<=": "کوچکتر یا برابر با",

  // filterValueAny: "هرکدام",
  // filterValueTrue: "صحیح",
  // filterValueFalse: "غلط",

  // columnMenuLabel: "منو",
  // columnMenuShowColumns: "نمایش ستون‌ها",
  // columnMenuManageColumns: "مدیریت ستون‌ها",
  // columnMenuFilter: "فیلتر",
  // columnMenuHideColumn: "پنهان کردن ستون",
  // columnMenuUnsort: "حذف مرتب سازی",
  // columnMenuSortAsc: "مرتب‌سازی صعودی",
  // columnMenuSortDesc: "مرتب‌سازی نزولی",

  // columnHeaderFiltersTooltipActive: (count: number) =>
  //   count !== 1 ? `${count} فیلتر فعال` : `${count} فیلتر فعال`,
  // columnHeaderFiltersLabel: "نمایش فیلترها",
  // columnHeaderSortIconLabel: "مرتب‌سازی",

  // footerRowSelected: (count: number) =>
  //   count !== 1
  //     ? `${count.toLocaleString()} ردیف انتخاب شده`
  //     : `${count.toLocaleString()} ردیف انتخاب شده`,

  // footerTotalRows: "کل ردیف‌ها:",
  // footerTotalVisibleRows: (
  //   visibleCount: { toLocaleString: () => any },
  //   totalCount: { toLocaleString: () => any }
  // ) => `${visibleCount.toLocaleString()} از ${totalCount.toLocaleString()}`,

  // checkboxSelectionHeaderName: "انتخاب با چک‌باکس",
  // checkboxSelectionSelectAllRows: "انتخاب همه ردیف‌ها",
  // checkboxSelectionUnselectAllRows: "عدم انتخاب همه ردیف‌ها",
  // checkboxSelectionSelectRow: "انتخاب ردیف",
  // checkboxSelectionUnselectRow: "عدم انتخاب ردیف",

  // booleanCellTrueLabel: "بله",
  // booleanCellFalseLabel: "خیر",

  // actionsCellMore: "بیشتر",

  // pinToLeft: "پین به چپ",
  // pinToRight: "پین به راست",
  // unpin: "حذف پین",

  // treeDataGroupingHeaderName: "گروه",
  // treeDataExpand: "نمایش زیرمجموعه‌ها",
  // treeDataCollapse: "پنهان کردن زیرمجموعه‌ها",

  // groupingColumnHeaderName: "گروه",
  // groupColumn: (name: any) => `گروه‌بندی بر اساس ${name}`,
  // unGroupColumn: (name: any) => `قطع گروه‌بندی بر اساس ${name}`,

  // detailPanelToggle: "تغییر وضعیت پنل جزئیات",
  // expandDetailPanel: "باز کردن",
  // collapseDetailPanel: "بستن",

  // MuiTablePagination: {
  //   labelRowsPerPage: "تعداد ردیف در هر صفحه:",
  //   labelDisplayedRows: ({ from, to, count }: any) =>
  //     `${from}-${to === -1 ? count : to} از ${count}`,
  //   firstAriaLabel: "صفحهٔ اول",
  //   firstTooltip: "صفحهٔ اول",
  //   previousAriaLabel: "صفحهٔ قبلی",
  //   previousTooltip: "صفحهٔ قبلی",
  //   nextAriaLabel: "صفحهٔ بعدی",
  //   nextTooltip: "صفحهٔ بعدی",
  //   lastAriaLabel: "صفحهٔ آخر",
  //   lastTooltip: "صفحهٔ آخر",
  // },

  // rowReorderingHeaderName: "تغییر ترتیب ردیف‌ها",

  // aggregationMenuItemHeader: "تجمیع",
  // aggregationFunctionLabelSum: "جمع",
  // aggregationFunctionLabelAvg: "میانگین",
  // aggregationFunctionLabelMin: "کمترین",
  // aggregationFunctionLabelMax: "بیشترین",
  // aggregationFunctionLabelSize: "تعداد",

  // Root
  noRowsLabel: "هیچ سطری وجود ندارد",
  noResultsOverlayLabel: "نتیجه‌ای یافت نشد",
  noColumnsOverlayLabel: "ستونی وجود ندارد",
  noColumnsOverlayManageColumns: "مدیریت ستون‌ها",
  emptyPivotOverlayLabel:
    "برای ایجاد جدول محوری، فیلدها را به ردیف‌ها، ستون‌ها و مقادیر اضافه کنید",

  // Density selector toolbar
  toolbarDensity: "تراکم",
  toolbarDensityLabel: "تراکم",
  toolbarDensityCompact: "فشرده",
  toolbarDensityStandard: "استاندارد",
  toolbarDensityComfortable: "راحت",

  // Columns selector toolbar
  toolbarColumns: "ستون‌ها",
  toolbarColumnsLabel: "انتخاب ستون‌ها",

  // Filters toolbar
  toolbarFilters: "فیلترها",
  toolbarFiltersLabel: "نمایش فیلترها",
  toolbarFiltersTooltipHide: "پنهان کردن فیلترها",
  toolbarFiltersTooltipShow: "نمایش فیلترها",
  toolbarFiltersTooltipActive: (count) =>
    count !== 1 ? `${count} فیلتر فعال` : `${count} فیلتر فعال`,

  // Quick filter
  toolbarQuickFilterPlaceholder: "جستجو…",
  toolbarQuickFilterLabel: "جستجو",
  toolbarQuickFilterDeleteIconLabel: "پاک کردن",

  // Export
  toolbarExport: "خروجی",
  toolbarExportLabel: "خروجی",
  toolbarExportCSV: "دانلود به صورت CSV",
  toolbarExportPrint: "چاپ",
  toolbarExportExcel: "دانلود به صورت Excel",

  // Toolbar pivot
  toolbarPivot: "پیوت",

  // Toolbar AI
  toolbarAssistant: "دستیار هوش مصنوعی",

  // Columns management
  columnsManagementSearchTitle: "جستجو",
  columnsManagementNoColumns: "ستونی وجود ندارد",
  columnsManagementShowHideAllText: "نمایش/پنهان کردن همه",
  columnsManagementReset: "بازنشانی",
  columnsManagementDeleteIconLabel: "پاک کردن",

  // Filter panel
  filterPanelAddFilter: "افزودن فیلتر",
  filterPanelRemoveAll: "حذف همه",
  filterPanelDeleteIconLabel: "حذف",
  filterPanelLogicOperator: "عملگر منطقی",
  filterPanelOperator: "عملگر",
  filterPanelOperatorAnd: "و",
  filterPanelOperatorOr: "یا",
  filterPanelColumns: "ستون‌ها",
  filterPanelInputLabel: "مقدار",
  filterPanelInputPlaceholder: "مقدار فیلتر",

  // Filter operators
  filterOperatorContains: "شامل باشد",
  filterOperatorDoesNotContain: "شامل نباشد",
  filterOperatorEquals: "برابر باشد",
  filterOperatorDoesNotEqual: "برابر نباشد",
  filterOperatorStartsWith: "شروع شود با",
  filterOperatorEndsWith: "پایان یابد با",
  filterOperatorIs: "باشد",
  filterOperatorNot: "نباشد",
  filterOperatorAfter: "بعد از",
  filterOperatorOnOrAfter: "در یا بعد از",
  filterOperatorBefore: "قبل از",
  filterOperatorOnOrBefore: "در یا قبل از",
  filterOperatorIsEmpty: "خالی باشد",
  filterOperatorIsNotEmpty: "خالی نباشد",
  filterOperatorIsAnyOf: "هر کدام از",
  "filterOperator=": "=",
  "filterOperator!=": "!=",
  "filterOperator>": ">",
  "filterOperator>=": ">=",
  "filterOperator<": "<",
  "filterOperator<=": "<=",

  // Header filter operators
  headerFilterOperatorContains: "شامل باشد",
  headerFilterOperatorDoesNotContain: "شامل نباشد",
  headerFilterOperatorEquals: "برابر باشد",
  headerFilterOperatorDoesNotEqual: "برابر نباشد",
  headerFilterOperatorStartsWith: "شروع شود با",
  headerFilterOperatorEndsWith: "پایان یابد با",
  headerFilterOperatorIs: "باشد",
  headerFilterOperatorNot: "نباشد",
  headerFilterOperatorAfter: "بعد از",
  headerFilterOperatorOnOrAfter: "در یا بعد از",
  headerFilterOperatorBefore: "قبل از",
  headerFilterOperatorOnOrBefore: "در یا قبل از",
  headerFilterOperatorIsEmpty: "خالی باشد",
  headerFilterOperatorIsNotEmpty: "خالی نباشد",
  headerFilterOperatorIsAnyOf: "هر کدام از",
  "headerFilterOperator=": "برابر باشد",
  "headerFilterOperator!=": "برابر نباشد",
  "headerFilterOperator>": "بزرگتر از",
  "headerFilterOperator>=": "بزرگتر یا مساوی",
  "headerFilterOperator<": "کوچکتر از",
  "headerFilterOperator<=": "کوچکتر یا مساوی",
  headerFilterClear: "حذف فیلتر",

  // Filter values
  filterValueAny: "هر کدام",
  filterValueTrue: "بله",
  filterValueFalse: "خیر",

  // Column menu
  columnMenuLabel: "منو",
  columnMenuAriaLabel: (columnName: string) => `منوی ستون ${columnName}`,
  columnMenuShowColumns: "نمایش ستون‌ها",
  columnMenuManageColumns: "مدیریت ستون‌ها",
  columnMenuFilter: "فیلتر",
  columnMenuHideColumn: "پنهان کردن ستون",
  columnMenuUnsort: "حذف مرتب‌سازی",
  columnMenuSortAsc: "مرتب‌سازی صعودی",
  columnMenuSortDesc: "مرتب‌سازی نزولی",
  columnMenuManagePivot: "مدیریت پیوت",

  // Column header
  columnHeaderFiltersTooltipActive: (count) =>
    count !== 1 ? `${count} فیلتر فعال` : `${count} فیلتر فعال`,
  columnHeaderFiltersLabel: "نمایش فیلترها",
  columnHeaderSortIconLabel: "مرتب‌سازی",

  // Rows selected footer
  footerRowSelected: (count) =>
    count !== 1
      ? `${count.toLocaleString()} سطر انتخاب شده`
      : `${count.toLocaleString()} سطر انتخاب شده`,

  // Total row amount
  footerTotalRows: "تعداد کل سطرها:",

  // Total visible rows
  footerTotalVisibleRows: (visibleCount, totalCount) =>
    `${visibleCount.toLocaleString()} از ${totalCount.toLocaleString()}`,

  // Checkbox selection
  checkboxSelectionHeaderName: "انتخاب با چک‌باکس",
  checkboxSelectionSelectAllRows: "انتخاب همه سطرها",
  checkboxSelectionUnselectAllRows: "لغو انتخاب همه سطرها",
  checkboxSelectionSelectRow: "انتخاب سطر",
  checkboxSelectionUnselectRow: "لغو انتخاب سطر",

  // Boolean cell
  booleanCellTrueLabel: "بله",
  booleanCellFalseLabel: "خیر",

  // Actions cell
  actionsCellMore: "بیشتر",

  // Column pinning
  pinToLeft: "سنجاق به چپ",
  pinToRight: "سنجاق به راست",
  unpin: "برداشتن سنجاق",

  // Tree Data
  treeDataGroupingHeaderName: "گروه‌بندی",
  treeDataExpand: "نمایش فرزندان",
  treeDataCollapse: "پنهان کردن فرزندان",

  // Grouping columns
  groupingColumnHeaderName: "گروه",
  groupColumn: (name) => `گروه‌بندی بر اساس ${name}`,
  unGroupColumn: (name) => `لغو گروه‌بندی ${name}`,

  // Master/detail
  detailPanelToggle: "نمایش جزئیات",
  expandDetailPanel: "باز کردن",
  collapseDetailPanel: "بستن",

  // Pagination
  paginationRowsPerPage: "سطر در هر صفحه:",
  paginationDisplayedRows: ({ from, to, count }) =>
    `${from}–${to} از ${count !== -1 ? count : `بیشتر از ${to}`}`,
  paginationItemAriaLabel: (type) => {
    if (type === "first") return "رفتن به اولین صفحه";
    if (type === "last") return "رفتن به آخرین صفحه";
    if (type === "next") return "رفتن به صفحه بعد";
    return "رفتن به صفحه قبل";
  },

  // Row reordering
  rowReorderingHeaderName: "تغییر ترتیب سطر",

  // Aggregation
  aggregationMenuItemHeader: "تجمیع",
  aggregationFunctionLabelSum: "جمع",
  aggregationFunctionLabelAvg: "میانگین",
  aggregationFunctionLabelMin: "کمترین",
  aggregationFunctionLabelMax: "بیشترین",
  aggregationFunctionLabelSize: "تعداد",

  // Pivot panel
  pivotToggleLabel: "پیوت",
  pivotRows: "ردیف‌ها",
  pivotColumns: "ستون‌ها",
  pivotValues: "مقادیر",
  pivotCloseButton: "بستن تنظیمات پیوت",
  pivotSearchButton: "جستجوی فیلدها",
  pivotSearchControlPlaceholder: "جستجوی فیلدها",
  pivotSearchControlLabel: "جستجوی فیلدها",
  pivotSearchControlClear: "پاک کردن جستجو",
  pivotNoFields: "هیچ فیلدی وجود ندارد",
  pivotMenuMoveUp: "انتقال به بالا",
  pivotMenuMoveDown: "انتقال به پایین",
  pivotMenuMoveToTop: "انتقال به ابتدای لیست",
  pivotMenuMoveToBottom: "انتقال به انتهای لیست",
  pivotMenuRows: "ردیف‌ها",
  pivotMenuColumns: "ستون‌ها",
  pivotMenuValues: "مقادیر",
  pivotMenuOptions: "تنظیمات فیلد",
  pivotMenuAddToRows: "افزودن به ردیف‌ها",
  pivotMenuAddToColumns: "افزودن به ستون‌ها",
  pivotMenuAddToValues: "افزودن به مقادیر",
  pivotMenuRemove: "حذف",
  pivotDragToRows: "کشیدن به اینجا برای ایجاد ردیف",
  pivotDragToColumns: "کشیدن به اینجا برای ایجاد ستون",
  pivotDragToValues: "کشیدن به اینجا برای ایجاد مقدار",
  pivotYearColumnHeaderName: "(سال)",
  pivotQuarterColumnHeaderName: "(سه‌ماهه)",

  // AI Assistant panel
  aiAssistantPanelTitle: "دستیار هوش مصنوعی",
  aiAssistantPanelClose: "بستن",
  aiAssistantPanelNewConversation: "گفتگوی جدید",
  aiAssistantPanelConversationHistory: "تاریخچه گفتگو",
  aiAssistantPanelEmptyConversation: "هیچ تاریخچه‌ای وجود ندارد",
  aiAssistantSuggestions: "پیشنهادات",

  // Prompt field
  promptFieldLabel: "دستور",
  promptFieldPlaceholder: "یک دستور تایپ کنید…",
  promptFieldPlaceholderWithRecording: "تایپ یا ضبط یک دستور…",
  promptFieldPlaceholderListening: "در حال گوش دادن…",
  promptFieldSpeechRecognitionNotSupported:
    "تشخیص صدا در این مرورگر پشتیبانی نمی‌شود",
  promptFieldSend: "ارسال",
  promptFieldRecord: "ضبط",
  promptFieldStopRecording: "توقف ضبط",

  // Prompt
  promptRerun: "اجرای مجدد",
  promptProcessing: "در حال پردازش…",
  promptAppliedChanges: "تغییرات اعمال شد",

  // Prompt changes
  promptChangeGroupDescription: (column) => `گروه‌بندی بر اساس ${column}`,
  promptChangeAggregationLabel: (column, aggregation) =>
    `${column} (${aggregation})`,
  promptChangeAggregationDescription: (column, aggregation) =>
    `تجمیع ${column} (${aggregation})`,
  promptChangeFilterLabel: (column, operator, value) =>
    operator === "is any of"
      ? `${column} شامل هر یک از: ${value}`
      : `${column} ${operator} ${value}`,
  promptChangeFilterDescription: (column, operator, value) =>
    operator === "is any of"
      ? `فیلتر جایی که ${column} شامل هر یک از: ${value} باشد`
      : `فیلتر جایی که ${column} ${operator} ${value} باشد`,
  promptChangeSortDescription: (column, direction) =>
    `مرتب‌سازی بر اساس ${column} (${direction})`,
  promptChangePivotEnableLabel: "پیوت",
  promptChangePivotEnableDescription: "فعال کردن پیوت",
  promptChangePivotColumnsLabel: (count) => `ستون‌ها (${count})`,
  promptChangePivotColumnsDescription: (column, direction) =>
    `${column}${direction ? ` (${direction})` : ""}`,
  promptChangePivotRowsLabel: (count) => `ردیف‌ها (${count})`,
  promptChangePivotValuesLabel: (count) => `مقادیر (${count})`,
  promptChangePivotValuesDescription: (column, aggregation) =>
    `${column} (${aggregation})`,
};
