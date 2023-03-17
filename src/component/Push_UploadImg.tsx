import { Uploader } from '@antmjs/vantui'
import react from 'react'

/**
 * 轮子哥
 * 图片上传组件
 */

export default function Push_UploadImg() {
    const [value, setValue] = react.useState([
    //   {
    //     url: 'https://img.yzcdn.cn/vant/leaf.jpg',
    //     name: '图片1',
    //   },
    //   {
    //     url: 'https://img.yzcdn.cn/vant/tree.jpg',
    //   },
    ])
  
    const afterRead = (event) => {
      const { file, name } = event.detail
      // 上传
      console.log(file,"name",name)
      setValue(value.concat(file))
    }
  
    const deleteAction = (event) => {
      const { index } = event.detail
      const valueNew = JSON.parse(JSON.stringify(value))
      valueNew.splice(index, 1)
      setValue(valueNew)
    }
  
    return (
      <Uploader
        fileList={value}
        onAfterRead={afterRead}
        onDelete={deleteAction}
        maxCount={8}
        style={{marginLeft:'15px'}}
        deletable
      />
    )
  }
  