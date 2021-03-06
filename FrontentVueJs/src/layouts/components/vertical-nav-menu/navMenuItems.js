/*=========================================================================================
  File Name: sidebarItems.js
  Description: Sidebar Items list. Add / Remove menu items from here.
  Strucutre:
          url     => router path
          name    => name to display in sidebar
          slug    => router path name
          icon    => Feather Icon component/icon name
          tag     => text to display on badge
          tagColor  => class to apply on badge element
          i18n    => Internationalization
          submenu   => submenu of current item (current item will become dropdown )
                NOTE: Submenu don't have any icon(you can add icon if u want to display)
          isDisabled  => disable sidebar item/group
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/
let userType = localStorage.getItem('user-usertype')
console.log(userType);
let exportList = [
  // {
  //   url: "/apps/email",
  //   name: "Email",
  //   slug: "email",
  //   icon: "MailIcon",
  //   i18n: "Email",
  // },
  {
    url: '/home',
    name: "Home",
    tag: "",
    tagColor: "warning",
    icon: "HomeIcon",
    i18n: "Home"
  },
  {
    header: "Menu",
    icon: "PackageIcon",
    i18n: "Menu",
    items: [{
        url: null,
        name: "User",
        icon: "UserIcon",
        i18n: "User",
        submenu: [{
            url: "/apps/user/user-register",
            name: "Register",
            slug: "app-user-register",
            i18n: "Register"
          },
          {
            url: "/apps/user/user-list",
            name: "List",
            slug: "app-user-list",
            i18n: "List"
          }
        ]
      },
      {
        url: "/download",
        name: "Downloads",
        icon: "PackageIcon",
        slug: "app-user-download",
        i18n: "Downloads"
      },
      // {
      //   url: "/key/list-view",
      //   name: "Keys",
      //   icon: "LayoutIcon",
      //   // iconPack: 'feather',
      //   // position: 'top-center',
      //   // icon:'icon-email',
      //   slug: "data-list-list-view",
      //   i18n: "Keys"
      // }
    ]
  },
  {
    header: "Others",
    icon: "FileIcon",
    i18n: "Others",
    items: [{
        url: "/pages/user-settings",
        slug: "page-user-settings",
        name: "User Settings",
        icon: "SettingsIcon",
        i18n: "UserSettings"
      },
      // {
      //   url: "/pages/faq",
      //   slug: "page-faq",
      //   name: "FAQ",
      //   icon: "HelpCircleIcon",
      //   i18n: "FAQ"
      // }
      // ,{
      //   url: null,
      //   name: "Authentication",
      //   icon: "PieChartIcon",
      //   i18n: "Authentication",
      //   submenu: [
      //     {
      //       url: "/pages/login",
      //       name: "Login",
      //       slug: "pages-login",
      //       i18n: "Login",
      //       target: "_blank"
      //     },
      //     {
      //       url: "/pages/register",
      //       name: "Register",
      //       slug: "pages-register",
      //       i18n: "Register",
      //       target: "_blank"
      //     },
      //     {
      //       url: "/pages/forgot-password",
      //       name: "Forgot Password",
      //       slug: "pages-forgot-password",
      //       i18n: "ForgotPassword",
      //       target: "_blank"
      //     },
      //     {
      //       url: "/pages/reset-password",
      //       name: "Reset Password",
      //       slug: "pages-reset-password",
      //       i18n: "ResetPassword",
      //       target: "_blank"
      //     }
      //   ]
      // },
      // {
      //   url: null,
      //   name: "Miscellaneous",
      //   icon: "CoffeeIcon",
      //   i18n: "Miscellaneous",
      //   submenu: [
      //     {
      //       url: "/pages/not-authorized",
      //       name: "Not Authorized",
      //       slug: "page-not-authorized",
      //       icon: "XCircleIcon",
      //       i18n: "NotAuthorized",
      //       target: "_blank"
      //     },
      //     {
      //       url: "/pages/maintenance",
      //       name: "Maintenance",
      //       slug: "page-maintenance",
      //       icon: "AnchorIcon",
      //       i18n: "Maintenance",
      //       target: "_blank"
      //     },
      //     {
      //       url: "/pages/comingsoon",
      //       slug: "page-coming-soon",
      //       name: "Coming Soon",
      //       icon: "ClockIcon",
      //       i18n: "ComingSoon",
      //       target: "_blank"
      //     },
      //     {
      //       url: "/pages/error-404",
      //       name: "404",
      //       slug: "page-error-404",
      //       i18n: "404",
      //       target: "_blank"
      //     },
      //     {
      //       url: "/pages/error-500",
      //       name: "500",
      //       slug: "page-error-500",
      //       i18n: "500",
      //       target: "_blank"
      //     }
      //   ]
      // }
    ]
  }
  // ,{
  //   header: "Others",
  //   icon: "MoreHorizontalIcon",
  //   i18n: "Others",
  //   items: [
  //     {
  //       url: null,
  //       name: "Menu Levels",
  //       icon: "MenuIcon",
  //       i18n: "MenuLevels",
  //       submenu: [
  //         {
  //           url: null,
  //           name: "Menu Level 2.1",
  //           i18n: "MenuLevel2p1"
  //         },
  //         {
  //           url: null,
  //           name: "Menu Level 2.2",
  //           i18n: "MenuLevel2p2",
  //           submenu: [
  //             {
  //               url: null,
  //               name: "Menu Level 3.1",
  //               i18n: "MenuLevel3p1"
  //             },
  //             {
  //               url: null,
  //               name: "Menu Level 3.2",
  //               i18n: "MenuLevel3p2"
  //             }
  //           ]
  //         }
  //       ]
  //     },
  //     {
  //       url: null,
  //       name: "Disabled Menu",
  //       icon: "EyeOffIcon",
  //       i18n: "DisabledMenu",
  //       isDisabled: true
  //     },
  //     {
  //       url: null,
  //       name: "Support",
  //       icon: "SmileIcon",
  //       i18n: "Support",
  //       submenu: [
  //         {
  //           url:
  //             "https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/documentation/",
  //           name: "Documentation",
  //           icon: "BookOpenIcon",
  //           slug: "external",
  //           i18n: "Documentation",
  //           target: "_blank"
  //         },
  //         {
  //           url: "https://pixinvent.ticksy.com/",
  //           name: "Raise Support",
  //           icon: "LifeBuoyIcon",
  //           slug: "external",
  //           i18n: "RaiseSupport",
  //           target: "_blank"
  //         }
  //       ]
  //     }
  //   ]
  // }
];

if (localStorage.getItem('user-usertype') === 'admin' || localStorage.getItem('user-usertype') === 'partner') {
  exportList[1].items.push({
    url: "/key/list-view",
    name: "Keys",
    icon: "LayoutIcon",
    // iconPack: 'feather',
    // position: 'top-center',
    // icon:'icon-email',
    slug: "data-list-list-view",
    i18n: "Keys"
  })
  exportList[2].items.push({
    url: "/pages/faq",
    slug: "page-faq",
    name: "FAQ",
    icon: "HelpCircleIcon",
    i18n: "FAQ"
  })
}
if (localStorage.getItem('user-usertype') === 'admin' || localStorage.getItem('user-usertype') === 'customer' || localStorage.getItem('user-usertype') === 'user') {
  exportList[1].items.push(
    {
      url: "/requests",
      name: "Requests",
      icon: "LayoutIcon",
      // iconPack: 'feather',
      // position: 'top-center',
      // icon:'icon-email',
      slug: "data-list-list-view",
      i18n: "Requests"
    })
}

console.log(exportList)
export default exportList
