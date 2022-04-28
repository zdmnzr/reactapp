import React, { Component } from 'react'
import PubSub from 'pubsub-js'
import { nanoid } from 'nanoid'
import {Route,withRouter,Switch,Redirect} from 'react-router-dom'
import { Form, Input, Button, Checkbox,Radio} from 'antd';
import 'antd/dist/antd.css'
import Item from '../Item'
import Line from '../Line'
import Rela from '../Rela'
import RightBarForItem from '../RightBarForItem'
import RightBarForLine from '../RightBarForLine'
import BarForPage from '../BarForPage'
//import AgentProps from '../AgentProps'
import './index.css'


class Main extends Component {

  state={
          pics:[
            // {id: 0, content:'qewf', url: '/pic/Asset.png', height: 100, x: 362, y: 366},
            // {id: 1, content:'ww', url: '/pic/Goal.png', height: 100, x: 725, y: 351},
            // {id: 2, content:'ww', url: '/pic/Task.png', height: 100, x: 615, y: 129},
            // {id: 3, content:'e33r', url: '/pic/Task.png', height: 100, x: 366, y: 208}
          ],
          lines:[
            // {id:0,fromId:0,toId:1,type:'DO'},
            // {id:1,fromId:0,toId:2,type:'DP'},
            // {id:2,fromId:3,toId:1,type:'DO'},
            // {id:3,fromId:3,toId:2,type:'DP'},
          ],
          relas:[
            // {id:0,fromId:0,toId:1,type:'RELA'},
            // {id:1,fromId:0,toId:2,type:'RELA'},
            // {id:2,fromId:3,toId:1,type:'RELA'},
            // {id:3,fromId:3,toId:2,type:'RELA'},
          ],


          transZ:0,
          canvas:{height:500,width:800},
          showLink:false,
          showRela:false,
          showSetAgent:false
        }

        checkState={
          safe:[],
          pers:[false,false,false,false,false,false,false,false],
          ability:new Set()
        }
      
