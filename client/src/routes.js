/*!

=========================================================
* Material Dashboard React - v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
// import Unarchive from "@material-ui/icons/Unarchive";
// import Language from "@material-ui/icons/Language";
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
import UserProfile from "views/UserProfile/UserProfile.js";
// import TableList from "views/TableList/TableList.js";
import CouponList from "views/TableList/CouponList.js";
import CoffeeList from "views/TableList/CoffeeList.js";
import SpaceList from "views/TableList/SpaceList.js";
import SpaceForm from "views/Forms/SpaceForm.js";
import Typography from "views/Typography/Typography.js";
import Icons from "views/Icons/Icons.js";
import Maps from "views/Maps/Maps.js";
import NotificationsPage from "views/Notifications/Notifications.js";
// import UpgradeToPro from "views/UpgradeToPro/UpgradeToPro.js";
// core components/views for RTL layout
// import RTLPage from "views/RTLPage/RTLPage.js";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "현황판",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin"
  },
  {
    path: "/user",
    name: "User Profile",
    rtlName: "사용자 정보",
    icon: Person,
    component: UserProfile,
    layout: "/admin"
  },
  {
    path: "/coupon",
    name: "Coupon Management",
    rtlName: "쿠폰 관리",
    icon: "content_paste",
    component: CouponList,
    layout: "/admin"
  },
  {
    path: "/coffee",
    name: "Coffee List",
    rtlName: "카페 리스트",
    icon: "content_paste",
    component: CoffeeList,
    layout: "/admin"
  },
  {
    path: "/space",
    name: "Space Management",
    rtlName: "공간 관리",
    icon: "content_paste",
    component: SpaceList,
    layout: "/admin"
  },
  {
    path: "/form",
    name: "Add Space",
    rtlName: "공간 추가",
    icon: LibraryBooks,
    component: SpaceForm,
    layout: "/admin"
  },
  {
    path: "/typography",
    name: "Typography",
    rtlName: "글꼴",
    icon: LibraryBooks,
    component: Typography,
    layout: "/admin"
  },
  {
    path: "/icons",
    name: "Icons",
    rtlName: "아이콘",
    icon: BubbleChart,
    component: Icons,
    layout: "/admin"
  },
  {
    path: "/maps",
    name: "Maps",
    rtlName: "지도",
    icon: LocationOn,
    component: Maps,
    layout: "/admin"
  },
  {
    path: "/notifications",
    name: "Notifications",
    rtlName: "알림",
    icon: Notifications,
    component: NotificationsPage,
    layout: "/admin"
  }
  // {
  //   path: "/rtl-page",
  //   name: "RTL Support",
  //   rtlName: "언어",
  //   icon: Language,
  //   component: RTLPage,
  //   layout: "/rtl"
  // },
  // {
  //   path: "/upgrade-to-pro",
  //   name: "Upgrade To PRO",
  //   rtlName: "업그레이드",
  //   icon: Unarchive,
  //   component: UpgradeToPro,
  //   layout: "/admin"
  // }
];

export default dashboardRoutes;
