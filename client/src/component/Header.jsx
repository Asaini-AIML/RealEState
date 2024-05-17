import React from 'react';
import { Link } from 'react-router-dom';
import { MdOutlineLocationSearching } from 'react-icons/md';
import { useSelector } from 'react-redux';

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  
  return (
    <header className='bg-slate-200 shadow-md'>
      <div className='flex justify-between item-center max-w-6xl max-auto p-3'>
        <Link to='/'>
          <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
            <span className='text-slate-90'>Real</span>
            <span className='text-slate-50'>Estate</span>
          </h1>
        </Link>
        <form className='bg-slate-100 p-3 rounded-lg flex item-center'>
          <input type='text' placeholder='search property' className='bg-transparent w-24 sm:w-64 focus:outline-none' />
          <MdOutlineLocationSearching className='text-slate-600' />
        </form>
        <ul className='flex gap-4'>
          <Link to='/'>
            <li className='text-slate-700 hover:underline'>HOME</li>
          </Link>
          <Link to='/about'>
            <li className='text-slate-700 hover:underline'>ABOUT</li>
          </Link>
          <Link to='/profile'>
            {currentUser ? (
              <img
                src={currentUser.avatar}
                alt='User Avatar'
                className='h-8 w-8 rounded-full'
              />
            ) : (
              <li className='text-stone-950 text-lg hover:underline'>SIGNIN</li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
};

export default Header;
