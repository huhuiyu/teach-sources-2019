import Vue from 'vue';
import tools from '../js/tools';

// 日期格式化
Vue.filter('formatDate', function(value, format) {
  return value ? tools.formatDate(value, format) : '';
});

Vue.filter('showDeptName', function(value, deptList) {
  // console.log(value, deptList);
  for (let i = 0; i < deptList.length; i++) {
    let dept = deptList[i];
    if (dept.deptId == value) {
      return dept.deptName;
    }
  }
  return '查无部门';
});

// 省份编号转换成省份名称的过滤器，需要传入省份的完整列表
Vue.filter('showProvince', function(value, provinceList) {
  for (let i = 0; i < provinceList.length; i++) {
    let p = provinceList[i];
    if (p.pid == value) {
      return p.province;
    }
  }
  // 如果无法处理，就直接返回原值
  return value;
});

Vue.filter('showCity', function(value, clist) {
  for (let i = 0; i < clist.length; i++) {
    let city = clist[i];
    if (city.cid == value) {
      return city.city;
    }
  }
  return value;
});
