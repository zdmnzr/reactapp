import React, { Component } from 'react'
import './index.css'

export default class index extends Component {
  render() {
      console.log(this.props.history.location.state)
      const {Answer_statePic,Answer_stateLine,Answer_AssetAPO,Answer_TaskPO,Answer_Character} = this.props.history.location.state.state
      //console.log(Answer_AssetAPO)
    //   document.write(this.props.history.location.state)
    return (
      <div className='checkBox'>
        {/* 这里是check页面 */}
        <div className='checkLeft'>
            <div className='leftTop'>
                <div style={{textAlign:'center',fontSize:'20px',fontWeight:'700'}}>
                    txt文本
                </div>
                <div>
                    {
                       Answer_statePic.map(item=>{
                           return (<div>{item}.</div>)
                       })
                    }
                                        {
                       Answer_stateLine.map(item=>{
                           return (<div>{item}.</div>)
                       })
                    }
                                        {
                       Answer_AssetAPO.map(item=>{
                           return (<div>{item}.</div>)
                       })
                    }
                                        {
                       Answer_TaskPO.map(item=>{
                           return (<div>{item}.</div>)
                       })
                    }
                                        {
                       Answer_Character.map(item=>{
                           return (<div>{item}.</div>)
                       })
                    }
                </div>
            </div>
            <div className='leftBottom'>
                <div style={{textAlign:'center',fontSize:'20px',fontWeight:'700'}}>
                    选择资产进行检测
                </div>
            </div>
        </div>
        <div className='checkRight'>
            <div style={{textAlign:'center',fontSize:'20px',fontWeight:'700'}}>检测结果</div>
        </div>
      </div>
    )
  }
}
