import BottomNavigation from '../component/BottomNavigation';
import My_head from '../component/My_head';
import My_bottom_list from '../component/My_bottom_list';
import My_head_buttom from '../component/My_head_buttom';
import React from 'react'

const My = React.memo(() => {
    return (
        <div>
            <My_head />
            <My_head_buttom />
            <My_bottom_list />
            <BottomNavigation />
        </div>
    )
}
)
export default My