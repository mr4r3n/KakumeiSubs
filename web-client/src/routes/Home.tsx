import DeschTimes from "../components/Deschtimes";
import Header from "../components/Header";
import ReleaseCard from "../components/Releases";
import SliderTop from "../components/Swiper";
import FloatingThemeButton from "../hooks/switch";

export default function Home() {
    return <>

        <div>
            <Header/>
                <div className="flex mt-[-100px]">
                    <SliderTop/>
                </div>
                <div className="!mx-auto lg:max-w-[90%] grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-9 xl:grid-cols-12 gap-2">
                    <div className="col-span-1 md:col-span-1 lg:col-span-9 xl:col-span-9">
                    <ReleaseCard/>
                    </div>
                    <div className="col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-9 xl:col-span-3">
                    <DeschTimes/>
                    </div>
                    
                    
                </div>
                
                <FloatingThemeButton/>
        </div>
        
    
    </>
    
}