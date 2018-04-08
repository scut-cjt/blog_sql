/**
 * localStorage 常用方法
 * jtchen 2018/4/4
 */

//TODO 封装ls方法
var ms = "mystorage";
var storage=window.localStorage;
if(!window.localStorage){
  alert("浏览器支持localstorage");
  return false;
}

var set = function(key,value){
  //存储
  var mydata = storage.getItem(ms);
  if(!mydata){
    this.init();
    mydata = storage.getItem(ms);
  }
  mydata = JSON.parse(mydata);
  mydata.data[key] = value;
  storage.setItem(ms,JSON.stringify(mydata));
  return mydata.data;

};

var get = function(key){
  //读取
  var mydata = storage.getItem(ms);
  if(!mydata){
    return false;
  }
  mydata = JSON.parse(mydata);

  return mydata.data[key];
};

var remove = function(key){
  //读取
  var mydata = storage.getItem(ms);
  if(!mydata){
    return false;
  }

  mydata = JSON.parse(mydata);
  delete mydata.data[key];
  storage.setItem(ms,JSON.stringify(mydata));
  return mydata.data;
};

var clear = function(){
  //清除对象
  storage.removeItem(ms);
};

var init = function(){
  storage.setItem(ms,'{"data":{}}');
};
