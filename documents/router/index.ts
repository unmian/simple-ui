/*
 * @Author: Quarter
 * @Date: 2020-07-13 09:19:17
 * @LastEditors: Quarter
 * @LastEditTime: 2022-03-10 05:30:14
 * @Description: 路由配置文件
 */

import Vue from "vue";
import VueRouter, { RawLocation, Route, RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  {
    path: "/",
    name: "Root",
    redirect: {
      name: "Tool",
    },
    component: () => import("/documents/components/CommonFramework.vue"),
    children: [
      {
        path: "tool",
        name: "Tool",
        redirect: {
          name: "EscapeDocument",
        },
        component: () => import("/documents/components/CommonRouter.vue"),
        children: [
          {
            path: "escape",
            name: "EscapeDocument",
            component: () => import("/documents/views/EscapeDocument.vue"),
          },
        ],
      },
      {
        path: "base",
        name: "BaseSimpleUI",
        redirect: {
          name: "AvatarDocument",
        },
        component: () => import("/documents/components/CommonRouter.vue"),
        children: [
          {
            path: "icon",
            name: "IconDocument",
            component: () => import("/documents/views/IconDocument.vue"),
          },
          {
            path: "avatar",
            name: "AvatarDocument",
            component: () => import("/documents/views/AvatarDocument.vue"),
          },
          {
            path: "bar",
            name: "BarDocument",
            component: () => import("/documents/views/BarDocument.vue"),
          },
          {
            path: "desc",
            name: "DescDocument",
            component: () => import("/documents/views/DescDocument.vue"),
          },
          {
            path: "tag",
            name: "TagDocument",
            component: () => import("/documents/views/TagDocument.vue"),
          },
          {
            path: "path",
            name: "PathDocument",
            component: () => import("/documents/views/PathDocument.vue"),
          },
          {
            path: "card",
            name: "CardDocument",
            component: () => import("/documents/views/CardDocument.vue"),
          },
          {
            path: "tip",
            name: "TipDocument",
            component: () => import("/documents/views/TipDocument.vue"),
          },
          {
            path: "badge",
            name: "BadgeDocument",
            component: () => import("/documents/views/BadgeDocument.vue"),
          },
          {
            path: "message",
            name: "MessageDocument",
            component: () => import("/documents/views/MessageDocument.vue"),
          },
          {
            path: "step",
            name: "StepDocument",
            component: () => import("/documents/views/StepDocument.vue"),
          },
          {
            path: "popover",
            name: "PopoverDocument",
            component: () => import("/documents/views/PopoverDocument.vue"),
          },
          {
            path: "image",
            name: "ImageDocument",
            component: () => import("/documents/views/ImageDocument.vue"),
          },
          {
            path: "preview",
            name: "PreviewDocument",
            component: () => import("/documents/views/PreviewDocument.vue"),
          },
          {
            path: "water-mark",
            name: "WaterMarkDocument",
            component: () => import("/documents/views/WaterMarkDocument.vue"),
          },
        ],
      },
      {
        path: "form",
        name: "FormSimpleUI",
        redirect: {
          name: "ButtonDocument",
        },
        component: () => import("/documents/components/CommonRouter.vue"),
        children: [
          {
            path: "button",
            name: "ButtonDocument",
            component: () => import("/documents/views/ButtonDocument.vue"),
          },
          {
            path: "cool-button",
            name: "CoolButtonDocument",
            component: () => import("/documents/views/CoolButtonDocument.vue"),
          },
          {
            path: "verification-code",
            name: "VerificationCodeDocument",
            component: () => import("/documents/views/VerificationCodeDocument.vue"),
          },
          {
            path: "radio",
            name: "RadioDocument",
            component: () => import("/documents/views/RadioDocument.vue"),
          },
          {
            path: "checkbox",
            name: "CheckboxDocument",
            component: () => import("/documents/views/CheckboxDocument.vue"),
          },
          {
            path: "switch",
            name: "SwitchDocument",
            component: () => import("/documents/views/SwitchDocument.vue"),
          },
          {
            path: "select",
            name: "SelectDocument",
            component: () => import("/documents/views/SelectDocument.vue"),
          },
          {
            path: "tree-select",
            name: "TreeSelectDocument",
            component: () => import("/documents/views/TreeSelectDocument.vue"),
          },
          {
            path: "input",
            name: "InputDocument",
            component: () => import("/documents/views/InputDocument.vue"),
          },
          {
            path: "textarea",
            name: "TextareaDocument",
            component: () => import("/documents/views/TextareaDocument.vue"),
          },
          {
            path: "date-picker",
            name: "DatePickerDocument",
            component: () => import("/documents/views/DatePickerDocument.vue"),
          },
          {
            path: "time-picker",
            name: "TimePickerDocument",
            component: () => import("/documents/views/TimePickerDocument.vue"),
          },
          {
            path: "date-time-picker",
            name: "DateTimePickerDocument",
            component: () => import("/documents/views/DateTimePickerDocument.vue"),
          },
          {
            path: "image-picker",
            name: "ImagePickerDocument",
            component: () => import("/documents/views/ImagePickerDocument.vue"),
          },
          {
            path: "file-button",
            name: "FileButtonDocument",
            component: () => import("/documents/views/FileButtonDocument.vue"),
          },
          {
            path: "password-strength",
            name: "PasswordStrengthDocument",
            component: () => import("/documents/views/PasswordStrengthDocument.vue"),
          },
          {
            path: "tree",
            name: "TreeDocument",
            component: () => import("/documents/views/TreeDocument.vue"),
          },
          {
            path: "form",
            name: "FormDocument",
            component: () => import("/documents/views/FormDocument.vue"),
          },
        ],
      },
      {
        path: "page",
        name: "PageSimpleUI",
        redirect: {
          name: "TabDocument",
        },
        component: () => import("/documents/components/CommonRouter.vue"),
        children: [
          {
            path: "tab",
            name: "TabDocument",
            component: () => import("/documents/views/TabDocument.vue"),
          },
          {
            path: "dialog",
            name: "DialogDocument",
            component: () => import("/documents/views/DialogDocument.vue"),
          },
          {
            path: "table",
            name: "TableDocument",
            component: () => import("/documents/views/TableDocument.vue"),
          },
          {
            path: "pagination",
            name: "PaginationDocument",
            component: () => import("/documents/views/PaginationDocument.vue"),
          },
          {
            path: "scroll",
            name: "ScrollDocument",
            component: () => import("/documents/views/ScrollDocument.vue"),
          },
          {
            path: "sticky",
            name: "StickyDocument",
            component: () => import("/documents/views/StickyDocument.vue"),
          },
          {
            path: "backtop",
            name: "BacktopDocument",
            component: () => import("/documents/views/BacktopDocument.vue"),
          },
        ],
      },
      {
        path: "transition",
        name: "TransitionSimpleUI",
        redirect: {
          name: "CollapseDocument",
        },
        component: () => import("/documents/components/CommonRouter.vue"),
        children: [
          {
            path: "collapse",
            name: "CollapseDocument",
            component: () => import("/documents/views/CollapseDocument.vue"),
          },
          {
            path: "scale",
            name: "ScaleDocument",
            component: () => import("/documents/views/ScaleDocument.vue"),
          },
          {
            path: "fade",
            name: "FadeDocument",
            component: () => import("/documents/views/FadeDocument.vue"),
          },
        ],
      },
    ],
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
