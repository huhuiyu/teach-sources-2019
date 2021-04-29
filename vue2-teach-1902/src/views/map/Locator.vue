<template>
  <div class="main">
    <div>
      <div id="map"></div>
    </div>
    <div>
      <div>
        {{ positionInfo }}
      </div>
      <div>按钮</div>
    </div>
  </div>
</template>
<script>
let AMap = window.AMap;
let AMapUI = window.AMapUI;
let map = null;
let app = null;
export default {
  name: 'MapLocator',
  data() {
    return {
      positionInfo: {}
    };
  },
  methods: {
    loadUi(position) {
      // 加载ui的方法
      console.log('定位点：', position);
      AMapUI.loadUI(['misc/PositionPicker'], function(PositionPicker) {
        let picker = new PositionPicker({
          //设定为拖拽地图模式，可选'dragMap'、'dragMarker'，默认为'dragMap'
          mode: 'dragMap',
          //依赖地图对象
          map: map
        });
        console.log('拖拽寻址对象：', picker);
        // 事件处理
        picker.on('success', function(result) {
          console.log('寻址成功：', result);
          app.positionInfo = {
            address: result.address,
            position: {
              lng: result.position.lng,
              lat: result.position.lat
            }
          };
        });
        picker.on('fail', function(result) {
          console.log('寻址失败：', result);
          app.positionInfo = {
            address: '寻址失败！'
          };
        });
        // 启动寻址
        picker.start(position);
      });
    }
  },
  mounted() {
    map = new AMap.Map('map', {
      zoom: 15
    });
    AMap.plugin(['AMap.Geolocation'], function() {
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
        let position = null;
        if ('complete' == status) {
          // 获取坐标点
          position = new AMap.LngLat(result.position.lng, result.position.lat);
        } else {
          // console.error('定位错误', status, result);
          position = new AMap.LngLat(111.67249, 29.0523);
        }
        map.setCenter(position);
        app.loadUi(position);
      });

      map.addControl(geo);
    });
  },
  created() {
    app = this;
    console.log(AMap, AMapUI, map, app);
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
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.main > div:first-child {
  flex: 1;
}

#map {
  width: 100%;
  height: 100%;
}
</style>
