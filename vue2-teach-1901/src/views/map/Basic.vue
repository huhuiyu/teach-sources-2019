<template>
  <div class="main">
    <div>
      <div id="map-container"></div>
    </div>
    <div>
      地址搜索
      <input type="text" id="txtSearch" />
    </div>
  </div>
</template>
<script>
// 高德地图对象
let AMap = window.AMap;
// 地图实例
let map = null;

export default {
  name: 'MapBasic',
  data() {
    return {};
  },
  mounted() {
    let satellite = new AMap.TileLayer.Satellite();
    let roadNet = new AMap.TileLayer.RoadNet();
    // 创建地图
    map = new AMap.Map('map-container', {
      zoom: 10,
      pitch: 90,
      // viewMode: '3D',
      layers: [satellite, roadNet]
    });
    // 一些地图插件的使用
    AMap.plugin(['AMap.Scale', 'AMap.ToolBar', 'AMap.Geolocation', 'AMap.AutoComplete', 'AMap.PlaceSearch'], function() {
      // 添加控件
      map.addControl(
        new AMap.ToolBar({
          position: {
            top: '1rem',
            left: '1rem'
          }
        })
      );
      // 定位插件
      let geo = new AMap.Geolocation({
        // 是否使用高精度定位，默认：true
        enableHighAccuracy: true,
        // 设置定位超时时间，默认：无穷大
        timeout: 10000,
        // 定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
        zoomToAccuracy: true,
        // 定位按钮的排放位置,  RB表示右下
        buttonPosition: 'RB'
      });

      // 获取当前地理位置信息
      geo.getCurrentPosition(function(status, result) {
        console.log('当前地址信息：', status, result);
        // 成功获取地址的情况
        if ('complete' == status) {
          // 获取坐标信息并创建坐标点
          let position = new AMap.LngLat(result.position.lng, result.position.lat);
          // 设置中心
          map.setCenter(position);
          // 标识点
          let marker = new AMap.Marker({
            position: position,
            title: '我的位置'
          });
          map.add(marker);
        } else {
          console.error('定位异常', status, result);
        }
      });

      map.addControl(geo);

      //poi搜索和自动完成
      let auto = new AMap.AutoComplete({
        input: 'txtSearch',
        city: '常德'
      });
      let placeSearch = new AMap.PlaceSearch({
        map: map
      });
      // 自动完成事件监听
      auto.on('select', function(event) {
        placeSearch.setCity(event.poi.adcode);
        placeSearch.search(event.poi.name);
      });

      map.addControl(
        new AMap.Scale({
          position: {
            top: '1rem',
            right: '1rem'
          }
        })
      );
    });
  },
  destroyed() {
    // vue页面销毁时顺便销毁地图
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
}
.main > div:nth-child(2) {
  padding: 1rem;
}
#map-container {
  height: 100%;
  width: 100%;
}
</style>
