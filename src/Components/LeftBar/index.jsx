import React, { Component } from 'react'
import PubSub from 'pubsub-js'
import {nanoid} from "nanoid";
import './index.css'


export default class index extends Component {

state={nums:0}

  // click=(event)=>{
  //   PubSub.publish('addItem',{id:nanoid(),content:'',url:event.target.src,height:100,x:500,y:300})
  // }


  click=(event)=>{
    var a = event.target.src.lastIndexOf('/')+1
    var b = event.target.src.indexOf('.')
    console.log(event.target.src)
    PubSub.publish('addItem',{id:this.state.nums,
                              type:event.target.src.slice(a,b),
                              content:event.target.src.slice(a,b),
                              url:`/pic/${event.target.src.slice(a,b)}.png`,
                              height:80,
                              x:0,
                              y:0})
    this.setState({nums:this.state.nums+1})
  }


  // mouseDownNaviPoint=(event)=>{
  //   let x = event.nativeEvent.layerX;
  //   let y = event.nativeEvent.layerY;
  //   event.preventDefault();
  //   let view = document.getElementById('view');
  //   view.onmousemove = (event)=>{
  //     let left = event.pageX;
  //     let top = event.pageY;
  //     PubSub.publish('changeNaviPosition',{id:this.props.id,y:top-35-200-y+view.scrollTop,x:left-220-200-x+view.scrollLeft})
  //     // this.props.changeY(id,top-15-200-y+view.scrollTop);  //Main这个item的event.target.offsetTop
  //     // this.props.changeX(id,left-200-200-x+view.scrollLeft); //Main这个item的event.target.offsetLeft
  //   };
  //   //为document绑定一个鼠标松开事件
  //   view.onmouseup = ()=>{
  //     //当鼠标松开时，被拖拽元素固定在当前位置	onmouseup
  //     //取消document的onmousemove事件
  //     view.onmousemove = null;
  //     //取消document的onmouseup事件
  //     view.onmouseup = null;
  //   };
  // }
  tuodong=(event)=>{
    event.preventDefault();
    let src = event.target.src
    console.log(event.target.src,1)
    let view = document.getElementById('view');
    let cantainerofLM = document.getElementById('cantainerofLM');
    cantainerofLM.onmousemove = (event)=>{

    };
    //为document绑定一个鼠标松开事件
    cantainerofLM.onmouseup = (event)=>{
      console.log(event,2)
      var a = src.lastIndexOf('/')+1
      var b = src.indexOf('.')
  
      if(event.clientX>200){
        PubSub.publish('addItem',{id:this.state.nums,
          type:src.slice(a,b),
          content:src.slice(a,b),
          url:`/pic/${src.slice(a,b)}.png`,
          height:80,
          x:event.clientX-450+view.scrollLeft,
          y:event.clientY-250+view.scrollTop})
        this.setState({nums:this.state.nums+1})
      }
      // PubSub.publish('addItem',{id:this.state.nums,
      //                           type:src.slice(a,b),
      //                           content:src.slice(a,b),
      //                           url:src,
      //                           height:80,
      //                           x:event.clientX-450+view.scrollLeft,
      //                           y:event.clientY-250+view.scrollTop})
      // this.setState({nums:this.state.nums+1})
      //当鼠标松开时，被拖拽元素固定在当前位置	onmouseup
      //取消document的onmousemove事件
      cantainerofLM.onmousemove = null;
      //取消document的onmouseup事件
      cantainerofLM.onmouseup = null;
    };
  }

  componentDidMount(){
    this.token = PubSub.subscribe('itemNum',(_,Obj)=>{
      if(Obj.pics.length!=0){
        this.setState({nums:Obj.pics[0].id+1})
      }
      else{
        this.setState({nums:0})
      }
      //console.log(this.state.nums)
    })
  }

  componentWillUnmount(){
    PubSub.unsubscribe(this.token)
  }

  // itemLink=(type)=>{
  //   return()=>{
  //     // console.log(type);
  //     PubSub.publish('linkItem',type)
  //   }
  // }
  render() {
    const imgSrc=['/pic/Agent.png',
                  '/pic/Role.png',
                  '/pic/Task.png',
                  '/pic/Goal.png',
                  '/pic/Asset.png'
                ]

    return (
        <div className='leftBox'>
          {
            imgSrc.map((src,index) => {
              return <img className='leftImg' src={src} alt="niu" onClick={this.click} onMouseDown={this.tuodong} key={index }/>
            })
          }
          {/* <button onClick={this.itemLink('DO')}>DO连接</button> */}
        </div>

    )
  }
}
