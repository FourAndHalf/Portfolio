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
  Network,
  MapPinned,
  Pickaxe,
  Users2,
  Code,
  BriefcaseBusiness,
  ShieldCheck,
  ChartCandlestick,
  BanknoteArrowUp,
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
        title: "Developer",
        url: "/developer",
        icon: Code,
      },
      {
        title: "CRM",
        url: "/crm",
        icon: ChartCandlestick,
      },
      {
        title: "Finance",
        url: "/finance",
        icon: BanknoteArrowUp,
      },
      {
        title: "Investments",
        url: "/investments",
        icon: Network,
      },
      ],
      },
      {
      id: 2,
      label: "Pages",
      items: [
      {
        title: "Experience",
        url: "/experience",
        icon: BriefcaseBusiness,
      },
      {
        title: "Works",
        url: "/works",
        icon: Pickaxe,
      },
      {
        title: "Certifications",
        url: "/certifications",
        icon: GraduationCap,
      },
      {
        title: "Journal",
        url: "/journal",
        icon: Files,
      },
      ],
      },
      ];