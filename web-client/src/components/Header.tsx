import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faDiscord, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { useLocation, Link } from "react-router-dom";

function Header() {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();
    const [scrolling, setScrolling] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };

    const isActive = (path: string) => {
        return location.pathname === path ? "active" : "";
    };

    useEffect(() => {
        const handleScroll = () => {
          setScrolling(window.scrollY > 50); // Cambia cuando el scroll es mayor a 50px
        };
    
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);


    return (
        <div id="wrapper" className="w-full relative mx-auto pt-[100px]">
            {/* Navbar */}
            <div id="header" className={`fixed flex top-0 right-0 left-0 z-[1030] px-2 py-2 transition duration-[800ms] ${scrolling ? "bg-white shadow-lg dark:shadow-lg dark:bg-slate-800" : "bg-transparent"}`}>
                <div className="container-fluid w-full lg:px-4">
                    <div className="wnavbar flex justify-between items-center">
                        {/* Navbar Left */}
                        <div className="wnavbar-left flex items-center">
                            {/* Menú hamburguesa (siempre visible en pantallas pequeñas) */}
                            <div
                                className="wmenu-icon relative w-[25px] h-[23px] pl-2 lg:p-0 cursor-pointer z-10 lg:hidden"
                                onClick={toggleMenu}
                            >
                                {/* Primer ícono */}
                                <div
                                    className={`w-[24px] h-[3px] transition duration-400 ease-in-out rounded-[2px] mt-[3px] ml-auto ${isMenuOpen ? "rotate-[-45deg] bg-red-700 translate-x-[-4px] translate-y-[6px]" : "bg-gray-900 dark:bg-gray-100"
                                        }`}
                                ></div>

                                {/* Segundo ícono */}
                                <div
                                    className={`w-[24px] h-[3px] bg-gray-900 dark:bg-gray-100 transition duration-400 ease-in-out rounded-[2px] mt-[3px] ml-auto ${isMenuOpen ? "opacity-0" : ""
                                        }`}
                                ></div>

                                {/* Tercer ícono */}
                                <div
                                    className={`w-[24px] h-[3px]  transition duration-400 ease-in-out rounded-[2px] mt-[3px] ml-auto ${isMenuOpen ? "rotate-[45deg] bg-red-700 translate-x-[-4px] translate-y-[-5px]" : "bg-gray-900 dark:bg-gray-100"
                                        }`}
                                ></div>
                            </div>

                            {/* Logo */}
                            <div
                                className="wlogo w-[100px] h-auto ml-4 sm:absolute sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 lg:relative lg:top-auto lg:left-auto lg:-translate-x-0 lg:-translate-y-0"
                            >
                                <img
                                    className="w-full h-full"
                                    src="https://cdn.discordapp.com/attachments/1148457233034776616/1338958408614674492/LOGOv5.png?ex=67acf9b1&is=67aba831&hm=a7422cc8ef538f1d7b46cdd4e3e0aab18cb7d5722dee3a14fc5b707f0672d0dc&"
                                    alt="Logo KakumeiSubs"
                                    title="Logo KakumeiSubs"
                                />
                            </div>

                            {/* Opciones del menú */}
                            <div
                                className={`wmenu-options  lg:absolute lg:flex lg:justify-between lg:items-center lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 lg:max-w-[400px] lg:w-full ${isMenuOpen
                                        ? "fixed flex inset-0 bg-gray-200 dark:bg-gray-800 z-[1] flex-col justify-center items-center"
                                        : "hidden"
                                    }`}
                            >
                                <Link
                                    to="/"
                                    className={`woption m-3 text-[13px] uppercase font-medium transition duration-500 px-5 py-2 rounded-full ${
                                        isActive("/")
                                            ? "text-white bg-sky-500 hover:bg-sky-950"
                                            : "text-white bg-black/25 dark:bg-gray/25 hover:bg-sky-500"
                                    }`}
                                >
                                    Inicio
                                </Link>
                                <Link
                                    to="/projects"
                                    className={`woption m-3 text-[13px] uppercase font-medium transition duration-500 px-5 py-2 rounded-full ${
                                        isActive("/projects")
                                            ? "text-white bg-sky-500 hover:bg-sky-950"
                                            : "text-white bg-black/25 dark:bg-gray/25 hover:bg-sky-500"
                                    }`}
                                >
                                    Proyectos
                                </Link>
                                <Link
                                    to="/karaokes"
                                    className={`woption m-3 text-[13px] uppercase font-medium transition duration-500 px-5 py-2 rounded-full ${
                                        isActive("/karaokes")
                                            ? "text-white bg-sky-500 hover:bg-sky-950"
                                            : "text-white bg-black/25 dark:bg-gray/25 hover:bg-sky-500"
                                    }`}
                                >
                                    Karaokes
                                </Link>
                                <Link
                                    to="/about-us"
                                    className={`woption m-3 text-[13px] uppercase font-medium transition duration-500 px-5 py-2 rounded-full ${
                                        isActive("/about-us")
                                            ? "text-white bg-sky-500 hover:bg-sky-950"
                                            : "text-white bg-black/25 dark:bg-gray/25 hover:bg-sky-500"
                                    }`}
                                >
                                    Staff
                                </Link>
                            </div>
                        </div>

                        {/* Navbar Right */}
                        <div className="wnavbar-right flex items-center">
                            {/* Search Icon */}
                            <div className="wsearch w-[40px] h-[40px] rounded-full bg-sky-500 hover:bg-sky-950 transition-all duration-500 ease-in-out mr-[10px] relative cursor-pointer">
                                <FontAwesomeIcon
                                    icon={faDiscord}
                                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-100 text-[1rem]"
                                />
                            </div>

                            {/* Profile Icon */}
                            <div className="wprofile w-[40px] h-[40px] rounded-full bg-sky-500 hover:bg-sky-950 transition-all duration-500 ease-in-out mr-[10px] relative cursor-pointer overflow-hidden">
                                <FontAwesomeIcon
                                    icon={faTwitter}
                                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-100 text-[1rem]"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;