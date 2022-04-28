import React, { Component } from 'react'
import PubSub from 'pubsub-js'
import axios from 'axios'
import {withRouter} from 'react-router-dom'
import html2canvas from 'html2canvas'
import { Slider, Button } from 'antd';
import 'antd/dist/antd.css'
import './index.css'

class RightBar extends Component {


  
debounce=(func, ms)=>{
    let timer;
    return function () {
        if (timer) {
        clearTimeout(timer)
        }
        timer = setTimeout(() => {
        func()
        }, ms)
    }
}


componentDidMount(){

  this.btn.addEventListener('click',this.debounce(this.clickToBaocun,500))
  this.btn2.addEventListener('click',this.debounce(this.toTxt,500))
  this.btn3.addEventListener('click',this.debounce(this.clickToBaocunToImg,500))
}

clickToBaocunToImg=()=>{

  PubSub.publish('transZToZero')
  let a =false;
  PubSub.subscribe('transZToZeroOK',(_,hh)=>{
    if(a==true) return;
    a=true;
    console.log(55555)
    var canvas2 = document.createElement("canvas");

    var w = this.props.location.state.x_state.canvas.width*1.25;
    var h = this.props.location.state.x_state.canvas.height*1.25;
    //将canvas画布放大若干倍，然后盛放在较小的容器内，就显得不模糊了
    canvas2.width = w * 0.9;
    canvas2.height = h * 0.9;
    canvas2.style.width = w + "px";
    canvas2.style.height = h + "px";
    //可以按照自己的需求，对context的参数修改,translate指的是偏移量
    //  var context = canvas.getContext("2d");
    //  context.translate(0,0);
    var context = canvas2.getContext("2d");
    context.scale(0.9,0.9);
    html2canvas(document.querySelector('.mainContent'), { canvas: canvas2 }).then((canvas)=> {
        //document.body.appendChild(canvas);
        //canvas转换成url，然后利用a标签的download属性，直接下载，绕过上传服务器再下载
        var dataUrl = canvas.toDataURL('image/jpeg', 1.0);
        //alert(dataUrl)
        //console.log(dataUrl) 
  
        // const content = output.replace(/(\n|\r)/gm,'\r\n')  // 文件内容（此处我将后台返回的回车用正则匹配，否则txt文档中展示为空格）
        const filename = '下载.jpeg'     // 文件名自定义
        const elink = document.createElement("a")
        elink.download = filename
        elink.style.display = "none"
        elink.href = dataUrl
        document.body.appendChild(elink)
        elink.click()
        URL.revokeObjectURL(elink.href)
        document.body.removeChild(elink)
    });
  })
}


clickToBaocun=()=>{

  // PubSub.publish('transZToZero')
  // PubSub.subscribe('transZToZeroOK',(_,hh)=>{
    // var canvas2 = document.createElement("canvas");

    // var w = this.props.location.state.x_state.canvas.width*1.25;
    // var h = this.props.location.state.x_state.canvas.height*1.25;
    // //将canvas画布放大若干倍，然后盛放在较小的容器内，就显得不模糊了
    // canvas2.width = w * 0.9;
    // canvas2.height = h * 0.9;
    // canvas2.style.width = w + "px";
    // canvas2.style.height = h + "px";
    // //可以按照自己的需求，对context的参数修改,translate指的是偏移量
    // //  var context = canvas.getContext("2d");
    // //  context.translate(0,0);
    // var context = canvas2.getContext("2d");
    // context.scale(0.9,0.9);
    // html2canvas(document.querySelector('.mainContent'), { canvas: canvas2 }).then((canvas)=> {
    //     //document.body.appendChild(canvas);
    //     //canvas转换成url，然后利用a标签的download属性，直接下载，绕过上传服务器再下载
    //     var dataUrl = canvas.toDataURL('image/jpeg', 1.0);
        //alert(dataUrl)
        //console.log(dataUrl) 
  
       
        // const filename = '下载.jpeg'     // 文件名自定义
        // const elink = document.createElement("a")
        // elink.download = filename
        // elink.style.display = "none"
        // elink.href = dataUrl
        // document.body.appendChild(elink)
        // elink.click()
        // URL.revokeObjectURL(elink.href)
        // document.body.removeChild(elink)
  
        
        axios({
          headers: {
            'Content-Type': 'application/json'     //data:{"vipp":"10","level2":"30"}
            //'Content-Type': 'application/x-www-form-urlencoded'      //data: `username=${user.value}&password=${pass.value}`
          },
        //请求方法
          method : 'POST',
          //url
          url: 'my/baocunProject',
          //请求体参数
          //data: `username=${user.value}&password=${pass.value}`
          //data:{"x_id":this.props.location.state.x_id,"x_state":JSON.stringify(this.props.location.state.x_state),"x_slt":dataUrl}
          data:{"x_id":this.props.location.state.x_id,"x_state":JSON.stringify(this.props.location.state.x_state)}
        }).then(response=>{
            // //响应状态码
            // console.log('/api/login',response.status);
            // //响应状态字符串
            // console.log('/api/login',response.statusText);
            // //响应头信息
            // console.log('/api/login',response.headers);
            //响应体
            console.log('/my/baocunProject',response.data);  
        })
    //});
//   })
}

  toTxt=()=>{
    console.log(JSON.stringify(this.props.location.state.x_state))
    
    axios({
      headers: {
        'Content-Type': 'application/json'     //data:{"vipp":"10","level2":"30"}
        //'Content-Type': 'application/x-www-form-urlencoded'      //data: `username=${user.value}&password=${pass.value}`
      },
    //请求方法
      method : 'POST',
      //url
      url: 'rule/toTxt',
      //请求体参数
      //data: `username=${user.value}&password=${pass.value}`
      data:{"x_id":this.props.location.state.x_id,"x_state":JSON.stringify(this.props.location.state.x_state)}
    }).then(response=>{

        //响应体
        //console.log('/my/toTxt',response.data.statePic,response.data.stateLine);  
        this.props.history.replace(`/check`,{state:response.data});
        // this.props.history.replace(`/check`,{id:this.props.line.id,type:this.props.line.type,x_id:this.props.x_id});
    })
  }


  reLength = (event)=>{
    PubSub.publish('lengthCanvas',event)
  }

  reWidth = (event)=>{
    
      PubSub.publish('widthCanvas',event)
     
    
  }



  
  render() {
console.log(this.props)
    return (
      <div className='BarForPage'>

      <Button type="primary" className='preservePage' ref={currentNode => this.btn = currentNode }>保存此工程</Button> 
      <Button type="primary" className='preservePage' ref = {currentNode => this.btn2 = currentNode}>进行项目的场景规则推理</Button> 

      <div className='size'>
        画布高度
        <Slider defaultValue={25} onChange={this.reLength}/>
        {/* <button className='sizePage' onClick={this.reLength(false)}>-</button>
        <button className='sizePage' onClick={this.reLength(true)}>+</button>  */}
      </div>
      <div className='size'>
        画布宽度
        <Slider defaultValue={28} onChange={this.reWidth}/>
      </div>

      <Button type="primary" className='preservePage' ref = {currentNode => this.btn3 = currentNode}>保存为图片</Button> 
      </div>
    )
  }
}
export default withRouter(RightBar)