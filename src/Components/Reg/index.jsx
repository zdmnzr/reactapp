import React, { Component } from 'react'
import {Link,Route,withRouter} from 'react-router-dom'
import { Form, Input, Button, Checkbox} from 'antd';
import axios from 'axios'
import './index.css'

class reg extends Component {

  clickReg=()=>{
    //向http://127.0.0.1:3007发送ajax请求，判断信息是否合法
    axios({
      headers: {
        'Content-Type': 'application/json'     //data:{"vipp":"10","level2":"30"}
        //'Content-Type': 'application/x-www-form-urlencoded'      //data: `username=${user.value}&password=${pass.value}`
      },
    //请求方法
      method : 'POST',
      //url
      url: '/api/reguser',
      //请求体参数
      //data: `username=${user.value}&password=${pass.value}`
      data:{"username":this.input1.input.value,
      "password":this.input2.input.value}
    }).then(response=>{
        // //响应状态码
        // console.log('/api/login',response.status);
        // //响应状态字符串
        // console.log('/api/login',response.statusText);
        // //响应头信息
        // console.log('/api/login',response.headers);
        //响应体
        console.log('/api/reguser',response.data);
        
        if (response.data.status === 0) {
          alert(response.data.message)
          this.props.history.replace(`/login`);
        } else {
          alert(response.data)
        }
    })
  }

  clickLogin=()=>{
    this.props.history.replace(`/login`);
  }

  render() {
    return (
      <div className='reg'>
        <div className='regbox'>

            <div className='zhuce'>注册</div>
          
          
        
          <div className='zhanghao'>
            账号：<Input placeholder="input username" style={{width:200+'px'}} ref={currentNode => this.input1 = currentNode }/>
          </div>
          
          <div className='mima'>
            密码：<Input.Password placeholder="input password" style={{width:200+'px'}} ref={currentNode => this.input2 = currentNode }/>
          </div>
          
          
          
          <Button type="primary" onClick={this.clickReg}>注册</Button>
          <Button type="link" onClick={this.clickLogin}>登录</Button>

          
        </div>
      </div>
    )
  }
}

export default withRouter(reg)