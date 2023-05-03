import { createSlice } from '@reduxjs/toolkit'

/**
 * 轮子哥
 * 发布页面数据交互切片
 */

export const Push_Sclice = createSlice({
    name: '发布全局状态传参管理',
    initialState: {
        tagId:-1,
        title:{contentData:"",contentLen:50},
        content:{titleData:"",titleLen:500},
        imageList:{
            upList:[],
            thisList:[],
        }
    },
    reducers: {
        setTagId: (state: any, action) => {
            state.tagId=action.payload
        },
        setTitle:(state: any, action) => {
            state.title=action.payload
        },
        setContent:(state: any, action) => {
            state.content=action.payload
        },
        setImageList:(state: any, action) => {
            state.imageList.upList=[...state.imageList.upList,action.payload.upList]
            state.imageList.thisList=[...state.imageList.thisList,action.payload.thisList]
        },
        setImageListAll:(state: any, action) => {
            state.imageList.upList=[...action.payload.upList]
            state.imageList.thisList=[...action.payload.thisList]
        },
        setAll:(state: any, action) => {
            state.tagId=action.payload.tagId
            state.title=action.payload.title
            state.content=action.payload.content
            state.imageList.upList=[...action.payload.imageList]
            let temp={url:""}
            let tempList:any=[]
            action.payload.imageList.forEach(element => {
                temp.url=element
                tempList=[...tempList,temp]
            });
            state.imageList.thisList=[...tempList]
        },
        clearAll:(state: any) => {
            state.title={contentData:"",contentLen:50}
            state.content={titleData:"",titleLen:500}
            state.imageList.thisList=[]
            state.imageList.upList=[]
            state.tagId=-1
        }
    }
})

export const { setTagId,setTitle,setContent,setImageList,setImageListAll,setAll,clearAll } = Push_Sclice.actions

export default Push_Sclice.reducer