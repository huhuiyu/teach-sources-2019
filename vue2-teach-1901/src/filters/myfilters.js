import Vue from 'vue';
import tools from '../js/tools';

// 日期格式化
Vue.filter('formatDate', function(value, format) {
  return value ? tools.formatDate(value, format) : '';
});

// 通过部门编号获取对应的部门名称
// 部门列表需要页面传入
Vue.filter('deptName', function(value, deptList) {
  for (let i = 0; i < deptList.length; i++) {
    let dept = deptList[i];
    if (value == dept.deptId) {
      return dept.deptName;
    }
  }
  return value;
});

Vue.filter('province', function(value, provinceList) {
  for (let i = 0; i < provinceList.length; i++) {
    let p = provinceList[i];
    if (p.pid == value) {
      return p.province;
    }
  }
  return value;
});

Vue.filter('city', function(value, list) {
  for (let i = 0; i < list.length; i++) {
    let city = list[i];
    if (city.cid == value) {
      return city.city;
    }
  }
  return value;
});
