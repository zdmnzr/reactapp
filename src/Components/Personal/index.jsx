import React, { Component } from 'react'
import {Link,Route,withRouter} from 'react-router-dom'
import axios from 'axios'
import PubSub from 'pubsub-js'
import { Form, Input, Button, Checkbox} from 'antd';
import Project from '../project'
import './index.css'

axios.defaults.baseURL = 'http://127.0.0.1:3008';

class personal extends Component {
  state={
    projects:[],
    delState:false
  }

  getState=()=>{
    axios({
      headers: {
        'Content-Type': 'application/json'     //data:{"vipp":"10","level2":"30"}
        //'Content-Type': 'application/x-www-form-urlencoded'      //data: `username=${user.value}&password=${pass.value}`
      },
    //请求方法
      method : 'POST',
      //url
      url: '/my/getstate',
      //请求体参数
      //data: `username=${user.value}&password=${pass.value}`
      data:{"id":this.props.location.state.p_id}
    }).then(response=>{
        // //响应状态码
        // console.log('/api/login',response.status);
        // //响应状态字符串
        // console.log('/api/login',response.statusText);
        // //响应头信息
        // console.log('/api/login',response.headers);
        //响应体
        console.log('/my/getstate',response.data);
        this.setState({projects:response.data})
    })
  }


  componentDidMount(){
    this.getState()
    this.token =  PubSub.subscribe('personalgengxin',(_,event)=>{
      this.getState()
    })
    
  }

  clickLogOut=()=>{
    window.localStorage.removeItem("token")
    this.props.history.replace(`/login`);
  }

  clickToXinjian=()=>{
    var promptKey = prompt('输入项目名称')
    //console.log(promptKey)
    if(promptKey.trim() === ''){
      alert('输入不可以为空')
      return
    }
    if(promptKey==null){return}
    axios({
      headers: {
        'Content-Type': 'application/json'     //data:{"vipp":"10","level2":"30"}
        //'Content-Type': 'application/x-www-form-urlencoded'      //data: `username=${user.value}&password=${pass.value}`
      },
    //请求方法
      method : 'POST',
      //url
      url: '/my/xinjianProject',
      //请求体参数
      //data: `username=${user.value}&password=${pass.value}`
      data:{"p_id":this.props.location.state.p_id,"x_name":promptKey}
    }).then(response=>{
        // //响应状态码
        // console.log('/api/login',response.status);
        // //响应状态字符串
        // console.log('/api/login',response.statusText);
        // //响应头信息
        // console.log('/api/login',response.headers);
        //响应体
        console.log('/my/xinjianProject',response.data)
        this.getState()
        //this.setState({haha:this.response.data});
    })
  }
  clickToManage=()=>{
    this.setState({delState:!this.state.delState})
  }

  render() {
    console.log(this.props)
    console.log(this.state)
    return (
      <div className='personal'>
        <div className='personalBox'>
          <div style={{position:'absolute',left:60+'px',top:50+'px'}}>
            <div style={{fontSize:35+'px',display:'inline-block'}}>
              用户：<span style={{color:'rgb(36, 87, 255)'}}>{this.props.location.state.p_username}</span>
            </div>
            <Button type="link" onClick={this.clickLogOut}>退出登录</Button>
          </div>
           <div >
             <div style={{position:'absolute',left:120+'px',top:140+'px',fontSize:30+'px',display:'inline-block'}}>
                我的工程：
             </div>
             <div className='ulInPersonal' ref={currentNode => this.projects = currentNode }>
                  {
                    this.state.projects.map(project=>{
                      return (
                        <Project key={project.x_id} {...project} delState={this.state.delState}/>
                        // <div key={project.x_id} className='liInUl' onClick={this.clickPro} >
                        //     <Project {...project}/>
                        // </div>
                      )
                    })
                  }
             </div>
           </div>
           <div style={{position:'absolute',left:170+'px',top:570+'px'}}>
              <Button type="primary" onClick={this.clickToManage} style={{marginRight:30+'px'}}>管理工程</Button>

              <Button type="primary" onClick={this.clickToXinjian}>新建工程</Button>
           </div>

        </div>
        
      </div>
    )
  }
}

export default withRouter(personal)