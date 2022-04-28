import Homepng from '../assets/home.png'

export function MainContext() {

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen justify-center justify-items-center items-center p-10 bg-[#181515]" >
      <div className="text-white w-9/12">
        <h1 className="font-semibold text-5xl mb-8 text-center md:text-left">
          Create, Update, List and Delete Users at UserByMe!
        </h1>

        <p className="text-slate-400 mb-8 text-center md:text-left" >
          Optimized for a smaller build size, faster dev compilation
          and dozens of other improvements. Our template is full perfect
        </p>

        <div className="flex flex-col items-center space-y-4  align-center md:flex-row md:space-x-4 md:space-y-0">
          <a href="#create" className="font-semibold p-4 w-36 text-center rounded bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" >
            Create
            </a>
        </div>
      </div>

      <div className="md:none">
        <img src={Homepng} alt="users" className='w-8/12 my-0 mx-auto'/>
      </div>
    </div>
  )
}