/*
 * @Author: Quarter
 * @Date: 2020-07-16 09:35:29
 * @LastEditors: Quarter
 * @LastEditTime: 2022-03-25 05:33:39
 * @Description: 全局注册自定义UI组件
 */
import Vue, { PluginObject, VueConstructor } from "vue";
import "./styles/simple-ui.scss";
import "./styles/simple-icon.scss";
import "./expand/date";
import { SimpleMessageCommand } from "./types";
import { ANIMATION_INDEX_DB } from "./constants";

import Emitter from "./mixins/emitter";
import CollapseTransition from "./components/CollapseTransition.vue";
import CollapseTransitionGroup from "./components/CollapseTransitionGroup.vue";
import FadeTransition from "./components/FadeTransition.vue";
import FadeTransitionGroup from "./components/FadeTransitionGroup.vue";
import ScaleTransition from "./components/ScaleTransition.vue";
import ScaleTransitionGroup from "./components/ScaleTransitionGroup.vue";
import SimpleAvatar from "./components/SimpleAvatar.vue";
import SimpleBacktop from "./components/SimpleBacktop.vue";
import SimpleBadge from "./components/SimpleBadge.vue";
import SimpleBar from "./components/SimpleBar.vue";
import SimpleButton from "./components/SimpleButton.vue";
import SimpleCard from "./components/SimpleCard.vue";
import SimpleCheckbox from "./components/SimpleCheckbox.vue";
import SimpleCheckboxButton from "./components/SimpleCheckboxButton.vue";
import SimpleCheckboxGroup from "./components/SimpleCheckboxGroup.vue";
import SimpleConditionTag from "./components/SimpleConditionTag.vue";
import SimpleCoolButton from "./components/SimpleCoolButton.vue";
import SimpleDatePicker from "./components/SimpleDatePicker.vue";
import SimpleDateRangerPicker from "./components/SimpleDateRangerPicker.vue";
import SimpleDateTimePicker from "./components/SimpleDateTimePicker.vue";
import SimpleDateTimeRangerPicker from "./components/SimpleDateTimeRangerPicker.vue";
import SimpleDesc from "./components/SimpleDesc.vue";
import SimpleDialog from "./components/SimpleDialog.vue";
import SimpleDialogBox from "./components/SimpleDialogBox.vue";
import SimpleFileButton from "./components/SimpleFileButton.vue";
import SimpleForm from "./components/SimpleForm.vue";
import SimpleFormItem from "./components/SimpleFormItem.vue";
import SimpleImage from "./components/SimpleImage.vue";
import SimpleImagePicker from "./components/SimpleImagePicker.vue";
import SimpleInput from "./components/SimpleInput.vue";
import SimpleMessage from "./components/SimpleMessage.vue";
import SimpleOption from "./components/SimpleOption.vue";
import SimplePagination from "./components/SimplePagination.vue";
import SimplePasswordStrength from "./components/SimplePasswordStrength.vue";
import SimplePath from "./components/SimplePath.vue";
import SimplePopover from "./components/SimplePopover.vue";
import SimplePreview from "./components/SimplePreview.vue";
import SimpleRadio from "./components/SimpleRadio.vue";
import SimpleRadioButton from "./components/SimpleRadioButton.vue";
import SimpleScroll from "./components/SimpleScroll.vue";
import SimpleSelect from "./components/SimpleSelect.vue";
import SimpleStepBar from "./components/SimpleStepBar.vue";
import SimpleSticky from "./components/SimpleSticky.vue";
import SimpleSwitch from "./components/SimpleSwitch.vue";
import SimpleTab from "./components/SimpleTab.vue";
import SimpleTable from "./components/SimpleTable.vue";
import SimpleTableColumn from "./components/SimpleTableColumn.vue";
import SimpleTag from "./components/SimpleTag.vue";
import SimpleTextarea from "./components/SimpleTextarea.vue";
import SimpleTimePicker from "./components/SimpleTimePicker.vue";
import SimpleTimeRangerPicker from "./components/SimpleTimeRangerPicker.vue";
import SimpleTip from "./components/SimpleTip.vue";
import SimpleTree from "./components/SimpleTree.vue";
import SimpleTreeSelect from "./components/SimpleTreeSelect.vue";
import SimpleVerificationCode from "./components/SimpleVerificationCode.vue";
import SimpleWaterMark from "./components/SimpleWaterMark.vue";

import MessageCommand from "./functions/message";

import "./directives/loading";

const Message: SimpleMessageCommand = MessageCommand as SimpleMessageCommand;

Reflect.set(window, ANIMATION_INDEX_DB, {});

