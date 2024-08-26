import React from 'react'
import Banniere from '../../public/risque-banniere.jpg'
import Image from 'next/image'

function Nav() {
  return (
    <>
        <div>
            <Image src={Banniere} alt="Banniere" className='w-full h-[60px]'/>
        </div>
        <nav className='bg-red-600 flex justify-between items-center px-8'>
            <ul className='flex items-center'>
                <li className='inline-block font-bold text-white italic text-xl'><a href='/'>KikooBets</a></li>
                <li className='inline-block p-4 font-medium text-white text-sm'><a href='/'>League of Legends</a></li>
            </ul>
            <ul className='flex items-center gap-4'>
                <li className='inline-block p-2 px-4 font-medium text-red-600 bg-white rounded-xl text-sm'><a href='/inscription'>Inscription</a></li>
                <li className='inline-block p-2 px-4 font-medium text-white bg-red-400 rounded-xl text-sm'><a href='/connexion'>Connexion</a></li>
            </ul>
        </nav>
    </>
  )
}

export default Nav