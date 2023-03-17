import style from "../style/GButton.module.scss";
import { Component } from 'react'

/**
 * 轮子哥
 * 自定义按钮组件
 */

interface propsBind {
  margins: string,
  heights: string,
  text: string,
  marginTop:string

}

export default class GButton extends Component<propsBind> {

  static defaultProps = {
    margins: '50px',
    heights: '30px',
    text: '提交',
    marginTop:'20px'
  }

  render() {
    return (
      <div className={style.GButton}
        style={{
          marginLeft: this.props.margins,
          marginRight: this.props.margins,
          height: this.props.heights,
          lineHeight:this.props.heights,
          marginTop:this.props.marginTop
        }}
      >{this.props.text}
      </div>
    )
  }
}
