import React, { Component, createRef } from 'react'
import { Modal, Button } from 'antd'
import MapView from './MapModal'

class Footer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
    }
    // this.modalRef = createRef()
  }

  handleClick = () => {
    this.setState({ visible: true })
  }

  render() {
    return (
      <>
        <Button
          onClick={this.handleClick}
          style={{ width: '120px', marginTop: '240px' }}
          type="primary"
        >
          生成地图
        </Button>
        {/* {this.state.visible && ( */}
        <Modal
          visible={this.state.visible}
          destroyOnClose
          // visible
          width={780}
          onCancel={() => {
            this.setState({ visible: false })
          }}
        >
          {/* <MapView ref={this.modalRef} /> */}
          <MapView />
        </Modal>
        {/* )} */}
      </>
    )
  }
}

export default Footer
