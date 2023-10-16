import "../../styles/App/Header.css"
const Header = () => {
    const handleSidebar = () => {
        const sidebarClasses = document.querySelector('.sidebar-container')?.classList
        if (sidebarClasses?.contains("ms-[-20%]")) {
            sidebarClasses?.remove("ms-[-20%]")
        } else {
            sidebarClasses?.add("ms-[-20%]")
        }
    }
    return (
        <div className="header-container flex items-center w-full h-20 px-10 bg-gradient-to-b from-zinc-800 to-zinc-600 shadow-slate-400 fixed z-10 top-0 left-0">
            <div className="p-2 cursor-pointer rounded-md text-white hover:text-zinc-900 hover:bg-zinc-600" onClick={() => handleSidebar()}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
            </div>
        </div>
    )
}

export default Header