        componentDidMount(){

          this.token17 = PubSub.subscribe('transZToZero',(_,Obj)=>{
            this.setState({transZ:0})
            PubSub.publish('transZToZeroOK')
          })
          this.token16 = PubSub.subscribe('setAgentProps',(_,Obj)=>{
            this.setState({showSetAgent:true})
          })
          

          //PubSub.publish('changeNaviPosition',{id:this.props.id,y:top-15-200-y+view.scrollTop,x:left-200-200-x+view.scrollLeft})
          this.token15 = PubSub.subscribe('changeNaviPosition',(_,Obj)=>{
            console.log("changeNaviPosition",Obj)
            
            let tmpPics = this.state.pics.map(item=>{
              let tmp = undefined;
              if(item.id == Obj.id){
                tmp = item.boundary;
                console.log(Obj,tmp,988)
                tmp.width = Obj.x - tmp.fromX;
                tmp.height = Obj.y - tmp.fromY;
                return{...item,boundary:tmp}
              }else{
                return item;
              }
            })
            this.setState({pics:tmpPics})
          })

          this.token14 = PubSub.subscribe('clearRela',(_,Obj)=>{
            console.log('clearRela',Obj)
            let a = this.state.relas.filter(item=>{
              if(item.toId != Obj.id){
                return item
              }
            })
            this.setState({relas:a})
            //console.log(a)
          })

          this.token13 = PubSub.subscribe('makeBoundary',(_,Obj)=>{
            console.log('makeBoundary',Obj)

            // const newBounds = this.state.boundaries;
            // const newB = {fid:Obj.id, fromX:Obj.fromX, fromY:Obj.fromY, width:150, height:150,}
            // newBounds.push(newB);
            // this.setState({boundaries:newBounds})
            // console.log(newBounds,1)

            const newPics = this.state.pics;
            const tmp = newPics.map(item=>{
              if(item.id == Obj.id){
                return  ({...item,boundary:{fid:Obj.id, fromX:Obj.fromX, fromY:Obj.fromY, width:150, height:150,}})
              }
              else{
                return item;
              }
            })
            this.setState({pics:tmp})
            console.log(tmp,2)
          })

          this.token12 = PubSub.subscribe('stopClickToLink',(_,Obj)=>{
            console.log('stopClickToLink',Obj)

            const newLines = this.state.lines;
            const newObj = {id:nanoid(),fromId:Obj.fid,toId:Obj.id,type:Obj.type};
            newLines.push(newObj);

            this.setState({lines:newLines})
            console.log(newLines)
          })

          this.token11 = PubSub.subscribe('changeAPO',(_,Obj)=>{
            console.log('changeAPO',Obj)
            const{pics} = this.state;
            
            const newPics = pics.map((item)=>{
              if(item.id!=Obj.id){
                return item
              }else{
                if(Obj.APO=='AA'){
                  return({...item,Access:Obj.val})
                }else if(Obj.APO=='AP'){
                  return({...item,Permission:Obj.val})
                }else if(Obj.APO=='AO'){
                  return({...item,Ownership:Obj.val})
                }else if(Obj.APO=='TP'){
                  return({...item,Permission:Obj.val})
                }else if(Obj.APO=='TO'){
                  return({...item,Obligation:Obj.val})
                }
              
              }
            })
            this.setState({pics:newPics})


          })

          this.token10 = PubSub.subscribe('stopAddSun',(_,Obj)=>{
            console.log('stopAddSun',Obj)

            const newRelas = this.state.relas;
            const newObj = {id:nanoid(),fromId:Obj.fid,toId:Obj.id,type:'RELA'};
            newRelas.push(newObj);

            this.setState({relas:newRelas})
            console.log(newRelas)
          })




          
          var view = document.getElementById('view');
          view.addEventListener('mousewheel',this.fun,false)



          this.token0 = PubSub.subscribe('getXState',(_,state)=>{
            console.log('getXState',state)
            this.setState({...state})
            PubSub.publish('itemNum',{pics:this.state.pics})
          })

          this.token1 = PubSub.subscribe('addItem',(_,stateObj)=>{
            console.log('添加节点',stateObj)
            const {pics} = this.state;

            if(stateObj.type == 'Asset'){
              const newStateObj = {...stateObj,Access:'Y',Permission:'Y',Ownership:'Y'}
              var newPics = [newStateObj,...pics]
            }else if(stateObj.type == 'Task'){
              const newStateObj = {...stateObj,Permission:'Y',Obligation:'Y'}
              var newPics = [newStateObj,...pics]
            }else{
              var newPics = [stateObj,...pics]
            }

           
            this.setState({pics:newPics})

            console.log('wdefrghjkl',this.state)
          })
          
          this.token2 = PubSub.subscribe('atguigu2',(_,stateObj)=>{
            this.setState({...stateObj})
            console.log(stateObj)
          })

          this.token3 = PubSub.subscribe('delItem',(_,id)=>{
            console.log('delete收到',id)
            const {pics} = this.state;
            const newPics = pics.filter((pic)=>{
              return pic.id!=id
            })
            //console.log(newPics)
            this.setState({pics:newPics})

            this.props.history.replace(`/bigmain/BarForPage`,{x_id:this.props.x_id,x_state:this.state});
            
          })

          this.token4 = PubSub.subscribe('biggerItem',(_,Obj)=>{
            console.log('bigger收到')
            const{pics} = this.state;
            const newPics = pics.map((pic)=>{
              if(pic.id != Obj.id){
                return pic;
              }else{
                return {...pic,height:Obj.num*2.5}
                // if(Obj.bigger===true){
                //   return {...pic,height:(pic.height+10)}
                // }else{
                //   return {...pic,height:(pic.height-10)}
                // }
              }
            })
            this.setState({pics:newPics})
          })

          this.token5 = PubSub.subscribe('contentItem',(_,Obj)=>{
            //console.log(Obj);
            const{pics} = this.state;
            const newPics = pics.map((pic)=>{
              if(pic.id != Obj.id){
                return pic;
              }else{
                  return {...pic,content:Obj.value}
              }
            })
            this.setState({pics:newPics})
          })

          this.token6 = PubSub.subscribe('lengthCanvas',(_,event)=>{
            console.log('lengthCanvas收到',event)
            const{canvas} = this.state;
            const newCanvas = canvas;
            newCanvas.height = event*20
            this.setState({canvas:newCanvas})
          })

          this.token7 = PubSub.subscribe('widthCanvas',(_,event)=>{
            const{canvas} = this.state;
            const newCanvas = canvas;
            newCanvas.width = event*30
            this.setState({canvas:newCanvas})
          })


          this.token9 = PubSub.subscribe('delLine',(_,id)=>{
            console.log('delLine',id)
            const{lines} = this.state;
            const newLines =  lines.filter((line)=>{
              return line.id!=id
            })
            // console.log(newLines)
            this.setState({lines:newLines})
            this.props.history.replace(`/bigmain/BarForPage`,{x_id:this.props.x_id,x_state:this.state});
          })

          this.token9 = PubSub.subscribe('delRela',(_,id)=>{
            console.log('delRela',id)
            const{relas} = this.state;
            const newrelas =  relas.filter((rela)=>{
              return rela.id!=id
            })
            // console.log(newLines)
            this.setState({relas:newrelas})
            this.props.history.replace(`/bigmain/BarForPage`,{x_id:this.props.x_id,x_state:this.state});
          })


        }

