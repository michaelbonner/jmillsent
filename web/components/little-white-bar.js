import React from 'react'

const LittleWhiteBar = ({ yMargin = 'my-12' }) => {
    return (
        <div
            className={`w-full flex items-center justify-center ${yMargin}`}
        >
            <div className="w-80 h-px bg-white"></div>
        </div>
    )
}
export default LittleWhiteBar
