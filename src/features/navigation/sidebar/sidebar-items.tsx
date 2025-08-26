import {
  ShoppingBag,
  Forklift,
  Mail,
  MessageSquare,
  Calendar,
  Kanban,
  ReceiptText,
  Users,
  Lock,
  Fingerprint,
  SquareArrowUpRight,
  LayoutDashboard,
  ChartBar,
  Banknote,
  Gauge,
  GraduationCap,
  type LucideIcon,
  FileCheck,
  FileAxis3D,
  Files,
  OctagonAlert,
} from "lucide-react";

export interface NavSubItem {
  title: string;
  url: string;
  icon?: LucideIcon;
  comingSoon?: boolean;
  newTab?: boolean;
  isNew?: boolean;
}

export interface NavMainItem {
  title: string;
  url: string;
  icon?: LucideIcon;
  subItems?: NavSubItem[];
  comingSoon?: boolean;
  newTab?: boolean;
  isNew?: boolean;
}

export interface NavGroup {
  id: number;
  label?: string;
  items: NavMainItem[];
}

export const sidebarItems: NavGroup[] = [
  {
    id: 1,
    label: "Dashboards",
    items: [
      {
        title: "Contractor",
        url: "/contractor",
        icon: LayoutDashboard,
      },
      {
        title: "CRM",
        url: "/crm",
        icon: ChartBar,
      },
      {
        title: "Finance",
        url: "/finance",
        icon: Banknote,
      },
      {
        title: "Analytics",
        url: "/analytics",
        icon: Gauge,
        comingSoon: true,
      },
      {
        title: "Logistics",
        url: "/logistics",
        icon: Forklift,
        comingSoon: true,
      },
    ],
  },
  {
    id: 2,
    label: "Pages",
    items: [
      {
        title: "Requests",
        url: "/requests",
        icon: FileAxis3D,
      },
      {
        title: "Approvals",
        url: "/approvals",
        icon: FileCheck,
      },
      {
        title: "Documents",
        url: "/documents",
        icon: Files,
      },
      {
        title: "Complaints",
        url: "/complaints",
        icon: OctagonAlert,
        comingSoon: true,
      },
      {
        title: "Email",
        url: "/mail",
        icon: Mail,
        comingSoon: true,
      },
      {
        title: "Chat",
        url: "/chat",
        icon: MessageSquare,
        comingSoon: true,
      },
      {
        title: "Calendar",
        url: "/calendar",
        icon: Calendar,
        comingSoon: true,
      },
      {
        title: "Kanban",
        url: "/kanban",
        icon: Kanban,
        comingSoon: true,
      },
      {
        title: "Invoice",
        url: "/invoice",
        icon: ReceiptText,
        comingSoon: true,
      },
      {
        title: "Users",
        url: "/users",
        icon: Users,
        comingSoon: true,
      },
      {
        title: "Roles",
        url: "/roles",
        icon: Lock,
        comingSoon: true,
      },
    ],
  },
];