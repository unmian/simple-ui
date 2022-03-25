/*
 * @Author: Quarter
 * @Date: 2020-10-12 10:05:12
 * @LastEditors: Quarter
 * @LastEditTime: 2021-06-16 13:55:03
 * @Description: 
 * @FilePath: /simple-ui/src/simple-ui/types/simple-ui.d.ts
 */
import { SimpleMessageCommand } from ".";

declare module "vue/types/vue" {
interface Vue {
    $message: SimpleMessageCommand;
  }
  interface VueConstructor {
    $message: SimpleMessageCommand;
  }
}