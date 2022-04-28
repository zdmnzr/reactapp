import React, { Component } from 'react'
import {Link,Route,withRouter} from 'react-router-dom'
import axios from 'axios'
import { Form, Input, Button, Checkbox} from 'antd';
// import 'antd/dist/antd.css'
import './index.css'

axios.defaults.baseURL = 'http://127.0.0.1:3008';
class login extends Component {
  //state={token:undefined}

  componentDidMount(){
    axios({


      headers: {
        'Authorization': window.localStorage.getItem("token") 
      },
    //请求方法
      method : 'GET',
      //url
      url: '/api/username',
      //请求体参数
      //data: `username=${user.value}&password=${pass.value}`
  
    }).then(response=>{
        
        if (response.data.status === 0) {
          //alert('欢迎您'+response.data.p_username)
          this.props.history.replace(`/personal`,{p_id:response.data.p_id,p_username:response.data.p_username});  //to={{pathname:'/demo/test',state:{name:'tom',age:18}}}  this.props.history.replace(`/home/message/detail`,{id,title})
        } else {
          console.log(response.data)
          // alert(response.data)
        }
        // this.input1.input.value=null;
        // this.input2.input.value=null;
    })
  }


  clickReg=()=>{
    this.props.history.replace(`/reg`);
  }



  clickLogin=()=>{

    //console.log(this.input1.value,this.input2.input.value)
    // this.props.history.replace(`/main`);
    向http://127.0.0.1:3008发送ajax请求，判断数据库有没有这个账号
    axios({


      headers: {
        'Content-Type': 'application/json',  //data:{"vipp":"10","level2":"30"}
        //'Content-Type': 'application/x-www-form-urlencoded'      //data: `username=${user.value}&password=${pass.value}`
        //'Authorization': 'Bearer '+token    
      },
    //请求方法
      method : 'POST',
      //url
      url: '/api/login',
      //请求体参数
      //data: `username=${user.value}&password=${pass.value}`
      data:{"username":this.input1.input.value,
      "password":this.input2.input.value}
    }).then(response=>{

        //响应体
        console.log('/api/login',response.data.token);
        window.localStorage.setItem("token",response.data.token);
        //this.setState({token:response.data.token})
        
        if (response.data.status === 0) {
          alert('欢迎您'+response.data.p_username)
          this.props.history.replace(`/personal`,{p_id:response.data.p_id,p_username:response.data.p_username});  //to={{pathname:'/demo/test',state:{name:'tom',age:18}}}  this.props.history.replace(`/home/message/detail`,{id,title})
        } else {
          alert(response.data)
        }
        this.input1.input.value=null;
        this.input2.input.value=null;
    })

  }
  render() {
    return (
      <div className='login'>
        <div className='loginbox'>
            <div className='denglu'>登录</div>
       
       
     
            <div className='zhanghao'>
              账号：<Input placeholder="input username" style={{width:200+'px'}} ref={currentNode => this.input1 = currentNode }/>
            </div>
            
            <div className='mima'>
              密码：<Input.Password placeholder="input password" style={{width:200+'px'}} ref={currentNode => this.input2 = currentNode }/>
            </div>
            
            
           
            <Button type="primary" onClick={this.clickLogin}>登录</Button>
            <Button type="link" onClick={this.clickReg}>注册</Button>
            
        </div>
      </div>
    )
  }
}

export default withRouter(login)