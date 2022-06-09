import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({web3Handler, account}) => {
  return (
    <nav className="flex items-center justify-between flex-wrap  p-3 mx-10  top-0 left-0 right-0 bg-gray-700 rounded-b-md">
                <div className='flex text-3xl text-white'>
                    DStorage
                </div>

                <div className='flex text-l text-gray-500 font-semibold'>
                    <Link to="/"><h1 className='mr-6'>HOME</h1></Link>
                    <Link to="upload"><h1 className='mr-6'>UPLOAD</h1></Link>
                    <Link to="my-uploaded-items"><h1 className='mr-6'>YOUR UPLOADED FILES</h1></Link>
                </div>
                
                {
                    account ?(<button className="h-10 px-5 text-white  border border-black rounded-lg" >{account.slice(0,5) + "..." + account.slice(38,42)} </button>) 
                        : (<button className="h-10 px-5  border border-black rounded-lg text-white" onClick={web3Handler}>Connect Wallet</button>)
                }
            </nav>
  )
}

export default Navbar