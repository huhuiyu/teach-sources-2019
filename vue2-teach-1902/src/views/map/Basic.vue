<template>
  <div class="main">
    <div>
      <div id="map-container"></div>
    </div>
    <div>
      <input type="text" id="txtSearch" placeholder="输入地址搜索" />
    </div>
  </div>
</template>
<script>
// let app = null;
let AMap = window.AMap;
let map = null;

export default {
  name: 'MapBasic',
  data() {
    return {};
  },
  mounted() {
    // 最基本的地图
    map = new AMap.Map('map-container', {
      zoom: 15 //设置地图显示的缩放级别
    });
    // 使用地图插件api
    AMap.plugin(['AMap.AutoComplete', 'AMap.PlaceSearch', 'AMap.Geolocation', 'AMap.ToolBar'], function() {
      // 定位api
      let geo = new AMap.Geolocation({
        // 是否使用高精度定位，默认：true
        enableHighAccuracy: true,
        // 设置定位超时时间，默认：无穷大
        timeout: 10000,
        // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
        buttonOffset: new AMap.Pixel(10, 20),
        // 定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
        zoomToAccuracy: true,
        // 定位按钮的排放位置,RB表示右下
        buttonPosition: 'RB'
      });
      // 获取当前位置
      geo.getCurrentPosition(function(status, result) {
        console.log('地址信息：', status, result);
        // 定位成功的情况
        if ('complete' == status) {
          // 获取坐标点
          let position = new AMap.LngLat(result.position.lng, result.position.lat);
          // 重置地图中心点
          map.setCenter(position);
          // 添加定位标记
          let marker = new AMap.Marker({
            position: position,
            title: '当前位置'
          });
          map.add(marker);
        } else {
          console.error('定位错误', status, result);
        }
      });

      map.addControl(geo);

      // 对地图添加指定的控件
      map.addControl(
        new AMap.ToolBar({
          position: {
            top: '1rem',
            left: '1rem'
          }
        })
      );

      // poi搜索
      let autoOption = {
        city: '常德',
        input: 'txtSearch'
      };
      let autoComplete = new AMap.AutoComplete(autoOption);
      let placeSearch = new AMap.PlaceSearch({ map: map });
      autoComplete.on('select', function(event) {
        // 设置成自动完成框的城市和点击的地址名称
        placeSearch.setCity(event.poi.adcode);
        placeSearch.search(event.poi.name);
      });
    });
  },
  created() {
    // app = this;
  },
  destroyed() {
    if (map) {
      map.destroy();
    }
  }
};
</script>
<style scoped>
.main {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.main > div:nth-child(1) {
  flex: 1;
  position: relative;
}
#map-container {
  height: 100%;
  width: 100%;
  position: relative;
}
</style>
