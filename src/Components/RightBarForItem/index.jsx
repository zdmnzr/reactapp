import React, { Component } from 'react'
import PubSub from 'pubsub-js'
import {withRouter} from 'react-router-dom'
import { Slider, Button, Input } from 'antd';
import { Menu, Dropdown, Space } from 'antd';
import 'antd/dist/antd.css'
import './index.css'

class RightBar extends Component {

//   debounce=(func, ms)=>{
//     let timer;
//     return function () {
//         if (timer) {
//         clearTimeout(timer)
//         }
//         timer = setTimeout(() => {
//         func()
//         }, ms)
//     }
// }


// componentDidMount(){

//   this.btnToLink.addEventListener('click',this.debounce(this.clickToLink('Play'),500))

// }


  delItem = (id)=>{
    return()=>{
      PubSub.publish('delItem',id)
    }
  }



  handleKeyUp = (id)=>{
    return(event)=>{
      if(event.key !== 'Enter') return
      if(event.target.value.trim() === ''){
        alert('输入不可以为空')
        return
      }
      
      PubSub.publish('contentItem',{id,value:event.target.value})
      event.target.value = ''
    }
  }


  resizeItem = (event)=>{

      PubSub.publish('biggerItem',{id:this.props.location.state.item_id,num:event})
   
  }

  clickAddSun=()=>{
    //alert('选择你想要添加为子节点的节点')
    PubSub.publish('AddSun',{id:this.props.location.state.item_id})
  }

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

  clickToLink=(type)=>{
    return()=>{
      PubSub.publish('clickToLink',{type,id:this.props.location.state.item_id})
    }
  }

  clickAPO=(val,apo)=>{
    return()=>{
      PubSub.publish('changeAPO',{id:this.props.location.state.item_id,APO:apo,val})
    }
  }

  clickAddBoundary=()=>{
    console.log(248)
    PubSub.publish('makeBoundary',{id:this.props.location.state.item_id,fromX:this.props.location.state.x,fromY:this.props.location.state.y})
  }


