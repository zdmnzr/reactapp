import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import {
 CaretRightOutlined,ArrowRightOutlined
} from '@ant-design/icons';
import 'antd/dist/antd.css'
import './index.css'

class Rela extends Component {


  
 // drawLine = (startObj, endObj, index) => {
    //     // 起点元素中心坐标
    //     const startY = startObj.y;
    //     const startX = startObj.x;

    //     // 终点元素中心坐标
    //     const endY = endObj.y;
    //     const endX = endObj.x;

    //     // 用勾股定律计算出斜边长度及其夹角（即连线的旋转角度）
    //     const lx = endX - startX;
    //     const ly = endY - startY;
    //     // 计算连线长度 
    //     const length = Math.sqrt(lx * lx + ly * ly);
    //     // 弧度值转换为角度值
    //     const c = 360 * Math.atan2(ly, lx) / (2 * Math.PI);

    //     // 连线中心坐标
    //     const midX = (endX + startX) / 2;
    //     const midY = (endY + startY) / 2
    //     const deg = c <= -90 ? (360 + c) : c; // 负角转换为正角

    //     return (
    //       <div className="line" style={{top: midY, left: midX - length / 2,  length, transform: `rotate(${deg}deg)`, borderColor: colorList[index]}}/>
    //             )
    //     }

    componentDidMount(){
      const contentBox= document.getElementById('contentBox')
      contentBox.oncontextmenu=function(e){
        e.preventDefault();
      }
    }
    anxia=(event)=>{
      event.preventDefault();
    }

  clickRela=(event)=>{
    //alert(2521)
    // console.log(event)
    // console.log(this.props.line.id)
    this.props.history.replace(`/bigmain/RightBarForLine`,{id:this.props.rela.id,type:this.props.rela.type,x_id:this.props.x_id});
    event.stopPropagation();
  }





  render() {
    console.log('哈哈',this.props)
    var{pics,rela} = this.props
    for(let j = 0; j<pics.length; j++){
        if(rela.fromId==pics[j].id){
            rela = {...rela,fromX:pics[j].x,fromY:pics[j].y,fromarelaHeight:pics[j].height}
        }
        if(rela.toId==pics[j].id){
            rela = {...rela,toX:pics[j].x,toY:pics[j].y,toarelaHeight:pics[j].height}
        }
    }
    //console.log(rela);
    const startY = rela.fromY+rela.fromarelaHeight/2;
    const startX = rela.fromX+rela.fromarelaHeight/2;

    // 终点元素中心坐标
    const endY = rela.toY+rela.toarelaHeight/2;
    const endX = rela.toX+rela.toarelaHeight/2;

    // 用勾股定律计算出斜边长度及其夹角（即连线的旋转角度）
    const lx = endX - startX;
    const ly = endY - startY;
    // 计算连线长度
    const length = Math.sqrt(lx * lx + ly * ly);
    // 弧度值转换为角度值
    const c = 360 * Math.atan2(ly, lx) / (2 * Math.PI);

    // 连线中心坐标
    const midX = (endX + startX) / 2;
    const midY = (endY + startY) / 2
    const deg = c <= -90 ? (360 + c) : c; // 负角转换为正角

    const arela = {startY,startX,endY,endX,lx,ly,length,c,midX,midY,deg,type:rela.type}
    //console.log('arela',arela);

   
      return (
        <div onMouseDown={this.anxia}>
            <div className="rela"  onClick={this.clickRela}
            style={{zIndex:'10', top: arela.midY-5+'px', position: 'absolute', left: arela.midX - arela.length / 2+40+'px', width:arela.length-80+'px',height:'10px', backgroundColor:'rgb(56, 149, 255)', opacity: 0.3, transform: `rotate(${arela.deg}deg)`}}>
                {/* <div>bbhh</div> */}
                <CaretRightOutlined style={{ position: 'absolute',right:'-15px',top:'-10px',fontSize:30+'px',color:'rgb(56, 149, 255)'}}/>
                
            </div>
          
        </div>
        
    )
  }
}
export default withRouter(Rela)