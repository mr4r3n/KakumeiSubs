import React from "react";
import Header from "../components/Header";
import mockPostData from "../mocks/mockPostData.json"; // Importar los datos simulados
import FloatingThemeButton from "../hooks/switch";

const Posts: React.FC = () => {
    const program = mockPostData.program;

    return (
        <>
            <Header />
            <div className="bg-gray-900 text-white min-h-screen p-6">
                {/* Encabezado */}
                <div className="bg-gray-800 p-6 rounded-lg shadow-md">
                    <div className="flex gap-4">
                        {/* Imagen */}
                        <img
                            src="https://kakumeisubs.com/wp-content/uploads/2025/01/kusuriya-2.jpg"
                            alt={program.name}
                            className="w-48 h-64 object-cover rounded-md"
                        />
                        {/* Información */}
                        <div>
                            <h1 className="text-3xl font-bold">{program.name}</h1>
                            <p className="text-lg mt-2">
                                <span className="font-semibold">Tipo:</span>{" "}
                                {program.type === "series" ? "Serie" : "Película"}
                            </p>
                            {program.type === "series" && (
                                <p className="text-lg">
                                    <span className="font-semibold">Episodios:</span>{" "}
                                    {program.episodesCount}
                                </p>
                            )}
                            {program.type === "movie" && (
                                <p className="text-lg">
                                    <span className="font-semibold">Duración:</span>{" "}
                                    {program.duration} minutos
                                </p>
                            )}
                            <p className="text-lg">
                                <span className="font-semibold">Géneros:</span>{" "}
                                {program.genres.join(", ")}
                            </p>
                            <p className="text-lg">
                                <span className="font-semibold">Año:</span> {program.year}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Especificaciones técnicas */}
                <div className="mt-6 bg-gray-800 p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-4">Especificaciones del Proyecto</h2>
                    <ul className="space-y-2">
                        <li>
                            <span className="font-semibold">Fuente:</span> {program.specifications.source}
                        </li>
                        <li>
                            <span className="font-semibold">Resolución:</span>{" "}
                            {program.specifications.resolution}
                        </li>
                        <li>
                            <span className="font-semibold">Códec de video:</span>{" "}
                            {program.specifications.videoCodec}
                        </li>
                        <li>
                            <span className="font-semibold">Audio:</span>{" "}
                            {program.specifications.audio}
                        </li>
                        <li>
                            <span className="font-semibold">Subtítulos:</span>{" "}
                            {program.specifications.subtitles}
                        </li>
                        <li>
                            <span className="font-semibold">Formato:</span>{" "}
                            {program.specifications.format}
                        </li>
                        <li>
                            <span className="font-semibold">Peso aproximado:</span>{" "}
                            {program.specifications.size}
                        </li>
                    </ul>
                </div>

                {/* Staff */}
                <div className="mt-6 bg-gray-800 p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-4">Staff del Proyecto</h2>
                    <ul className="space-y-2">
                        {program.staff.map((member, index) => (
                            <li key={index}>
                                <span className="font-semibold">{member.role}:</span> {member.name}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Lista de episodios */}
                <div className="mt-6 bg-gray-800 p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-4">Lista de Episodios</h2>
                    <table className="w-full text-left">
                        <thead>
                            <tr>
                                <th className="pb-2">Episodio</th>
                                <th className="pb-2">Fecha de lanzamiento</th>
                                <th className="pb-2">Descargar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {program.episodes.map((episode, index) => (
                                <tr key={index} className="border-t border-gray-700">
                                    <td className="py-2">{episode.number}</td>
                                    <td className="py-2">{episode.releaseDate}</td>
                                    <td className="py-2">
                                        <a
                                            href={episode.downloadLink}
                                            className="text-blue-400 hover:text-blue-300"
                                        >
                                            Descargar
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Chat */}
                <div className="mt-6 bg-gray-800 p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-4">Chat en Tiempo Real</h2>
                    <div className="flex flex-col h-64 bg-gray-700 rounded-lg p-4 overflow-y-auto">
                        {/* Mensajes */}
                        <div className="space-y-2">
                            <div className="flex gap-2">
                                <span className="font-semibold">User1:</span>
                                <span>Hola, ¿cuándo sale el próximo episodio?</span>
                            </div>
                            <div className="flex gap-2">
                                <span className="font-semibold">User2:</span>
                                <span>Pronto, estamos trabajando en ello.</span>
                            </div>
                        </div>
                        {/* Entrada de texto */}
                        <div className="mt-4">
                            <input
                                type="text"
                                placeholder="Escribe un mensaje..."
                                className="w-full p-2 bg-gray-600 text-white rounded-md"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <FloatingThemeButton />
        </>
    );
};

export default Posts;