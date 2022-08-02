import React from 'react'

const Header = (props) => {

    return (
        <header className='mb-10'>
            <div className='relative flex items-center justify-center w-full px-4 py-3 text-lg font-bold bg-green-500'>
                <div className='flex items-center text-white mr-auto'>
                    {<h1>
                        Pictionary
                    </h1>}
                    {<button className='hidden'><i className='fa fa-chevron-left'></i></button>}
                </div>
                <div className='flex items-center gap-2'>
                    <button onClick={props.togglePlay} className='flex justify-center items-center w-8 h-8 bg-white p-1 rounded-full'>
                        <span className={`${props.playState && 'hidden'} text-sm text-green-500`}><i className='fa fa-play'></i></span>
                        <span className={`${!props.playState && 'hidden'} text-sm text-green-500`}><i className='fa fa-pause'></i></span>
                    </button>
                    <button className='flex gap-x-1 px-1.5 py-1 bg-white rounded-xl'>
                        <span className='block text-sm pl-1 font-bold text-green-500 self-center'>{props.hintQuantity}</span>
                        <span className='block text-sm px-1 font-bold text-yellow-500 self-center'><i className='fa fa-coins'></i></span>
                        <span className='text-sm text-green-500 font-semibold self-center'><i className='fa fa-plus'></i></span>
                    </button>
                </div>
                <div className='absolute flex justify-center w-full -bottom-6 left-0'>
                    <span className='flex justify-center items-center w-12 h-12 text-green-500 bg-white shadow shadow-green-500 rounded-full'>0</span>
                </div>
            </div>
        </header>
    )
}

export default Header;