import React, { Component } from 'react'
import PubSub from 'pubsub-js'
import {
  CaretRightOutlined,ArrowRightOutlined
 } from '@ant-design/icons';
 import { Form, Input, Button, Checkbox} from 'antd';
import 'antd/dist/antd.css'
import'./index.css'

export default class index extends Component {

    delLine=()=>{
        //console.log(1584)
        PubSub.publish('delLine',this.props.location.state.id)
    }

    delRela=()=>{
      //console.log(1584)
      PubSub.publish('delRela',this.props.location.state.id)
  }
  render() {
    
    console.log('156',this.props)
    //   console.log(this.props.location.state.type)
    return (
      <div className='rightBarForLine'>
        {
          this.props.location.state.type!='RELA'?
          <div>
              <div>
                  <div style={{backgroundColor:'#abc',width:180+'px',height:1+'px',marginTop:30+'px',marginLeft:'auto',marginRight:'auto'}}></div>
                  <div className='lineTypeInRight' style={{marginLeft:'auto',marginRight:'auto',width:15+'px',marginBottom:50+'px'}}>{this.props.location.state.type}</div>
              </div>

              <Button  type="primary" className='delLine' style={{marginLeft:'auto',marginRight:'auto',display:'block'}} onClick={this.delLine}>删除此连线</Button>
          </div>:
          <div>
              <div>
                  <div style={{backgroundColor:'rgb(56, 149, 255)', opacity: 0.3,width:180+'px',height:10+'px',marginTop:30+'px',marginLeft:'auto',marginRight:'auto'}}>
                    <CaretRightOutlined style={{ position: 'absolute',right:'15px',top:'20px',fontSize:30+'px',color:'rgb(56, 149, 255)'}}/>
                  </div>
                  
              </div>

              <Button  type="primary" className='delLine' style={{marginLeft:'auto',marginRight:'auto',display:'block',marginTop:'30px'}} onClick={this.delRela}>删除此连线</Button>

          </div>
        }


      </div>
    )
  }
}
