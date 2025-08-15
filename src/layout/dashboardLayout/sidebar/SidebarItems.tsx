import DashboardIcon from "@mui/icons-material/Dashboard";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import BarChartIcon from "@mui/icons-material/BarChart";
// import DescriptionIcon from "@mui/icons-material/Description";
// import LayersIcon from "@mui/icons-material/Layers";

// Sidebar Items
export interface SidebarItem {
  kind: "header" | "item";
  title: string;
  icon?: JSX.Element;
  href?: string;
  children?: SidebarItem[];
}
// const ReportItems: SidebarItem[] = [
//   {
//     kind: "item",
//     title: "Sales",
//     icon: <DescriptionIcon />,
//   },
//   {
//     kind: "item",
//     title: "Traffic",
//     icon: <DescriptionIcon />,
//   },
// ];

export const Items: SidebarItem[][] = [
  [
    { kind: "header", title: "سرویس‌ها" },
    { kind: "item", title: "اتوماسیون اداری", icon: <DashboardIcon />, href: "/" },
    // { kind: "item", title: "Orders", icon: <ShoppingCartIcon /> },
  ],
  // [
  //   { kind: "header", title: "Analytics" },
  //   {
  //     kind: "item",
  //     title: "Reports",
  //     icon: <BarChartIcon />,
  //     children: ReportItems,
  //   },
  //   { kind: "item", title: "Integerations", icon: <LayersIcon /> },
  // ],
];
