import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import PubSub from 'pubsub-js'
import { Input } from 'antd';
import { FullscreenOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css'
import './index.css'


class Item extends Component {
    
    state = {onDbClick:false,    //被双击否
             checkedItem:false,     //被选中否
            //  rightClicked:{x:undefined,y:undefined,clicked:false}
            rightClicked:false
    }

    addSun=(fid)=>{  

        console.log(6255)
        PubSub.publish('stopAddSun',{fid,id:this.props.id,content:this.props.content,type:this.props.type})
    }

    hh = (fid,type)=>{
      PubSub.publish('stopClickToLink',{fid,id:this.props.id,content:this.props.content,type})
    }

    componentDidMount(){
      var tmp
      this.token = PubSub.subscribe('AddSun',(_,Obj)=>{
        tmp = this.addSun.bind(this,Obj.id)
        //console.log('AddSun')
        if(this.props.id !== Obj.id){

          this.item.addEventListener('click',tmp)
          this.item.style.color='rgb(27, 116, 204)'
          
          this.item.style.transitionDuration="1s";
          //PubSub.publish('f&sInformation',{f_id:Obj.id,id:this.props.id,content:this.props.content,type:this.props.type})
        }
        //this.item.addEventListener('click',this.addSun)
        //执行完回调后，把全局状态设置成已执行，在后续的didmount中，如果检测到是已执行，就不绑定事件
      })
      this.token1 = PubSub.subscribe('stopAddSun',(_,Obj)=>{
          this.item.removeEventListener('click',tmp)
          this.item.style.color='black'
  
      })

      var tmp2
      this.token = PubSub.subscribe('clickToLink',(_,Obj)=>{
        tmp2 = this.hh.bind(this,Obj.id,Obj.type)
        //console.log('AddSun')
        if(this.props.id !== Obj.id){

          this.item.addEventListener('click',tmp2)
          this.item.style.color='rgb(27, 16, 224)'
          
          this.item.style.transitionDuration="1s";
          //PubSub.publish('f&sInformation',{f_id:Obj.id,id:this.props.id,content:this.props.content,type:this.props.type})
        }
        //this.item.addEventListener('click',this.addSun)
        //执行完回调后，把全局状态设置成已执行，在后续的didmount中，如果检测到是已执行，就不绑定事件
      })
      this.token1 = PubSub.subscribe('stopClickToLink',(_,Obj)=>{
          this.item.removeEventListener('click',tmp2)
          this.item.style.color='black'
  
      })
    }


    mouseDownNaviPoint=(event)=>{
      let x = event.nativeEvent.layerX;
      let y = event.nativeEvent.layerY;
      event.preventDefault();
      let view = document.getElementById('view');
      view.onmousemove = (event)=>{
        let left = event.pageX;
        let top = event.pageY;
        PubSub.publish('changeNaviPosition',{id:this.props.id,y:top-35-200-y+view.scrollTop,x:left-220-200-x+view.scrollLeft})
        // this.props.changeY(id,top-15-200-y+view.scrollTop);  //Main这个item的event.target.offsetTop
        // this.props.changeX(id,left-200-200-x+view.scrollLeft); //Main这个item的event.target.offsetLeft
      };
      //为document绑定一个鼠标松开事件
      view.onmouseup = ()=>{
        //当鼠标松开时，被拖拽元素固定在当前位置	onmouseup
        //取消document的onmousemove事件
        view.onmousemove = null;
        //取消document的onmouseup事件
        view.onmouseup = null;
      };
    }
    mouseDown = (id)=>{
      return (event)=>{
        this.item.style.color = 'rgb(71, 133, 234)'
        this.item.style.transitionDuration="0.5s";
        var x = event.nativeEvent.layerX;
        var y = event.nativeEvent.layerY;
        event.preventDefault();
        var view = document.getElementById('view');
        view.onmousemove = (event)=>{
          var left = event.pageX;
          var top = event.pageY;
          this.props.changeY(id,top-15-200-y+view.scrollTop);  //Main这个item的event.target.offsetTop
          this.props.changeX(id,left-200-200-x+view.scrollLeft); //Main这个item的event.target.offsetLeft
				};
        //为document绑定一个鼠标松开事件
        view.onmouseup = ()=>{
          //当鼠标松开时，被拖拽元素固定在当前位置	onmouseup
          this.item.style.color = 'black'
          //清楚其相关的rela
          if(this.props.type!='Role'&&this.props.type!='Agent'){
            PubSub.publish('clearRela',{id:this.props.id})
          }

          //console.log(4845,this.props.boundaries)
          let boundaries = []
          this.props.pics.forEach(item=>{
            if(item.boundary){
              boundaries.push(item.boundary)
            }
          })
          boundaries.forEach(boundary=>{
            if(this.props.x>boundary.fromX && this.props.x<boundary.fromX+boundary.width && this.props.y>boundary.fromY && this.props.y<boundary.fromY+boundary.height){
              PubSub.publish('stopAddSun',{fid:boundary.fid,id:this.props.id,type:'RELA'})
              return
            }
          })

          //取消document的onmousemove事件
          view.onmousemove = null;
          //取消document的onmouseup事件
          view.onmouseup = null;
        };
      }  
    }

      clickItem=(id,url)=>{
        // var urlS=url.replace(/\//g,"@");
        //console.log(urlS);
        return(event)=>{
          //console.log(15615,url)
          event.cancelBubble = true;
          //this.props.history.push(`/bigmain`,{x_id:this.props.x_id});
          if(this.props.type=='Asset'){
            this.props.history.replace(`/bigmain/RightBarForItem`,{item_id:id,img_src:url,x_id:this.props.x_id,item_type:this.props.type,item_A:this.props.Access,item_P:this.props.Permission,item_O:this.props.Ownership});
          }else if(this.props.type=='Task'){
            this.props.history.replace(`/bigmain/RightBarForItem`,{item_id:id,img_src:url,x_id:this.props.x_id,item_type:this.props.type,item_P:this.props.Permission,item_O:this.props.Obligation});
          }
          else if(this.props.type=='Role'){
            this.props.history.replace(`/bigmain/RightBarForItem`,{item_id:id,img_src:url,x_id:this.props.x_id,item_type:this.props.type,x:this.props.x,y:this.props.y});
          }else if(this.props.type=='Agent'){
            this.props.history.replace(`/bigmain/RightBarForItem`,{item_id:id,img_src:url,x_id:this.props.x_id,item_type:this.props.type,x:this.props.x,y:this.props.y,safe:this.props.safe,ability:this.props.ability,pers:this.props.pers});
          }
          else{
            this.props.history.replace(`/bigmain/RightBarForItem`,{item_id:id,img_src:url,x_id:this.props.x_id,item_type:this.props.type});
          }
          //event.cancelBubble = true;
          event.stopPropagation();
        }
      }
      onmousedown=(event)=>{
        event.preventDefault()
      }

      dbClick = ()=>{
        //alert(152)
        this.setState({onDbClick:true})
      }
      ibnputOnBlur=(event)=>{
        console.log(this.props.id,event.target.value)
        PubSub.publish('contentItem',{id:this.props.id,value:event.target.value})
        this.setState({onDbClick:false})
      }
      inputKeyUp = (event)=>{
        
          if(event.key !== 'Enter') return
          if(event.target.value.trim() === ''){
            alert('输入不可以为空')
            return
          }
          
          PubSub.publish('contentItem',{id:this.props.id,value:event.target.value})
          this.setState({onDbClick:false})
      }

      rightClick=(event)=>{
        // let newRightClicked = {x:event.nativeEvent.layerX,y:event.nativeEvent.layerY,clicked:true}
        // this.setState({rightClicked:newRightClicked},()=>{
        //   console.log(this.state.rightClicked)
        // })

        this.setState({rightClicked:true},()=>{
          console.log(this.state.rightClicked)
        })
        return false;
      }
  render() {
    
    return (

            <div className='item' onContextMenu={this.rightClick} ref={currentNode => this.item = currentNode } onClick={this.clickItem(this.props.id,this.props.url)} onDoubleClick={this.dbClick} style={{zIndex:'2'}}>
                <div onMouseDown={this.mouseDown(this.props.id)} style={{zIndex:2,backgroundImage:"url("+this.props.url+")", backgroundSize:'cover',height:this.props.height+'px',width:this.props.height+'px', backgroundRepeat:'no-repeat',position:'absolute',left:this.props.x+'px',top:this.props.y+'px'}}>      
                    <div className='itemContent' style={{height:0.4*this.props.height+'px',width:0.7*this.props.height+'px',marginTop:0.3*this.props.height+'px',marginLeft:0.15*this.props.height+'px',textAlign: 'center',whiteSpace: 'pre-wrap',wordBreak: 'break-all',fontSize:'1px'}}>{this.props.content}</div>
                    <div className='itemId' style={{fontWeight:'500',fontSize:0.1*this.props.height+'px',fontStyle:'italic',position:'absolute',left:0.07*this.props.height+'px',top:0.07*this.props.height+'px'}}>{this.props.id}</div>
                    {
                      (this.props.type=='Asset')?
                      <div className='APO' style={{zIndex:3,height:0.25*this.props.height+'px',width:0.5*this.props.height+'px', backgroundRepeat:'no-repeat',position:'absolute',right:-(this.props.height*0.25)+'px',top:(this.props.height*0.2)+'px'}}>
                        <div className='APOcontent' style={{lineHeight:0.24*this.props.height+'px',fontSize:0.15*this.props.height+'px'}}>{this.props.Access},{this.props.Permission},{this.props.Ownership}</div>
                      </div>
                      :
                      (this.props.type=='Task')?
                      <div className='PO' style={{zIndex:3,height:0.23*this.props.height+'px',width:0.4*this.props.height+'px', backgroundRepeat:'no-repeat',position:'absolute',right:-(this.props.height*0.15)+'px',top:(this.props.height*0.2)+'px'}}>
                        <div className='APOcontent' style={{lineHeight:0.22*this.props.height+'px',fontSize:0.15*this.props.height+'px'}}>{this.props.Permission},{this.props.Obligation}</div>
                      </div>
                      :
                      <div />
                    }
                </div> 
                {
                  this.state.onDbClick?
                  <Input defaultValue={this.props.content} onBlur={this.ibnputOnBlur} onKeyUp={this.inputKeyUp} style={{ zIndex:'15',height:0.4*this.props.height+'px',width:0.7*this.props.height+'px',position:'absolute',left:0.155*this.props.height+this.props.x+'px',top:0.3*this.props.height+this.props.y+'px'}}/>
                  :
                  <div />
                }
                {
                  this.props.boundary?
                  <div className='boundary' style={{height:this.props.boundary.height+'px',width:this.props.boundary.width+'px',position:'absolute',left:0.5*this.props.height+this.props.x+'px',top:0.5*this.props.height+this.props.y+'px',zIndex:'1'}}>
                    {/* <FullscreenOutlined className='naviPoint' ref={currentNode => this.naviPoint = currentNode } onMouseDown={this.mouseDownNaviPoint}/> */}
                    <div className='naviPoint' ref={currentNode => this.naviPoint = currentNode } onMouseDown={this.mouseDownNaviPoint}>
                        
                    </div>
                  </div>
                  :
                  <div></div>
                }
                {/* {
                  this.state.rightClicked?
                  <div style={{border:'1px solid red' ,zIndex:'12',position:'absolute',left:0.5*this.props.height+this.props.x+'px',top:0.5*this.props.height+this.props.y+'px'}}>
                    gg
                  </div>
                  :
                  <div />
                } */}
            </div>
    )
  }
}

export default withRouter(Item);