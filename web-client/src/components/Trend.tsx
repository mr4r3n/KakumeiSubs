import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Trend = () => {
    return (
        <div id="trend" className="relative w-full h-full">
            <div className="relative w-full h-[500px] lg:h-[600px] overflow-hidden">
                <img className="object-cover w-full h-auto" src="https://kakumeisubs.com/wp-content/uploads/2023/06/Kakumei_Banner.png" alt="" />
                <div className="absolute inset-0 aign p-10">
                    
                </div>
            </div>
            
        </div>
    );
};

export default Trend;
