/*
 * @Author: Quarter
 * @Date: 2020-07-16 09:35:29
 * @LastEditors: Quarter
 * @LastEditTime: 2022-07-06 10:43:02
 * @Description: 全局注册自定义UI组件
 */

import { IconPlugin, IconfontPlugin } from "@quarter/simple-icons";
import Vue, { PluginObject } from "vue";
import { ANIMATION_INDEX_DB } from "./constants";
import "@quarter/simple-icons/lib/style.css";
import "./styles";

import AvatarPlugin from "./avatar";
import BacktopPlugin from "./backtop";
import BadgePlugin from "./badge";
import BarPlugin from "./bar";
import ButtonPlugin from "./button";
import CheckboxPlugin from "./checkbox";
import CoolButtonPlugin from "./cool-button";
import DatePickerPlugin from "./date-picker";
import DateTimePickerPlugin from "./date-time-picker";
import DialogPlugin from "./dialog";
import FileButtonPlugin from "./file-button";
import FormPlugin from "./form";
import ImagePlugin from "./image";
import ImagePickerPlugin from "./image-picker";
import InputPlugin from "./input";
import LoadingPlugin from "./loading";
import MessagePlugin from "./message";
import PaginationPlugin from "./pagination";
import PasswordStrengthPlugin from "./password-strength";
import PathPlugin from "./path";
import PopoverPlugin from "./popover";
import PreviewPlugin from "./preview";
import RadioPlugin from "./radio";
import ScrollPlugin from "./scroll";
import SelectePlugin from "./select";
import StepBarPlugin from "./step-bar";
import StickyPlugin from "./sticky";
import SwitchPlugin from "./switch";
import TabPlugin from "./tab";
import TablePlugin from "./table";
import TagPlugin from "./tag";
import TextareaPlugin from "./textarea";
import TimePickerPlugin from "./time-picker";
import TipPlugin from "./tip";
import TransitionPlugin from "./transition";
import TreePlugin from "./tree";
import TreeSelectPlugin from "./tree-select";
import VerificationCodePlugin from "./verification-code";
import WaterMarkPlugin from "./water-mark";

const plugin: PluginObject<object> = {
  install: (vue: typeof Vue): void => {
    AvatarPlugin.install(vue);
    BacktopPlugin.install(vue);
    BadgePlugin.install(vue);
    BarPlugin.install(vue);
    ButtonPlugin.install(vue);
    CheckboxPlugin.install(vue);
    CoolButtonPlugin.install(vue);
    DatePickerPlugin.install(vue);
    DateTimePickerPlugin.install(vue);
    DialogPlugin.install(vue);
    FileButtonPlugin.install(vue);
    FormPlugin.install(vue);
    IconPlugin.install(vue);
    IconfontPlugin.install(vue);
    ImagePlugin.install(vue);
    ImagePickerPlugin.install(vue);
    InputPlugin.install(vue);
    LoadingPlugin.install(vue);
    MessagePlugin.install(vue);
    PaginationPlugin.install(vue);
    PasswordStrengthPlugin.install(vue);
    PathPlugin.install(vue);
    PopoverPlugin.install(vue);
    PreviewPlugin.install(vue);
    RadioPlugin.install(vue);
    ScrollPlugin.install(vue);
    SelectePlugin.install(vue);
    StepBarPlugin.install(vue);
    StickyPlugin.install(vue);
    SwitchPlugin.install(vue);
    TabPlugin.install(vue);
    TablePlugin.install(vue);
    TagPlugin.install(vue);
    TextareaPlugin.install(vue);
    TimePickerPlugin.install(vue);
    TipPlugin.install(vue);
    TransitionPlugin.install(vue);
    TreePlugin.install(vue);
    TreeSelectPlugin.install(vue);
    VerificationCodePlugin.install(vue);
    WaterMarkPlugin.install(vue);

    Reflect.set(window, ANIMATION_INDEX_DB, {});
  },
};

export default plugin;

export * from "./types";

export * from "./avatar";
export * from "./backtop";
export * from "./badge";
export * from "./bar";
export * from "./button";
export * from "./checkbox";
export * from "./cool-button";
export * from "./date-picker";
export * from "./date-time-picker";
export * from "./dialog";
export * from "./file-button";
export * from "./form";
export * from "./image";
export * from "./image-picker";
export * from "./input";
export * from "./loading";
export * from "./message";
export * from "./pagination";
export * from "./password-strength";
export * from "./path";
export * from "./popover";
export * from "./preview";
export * from "./radio";
export * from "./scroll";
export * from "./select";
export * from "./step-bar";
export * from "./sticky";
export * from "./switch";
export * from "./tab";
export * from "./table";
export * from "./tag";
export * from "./textarea";
export * from "./time-picker";
export * from "./tip";
export * from "./transition";
export * from "./tree";
export * from "./tree-select";
export * from "./util";
export * from "./verification-code";
export * from "./water-mark";
