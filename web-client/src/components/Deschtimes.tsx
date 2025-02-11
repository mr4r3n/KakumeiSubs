import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/es";
import { ChevronDown, ChevronUp } from "lucide-react";
import { faBan, faCheckCircle, faChevronCircleLeft, faChevronCircleRight, faCircleDot, faCircleXmark, faFilter, faFilterCircleXmark, faPauseCircle, faPlayCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

dayjs.extend(relativeTime);
dayjs.locale("es");

// 📌 Definir los tipos de la API
interface StaffMember {
    id: number;
    finished: boolean;
    updated_at: string;
    position: {
        id: number;
        name: string;
        acronym: string;
    };
    member: {
        id: number;
        name: string;
        group: number;
    };
}
interface Episode {
    id: number;
    number: number;
    air_date: string;
    season: string;
    released: boolean;
    updated_at: string;
    staff: StaffMember[];
}
interface Show {
    id: number;
    name: string;
    status: string | null;
    progress: string;
    created_at: string;
    updated_at: string;
    poster: string;
    joint_groups: any[];
    episodes: Episode[];
}

const STATUS_COLORS: Record<string, string> = {
    Airing: "text-green-500",
    Incomplete: "text-orange-500",
    Finished: "text-blue-500",
    "On Hold": "text-yellow-500",
    Dropped: "text-red-500",
};

const POSITION_COLORS: Record<string, string> = {
    T: "bg-gradient-to-r from-red-500 to-orange-500",
    C: "bg-gradient-to-r  from-green-500 to-blue-500",
    TI: "bg-gradient-to-r  from-blue-500 to-purple-500",
    TS: "bg-gradient-to-r  from-blue-800 to-violet-800",
    KFX: "bg-gradient-to-r  from-pink-600 to-red-600",
    ENC: "bg-gradient-to-r  from-purple-500 to-blue-800",
    QC: "bg-gradient-to-r  from-indigo-500 to-indigo-700",
};

const DeschTimes: React.FC = () => {
    const [shows, setShows] = useState<Show[]>([]);
    const [currentIndex] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [isFilterOpen, SetFilterOpen] = useState<boolean>(false);

    // Estado para controlar el menú desplegable de cada tarjeta
    const [expandedCards, setExpandedCards] = useState<Record<number, boolean>>({});

    // Estado para el filtro por estado
    const [filterStatus, setFilterStatus] = useState<string>("Airing");

    // Asignar íconos según el estado
    const getStatusIcon = (status: string) => {
        switch (status) {
            case "Airing":
                return faPlayCircle;
            case "Incomplete":
                return faPauseCircle;
            case "Finished":
                return faCheckCircle;
            case "Dropped":
                return faBan;
            default:
                return faBan;
        }
    };

    useEffect(() => {
        const fetchShows = async () => {
            try {
                const response = await fetch("/api");
                if (!response.ok) throw new Error("Error al obtener los datos");
                const data = await response.json();
                if (data && Array.isArray(data.shows)) {
                    setShows(data.shows);
                } else {
                    throw new Error("Estructura de datos inesperada");
                }
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        };
        fetchShows();
    }, []);

    // Filtrar episodios con al menos un puesto completado
    const getEpisodesWithProgress = (episodes: Episode[]) => {
        return episodes.filter((episode) => episode.staff.some((staff) => staff.finished));
    };

    // Obtener el último episodio con al menos un puesto completado
    const getLastCompletedEpisode = (episodes: Episode[]) => {
        const completedEpisodes = getEpisodesWithProgress(episodes);
        return completedEpisodes.length > 0 ? completedEpisodes[completedEpisodes.length - 1] : null;
    };

    // Calcular el progreso de roles en un episodio
    const getRoleProgress = (episode: Episode) => {
        const totalRoles = episode.staff.length;
        const completedRoles = episode.staff.filter((staff) => staff.finished).length;
        return totalRoles > 0 ? Math.round((completedRoles / totalRoles) * 100) : 0;
    };

    // Verificar si un episodio está completamente listo
    const isEpisodeReady = (episode: Episode) => {
        return episode.staff.every((staff) => staff.finished) && !episode.released;
    };

    // const getPositionColor = (positionId: number) => {
    //     return POSITION_COLORS[positionId % POSITION_COLORS.length];
    // };

    // Filtrar shows según el estado seleccionado
    const filteredShows = shows.filter((show) => show.progress === filterStatus);

    return (

        <div className="p-4 relative">
            <div className="pb-2 flex">
                <h2 className="font-bold p-0 m-0 text-3xl/11 text-gray-800 dark:text-gray-100 after:block after:w-20 after:h-3 after:bg-green-500 after:rounded-lg after:mb-2.5">Progresos</h2>
                <button
                    className="w-full px-2 py-1 overflow-hidden cursor-pointer text-[var(--kakumei-primary)] hover:text-[var(--kakumei-secondary)] transition-all duration-500 ease-in-out flex justify-end items-center"
                    onClick={() => SetFilterOpen(!isFilterOpen)}
                >
                    {isFilterOpen ? <FontAwesomeIcon fontSize={30} icon={faFilterCircleXmark} /> : <FontAwesomeIcon fontSize={30} icon={faFilter} />}
                </button>
                {/* Contenido del menú */}
                <AnimatePresence>
                    {isFilterOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="absolute right-15 z-10 top-0 w-50 font-medium bg-white dark:bg-slate-800 shadow-lg rounded-lg dark:shadow-black/50 overflow-hidden"
                        >
                            <div className="p-2">
                                <ul className="space-y-2">
                                    {["Airing", "Incomplete", "Finished", "Dropped"].map((status) => (
                                        <li
                                            key={status}
                                            className={`flex items-center justify-between px-3 py-2 rounded cursor-pointer ${filterStatus === status
                                                ? `${STATUS_COLORS[status]} bg-gray-200 dark:bg-slate-900`
                                                : "text-gray-700 hover:bg-gray-200 dark:hover:bg-slate-900"
                                                }`}
                                            onClick={() => setFilterStatus(status)}
                                        >
                                            {/* Texto */}
                                            <span>{status}</span>
                                            {/* Ícono */}
                                            <FontAwesomeIcon
                                                icon={getStatusIcon(status)}
                                                className={`mr-2 ${filterStatus === status ? "text-[var(" + STATUS_COLORS[status] + ")]" : "text-gray-500"}`}
                                            />

                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Contenido principal */}
            {loading && <p className="text-center text-gray-500">Cargando...</p>}
            {error && <p className="text-center text-red-500">Error: {error}</p>}
            {!loading && !error && filteredShows.length > 0 && (
                <>

                    <div className="grid grid-cols-1 gap-6">
                        {filteredShows.map((show) => {
                            const lastCompletedEpisode = getLastCompletedEpisode(show.episodes);
                            const episodesWithProgress = getEpisodesWithProgress(show.episodes);
                            return (
                                <div key={show.id} className="bg-white dark:bg-slate-800 rounded-lg overflow-hidden relative">
                                    {/* Contenido principal de la tarjeta con flex */}
                                    <div className="flex p-4">
                                        {/* Imagen */}
                                        <img className="w-[30%] h-32 object-cover rounded-b-lg" src={show.poster} alt={show.name} />
                                        {/* Información */}
                                        <div className="ml-4 flex-1 flex flex-col justify-between overflow-hidden">
                                            <h2 className="text-lg w-full font-bold text-gray-800 dark:text-gray-200 truncate ">{show.name}</h2>
                                            <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{lastCompletedEpisode?.season || "Desconocido"}</p>
                                            <div className="flex items-center">
                                                <FontAwesomeIcon icon={getStatusIcon(show.progress)} className={`${STATUS_COLORS[show.progress] || "text-gray-500"}`} />
                                                <p className="text-sm text-gray-700 dark:text-gray-300 ml-2">{show.progress || "N/A"}</p>
                                                <p className="text-sm text-gray-700 dark:text-gray-300 font-bold ml-2">
                                                    Episodio {lastCompletedEpisode?.number || "?"}/
                                                    {show.episodes.length}
                                                </p>
                                            </div>
                                            <p className="text-xs text-gray-500 dark:text-gray-300 mt-2">
                                                Última actualización: {dayjs(lastCompletedEpisode?.updated_at).fromNow()}
                                            </p>
                                            <div className="relative mt-2 h-2 w-full bg-gray-200 rounded-full">
                                                <div
                                                    className="absolute top-0 left-0 h-2 bg-blue-500 rounded-full"
                                                    style={{
                                                        width: `${getRoleProgress(lastCompletedEpisode || show.episodes[0])}%`,
                                                    }}
                                                ></div>
                                            </div>
                                            <div className="flex flex-wrap gap-2 mt-2">
                                                {lastCompletedEpisode?.staff?.map((staff) => (
                                                    <button
                                                        key={staff.id}
                                                        className={`px-2 py-1 text-xs font-bold rounded ${staff.finished
                                                            ? `${POSITION_COLORS[staff.position.acronym] || "bg-gray-500"} text-white`
                                                            : "bg-gray-300 text-gray-600"
                                                            }`}
                                                    >
                                                        {staff.position.acronym}
                                                    </button>

                                                ))}

                                            </div>
                                            {lastCompletedEpisode && isEpisodeReady(lastCompletedEpisode) && (
                                                <p className="text-green-600 font-bold mt-2">
                                                    El episodio está listo para ser publicado
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <button
                                        className="absolute top-36 right-4 transform -translate-y-1/2 cursor-pointer"
                                        onClick={() =>
                                            setExpandedCards((prev) => ({
                                                ...prev,
                                                [show.id]: !prev[show.id],
                                            }))
                                        }
                                    >
                                        {expandedCards[show.id] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                    </button>
                                    {/* Menú desplegable */}
                                    <div className="">

                                        {/* Lista de episodios con progreso */}
                                        <AnimatePresence>
                                            {expandedCards[show.id] && (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: "auto" }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                    className="p-4 bg-gray-100 dark:bg-slate-800 rounded-b-lg"
                                                >
                                                    {episodesWithProgress.map((episode) => (
                                                        <div key={episode.id} className="mb-2 border-dashed border-t border-gray-300 dark:border-gray-600 py-2">
                                                            <p className="text-sm font-bold">Episodio {episode.number}</p>
                                                            <div className="relative h-2 w-full my-4 bg-gray-200 rounded-full">
                                                                <div
                                                                    className="absolute top-0 left-0 h-2 bg-green-500 rounded-full"
                                                                    style={{ width: `${getRoleProgress(episode)}%` }}
                                                                ></div>
                                                            </div>
                                                            <div className="flex gap-2 mt-1">
                                                                {episode.staff.map((staff) => (
                                                                    <button
                                                                        key={staff.id}
                                                                        className={`px-2 py-1 text-xs font-bold rounded ${staff.finished
                                                                            ? `${POSITION_COLORS[staff.position.acronym] || "bg-gray-500"} text-white`
                                                                            : "bg-gray-300 text-gray-600"
                                                                            }`}
                                                                    >
                                                                        {staff.position.acronym}
                                                                    </button>
                                                                ))}
                                                            </div>
                                                            {isEpisodeReady(episode) && (
                                                                <p className="text-green-600 font-bold mt-2">
                                                                    El episodio está listo para ser publicado
                                                                </p>
                                                            )}
                                                        </div>
                                                    ))}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </>
            )}
        </div>
    );
};

export default DeschTimes;