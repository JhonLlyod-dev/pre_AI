import { useEffect, useState } from "react";
import send from '../';

export default function Home(){

  return(
    <div className=" relative flex flex-col items-center justify-center p-5">
      <div className=" border-1 rounded-md p-5 w-full md:w-[60%] h-130">

        <h1 className="text-primary">Hello</h1>
      </div>

      <div className='bg-neutral rounded-lg p-2 mt-3 w-full md:w-[60%] flex'>
        <input type="text" className="text-accent" />
        <img src="" alt="" />
      </div>
    </div>
  );
} 