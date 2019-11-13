<template>
  <dialog-head
    v-model="showDialog"
    :options="options"
  >
    <div
      slot="content"
      class="content"
    >
      <el-row
        :gutter="40"
        type="flex"
        align="middle"
      >
        <el-col :span="12">
          <el-input
            v-model="searchText"
            :placeholder="t('common.searchText')"
            :maxlength="64"
            size="mini"
            prefix-icon="el-icon-search"
            clearable
            @clear="clearMapMarker"
          />
        </el-col>
        <el-col :span="4">
          <el-button
            type="primary"
            size="small"
            @click="searchMap"
          >
            {{ t('common.lookFor') }}
          </el-button>
        </el-col>
      </el-row>
      <div class="margin-bottom20" />
      <el-row :gutter="30">
        <el-col :span="24">
          <div class="coordinate-container">
            <div
              id="coordinate"
              ref="coordinate"
            />
          </div>
        </el-col>
        <el-col :span="8">
          <p>{{ t('common.currentCoordinate') }}</p>
          <el-input
            v-model="coordinate"
            size="mini"
            readonly
          />
        </el-col>
        <el-col :span="12">
          <p>{{ t('common.coordinateReverse') }}</p>
          <el-input
            v-model="address"
            size="mini"
          />
        </el-col>
        <el-col :span="4">
          <el-button
            type="primary"
            size="small"
            style="display: block; margin: 43px auto 0"
            @click="save"
          >
            {{ t('common.confirm') }}
          </el-button>
        </el-col>
      </el-row>
    </div>
  </dialog-head>
</template>
<script>
import Locale from '@/mixins/locale'
import DialogHead from '@/components/DialogHead'

export default {
  name: 'Coordinate',
  components: {
    DialogHead
  },
  mixins: [Locale],
  // 弹窗 隐藏/显示
  model: {
    prop: 'show',
    event: 'changeVal'
  },
  props: {
    // 弹窗 隐藏/显示
    show: {
      type: Boolean,
      default: false
    },
    coordinateData: {
      type: Object,
      default: () => { }
    }
  },
  data () {
    return {
      options: {
        title: this.t('common.coordinate'),
        hideFooter: true
      },
      searchText: '',
      map: null,
      mapMarker: null,
      mapGeocoder: null,
      mapSearch: null,
      coordinate: '',
      address: '',
      isInit: false
    }
  },
  computed: {
    // 弹窗隐藏显示
    showDialog: {
      get: function () {
        return this.show
      },
      set: function (v) {
        this.$emit('changeVal', v)
      }
    }
  },
  watch: {
    showDialog: function (e) {
      if (e && this.map === null) {
        this.initMap()
      }
    },
    coordinateData ({ address, coordinate } = {}) {
      this.address = address
      this.coordinate = coordinate
      this.isInit = true
    }
  },
  beforeDestroy () {
    this.map && this.map.destroy()
  },
  methods: {
    initMap () {
      this.lazyAMapApiLoaderInstanceResolved.then(() => {
        this.map = new AMap.Map('coordinate', {
          resizeEnable: true,
          zoom: 12
        })
          .on('click', function (e) {
            if (this.mapMarker === null) return
            this.mapMarker.setPosition(new AMap.LngLat(e.lnglat.lng, e.lnglat.lat))
            this.mapMarker.show()
            this.mapGeocoder.getAddress([e.lnglat.getLng(), e.lnglat.getLat()], function (status, result) {
              if (status === 'complete' && result.info === 'OK') {
                if (result && result.regeocode) {
                  this.coordinate = e.lnglat.lng + ',' + e.lnglat.lat
                  this.address = result.regeocode.formattedAddress
                }
              } else {
                this.$message({
                  type: 'warning',
                  message: this.t('unitInfoManage.coordinateQueryfault')
                })
              }
            }.bind(this))
            // eslint-disable-next-line
          }.bind(this))
          .on('complete', function () {
            this.mapMarker = new AMap.Marker({
              visible: false,
              map: this.map
            }).on('click', function (e) {
              this.mapGeocoder.getAddress([e.lnglat.getLng(), e.lnglat.getLat()], function (status, result) {
                if (status === 'complete' && result.info === 'OK') {
                  if (result && result.regeocode) {
                    this.coordinate = e.lnglat.lng + ',' + e.lnglat.lat
                    this.address = result.regeocode.formattedAddress
                  }
                } else {
                  this.$message({
                    type: 'warning',
                    message: this.t('unitInfoManage.coordinateQueryfault')
                  })
                }
              }.bind(this))
            }.bind(this))
            if (this.isInit) {
              let [lng, lat] = this.coordinate.split(',')
              this.mapMarker.setPosition(new AMap.LngLat(lng, lat))
              this.mapMarker.show()
              this.map.setFitView([this.mapMarker])
              this.map.setZoom(this.map.getZoom() - 1)
            }
            this.mapGeocoder = new AMap.Geocoder({
              radius: 1000,
              extensions: 'all'
            })
            this.map.getCity(function ({ province, city }) {
              this.mapSearch = new AMap.PlaceSearch({
                city: city || province,
                map: this.map
              }).on('selectChanged', function (SelectChangeEvent) {
                this.mapGeocoder.getAddress([SelectChangeEvent.selected.data.location.lng, SelectChangeEvent.selected.data.location.lat], function (status, result) {
                  if (status === 'complete' && result.info === 'OK') {
                    if (result && result.regeocode) {
                      this.coordinate = SelectChangeEvent.selected.data.location.lng + ',' + SelectChangeEvent.selected.data.location.lat
                      this.address = result.regeocode.formattedAddress
                    }
                  }
                }.bind(this))
              }.bind(this))
            }.bind(this))
          }.bind(this))
      })
    },
    searchMap () {
      this.searchText = this.searchText.trim()
      let reg = /^-?\d+(\.\d+)?\s*[,，]?\s*-?\d+(\.\d+)?$/
      if (reg.test(this.searchText)) {
        let [lng, lat] = this.searchText.split(/\s*[，,]\s*/)
        if (lng > 180 || lng < -180 || !/^-?\d+(\.\d{1,6})?$/.test(lng)) {
          return this.$message({
            type: 'error',
            message: this.t('common.lngError')
          })
        }
        if (lat > 90 || lat < -90 || !/^-?\d+(\.\d{1,6})?$/.test(lat)) {
          return this.$message({
            type: 'error',
            message: this.t('common.latError')
          })
        }
        this.mapMarker.setPosition(new AMap.LngLat(lng, lat))
        this.mapMarker.show()
        this.map.setFitView([this.mapMarker])
        this.map.setZoom(this.map.getZoom() - 1)
      } else {
        this.mapSearch.search(this.searchText, function (status, result) {
        })
      }
    },
    clearMapMarker () {
      this.mapMarker.hide()
      this.address = ''
      this.coordinate = ''
    },
    save () {
      this.$emit('save', { address: this.address, coordinate: this.coordinate })
      this.showDialog = false
    },
    close () {
      this.searchText = ''
      this.address = ''
      this.coordinate = ''
    }
  }
}
</script>

<style scoped>
.content {
  max-height: 520px;
  height: 50vh;
}
.coordinate-container {
  width: 100%;
  height: 350px;
  overflow: hidden;
}
#coordinate {
  width: 100%;
  height: 367px;
}
.el-dialog__wrapper >>> .text-align-center.margin-top20.margin-bottom20 {
  margin: 0;
}
</style>
