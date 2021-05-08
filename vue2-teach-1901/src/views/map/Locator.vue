<template>
  <div class="main">
    <div>
      <div id="map"></div>
    </div>
    <div v-loading="loading">
      <div>{{ resultInfo }}</div>
      <div>
        <el-button @click="openMap">地图调起</el-button>
      </div>
    </div>
  </div>
</template>
<script>
let AMap = window.AMap;
let AMapUI = window.AMapUI;
let app = null;
let map = null;

export default {
  name: 'MapLocator',
  data() {
    return {
      resultInfo: {},
      loading: false
    };
  },
  methods: {
    openMap() {
      window.open('https://uri.amap.com/marker?position=' + this.resultInfo.position.lng + ',' + this.resultInfo.position.lat + '&name=' + this.resultInfo.address);
    },
    loadUiInfo(position) {
      console.log('ui起始地址：', position);
      AMapUI.loadUI(['misc/PositionPicker'], function(PositionPicker) {
        let picker = new PositionPicker({
          // 地图拖拽模式设置（拖动地图还是marker）
          mode: 'dragMap',
          map: map
        });
        console.log('拖拽寻址器对象:', picker);
        picker.on('success', function(pickerResult) {
          app.loading = false;
          console.log('寻址成功：', pickerResult);
          app.resultInfo = {
            address: pickerResult.address,
            position: {
              lng: pickerResult.position.lng,
              lat: pickerResult.position.lat
            }
          };
        });
        picker.on('fail', function(pickerResult) {
          app.loading = false;
          console.log('寻址失败：', pickerResult);
          app.resultInfo = {
            address: '寻址失败'
          };
        });
        // 开始拖拽寻址
        picker.start(position);
      });
    }
  },
  created() {
    app = this;
    console.log(app, map, AMap, AMapUI);
  },
  destroyed() {
    if (map) {
      map.destroy();
    }
  },
  mounted() {
    app.loading = true;
    map = new AMap.Map('map', {
      zoom: 15
    });
    AMap.plugin(['AMap.Geolocation'], function() {
      let geo = new AMap.Geolocation({
        enableHighAccuracy: true,
        timeout: 5000,
        zoomToAccuracy: true
      });
      geo.getCurrentPosition(function(status, result) {
        console.log('定位信息：', status, result);
        let position = null;
        if ('complete' == status) {
          position = new AMap.LngLat(result.position.lng, result.position.lat);
        } else {
          position = new AMap.LngLat(111.67249, 29.0523);
        }
        map.setCenter(position);
        // 创建ui拖拽寻址
        app.loadUiInfo(position);
      });
    });
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
.main > div:last-child {
  padding: 1rem;
}
#map {
  width: 100%;
  height: 100%;
}
</style>
