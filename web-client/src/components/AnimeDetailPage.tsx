import React from "react";

interface StaffMember {
    role: string;
    name: string;
}

interface Episode {
    number: number;
    releaseDate: string;
    downloadLink: string;
    progress: number; // Añadir progreso a los episodios
}

interface Program {
    id: number;
    name: string;
    type: string;
    genres: string[];
    year: number;
    duration: number | null;
    episodesCount: number;
    specifications: {
        source: string;
        resolution: string;
        videoCodec: string;
        audio: string;
        subtitles: string;
        format: string;
        size: string;
    };
    staff: StaffMember[];
    episodes: Episode[];
    poster: string; // Añadir la URL del póster
}

interface AnimeDetailPageProps {
    program: Program;
}

const AnimeDetailPage: React.FC<AnimeDetailPageProps> = ({ program }) => {
    return (
        <div className="max-w-4xl mx-auto px-4 py-8 font-sans">
            {/* Encabezado */}
            <header className="mb-8 border-b pb-6">
                <h1 className="text-4xl font-bold text-gray-800 mb-2">
                    {program.name}
                </h1>
                <div className="flex flex-wrap gap-4 text-gray-600">
                    <span>📺 {program.type === 'series' ? 'Serie' : 'Película'}</span>
                    <span>📅 {program.year}</span>
                    <span>🎞 {program.episodesCount} episodios</span>
                    <div className="flex gap-2">
                        {program.genres.map(genre => (
                            <span key={genre} className="bg-gray-100 px-2 py-1 rounded">
                                {genre}
                            </span>
                        ))}
                    </div>
                </div>
            </header>

            {/* Imagen y Detalles Técnicos */}
            <section className="flex flex-col md:flex-row gap-6 mb-8">
                <img 
                    src={program.poster} 
                    alt={program.name} 
                    className="w-full md:w-1/3 h-auto object-cover rounded-lg"
                />
                <div className="flex-1 bg-gray-50 p-6 rounded-lg">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-700">Detalles Técnicos</h2>
                    <div className="grid grid-cols-2 gap-4">
                        {Object.entries(program.specifications).map(([key, value]) => (
                            <div key={key} className="flex justify-between border-b pb-1">
                                <span className="text-gray-600 capitalize">{key}:</span>
                                <span className="text-gray-800">{value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Staff */}
            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-gray-700">Equipo</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {program.staff.map(member => (
                        <div key={member.name} className="bg-white p-4 rounded-lg shadow-sm">
                            <h3 className="font-medium text-gray-900">{member.role}</h3>
                            <p className="text-gray-600">{member.name}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Episodios */}
            <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-700">Episodios</h2>
                <div className="space-y-2">
                    {program.episodes.map(episode => (
                        <div key={episode.number} className="flex justify-between items-center bg-white p-4 rounded-lg hover:bg-gray-50">
                            <div className="flex-1">
                                <span className="font-medium">Episodio {episode.number}</span>
                                <span className="text-gray-500 ml-2 text-sm">
                                    ({new Date(episode.releaseDate).toLocaleDateString()})
                                </span>
                                <div className="relative h-2 w-full bg-gray-200 rounded-full mt-2">
                                    <div
                                        className="absolute top-0 left-0 h-2 bg-blue-500 rounded-full"
                                        style={{ width: `${episode.progress}%` }}
                                    ></div>
                                </div>
                            </div>
                            {episode.progress === 100 && (
                                <a 
                                    href={episode.downloadLink}
                                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                                    download
                                >
                                    Descargar
                                </a>
                            )}
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default AnimeDetailPage;