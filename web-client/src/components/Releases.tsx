import { useState } from "react";

const posts = [
    {
        title: "Ao no Hako (Blue Box) | Episodios 09-11",
        user: "RaiN",
        project: "Ao no Hako (Blue Box)",
        description: "Hola, en esta ocasión les traemos 3 nuevos epis de Blue Box (9, 10 y 11). En estos episodios podemos presenciar la frustración de Taiki, así como ciertos eventos junto a Chinatsu. Por último, tendremos el inicio del festival de fuegos artificiales donde nuestro prota irá con la besto waifu de la serie. ¡¡Disfruten de este pequeño pack!!",
        image: "https://kakumeisubs.com/wp-content/uploads/2025/02/Kakumei-Subs-ao-hako-blue-box-episodio-11-768x432.jpg",
        url: "#",
        date: "09 de Febrero, 2025",
        time: "10:30 AM",
        quality: "WebRip 1080p",
    },
    {
        title: "Kusuriya no Hitorigoto S02 | Episodio 03",
        user: "RaiN",
        project: "Kusuriya no Hitorigoto S02",
        description: "Buenas, les traemos el epi 3 de la segunda temporada de kusuriya. Maomao investiga la muerte trágica de la concubina Jin por mandato de Jinshi. En el transcurso de su investigación, un grupo de hongos le llama la atención. ¡¡Disfruten del tercer episodio!!",
        image: "https://kakumeisubs.com/wp-content/uploads/2025/02/Kakumei-Subs-Kusuriya-no-Hitorigoto-temporada-2-episodio-3-768x432.jpg",
        url: "#",
        date: "05 de Febrero, 2025",
        time: "10:30 AM",
        quality: "WebRip 1080p",
    },
    {
        title: "Kusuriya no Hitorigoto S02 | Episodio 02",
        user: "RaiN",
        project: "Kusuriya no Hitorigoto S02",
        description: "Hola, en esta ocasión les traemos 3 nuevos epis de Blue Box (9, 10 y 11). En estos episodios podemos presenciar la frustración de Taiki, así como ciertos eventos junto a Chinatsu. Por último, tendremos el inicio del festival de fuegos artificiales donde nuestro prota irá con la besto waifu de la serie. ¡¡Disfruten de este pequeño pack!!",
        image: "https://kakumeisubs.com/wp-content/uploads/2025/01/Kakumei-Subs-Kusuriya-no-Hitorigoto-temporada-2-episodio-2-768x432.jpg",
        url: "#",
        date: "30 de Enero, 2025",
        time: "10:30 AM",
        quality: "WebRip 1080p",
    },
    {
        title: "Kuroiwa Medaka ni Watashi no Kawaii ga Tsuujinai | Episodio 02",
        user: "RaiN",
        project: "Kuroiwa Medaka ni Watashi no Kawaii ga Tsuujinai",
        description: "Hola, en esta ocasión les traemos 3 nuevos epis de Blue Box (9, 10 y 11). En estos episodios podemos presenciar la frustración de Taiki, así como ciertos eventos junto a Chinatsu. Por último, tendremos el inicio del festival de fuegos artificiales donde nuestro prota irá con la besto waifu de la serie. ¡¡Disfruten de este pequeño pack!!",
        image: "https://kakumeisubs.com/wp-content/uploads/2025/01/Kakumei-Subs-Medakawa-episodio-2-768x432.jpg",
        url: "#",
        date: "26 de Enero, 2025",
        time: "10:30 AM",
        quality: "WebRip",
    },
];

const EpisodeCard = () => {
    return (
        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {posts.map((post, index) => (
                <div
                    key={index}
                    className="max-w-md mx-auto bg-white text-gray-900 dark:bg-slate-800 dark:text-gray-100 rounded-lg overflow-hidden hover:shadow-2xl cursor-pointer"
                >
                    {/* Imagen */}
                    <img
                        className="w-full h-48 object-cover transition duration-300 hover:scale-105"
                        src={post.image}
                        alt={post.title}
                    />
                    {/* Contenido */}
                    <div className="p-4">
                        {/* Título */}
                        <h2 className="text-xl font-bold">{post.title}</h2>
                        {/* Usuario y fecha */}
                        <p className="text-gray-500 dark:text-gray-400 text-sm">
                        <span className="font-semibold">{post.date}, {post.time}</span>
                        </p>
                        {/* Descripción */}
                        <p className="text-gray-600 dark:text-gray-300 mt-2 line-clamp-2">{post.description}</p>
                        {/* Calidad */}
                        <span className="inline-block mt-2 text-gray-100 text-sm bg-green-500 px-2 py-1 rounded-lg">
                            {post.quality}
                        </span>
                        {/* Enlace */}
                        <a
                            href={post.url}
                            className="block mt-4 text-blue-400 font-semibold hover:underline transition duration-300"
                        >
                            Ver más detalles
                        </a>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default EpisodeCard;