export const SimpleUIPlugin: PluginObject<any> = {
  install: (vue: VueConstructor<Vue>): void => {
    vue.component("CollapseTransition", CollapseTransition);
    vue.component("CollapseTransitionGroup", CollapseTransitionGroup);
    vue.component("FadeTransition", FadeTransition);
    vue.component("FadeTransitionGroup", FadeTransitionGroup);
    vue.component("ScaleTransition", ScaleTransition);
    vue.component("ScaleTransitionGroup", ScaleTransitionGroup);
    vue.component("SimpleAvatar", SimpleAvatar);
    vue.component("SimpleBacktop", SimpleBacktop);
    vue.component("SimpleBadge", SimpleBadge);
    vue.component("SimpleBar", SimpleBar);
    vue.component("SimpleButton", SimpleButton);
    vue.component("SimpleCard", SimpleCard);
    vue.component("SimpleCheckbox", SimpleCheckbox);
    vue.component("SimpleCheckboxButton", SimpleCheckboxButton);
    vue.component("SimpleCheckboxGroup", SimpleCheckboxGroup);
    vue.component("SimpleConditionTag", SimpleConditionTag);
    vue.component("SimpleCoolButton", SimpleCoolButton);
    vue.component("SimpleDesc", SimpleDesc);
    vue.component("SimpleDatePicker", SimpleDatePicker);
    vue.component("SimpleDateRangerPicker", SimpleDateRangerPicker);
    vue.component("SimpleDateTimePicker", SimpleDateTimePicker);
    vue.component("SimpleDateTimeRangerPicker", SimpleDateTimeRangerPicker);
    vue.component("SimpleDialog", SimpleDialog);
    vue.component("SimpleDialogBox", SimpleDialogBox);
    vue.component("SimpleFileButton", SimpleFileButton);
    vue.component("SimpleForm", SimpleForm);
    vue.component("SimpleFormItem", SimpleFormItem);
    vue.component("SimpleImage", SimpleImage);
    vue.component("SimpleImagePicker", SimpleImagePicker);
    vue.component("SimpleInput", SimpleInput);
    vue.component("SimpleMessage", SimpleMessage);
    vue.component("SimpleOption", SimpleOption);
    vue.component("SimplePagination", SimplePagination);
    vue.component("SimplePasswordStrength", SimplePasswordStrength);
    vue.component("SimplePath", SimplePath);
    vue.component("SimplePopover", SimplePopover);
    vue.component("SimplePreview", SimplePreview);
    vue.component("SimpleRadio", SimpleRadio);
    vue.component("SimpleRadioButton", SimpleRadioButton);
    vue.component("SimpleScroll", SimpleScroll);
    vue.component("SimpleSelect", SimpleSelect);
    vue.component("SimpleStepBar", SimpleStepBar);
    vue.component("SimpleSticky", SimpleSticky);
    vue.component("SimpleSwitch", SimpleSwitch);
    vue.component("SimpleTab", SimpleTab);
    vue.component("SimpleTable", SimpleTable);
    vue.component("SimpleTableColumn", SimpleTableColumn);
    vue.component("SimpleTag", SimpleTag);
    vue.component("SimpleTextarea", SimpleTextarea);
    vue.component("SimpleTimePicker", SimpleTimePicker);
    vue.component("SimpleTimeRangerPicker", SimpleTimeRangerPicker);
    vue.component("SimpleTip", SimpleTip);
    vue.component("SimpleTree", SimpleTree);
    vue.component("SimpleTreeSelect", SimpleTreeSelect);
    vue.component("SimpleVerificationCode", SimpleVerificationCode);
    vue.component("SimpleWaterMark", SimpleWaterMark);

    vue.$message = Message;
    Object.defineProperties(vue.prototype, {
      $message: {
        get() {
          return Message;
        },
      },
    });
  },
};

export default SimpleUIPlugin;

export * from "./types";

export {
  CollapseTransition,
  Emitter,
  ScaleTransition,
  SimpleAvatar,
  SimpleBacktop,
  SimpleBar,
  SimpleButton,
  SimpleCard,
  SimpleCheckbox,
  SimpleCheckboxGroup,
  SimpleConditionTag,
  SimpleCoolButton,
  SimpleDatePicker,
  SimpleDateRangerPicker,
  SimpleDesc,
  SimpleDialog,
  SimpleDialogBox,
  SimpleFileButton,
  SimpleForm,
  SimpleFormItem,
  SimpleImage,
  SimpleImagePicker,
  SimpleInput,
  SimpleMessage,
  SimpleOption,
  SimplePagination,
  SimplePasswordStrength,
  SimplePath,
  SimplePopover,
  SimplePreview,
  SimpleRadio,
  SimpleScroll,
  SimpleSelect,
  SimpleStepBar,
  SimpleSticky,
  SimpleSwitch,
  SimpleTab,
  SimpleTable,
  SimpleTableColumn,
  SimpleTag,
  SimpleTextarea,
  SimpleTimePicker,
  SimpleTip,
  SimpleTree,
  SimpleTreeSelect,
  SimpleVerificationCode,
  SimpleWaterMark,
  FadeTransition,
  Message,
};