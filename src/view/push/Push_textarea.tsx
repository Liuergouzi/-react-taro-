
import { Component } from 'react'
import style from './Push_textarea.module.scss'

/**
 * 轮子哥
 * 发布-自定义输入框组件
 */

interface states {
    contentLen: number,
    contentData: string,
    titleLen: number,
    titleData: string,
}

export default class Push_textarea extends Component<any, states> {

    constructor(props) {
        super(props)
        this.state = {
            contentLen: this.props.contentMaxLen,
            contentData: "",
            titleLen: this.props.titleMaxLen,
            titleData: "",
        }
    }
    static defaultProps = {
        titleMaxLen: 50,
        contentMaxLen: 500,
    }
    getTitle(val: string) {
        this.setState({ titleData: val.substring(0, this.props.titleMaxLen) },
            () => {
                this.setState({
                    titleLen: this.props.titleMaxLen - val.length
                })
            }
        )
    }

    getContent(val: string) {
        this.setState({ contentData: val.substring(0, this.props.contentMaxLen) },
            () => {
                this.setState({
                    contentLen: this.props.contentMaxLen - val.length
                })
            }
        )
    }

    render() {
        return (
            <div>

                <div className={style.inputDiv}>
                    <input className={style.inputDom} placeholder='请输入爱坤标题' maxLength={this.props.titleLen} value={this.state.titleData}
                        onInput={(e: any) => this.getTitle(e.detail.value)}>
                    </input>
                    <div className={style.inputCount}>{this.props.titleMaxLen}/{this.state.titleLen}</div>
                </div>

                <div className={style.textDiv}>
                    <textarea className={style.textArea} placeholder='尊敬的爱坤，发表您伟大的观点吧！' maxLength={this.props.contentMaxLen} value={this.state.contentData}
                        onInput={(e: any) => this.getContent(e.detail.value)}>
                    </textarea>
                    <div className={style.textCount}>{this.props.contentMaxLen}/{this.state.contentLen}</div>
                </div>

            </div>
        )
    }
}

