/*
 * @Author: Quarter
 * @Date: 2020-07-14 14:12:30
 * @LastEditors: Quarter
 * @LastEditTime: 2022-11-14 18:05:34
 * @Description: 全局框架数据
 */
import menuList from "documents/assets/menus.json";
import { MenuItem } from "@unmian/simple-ui";

// 定义菜单项
const menus: MenuItem[] = menuList;

/**
 * @description: 通过路径锁定菜单
 * @param {Array<MenuItem>} menu 菜单内容
 * @param {String} path 路径地址
 * @return {Array<number>} 菜单下标数组
 */
const findMenuByPath: (menu: MenuItem[], path: string) => number[] = (
  menu: MenuItem[],
  path: string,
) => {
  if (Array.isArray(menu)) {
    for (let i = 0; i < menu.length; i++) {
      const item: MenuItem = menu[i];
      if (typeof item.path === "string") {
        const testRegExp = new RegExp(`^${  item.path}`);
        if (testRegExp.test(path) === true) {
          let result: number[] = [i];
          // eslint-disable-next-line max-depth
          if (Array.isArray(item.children)) {
            result = result.concat(findMenuByPath(item.children, path));
          }
          return result;
        }
      }
    }
  }
  return [];
};

export default {
  state: {
    __OBJECT_TYPE: "module",
    isPortal: true,
    loginDialog: false,
    activeMenuIndex: [0],
    menus,
    loading: 0,
  },
  mutations: {
    /**
     * @description: 切换菜单选中下标
     * @param {Number} index 菜单下标
     */
    switchMenu(state: any, indexArray: number[]) {
      if (Array.isArray(indexArray)) {
        const temp: number[] = [];
        indexArray.forEach((index: number) => {
          if (typeof index === "number") {
            temp.push(index);
          }
        });
        // eslint-disable-next-line no-param-reassign
        state.activeMenuIndex = temp;
      }
    },
    /**
     * @description: 通过路径切换菜单选中下标
     * @param {String} path 路径
     */
    switchMenuByPath(state: any, path: string) {
      const result: number[] = findMenuByPath(state.menus, path);
      // eslint-disable-next-line no-param-reassign
      state.activeMenuIndex = result;
    },
    /**
     * @description: 触发加载
     * @return
     */
    triggerLoading(state: any) {
      if (typeof state.loading === "number") {
        // eslint-disable-next-line no-param-reassign
        state.loading += 1;
      } else {
        // eslint-disable-next-line no-param-reassign
        state.loading = 0;
      }
    },
    /**
     * @description: 取消加载
     * @return
     */
    cancelLoading(state: any) {
      if (typeof state.loading === "number") {
        // eslint-disable-next-line no-param-reassign
        state.loading -= 1;
      } else {
        // eslint-disable-next-line no-param-reassign
        state.loading = 0;
      }
    },
    /**
     * @description: 显示未登录弹窗
     * @return
     */
    showLogin(state: any) {
      // eslint-disable-next-line no-param-reassign
      state.loginVisible = true;
    },
  },
  getters: {
    loading: (state: any): boolean => {
      if (typeof state.loading === "number" && state.loading > 0) {
        return true;
      }
      return false;
    },
    loginVisible: (state: any): boolean => {
      if (typeof state.loginVisible === "boolean") {
        return state.loginVisible;
      }
      return false;
    },
  },
  actions: {},
  modules: {},
};
