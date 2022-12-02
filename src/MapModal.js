import React, { Component } from 'react'
import { Input, Button, message } from 'antd'
import t_key from './utils/tkey'
// import axios from 'axios'
import { cloneDeep } from 'loadsh'

const genId = (id) => `${id}-${parseInt(Math.random() * 100000)}`

class MapView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inputId: genId('tipinput'),
      TMapId: genId('TMapId'),
      clearId: genId('clearId'),
      inputValue: null,
      // 经度
      longitude: '116.397128',
      // 纬度
      latitude: '39.916527',
      // 覆盖物路径
      coverPath: [],
      isPoint: false,
      map: {},
      TMap: {},
    }
    this.cloneState = { ...this.state }
  }

  // 组件初始化加载
  componentDidMount() {
    console.log(this.state)
    // 初始化地图方法，放至全局
    window.init = this.init
    this.loadScript()
    // window.onload = this.loadScript
  }

  // 组件销毁
  componentWillUnmount() {}

  // 初始化腾讯地图
  init = () => {
    // const TMap = window.TMap || {}
    const TMap = window.qq.maps || {}
    let start = new Date()
    let geolocation = new TMap.Geolocation(t_key, 'react-todos')
    geolocation.getLocation(
      (res) => {
        console.log(res, '+定位+', new Date() - start)
        //定义地图中心点坐标
        let center = new TMap.LatLng(res.lat, res.lng)
        this.initMap(TMap, center)
      },
      (e) => {
        message.warning('定位失败，地图初始化坐标为北京市')
        let center = new TMap.LatLng(39.916527, 116.397128)
        this.initMap(TMap, center)
      },
      { timeout: 30000 }
    )

    console.log('TMap', TMap)
  }

  initMap = (TMap, center) => {
    //定义map变量，调用 TMap.Map() 构造函数创建地图
    let map = new TMap.Map(document.getElementById(this.state.TMapId), {
      center,
      zoom: 13, //设置地图缩放级别
      // pitch: 43.5, //设置俯仰角
      // rotation: 45, //设置地图旋转角度
      // viewMode: '2D', // 设置地图模式 2D，3D
      mapTypeId: TMap.MapTypeId.ROADMAP, // 普通街道地图
    })
    this.setState({ map, TMap })

    // 输入提示
    /**
     * 第一个参数 @param {String} 输入框ID，表示对该输入框的value检索
     * 第二个参数 @param {Object} 参考：https://lbs.qq.com/javascript_v2/doc/autocompleteoptions.html
     */
    let ap = new TMap.place.Autocomplete(this.state.inputId, {
      location: '广州市',
    })
    let keyword = ''
    //调用Poi检索类。用于进行本地检索、周边检索等服务。
    let searchService = new TMap.SearchService({
      // 搜索完成的回调
      complete: (results) => {
        // 自定义图标
        let anchor = new TMap.Point(6, 6)
        let size = new TMap.Size(24, 24)
        let origin = new TMap.Point(0, 0)
        let icon = new TMap.MarkerImage(
          'https://mapapi.qq.com/web/lbs/javascriptV2/demo/img/center.gif',
          size,
          origin,
          anchor
        )

        if (results.type === 'CITY_LIST') {
          searchService.setLocation(results.detail.cities[0].cityName)
          searchService.search(keyword)
          return
        }

        // 一个标记，点击的数据在 results?.detail?.pois 第一条
        let poi = results?.detail?.pois[0] || {}
        let latlngBounds = new TMap.LatLngBounds()
        latlngBounds.extend(poi.latLng)
        let marker = new TMap.Marker({
          map: map,
          position: poi.latLng,
          icon,
        })
        marker.setTitle(poi.name)

        // 多个标记
        // let pois = results.detail.pois
        // for (let i = 0, l = pois.length; i < l; i++) {
        //   let poi = pois[i]
        //   latlngBounds.extend(poi.latLng)
        // let marker = new TMap.Marker({
        //   map: map,
        //   position: poi.latLng,
        // })

        //   marker.setTitle(poi.name)
        // }
        map.fitBounds(latlngBounds)
        this.setState({
          longitude: poi?.latLng?.lng || 116.397128,
          latitude: poi?.latLng?.lat || 39.916527,
        })
      },
    })
    //添加监听事件
    TMap.event.addListener(ap, 'confirm', (res) => {
      keyword = res.value
      this.setState({ inputValue: keyword })
      searchService.search(keyword)
    })

    // //添加监听事件  获取鼠标点击事件
    // let listener = TMap.event.addListener(map, 'click', (event) => {
    //   let cloneCoverPath = cloneDeep(this.state.coverPath)
    //   let marker = new TMap.Marker({
    //     position: event.latLng,
    //     map: map,
    //   })
    //   cloneCoverPath.push(event.latLng)
    //   this.setState({ coverPath: cloneCoverPath })
    //   console.log('点击添加标记', marker, cloneCoverPath)
    // })

    //移除 click 事件.
    // TMap.event.removeListener(listener)

    // 添加覆盖物（围栏）
    // let path = [
    //   new TMap.LatLng(39.999216, 116.305389),
    //   new TMap.LatLng(39.972516, 116.299725),
    //   new TMap.LatLng(39.974489, 116.326675),
    // ]

    // // console.log('+PATH+', path)

    // let circle_color = new TMap.Color(255, 12, 0, 0.4)
    // let polygon = new TMap.Polygon({
    //   path: path, // 覆盖物路径
    //   strokeColor: circle_color, // 边框颜色
    //   // strokeWeight: 5, // 边框宽度
    //   fillColor: circle_color, // 填充颜色
    //   map: map,
    // })
  }

  // 加载API服务
  loadScript() {
    let script = document.createElement('script')
    script.type = 'text/javascript'
    // script.charset = 'utf-8'
    script.src = `https://map.qq.com/api/js?v=2.exp&key=${t_key}&libraries=place,convertor,drawing,geometry,visualization&callback=init`
    // script.src = `https://map.qq.com/api/gljs?v=1.exp&key=${t_key}&libraries=place&callback=init`
    document.body.appendChild(script)
    console.log('document', document, window)
  }

  handleChange = (e) => {
    this.setState({ inputValue: e.target.value })
  }

  // 锚点
  handlePoint = () => {
    const { TMap, map } = this.state
    let markersArray = []
    //添加监听事件  获取鼠标点击事件
    let listener = TMap.event.addListener(map, 'click', (event) => {
      let cloneCoverPath = cloneDeep(this.state.coverPath)
      let marker = new TMap.Marker({
        position: event.latLng,
        map: map,
      })
      cloneCoverPath.push(event.latLng)
      markersArray.push(marker)
      this.setState({ coverPath: cloneCoverPath, markersArray })
      console.log('点击添加标记', marker, cloneCoverPath, markersArray)
    })
  }

  // 保存
  handleSave = () => {
    const { TMap, map, coverPath, markersArray, clearId } = this.state
    let circle_color = new TMap.Color(255, 12, 0, 0.4)
    let polygon = new TMap.Polygon({
      path: coverPath, // 覆盖物路径
      strokeColor: circle_color, // 边框颜色
      // strokeWeight: 5, // 边框宽度
      fillColor: circle_color, // 填充颜色
      map,
    })

    // 清除marker
    if (markersArray) {
      for (let i in markersArray) {
        markersArray[i].setMap(null)
      }
    }

    // var visibleTF = true;
    let visibleT = document.getElementById(clearId)
    TMap.event.addDomListener(visibleT, 'click', function () {
      polygon.setMap(map)
      polygon.setVisible(false)
      // if (visibleTF) {
      //     visibleTF = false;
      //     polygon.setVisible(false);
      // } else {
      //     visibleTF = true;
      //     polygon.setVisible(true);
      // }
    })
  }

  // 布局
  toolbar = ({ showSearch, showMap, enableTools, inputValue, inputId }) => {
    return (
      <div style={{ marginBottom: '10px' }}>
        {showSearch && (
          <Input
            id={inputId}
            placeholder="请输入详细地址"
            style={{ width: '228px' }}
            onChange={(e) => {
              // 选择的内容
              console.log('>>e: ', e.target.value)
              this.handleChange(e)
            }}
            value={inputValue}
          />
        )}
        {showMap && enableTools && (
          // 此处先隐藏不必要展示的button
          <span>
            <Button
              style={{ marginLeft: '15px' }}
              id={this.state.pointId}
              disabled={!enableTools}
              onClick={this.handlePoint}
            >
              锚点
            </Button>
            <Button
              style={{ marginLeft: '15px' }}
              id={this.state.fencingId}
              disabled={!enableTools}
              onClick={this.handleSave}
            >
              保存
            </Button>
            <Button
              style={{ marginLeft: '15px' }}
              id={this.state.clearId}
              disabled={!enableTools}
            >
              清空
            </Button>
          </span>
        )}
      </div>
    )
  }

  render() {
    const {
      showSearch = true,
      showMap = true,
      enableTools = true,
      mapStyle = {},
    } = this.props
    if (!showMap) mapStyle.display = 'none'

    const { longitude, latitude, inputValue, inputId } = this.state
    // console.log('longitude, latitude', longitude, latitude)

    return (
      <>
        {this.toolbar({
          showSearch,
          showMap,
          enableTools,
          inputValue,
          inputId,
        })}
        <div>
          {longitude},{latitude}
        </div>
        <div
          id={this.state.TMapId}
          style={{ width: '100%', height: '400px' }}
        ></div>
      </>
    )
  }
}

export default MapView
