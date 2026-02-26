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
    id: 6,
    title: "Trang",
    newTab: false,
    path: "/",
    submenu: [
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
        id: 69,
        title: "Tài khoản",
        newTab: false,
        path: "/my-account",
      },


    ],
  },

  {
    id: 8,
    title: "Công nghệ AI",
    newTab: false,
    path: "/ai-room-planner",
  },
];
