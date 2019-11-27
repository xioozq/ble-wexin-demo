import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.less'

export default class Index extends Component {

  config = {
    navigationBarTitleText: '首页'
  }

  state = {
    enabled: false,
  }

  render() {
    return (
      <View className='index'>
        <Text>Hello world! </Text>
      </View>
    )
  }

  componentDidMount() {
    this.initial()
  }

  initial = async () => {
    try {
      await Taro.openBluetoothAdapter()
      this.setState({
        enabled: true,
      })
      console.log('success')
      // Taro.onBluetoothDeviceFound(this.handleDeviceFound)
      // Taro.startBluetoothDevicesDiscovery()

      await Taro.createBLEConnection({
        deviceId: '35980084-6FAE-61CC-DD57-61FCFEFB76D9'
      })
      
      const service = await Taro.getBLEDeviceServices({
        deviceId: '35980084-6FAE-61CC-DD57-61FCFEFB76D9',
      })
      console.log('services: ', service)

      const characteristics = await Taro.getBLEDeviceCharacteristics({
        deviceId: '35980084-6FAE-61CC-DD57-61FCFEFB76D9',
        serviceId: '71DA3FD1-7E10-41C1-B16F-4430B506CDE7',
      })

      console.log('characteristics:', characteristics)
      
      let buffer = new ArrayBuffer(3)
      let dataView = new DataView(buffer)
      dataView.setUint8(0, 0x01)
      dataView.setUint8(1, 0x03)
      dataView.setUint8(2, 0xff)

      console.log(buffer)
      const result =  await Taro.writeBLECharacteristicValue({
        deviceId: '35980084-6FAE-61CC-DD57-61FCFEFB76D9',
        serviceId: '71DA3FD1-7E10-41C1-B16F-4430B506CDE7',
        characteristicId: 'E65AE8EC-CF77-478A-B72F-FD2D6B397874',
        value: buffer,
      })

      console.log('result:',result)

      // await Taro.closeBLEConnection({
      //   deviceId: '35980084-6FAE-61CC-DD57-61FCFEFB76D9',
      // })

      // await Taro.closeBluetoothAdapter()

    } catch (err) {
      console.log(err)
    }
  }

  handleDeviceFound = (e) => {
    e.devices.forEach((item) => {
      const { name, deviceId: id } = item
      // if (name) {
      //   console.log(name, id)
      // }
      if (id === '35980084-6FAE-61CC-DD57-61FCFEFB76D9') {
        console.log('find it')
        console.log(name, id)
      }
    })
  }


}
