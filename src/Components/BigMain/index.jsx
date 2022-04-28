import React, { Component } from 'react'
import PubSub from 'pubsub-js'
import axios from 'axios'
// import Footer from '../Footer'
import LeftBar from '../LeftBar'
import Main from '../Main'
import './index.css'
export default class BigMain extends Component {

  state={}

  componentDidMount(){

  

    // this.token = PubSub.subscribe('woxiangyaoX_id',(_,state)=>{
    //   console.log('woxiangyaoX_id')
    //   PubSub.publish('baocunXState',{id:this.props.location.state.x_id})
    // })


    if(this.props.location.state){
      console.log(this.props.location.state.x_id)
      this.setState({x_id:this.props.location.state.x_id},()=>{
        // console.log(this.state.x_id)
        axios({
          headers: {
            'Content-Type': 'application/json'     //data:{"vipp":"10","level2":"30"}
            //'Content-Type': 'application/x-www-form-urlencoded'      //data: `username=${user.value}&password=${pass.value}`
          },
        //请求方法
          method : 'POST',
          //url
          url: '/my/getdetails',
          //请求体参数
          //data: `username=${user.value}&password=${pass.value}`
          data:{"x_id":this.state.x_id}
        }).then(response=>{
            // //响应状态码
            // console.log('/api/login',response.status);
            // //响应状态字符串
            // console.log('/api/login',response.statusText);
            // //响应头信息
            // console.log('/api/login',response.headers);
            //响应体
            console.log('/my/getdetails',response.data.x_state);
            
            var tmpState = JSON.parse(response.data.x_state)
            // console.log(JSON.parse(response.data.x_state))
            this.setState({projectDetails:tmpState})
      
            PubSub.publish('getXState',{...this.state.projectDetails})
            
        })


      })
      
    }
    // else{
    //   console.log(this.state.x_id)
    // }

    
    
  }
  render() {
    //console.log('ijouihuhiu',this.props.location.state.state)
    return (
      <div className='bigmain'>
          <div className='cantainerofLM' id = 'cantainerofLM'>
            <LeftBar></LeftBar>
            <Main  x_id={this.props.location.state?this.props.location.state.x_id:0}></Main>
          </div>

   
      </div>
    )
  }
}
