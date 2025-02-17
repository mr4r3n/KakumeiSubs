import {
    faCalendarAlt,
    faFilm,
    faTv,
    faCompactDisc,
    faExpand,
    faFileVideo,
    faMusic,
    faClosedCaptioning,
    faFile,
    faHdd,
    faAlignLeft,
    faFileAlt,
    faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";

interface StaffMember {
    role: string;
    name: string;
    profile: string;
}

interface Episode {
    number: number;
    releaseDate: string;
    downloadLink: string;
    progress: number;
}

interface Program {
    id: number;
    name: string;
    type: string;
    tags: string[];
    year: number;
    duration: number | null;
    episodesCount: number;
    sinopsis: string;
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
    poster: string;
}

const specsIcons = {
    source: faCompactDisc,
    resolution: faExpand,
    videoCodec: faFileVideo,
    audio: faMusic,
    subtitles: faClosedCaptioning,
    format: faFile,
    size: faHdd,
};

interface PageDetailProps {
    program: Program;
}

const PageDetail: React.FC<PageDetailProps> = ({ program }) => {
    const [currentProfileIndex, setCurrentProfileIndex] = useState<Record<string, number>>({});

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentProfileIndex((prev) => {
                const newIndex = { ...prev };
                program.staff.forEach((member) => {
                    const membersInRole = program.staff.filter((m) => m.role === member.role);
                    if (membersInRole.length > 1) {
                        newIndex[member.role] = (newIndex[member.role] + 1) % membersInRole.length;
                    }
                });
                return newIndex;
            });
        }, 3000); // Cambia la foto cada 3 segundos

        return () => clearInterval(interval);
    }, [program.staff]);

    const getUniqueRoles = () => [...new Set(program.staff.map((member) => member.role))];
    const getMembersByRole = (role: string) => program.staff.filter((member) => member.role === role);

    return (
        <div className="mx-auto px-4">
            {/* Encabezado principal */}
            <div className="text-center mb-8">
                <h1 className="text-5xl font-extrabold text-slate-900 dark:text-gray-100 mb-4">
                    {program.name}
                </h1>
                <div className="flex flex-wrap gap-4 mt-5 justify-center text-slate-600 dark:text-gray-400 items-center">
                    <div className="flex items-center bg-white dark:bg-slate-800 px-3 py-1 font-semibold rounded-lg">
                        <FontAwesomeIcon icon={faTv} className="mr-2 text-md" />
                        <span>{program.type === "series" ? "Serie" : "Película"}</span>
                    </div>
                    <div className="flex items-center bg-white dark:bg-slate-800 px-3 py-1 font-semibold rounded-lg">
                        <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
                        <span>{program.year}</span>
                    </div>
                    <div className="flex items-center bg-white dark:bg-slate-800 px-3 py-1 font-semibold rounded-lg">
                        <FontAwesomeIcon icon={faFilm} className="mr-2" />
                        <span>{program.episodesCount} Episodios</span>
                    </div>
                </div>
            </div>

            {/* Contenido principal usando Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Poster */}
                <div className="lg:col-span-2 w-full h-[500px] bg-gray-200 dark:bg-slate-700 rounded-2xl overflow-hidden shadow-xl">
                    <img
                        src={program.poster}
                        alt={program.name}
                        className="w-full h-full object-cover rounded-md"
                    />
                </div>

                {/* Detalles y Staff */}
                <div className="lg:col-span-10 space-y-8">
                    {/* Sinopsis */}
                    <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
                        <div className="flex items-center mb-4 border-b pb-3 border-slate-200 dark:border-slate-600">
                            <FontAwesomeIcon icon={faAlignLeft} className="text-2xl mr-3 text-blue-500" />
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-gray-100">Sinopsis</h2>
                        </div>
                        <p className="text-slate-600 dark:text-gray-300 leading-relaxed text-lg">
                            {program.sinopsis}
                        </p>
                    </div>

                    {/* Tags */}
                    <div className="flex gap-2 items-center text-slate-600 dark:text-gray-400">
                        {program.tags.map((tag) => (
                            <span
                                key={tag}
                                className="bg-white dark:bg-slate-800 px-3 py-1 text-lg font-semibold rounded-lg mr-2 cursor-pointer"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* Contenedor para Detalles Técnicos y Staff (lado a lado en pantallas grandes) */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Detalles Técnicos */}
                        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md">
                            <div className="flex items-center mb-6 border-b pb-3 border-slate-200 dark:border-slate-600">
                                <FontAwesomeIcon icon={faFileAlt} className="text-2xl mr-3 text-green-500" />
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-gray-100">
                                    Detalles Técnicos
                                </h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {Object.entries(program.specifications).map(([key, value]) => (
                                    <div key={key} className="flex items-center p-3 bg-slate-50 dark:bg-slate-900 rounded-lg">
                                        <FontAwesomeIcon
                                            icon={specsIcons[key as keyof typeof specsIcons]}
                                            className="mr-3 text-slate-500 dark:text-gray-400 text-xl w-8 text-center"
                                        />
                                        <div>
                                            <div className="text-sm text-slate-500 dark:text-gray-300 capitalize">
                                                {key}
                                            </div>
                                            <div className="font-semibold text-slate-800 dark:text-gray-100">{value}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Staff */}
                        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
                            <div className="flex items-center mb-6 border-b pb-3 border-slate-200 dark:border-slate-600">
                                <FontAwesomeIcon icon={faUsers} className="text-2xl mr-3 text-purple-500" />
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-gray-100">
                                    Equipo del Proyecto
                                </h2>
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-4">
                                {getUniqueRoles().map((role, index) => {
                                    const members = getMembersByRole(role);
                                    const currentIndex = currentProfileIndex[role] || 0;
                                    const currentMember = members[currentIndex];
                                    return (
                                        <div key={index} className="group relative">
                                            <div className="aspect-square w-full rounded-xl bg-slate-100 dark:bg-slate-700 overflow-hidden transition-transform duration-300 hover:scale-105">
                                                <img
                                                    src={currentMember.profile}
                                                    alt={currentMember.name}
                                                    className="w-full h-full object-cover"
                                                    onError={(e) =>
                                                    (e.currentTarget.src =
                                                        "https://via.placeholder.com/400x400?text=No+Image")
                                                    }
                                                />
                                            </div>
                                            <div className="mt-3 text-center">
                                                <h3 className="font-semibold text-slate-900 dark:text-gray-100">
                                                    {members.map((m) => m.name).join(", ")}
                                                </h3>
                                                <p className="text-sm text-slate-500 dark:text-gray-400 italic">{role}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PageDetail;