        componentWillUnmount(){
          PubSub.unsubscribe(this.token1)
          PubSub.unsubscribe(this.token2)
          PubSub.unsubscribe(this.token3)
          PubSub.unsubscribe(this.token4)
          PubSub.unsubscribe(this.token5)
          PubSub.unsubscribe(this.token6)
          PubSub.unsubscribe(this.token7)
          PubSub.unsubscribe(this.token8)
          PubSub.unsubscribe(this.token9)
        }


        changeX=(id,newX)=>{
          const {pics}=this.state;
          const newPics = pics.map((item)=>{
            if(item.id === id) {
              if(!item.boundary){
                return {...item,x:newX}
              }
              else{
                let tmp = item.boundary;
                tmp.fromX = newX;
                return {...item,x:newX,boundary:tmp}
              }
            }
            else{return item}
          })
          this.setState({pics:newPics})

          // const{boundaries} = this.state;
          // const newBs = boundaries.map(item=>{
          //   if(item.fid == id){
          //     return {...item,fromX:newX}
          //   }else{
          //     return item
          //   }
          // })

          // this.setState({boundaries:newBs})
        }

        changeY=(id,newY)=>{
          const {pics}=this.state;
          const newPics = pics.map((item)=>{
            if(item.id === id) {
              if(!item.boundary){
                return {...item,y:newY}
              }
              else{
                let tmp = item.boundary;
                tmp.fromY = newY;
                return {...item,y:newY,boundary:tmp}
              }
            }
            else{return item}
          })
          this.setState({pics:newPics})

          // const{boundaries} = this.state;
          // const newBs = boundaries.map(item=>{
          //   if(item.fid == id){
          //     return {...item,fromY:newY}
          //   }else{
          //     return item
          //   }
          // })

          // this.setState({boundaries:newBs})
        }

        jsonfiy=()=>{
          const a = JSON.stringify(this.state)
          console.log(a);
        }


        fun=(event2)=>{
          const size = this.state.transZ;
          event2.preventDefault();
          if(event2.deltaY < 0){
            //向上滚，box1变短
            this.setState({transZ:size+30})
            // this.a = this.a+30 
            // this.setState();
            console.log('往上')
          }else{
            //向下滚，box1变长
            this.setState({transZ:size-30})
            // this.a = this.a-30 
            // this.setState();
            console.log('向下')
          }
        }

        clickMainContent=()=>{
          //console.log(15151515)
          this.props.history.replace(`/bigmain/BarForPage`,{x_id:this.props.x_id,x_state:this.state});
        }
        showLink=(event)=>{
          console.log(event.target.checked)
          if(event.target.checked){
            this.setState({showLink:true})
          }else{
            this.setState({showLink:false})
          }
          //event.stopPropagation();
        }
        showRela=(event)=>{
          console.log(event.target.checked)
          if(event.target.checked){
            this.setState({showRela:true})
          }else{
            this.setState({showRela:false})
          }
          // event.stopPropagation();
          // event.cancelBubble = true;
        }

        deleteSetAgent=()=>{
          this.setState({showSetAgent:false})
        }
        doSetAgent=()=>{
          //把里面唯一的agent加上角色设置
          let pers = [];
          this.checkState.pers.forEach((item,index)=>{
            if(item==true)
            pers.push(index)
          })
          let ability = [];
          this.checkState.ability.forEach(item=>{
            ability.push(item)
          })

          let tmpPics = this.state.pics.map(item=>{
            if(item.type == 'Agent'){
              return ({...item,safe:this.checkState.safe[0],pers:pers,ability:ability})
            }else{
              return item;
            }
          })
          this.setState({pics:tmpPics})

          //console.log(58468,tmpPics,this.state.pics);
          this.setState({showSetAgent:false})
        }
        oneCheck=(event)=>{
          //console.log(event)
          while(this.checkState.safe.length!=0){
            this.checkState.safe.pop()
          }
          this.checkState.safe.push(event.target.value)
          console.log(this.checkState.safe)
        }
        manyCheck=(event)=>{
          //console.log(event.target.value)
          this.checkState.pers[event.target.value] = !this.checkState.pers[event.target.value];
          console.log(this.checkState.pers)
        }
        manyCheck2=(event)=>{
          if(this.checkState.ability.has(event.target.value)){
            this.checkState.ability.delete(event.target.value)
          }
          else{
            this.checkState.ability.add(event.target.value)
          }
          console.log(this.checkState.ability)
        }
     
