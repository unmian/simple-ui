/*
 * @Author: Quarter
 * @Date: 2020-07-13 09:19:17
 * @LastEditors: Quarter
 * @LastEditTime: 2022-07-08 09:42:05
 * @Description: 路由配置文件
 */

import VueRouter, { RawLocation, Route, RouteConfig } from "vue-router";
import { Component, Vue } from "vue-property-decorator";

Component.registerHooks([
  "beforeRouteEnter", // 进入路由之前
  "beforeRouteLeave", // 离开路由之前
  "beforeRouteUpdate", // 路由更新之前
]);

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  {
    path: "/",
    name: "Root",
    redirect: {
      name: "Tool",
    },
    component: () => import("documents/views/framework/common-framework/index.vue"),
    children: [
      {
        path: "tool",
        name: "Tool",
        redirect: {
          name: "EscapeDocument",
        },
        component: () => import("documents/views/framework/common-router/index.vue"),
        children: [
          {
            path: "escape",
            name: "EscapeDocument",
            component: () => import("documents/views/document/escape/index.vue"),
          },
        ],
      },
      {
        path: "global",
        name: "Global",
        redirect: {
          name: "GlobalColor",
        },
        component: () => import("documents/views/framework/common-router/index.vue"),
        children: [
          {
            path: "color",
            name: "GlobalColor",
            component: () => import("documents/views/document/color/index.vue"),
          },
          {
            path: "text",
            name: "GlobalText",
            component: () => import("documents/views/document/text/index.vue"),
          },
        ],
      },
      {
        path: "base",
        name: "BaseSimpleUI",
        redirect: {
          name: "AvatarDocument",
        },
        component: () => import("documents/views/framework/common-router/index.vue"),
        children: [
          {
            path: "icon",
            name: "IconDocument",
            component: () => import("documents/views/document/icon/index.vue"),
          },
          {
            path: "button",
            name: "ButtonDocument",
            component: () => import("documents/views/document/button/index.vue"),
          },
          {
            path: "avatar",
            name: "AvatarDocument",
            component: () => import("documents/views/document/avatar/index.vue"),
          },
          {
            path: "bar",
            name: "BarDocument",
            component: () => import("documents/views/document/BarDocument.vue"),
          },
          {
            path: "tag",
            name: "TagDocument",
            component: () => import("documents/views/document/TagDocument.vue"),
          },
          {
            path: "path",
            name: "PathDocument",
            component: () => import("documents/views/document/PathDocument.vue"),
          },
          {
            path: "tip",
            name: "TipDocument",
            component: () => import("documents/views/document/TipDocument.vue"),
          },
          {
            path: "badge",
            name: "BadgeDocument",
            component: () => import("documents/views/document/BadgeDocument.vue"),
          },
          {
            path: "step",
            name: "StepDocument",
            component: () => import("documents/views/document/StepDocument.vue"),
          },
          {
            path: "popover",
            name: "PopoverDocument",
            component: () => import("documents/views/document/PopoverDocument.vue"),
          },
          {
            path: "image",
            name: "ImageDocument",
            component: () => import("documents/views/document/ImageDocument.vue"),
          },
          {
            path: "preview",
            name: "PreviewDocument",
            component: () => import("documents/views/document/PreviewDocument.vue"),
          },
          {
            path: "water-mark",
            name: "WaterMarkDocument",
            component: () => import("documents/views/document/WaterMarkDocument.vue"),
          },
        ],
      },
      {
        path: "form",
        name: "FormSimpleUI",
        redirect: {
          name: "ButtonDocument",
        },
        component: () => import("documents/views/framework/common-router/index.vue"),
        children: [
          {
            path: "cool-button",
            name: "CoolButtonDocument",
            component: () => import("documents/views/document/CoolButtonDocument.vue"),
          },
          {
            path: "verification-code",
            name: "VerificationCodeDocument",
            component: () => import("documents/views/document/VerificationCodeDocument.vue"),
          },
          {
            path: "radio",
            name: "RadioDocument",
            component: () => import("documents/views/document/RadioDocument.vue"),
          },
          {
            path: "checkbox",
            name: "CheckboxDocument",
            component: () => import("documents/views/document/CheckboxDocument.vue"),
          },
          {
            path: "switch",
            name: "SwitchDocument",
            component: () => import("documents/views/document/SwitchDocument.vue"),
          },
          {
            path: "select",
            name: "SelectDocument",
            component: () => import("documents/views/document/SelectDocument.vue"),
          },
          {
            path: "tree-select",
            name: "TreeSelectDocument",
            component: () => import("documents/views/document/TreeSelectDocument.vue"),
          },
          {
            path: "input",
            name: "InputDocument",
            component: () => import("documents/views/document/InputDocument.vue"),
          },
          {
            path: "textarea",
            name: "TextareaDocument",
            component: () => import("documents/views/document/TextareaDocument.vue"),
          },
          {
            path: "date-picker",
            name: "DatePickerDocument",
            component: () => import("documents/views/document/DatePickerDocument.vue"),
          },
          {
            path: "time-picker",
            name: "TimePickerDocument",
            component: () => import("documents/views/document/TimePickerDocument.vue"),
          },
          {
            path: "date-time-picker",
            name: "DateTimePickerDocument",
            component: () => import("documents/views/document/DateTimePickerDocument.vue"),
          },
          {
            path: "image-picker",
            name: "ImagePickerDocument",
            component: () => import("documents/views/document/ImagePickerDocument.vue"),
          },
          {
            path: "file-button",
            name: "FileButtonDocument",
            component: () => import("documents/views/document/FileButtonDocument.vue"),
          },
          {
            path: "password-strength",
            name: "PasswordStrengthDocument",
            component: () => import("documents/views/document/PasswordStrengthDocument.vue"),
          },
          {
            path: "tree",
            name: "TreeDocument",
            component: () => import("documents/views/document/TreeDocument.vue"),
          },
          {
            path: "form",
            name: "FormDocument",
            component: () => import("documents/views/document/FormDocument.vue"),
          },
        ],
      },
      {
        path: "page",
        name: "PageSimpleUI",
        redirect: {
          name: "TabDocument",
        },
        component: () => import("documents/views/framework/common-router/index.vue"),
        children: [
          {
            path: "tab",
            name: "TabDocument",
            component: () => import("documents/views/document/TabDocument.vue"),
          },
          {
            path: "table",
            name: "TableDocument",
            component: () => import("documents/views/document/TableDocument.vue"),
          },
          {
            path: "pagination",
            name: "PaginationDocument",
            component: () => import("documents/views/document/PaginationDocument.vue"),
          },
          {
            path: "scroll",
            name: "ScrollDocument",
            component: () => import("documents/views/document/ScrollDocument.vue"),
          },
          {
            path: "sticky",
            name: "StickyDocument",
            component: () => import("documents/views/document/StickyDocument.vue"),
          },
          {
            path: "backtop",
            name: "BacktopDocument",
            component: () => import("documents/views/document/backtop/index.vue"),
          },
        ],
      },
      {
        path: "notification",
        redirect: {
          name: "CollapseDocument",
        },
        component: () => import("documents/views/framework/common-router/index.vue"),
        children: [
          {
            path: "alert",
            name: "AlertDocument",
            component: () => import("documents/views/document/CollapseDocument.vue"),
          },
          {
            path: "dialog",
            name: "DialogDocument",
            component: () => import("documents/views/document/DialogDocument.vue"),
          },
          {
            path: "drawer",
            name: "DrawerDocument",
            component: () => import("documents/views/document/DialogDocument.vue"),
          },
          {
            path: "message",
            name: "MessageDocument",
            component: () => import("documents/views/document/message/index.vue"),
          },
          {
            path: "notification",
            name: "NotificationDocument",
            component: () => import("documents/views/document/FadeDocument.vue"),
          },
        ],
      },
      {
        path: "transition",
        redirect: {
          name: "CollapseDocument",
        },
        component: () => import("documents/views/framework/common-router/index.vue"),
        children: [
          {
            path: "collapse",
            name: "CollapseDocument",
            component: () => import("documents/views/document/CollapseDocument.vue"),
          },
          {
            path: "scale",
            name: "ScaleDocument",
            component: () => import("documents/views/document/ScaleDocument.vue"),
          },
          {
            path: "fade",
            name: "FadeDocument",
            component: () => import("documents/views/document/FadeDocument.vue"),
          },
        ],
      },
    ],
  },
  {
    path: "*",
    name: "unknown",
    redirect: {
      path: "/",
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: "/",
  routes,
});

// 修复地址多次访问的异常问题
type RouterPush = (location: RawLocation) => Promise<Route>;
const originalPush: RouterPush = VueRouter.prototype.push;
VueRouter.prototype.push = function (location: RawLocation) {
  const routePromise: Promise<Route> = originalPush.call(this, location).catch((err) => err);
  return routePromise;
};

export default router;
