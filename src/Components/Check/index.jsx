import React, { Component } from 'react'
import axios from 'axios'
import { Form, Input, Button, Checkbox,Radio} from 'antd';
import './index.css'

export default class index extends Component {
    state={check:[]}
    componentDidMount(){
        this.props.history.location.state.state.Answer_statePic.forEach(item=>{
            if(item.slice(0,5)=='asset'){
                this.state.check.push(false)
            }
        })
        console.log(this.state.check,12)
    }



    checkState = new Set()
    checkRes = ()=>{
        const res = [];
        this.checkState.forEach(item=>{
            res.push(`attack(A,B,C,${item.slice(6,-1)},L)`)
        })
        console.log(res)


            
        axios({
            headers: {
            'Content-Type': 'application/json'     //data:{"vipp":"10","level2":"30"}
            //'Content-Type': 'application/x-www-form-urlencoded'      //data: `username=${user.value}&password=${pass.value}`
            },
        //请求方法
            method : 'POST',
            //url
            url: 'rule/checkRes',
            //请求体参数
            //data: `username=${user.value}&password=${pass.value}`
            data:{"Queries":JSON.stringify(res)}
        }).then(response=>{
    
            //响应体
            //console.log('/my/toTxt',response.data.statePic,response.data.stateLine);  
            // this.props.history.replace(`/check`,{state:response.data});
            // this.props.history.replace(`/check`,{id:this.props.line.id,type:this.props.line.type,x_id:this.props.x_id});
        })
          

    }

    checkItem = (index)=>{
        return(event)=>{
            console.log(event)
            if(this.checkState.has(event.target.value)){
                this.checkState.delete(event.target.value)
            }
            else{
                this.checkState.add(event.target.value)
            }
            let tmpcheck = this.state.check.map((item,i)=>{
                console.log(i,index,'hhhh')
                if(i==index){return (!item)}
                else{return item}
            })
            this.setState({check:tmpcheck})
            console.log(this.state.check)
        }

    }
    checkAllItems=()=>{
        let tmpcheck = this.state.check.map(()=>{
            {return true}
        })
        this.setState({check:tmpcheck})
        // this.setState({checkAll:!this.state.checkAll},()=>{
            
            this.checkState = new Set();
     
                this.props.history.location.state.state.Answer_statePic.forEach(item=>{
                    if(item.slice(0,5)=='asset'){
                        this.checkState.add(item)
                    }
                })
                this.setState({})
       

        // })

    }
    render() {
        console.log(this.checkState)
        console.log(this.props.history.location.state)
        const {Answer_statePic,Answer_stateLine,Answer_AssetAPO,Answer_TaskPO,Answer_Character} = this.props.history.location.state.state
        let Answer_Asset = [];
        Answer_statePic.forEach(item=>{
            if(item.slice(0,5)=='asset'){
                Answer_Asset.push(item)
            }
        })

    
    
    return (
      <div className='checkBox'>
        {/* 这里是check页面 */}
        <div className='checkLeft'>
            <div style={{textAlign:'center',fontSize:'20px',fontWeight:'700'}}>选择资产进行检测</div>
            <div className='assets'>
                {
                   
                   Answer_Asset.map((item,index)=>{
                        // if(item.slice(0,5)=='asset')
                        return(<div style={{fontSize:'18px',fontWeight:'500'}} key={index}>{item} <Checkbox className='checkbox' style={{float:"right"}} checked={this.state.check[index]} onChange={this.checkItem(index)} value={item}></Checkbox></div>)
                    })
                }
               <Button type='primary' style={{position:"sticky",bottom:'5px',left:'50%',transform:'translateX(-50%)'}} onClick={this.checkAllItems}>全选</Button>
            </div>
    
            <div>
                <Button type='primary' style={{margin:"50px auto", display:"block"}}  onClick={this.checkRes}>查看检测结果</Button>
            </div>

            
        </div>
        <div className='checkRight'>
            <div style={{textAlign:'center',fontSize:'20px',fontWeight:'700'}}>检测结果</div>
        </div>
      </div>
    )
  }
}
