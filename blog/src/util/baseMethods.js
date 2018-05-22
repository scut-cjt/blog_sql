/**
 * 全局方法
 * jtchen 2018/5/22
 */

exports.install = function (Vue, options) {
  Vue.prototype.routerBack = function (){
    alert('执行成功');
  };
};
