import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import { CaretRightOutlined,CaretLeftOutlined,MinusOutlined,RightCircleOutlined,RightCircleFilled } from '@ant-design/icons';
import 'antd/dist/antd.css'
import './index.css'

class Line extends Component {

  state={
    margin:80,
  }
  
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

  rightClickLine=(event)=>{
    // console.log(event)
    // console.log(this.props.line.id)
    this.props.history.replace(`/bigmain/RightBarForLine`,{id:this.props.line.id,type:this.props.line.type,x_id:this.props.x_id});
    event.stopPropagation();
  }





  render() {
    //console.log('哈哈',this.props)
    var{pics,line} = this.props
    for(let j = 0; j<pics.length; j++){
        if(line.fromId==pics[j].id){
            line = {...line,fromX:pics[j].x,fromY:pics[j].y,fromaLineHeight:pics[j].height}
        }
        if(line.toId==pics[j].id){
            line = {...line,toX:pics[j].x,toY:pics[j].y,toaLineHeight:pics[j].height}
        }
    }
    //console.log(line);
    const startY = line.fromY+line.fromaLineHeight/2;
    const startX = line.fromX+line.fromaLineHeight/2;

    // 终点元素中心坐标
    const endY = line.toY+line.toaLineHeight/2;
    const endX = line.toX+line.toaLineHeight/2;

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

    const aLine = {startY,startX,endY,endX,lx,ly,length,c,midX,midY,deg,type:line.type}
    //console.log('aline',aLine);

   
      return (
        <div onMouseDown={this.anxia}>

        {/* {
              (aLine.type=='Play' || aLine.type=='Or' || aLine.type=='DelO' || aLine.type=='DelP' || aLine.type=='Depend' || aLine.type=='Sub')?
              <div className="line"  onClick={this.rightClickLine}
              style={{zIndex:'10', top: aLine.midY, position: 'absolute',  left: aLine.midX - aLine.length / 2+60+'px', width:aLine.length-120+'px',height:'1px', backgroundColor:'rgb(0, 0, 0)',  transform: `rotate(${aLine.deg}deg)`}}>
                  <div className='type' style={{right:(aLine.length-120)/2+'px'}}>{aLine.type}</div>
                  <CaretRightOutlined style={{ position: 'absolute',right:'-7px',top:'-5px',fontSize:11+'px',color:'rgb(0,0,0)'}}/>
              </div>
              :  aLine.type=='Col'?
              <div className="line"  onClick={this.rightClickLine}
              style={{zIndex:'10', top: aLine.midY, position: 'absolute',  left: aLine.midX - aLine.length / 2+60+'px', width:aLine.length-120+'px',height:'1px', backgroundColor:'rgb(0, 0, 0)',  transform: `rotate(${aLine.deg}deg)`}}>
                  <div className='type' style={{right:(aLine.length-120)/2+'px'}}>{aLine.type}</div>
                  
              </div>
              : aLine.type=='ExCoop'?
              <div className="line"  onClick={this.rightClickLine}
              style={{zIndex:'10', top: aLine.midY, position: 'absolute',  left: aLine.midX - aLine.length / 2+60+'px', width:aLine.length-120+'px',height:'1px', backgroundColor:'rgb(0, 0, 0)',  transform: `rotate(${aLine.deg}deg)`}}>
                  <CaretLeftOutlined style={{ position: 'absolute',left:'-7px',top:'-5px',fontSize:11+'px',color:'rgb(0,0,0)'}}/>
                  <div className='type' style={{right:(aLine.length-120)/2-20+'px'}}>{aLine.type}</div>
                  <CaretRightOutlined style={{ position: 'absolute',right:'-7px',top:'-5px',fontSize:11+'px',color:'rgb(0,0,0)'}}/>
              </div>
              :aLine.type=='And'?
              <div className="line"  onClick={this.rightClickLine}
              style={{zIndex:'10', top: aLine.midY, position: 'absolute',  left: aLine.midX - aLine.length / 2+60+'px', width:aLine.length-120+'px',height:'1px', backgroundColor:'rgb(0, 0, 0)',  transform: `rotate(${aLine.deg}deg)`}}>
                  <div className='type' style={{right:(aLine.length-120)/2+'px'}}>{aLine.type}</div>
                  <MinusOutlined style={{ position: 'absolute',right:'0px',top:'-8px',fontSize:17+'px',fontWeight:"200",color:'rgb(0,0,0)',transform: `rotate(${-45}deg)`}}/>
              </div>
                 :aLine.type=='Need'?
                 <div className="line"  onClick={this.rightClickLine}
                 style={{zIndex:'10', top: aLine.midY, position: 'absolute',  left: aLine.midX - aLine.length / 2+60+'px', width:aLine.length-120+'px',height:'1px', backgroundColor:'rgb(0, 0, 0)',  transform: `rotate(${aLine.deg}deg)`}}>
                     <div className='type' style={{right:(aLine.length-120)/2+'px'}}>{aLine.type}</div>
                     <RightCircleOutlined style={{ position: 'absolute',right:'-7px',top:'-5px',fontSize:11+'px',color:'rgb(0,0,0)'}}/>
                 </div>
                 :
                 <div></div>
            } */}

              <div className="line"  onClick={this.rightClickLine}
              style={{zIndex:'10', top: aLine.midY, position: 'absolute',  left: aLine.midX - aLine.length/2 + this.state.margin/2+'px', width:aLine.length-this.state.margin+'px',height:'1px', backgroundColor:'rgb(0, 0, 0)',  transform: `rotate(${aLine.deg}deg)`}}>
                  {
                    (aLine.type=='Play' || aLine.type=='Or' || aLine.type=='DelO' || aLine.type=='DelP' || aLine.type=='Depend' || aLine.type=='Sub')?
                      <div>
                        <div className='type' style={{right:(aLine.length-this.state.margin)/2-14+'px',transform: `rotate(${-aLine.deg}deg)`}}>{aLine.type}</div>
                        <CaretRightOutlined style={{ position: 'absolute',right:'-7px',top:'-5px',fontSize:11+'px',color:'rgb(0,0,0)'}}/>
                      </div>
                      :aLine.type=='Col'?
                      <div className='type' style={{right:(aLine.length-this.state.margin)/2-14+'px',transform: `rotate(${-aLine.deg}deg)`}}>{aLine.type}</div>
                      :aLine.type=='ExCoop'?
                      <div>
                        <CaretLeftOutlined style={{ position: 'absolute',left:'-7px',top:'-5px',fontSize:11+'px',color:'rgb(0,0,0)'}}/>
                        <div className='type' style={{right:(aLine.length-this.state.margin)/2-20+'px',transform: `rotate(${-aLine.deg}deg)`}}>{aLine.type}</div>
                        <CaretRightOutlined style={{ position: 'absolute',right:'-7px',top:'-5px',fontSize:11+'px',color:'rgb(0,0,0)'}}/>
                      </div>
                      :aLine.type=='And'?
                      <div>
                        <div className='type' style={{right:(aLine.length-this.state.margin)/2-12+'px',transform: `rotate(${-aLine.deg}deg)`}}>{aLine.type}</div>
                        <MinusOutlined style={{ position: 'absolute',right:'0px',top:'-8px',fontSize:17+'px',fontWeight:"200",color:'rgb(0,0,0)',transform: `rotate(${-45}deg)`}}/>
                      </div>
                      :aLine.type=='Need'?
                      <div>
                        <div className='type' style={{right:(aLine.length-this.state.margin)/2-14+'px',transform: `rotate(${-aLine.deg}deg)`}}>{aLine.type}</div>
                        <RightCircleOutlined style={{ position: 'absolute',right:'-7px',top:'-5px',fontSize:11+'px',color:'rgb(0,0,0)'}}/>
                      </div>
                      :<div>
                        <div className='type' style={{right:(aLine.length-this.state.margin)/2-14+'px',transform: `rotate(${-aLine.deg}deg)`}}>{aLine.type}</div>
                        <RightCircleFilled style={{ position: 'absolute',right:'-7px',top:'-5px',fontSize:11+'px',color:'rgb(0,0,0)'}}/>
                      </div>
                  }
              </div>

            
          


        </div>
        
    )
  }
}
export default withRouter(Line)