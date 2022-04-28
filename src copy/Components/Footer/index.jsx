import React, { Component } from 'react'
import PubSub from 'pubsub-js'
import './index.css'


export default class index extends Component {

  click=()=>{

  }

  keyUp=(event)=>{
    //解构赋值获取keyCode,target
		const {keyCode,target} = event
		//判断是否是回车按键
		if(keyCode !== 13) return
		//添加的todo名字不能为空
		if(target.value.trim() === ''){
			alert('输入不能为空')
			return
		}

    var a=JSON.parse(target.value)
    //准备好一个todo对象
		const picsObj = a


    PubSub.publish('atguigu2',picsObj)
  
    
  
		//清空输入
		target.value = ''
  }



  render() {
    return (
      <div className='footerBox'>
        <button onClick={this.click}>保存为txt</button>
        <input type="text" placeholder='以文本格式输入，回车结束' onKeyUp={this.keyUp}/>
      </div>
    )
  }
}