  render() {
    const safetyAwareness = ['high','middle','low']
    const personalityTraits = [ 'gullibility', 'thoughtlessness', 'apathy', 'fear of unknown',  'courtesy', 'curiosity',  'diffusion of responsibility',  'greed']
    const ability = [];

    this.state.pics.forEach(item=>{
      if(item.type=='Goal'){
        //this.checkState.ability[item.content] = false;
        ability.push(item.content);
      }
    })
    //console.log("edwed",this.checkState)
    //console.log('erfeuifhwiehfuw',this.props)

    return (
      <div className='niuzirui'>


        <div className='mainViewBox'   id='view' >
          {
            this.state.showSetAgent?
            <div className='qiguaiddx'>
              <div>
                <div className='checkTitle'>Safety Awareness：</div>
                <Radio.Group style={{marginLeft:'30px'}}>
                  {
                    safetyAwareness.map((item,index)=>{
                      return <Radio key={index} value={item} onChange={this.oneCheck}>{item}</Radio>
                    })
                  }
                </Radio.Group>

              </div>
              <div>
                <div className='checkTitle'>Personality Traits：</div>
                <div style={{marginLeft:'30px'}}>
                  {
                    personalityTraits.map((item,index)=>{
                      return <Checkbox key={index} value={index} onChange={this.manyCheck} >{item}</Checkbox>
                    })
                  }
                </div>
              </div>
              <div>
                <div className='checkTitle'>Ability：</div>
                <div style={{marginLeft:'30px'}}>
                  {
                    ability.map((item,index)=>{
                      return <Checkbox key={index} value={item} onChange={this.manyCheck2}>{item}</Checkbox>
                    })
                  }
                </div>
              </div>
              <div className='renwubtn'>
                <Button onClick={this.doSetAgent} type='primary'>确认</Button>
                <Button style={{marginLeft:'30px'}} onClick={this.deleteSetAgent}>取消</Button>
              </div>

            </div>
            :
            <div></div>
          }
          {/* <div className='qiguaiddx'>
            
          </div> */}
          <div className='mainContent' onClick={this.clickMainContent} id='contentBox' ref={currentNode => this.mainContent = currentNode } style={{transform: `translateZ(${this.state.transZ}px)`,width:this.state.canvas.width+'px',height:this.state.canvas.height+'px'}}>

            {/* <Link replace to={ {pathname:`/bigmain/BarForPage`,state:{x_id:this.props.x_id,x_state:this.state}}}>BarForPage</Link> */}
            
              {
                this.state.pics.map((pic)=>{
                  return (
                    <div key={pic.id}>
                      <Item {...pic} boundaries={this.state.boundaries} pics={this.state.pics} x_id={this.props.x_id} changeX={this.changeX} changeY={this.changeY} ></Item>
                    </div>
                  )
                })
              }
           
              {
                this.state.showLink?
                this.state.lines.map((line)=>{
                  return (
                    <div key={line.id}>
                      <Line line={line} x_id={this.props.x_id} pics={this.state.pics}/>
                    </div>
                  )
                }):
                <div></div>
              }

              {
                this.state.showRela?
                this.state.relas.map((rela)=>{
                  return (
                    <div key={rela.id}>
                      <Rela rela={rela} x_id={this.props.x_id} pics={this.state.pics}/>
                    </div>
                  )
                }):
                <div></div>
              }
              
              {/* <Button onClick={this.jsonfiy}>jsonfiy</Button>  */}
              <div style={{position: 'absolute',right:'10px',bottom:'10px'}}  onClick={e=>e.stopPropagation()}>
                
                  <Checkbox checked={this.state.showLink} onChange={this.showLink}>显示连接</Checkbox>
                  <Checkbox checked={this.state.showRela} onChange={this.showRela}>显示关系</Checkbox>
                
              </div>
             
          </div>

          
        </div>
        <Switch> 
          {/* <Route path="/bigmain/AgentProps" component={AgentProps}/> */}
          <Route path="/bigmain/RightBarForItem" component={RightBarForItem}/>
          <Route path="/bigmain/BarForPage" component={BarForPage}/>
          <Route path="/bigmain/RightBarForLine" component={RightBarForLine}/>
          <Redirect replace to={ {pathname:`/bigmain/BarForPage`,state:{x_id:this.props.x_id,x_state:this.state}}}/>
        </Switch>
      </div>
    )
  }
}

export default withRouter(Main)
