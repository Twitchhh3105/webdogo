import { Menu } from "@/types/Menu";

export const menuData: Menu[] = [
  {
    id: 1,
    title: "Trang chủ",
    newTab: false,
    path: "/",
  },
  {
    id: 2,
    title: "Cửa hàng",
    newTab: false,
    path: "/shop-with-sidebar",
  },
  {
    id: 3,
    title: "Liên hệ",
    newTab: false,
    path: "/contact",
  },
  {
    id: 6,
    title: "Trang",
    newTab: false,
    path: "/",
    submenu: [
      {
        id: 61,
        title: "Cửa hàng (Sidebar)",
        newTab: false,
        path: "/shop-with-sidebar",
      },
      {
        id: 62,
        title: "Cửa hàng (Full)",
        newTab: false,
        path: "/shop-without-sidebar",
      },
      {
        id: 64,
        title: "Thanh toán",
        newTab: false,
        path: "/checkout",
      },
      {
        id: 65,
        title: "Giỏ hàng",
        newTab: false,
        path: "/cart",
      },
      {
        id: 66,
        title: "Yêu thích",
        newTab: false,
        path: "/wishlist",
      },
      {
        id: 67,
        title: "Đăng nhập",
        newTab: false,
        path: "/signin",
      },
      {
        id: 68,
        title: "Đăng ký",
        newTab: false,
        path: "/signup",
      },
      {
        id: 69,
        title: "Tài khoản",
        newTab: false,
        path: "/my-account",
      },
      {
        id: 70,
        title: "Liên hệ",
        newTab: false,
        path: "/contact",
      },
      {
        id: 62,
        title: "Lỗi 404",
        newTab: false,
        path: "/error",
      },
    ],
  },
  {
    id: 7,
    title: "Tin tức",
    newTab: false,
    path: "/blogs/blog-grid",
    submenu: [
      {
        id: 71,
        title: "Tin tức (Lưới + Sidebar)",
        newTab: false,
        path: "/blogs/blog-grid-with-sidebar",
      },
      {
        id: 72,
        title: "Tin tức (Lưới)",
        newTab: false,
        path: "/blogs/blog-grid",
      },
    ],
  },
];
