import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPlayCircle,
    faClock,
    faCalendarAlt,
    faAngleLeft,
    faAngleRight,
    faDownload,
} from "@fortawesome/free-solid-svg-icons";

interface Slide {
    image: string;
    title: string;
    type: string;
    duration: string;
    releaseDate: string;
    description: string;
}

const SliderTop = () => {
    const prevRef = useRef<HTMLDivElement>(null);
    const nextRef = useRef<HTMLDivElement>(null);

    const slides: Slide[] = [
        {
            image: "https://kakumeisubs.com/wp-content/uploads/2025/01/Pompo-san.jpg",
            title: "Eiga Daisuki Pompo-san | Pompo: The Cinephile",
            type: "Movie",
            duration: "23 min/ep",
            releaseDate: "2025-01-10",
            description:
                "Hola mi gente, ¡feliz año nuevo para todos! En esta oportunidad les traemos una sorpresita. A decir verdad, esta película de Pompo ya la tenemos trabajada en gran parte desde hace meses atrás, solo faltaban algunas cositas. Muchas gracias a todos los involucrados en el proyecto: a Zagon por darlo todo con la traducción, a Aren por resucitar para esta",
        },
    ];

    return (
        <div id="slider-top" className="relative w-full h-full bg-[#0c0c1d]">
            {/* Swiper */}
            <Swiper
                modules={[Navigation, Pagination, Autoplay, EffectFade]}
                spaceBetween={30}
                slidesPerView={1}
                navigation={{
                    prevEl: prevRef.current,
                    nextEl: nextRef.current,
                }}
                pagination={{ clickable: true }}
                className="w-full h-full"
                effect="fade"
                loop={true}
                autoplay={{
                    delay: 10000,
                    disableOnInteraction: false,
                }}
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={index} className="relative">
                        <div className="relative w-full h-[500px] lg:h-[600px] overflow-hidden before:z-[1] before:absolute before:top-80 before:right-0 before:bottom-0 before:left-0 before:bg-gradient-to-t before:from-gray-200/100 before:to-gray-200/0 dark:before:from-slate-900/100 dark:before:to-slate-900/0">
                            {/* Imagen de fondo */}
                            <img
                                src={slide.image}
                                alt={slide.title}
                                className="absolute inset-0 w-full h-full object-cover filter blur-none"
                            />
                            {/* Overlay oscuro */}
                            <div className="absolute inset-0 bg-black/[.6]"></div>
                            {/* Contenido */}
                            <div className="absolute inset-0 flex items-center justify-center text-center text-white p-6 lg:p-12 z-10">
                                <div className="max-w-2xl">
                                    <h2 className="text-3xl text-gray-100 lg:text-5xl font-bold mb-4">
                                        {slide.title}
                                    </h2>
                                    <div className="flex flex-wrap text-gray-100 font-semibold justify-center gap-4 text-sm lg:text-base mb-4">
                                        <span className="flex items-center gap-2">
                                            <FontAwesomeIcon icon={faPlayCircle} />
                                            {slide.type}
                                        </span>
                                        <span className="flex items-center gap-2">
                                            <FontAwesomeIcon icon={faClock} />
                                            {slide.duration}
                                        </span>
                                        <span className="flex items-center gap-2">
                                            <FontAwesomeIcon icon={faCalendarAlt} />
                                            {slide.releaseDate}
                                        </span>
                                    </div>
                                    <p className="text-gray-200 font-semibold mb-6 line-clamp-4 ">
                                        {slide.description}
                                    </p>
                                    {/* Botones */}
                                    <div className="flex justify-center gap-4">
                                        <a
                                            href="#"
                                            className="bg-sky-500 hover:bg-sky-950 transition-all duration-500 ease-in-out text-white px-6 py-2 rounded-lg flex items-center gap-2"
                                        >
                                            <FontAwesomeIcon icon={faDownload} />
                                            Nyaa
                                        </a>
                                        <a
                                            href="#"
                                            className="bg-black/25 hover:bg-black/50 transition-all ease-in-out duration-500 text-white px-6 py-2 rounded-lg flex items-center gap-2"
                                        >
                                            Detalles
                                            <FontAwesomeIcon icon={faAngleRight} />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Paginación */}
            <div className="swiper-pagination absolute bottom-4 left-0 right-0 flex justify-center"></div>
        </div>
    );
};

export default SliderTop;
