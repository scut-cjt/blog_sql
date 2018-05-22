/**
 * 返回功能
 * jtchen 2018/5/22
 */

import Vue from 'vue'

export function goBack(){
  this.isBack = true;
  window.history.go(-1);
}