  setAgentProps=()=>{
    //alert(15664685);
    //this.props.history.replace(`/bigmain/AgentProps`,{x_id:this.props.x_id});
    PubSub.publish('setAgentProps',{id:this.props.location.state.item_id})
  }
    render() {
      const menuAA = (
        <Menu>
          <Menu.Item onClick={this.clickAPO('Y','AA')}>
            Y
          </Menu.Item>
          <Menu.Item onClick={this.clickAPO('N','AA')}>
            N
          </Menu.Item>
        </Menu>
      );
      const menuAP = (
        <Menu>
          <Menu.Item  onClick={this.clickAPO('Y','AP')}>
            Y
          </Menu.Item>
          <Menu.Item  onClick={this.clickAPO('Y_','AP')}>
            Y_
          </Menu.Item>
          <Menu.Item  onClick={this.clickAPO('N','AP')}>
            N
          </Menu.Item>
        </Menu>
      );
      const menuAO = (
        <Menu>
          <Menu.Item  onClick={this.clickAPO('Y','AO')}>
            Y
          </Menu.Item>
          <Menu.Item  onClick={this.clickAPO('_','AO')}>
            _
          </Menu.Item>
        </Menu>
      );
      const menuTP = (
        <Menu>
          <Menu.Item  onClick={this.clickAPO('Y','TP')}>
            Y
          </Menu.Item>
          <Menu.Item  onClick={this.clickAPO('Y_','TP')}>
            Y_
          </Menu.Item>
          <Menu.Item  onClick={this.clickAPO('N','TP')}>
            N
          </Menu.Item>
        </Menu>
      );
      const menuTO = (
        <Menu>
          <Menu.Item  onClick={this.clickAPO('Y','TO')}>
            Y
          </Menu.Item>
          <Menu.Item  onClick={this.clickAPO('N','TO')}>
            N
          </Menu.Item>
        </Menu>
      );
        
      console.log(this.props,1515)
    // console.log('niuzi'+this.props.location.state.item_id) 
    //console.log(this.props.location.state) 
    var urlS=this.props.location.state.img_src.replace(/@/g,"/");

   //const lineSrc=['Play','And','Or','Col','Sub','ExCoop','DelO','DelP','Depend','Need']
   const lineForAgent = ['Play']
   const lineForRole = ['Col','Sub','ExCoop']
   const lineForOthers = ['And','Or','DelO','DelP','Depend','Need']
   const personalityTraits = [ 'gullibility', 'thoughtlessness', 'apathy', 'fear of unknown',  'courtesy', 'curiosity',  'diffusion of responsibility',  'greed']
    return (
      <div className='RightBarForItem'>

        <div>
          <img src={urlS} alt="MI" className='imgRightBar'/>
          <div className='itemIdInRight'>{this.props.location.state.item_id}</div>
        </div>

        <Button type="primary" className='delItem' onClick={this.delItem(this.props.location.state.item_id)} >删除此节点</Button>
        
          {
            (this.props.location.state.item_type=='Role')?
            <div>
              <Button type="primary" className='delItem' onClick={this.clickAddSun}>添加子节点</Button> 
              <Button type="primary" className='delItem' onClick={this.clickAddBoundary}>添加边界</Button> 
            </div>
            :
            <div></div>
          }
          {
            (this.props.location.state.item_type=='Agent')?
            <div>
              <Button type="primary" className='delItem' onClick={this.setAgentProps}>定义角色属性</Button> 

            </div>
            :
            <div></div>
          }
      
      
        <Slider defaultValue={40} onChange={this.resizeItem}/>

        <Input placeholder="输入节点内容，回车确认" className='contentItem' onKeyUp={this.handleKeyUp(this.props.location.state.item_id)}/>

          {
             (this.props.location.state.item_type=='Asset')?
              <Space wrap >
                <Dropdown overlay={menuAA} placement="bottomLeft">
                  <Button style={{marginLeft:'53px'}}>A</Button>
                </Dropdown>
                <Dropdown overlay={menuAP} placement="bottom">
                  <Button>P</Button>
                </Dropdown>
                <Dropdown overlay={menuAO} placement="bottomRight">
                  <Button>O</Button>
                </Dropdown>
              </Space>
              :
              <div></div>
          }
          {
             (this.props.location.state.item_type=='Task')?
              <Space wrap  >
   
                <Dropdown overlay={menuTP} placement="bottom">
                  <Button style={{marginLeft:'75px'}}>P</Button>
                </Dropdown>
                <Dropdown overlay={menuTO} placement="bottomRight">
                  <Button>O</Button>
                </Dropdown>
              </Space>
              :
              <div></div>
          }

          {
            (this.props.location.state.item_type=='Role')?
            lineForRole.map((name,index) => {
              return <Button onClick={this.debounce(this.clickToLink(name),500)} className='lineButton' key={index }>{name}</Button> 
              //return <Button onClick={this.promptToLink(name)} className='lineButton' key={index }>{name}</Button> 
            })
            :this.props.location.state.item_type=='Agent'?
            <div>
              {
                lineForAgent.map((name,index) => {
                return <Button onClick={this.debounce(this.clickToLink(name),500)}  className='lineButton' key={index }>{name}</Button> 
                //return <Button onClick={this.promptToLink(name)} className='lineButton' key={index }>{name}</Button> 
                })
              }
              <div className='renwuProps' style={{height:'80px'}}> 安全意识：{this.props.location.state.safe?this.props.location.state.safe:'未定义'}</div>
              <div className='renwuProps' style={{height:'80px',overflow:'auto'}}> 个性特征：{this.props.location.state.pers?
              this.props.location.state.pers.map(item=>{
                return <span>{personalityTraits[item]}、 </span>
              })
              :'未定义'}</div>

              <div className='renwuProps' style={{height:'80px',overflow:'auto'}}> 能力：{this.props.location.state.ability?
              this.props.location.state.ability.map(item=>{
                          return <span> {item}、 </span>
                        })
                        :'未定义'}</div>
            </div>

            :
            lineForOthers.map((name,index) => {
              return <Button onClick={this.debounce(this.clickToLink(name),500)} className='lineButton' key={index }>{name}</Button> 
            })
          }


      </div>
    )
  }
}
export default withRouter(RightBar)