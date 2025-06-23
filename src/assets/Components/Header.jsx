import Theme from "./ThemeChange"
import Logo from '../Images/robot.png';
export default function Header(){

  return(
    <div className=" flex items-center justify-between py-3 px-5 border-b-2 border-gray-400 rounded-lg relative">

      <div className="flex items-center gap-2 md:ml-20">
        <img src={Logo} className=" w-15 aspect-square" alt="" />
        <h1 className="text-3xl font-bold ">Preee</h1>
      </div>
      <Theme/>
    </div>
  )

}