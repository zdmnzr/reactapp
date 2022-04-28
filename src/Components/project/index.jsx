import React, { Component } from 'react'
import {Link,Route,withRouter} from 'react-router-dom'
import { Form, Input, Button, Checkbox} from 'antd';
import { MinusCircleOutlined} from '@ant-design/icons';
import PubSub from 'pubsub-js'
import axios from 'axios'
import './index.css'


axios.defaults.baseURL = 'http://127.0.0.1:3008';


class project extends Component {
  //state={rightClicked:false}

    clickProject=()=>{
        this.props.history.push(`/bigmain`,{x_id:this.props.x_id});
        //this.props.history.replace(`/main`,{id:response.data.p_id});
    }



    componentDidMount(){
      this.aProject.addEventListener('contextmenu',this.rightClick)
    }

    clickToDel=(event)=>{
          //event.cancelBubble = true;
            event.stopPropagation();
      console.log(this.props.x_id)
      axios({
        headers: {
          'Content-Type': 'application/json'     //data:{"vipp":"10","level2":"30"}
          //'Content-Type': 'application/x-www-form-urlencoded'      //data: `username=${user.value}&password=${pass.value}`
        },
      //请求方法
        method : 'POST',
        //url
        url: '/my/shanchuProject',
        //请求体参数
        //data: `username=${user.value}&password=${pass.value}`
        data:{"x_id":this.props.x_id}
      }).then(response=>{
          // //响应状态码
          // console.log('/api/login',response.status);
          // //响应状态字符串
          // console.log('/api/login',response.statusText);
          // //响应头信息
          // console.log('/api/login',response.headers);
          //响应体
          console.log('/my/shanchuProject',response.data)
          PubSub.publish('personalgengxin')
      })
    }

  render() {
    console.log(this.props);
    return (

      
      <div className='liInUl' onClick={this.clickProject} ref={currentNode => this.aProject = currentNode}>
          <div className='slimg' style={{backgroundImage:`url('${this.props.x_slt}')`}}> </div>
          <div style={{textAlign:'center',fontSize:'20px',marginTop:'70px'}}>
            {this.props.x_name}
          </div>

          
          {
            this.props.delState?
            //<Button type='primary' onClick={this.clickToDel}>删除工程</Button>
            <MinusCircleOutlined onClick={this.clickToDel} className='delbtn'/>
            :
            <span></span>
          }
        
        

      </div>
    )
  }
}
export default withRouter(project)