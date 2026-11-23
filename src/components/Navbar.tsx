import syncLogo from "../assets/sync.svg"

const Navbar = () => {
  return (
    <>
     <header className="app-topbar border-b w-screen fixed top-0 flex justify-between bg-black px-7 h-12 items-center z-2">
          <div className="text-xl font-bold">Logo</div>
          <img src={syncLogo} alt="syncBtn" className="hover:cursor-pointer"/>
     </header>
    </>
  )
}

export default Navbar