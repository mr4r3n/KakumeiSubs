import { useState } from "react";
import { PolarAngleAxis, Radar, RadarChart, ResponsiveContainer, PolarGrid, PolarRadiusAxis } from "recharts";

const members = [
    {
        name: "RaiN",
        occupation: "Fundador, Traducción, Corrección, QC, Encode",
        age: "unknown",
        nationality: "Peru",
        description: "Fan de bandori. Espera, ¿qué? ¿Cuándo me dignaré a sacar algo de ese anime? xD",
        talents: [
            { skill: "Traducción", level: 65 },
            { skill: "Corrección", level: 70 },
            { skill: "Edición", level: 50 },
            { skill: "Karaokes", level: 40 },
            { skill: "Encode", level: 100 },
            { skill: "Quality Check", level: 70 },
        ],
        image: "https://kakumeisubs.com/wp-content/uploads/2023/06/RaiN.gif",
    },
];

const GuildCard = () => {
    const [selectedMember, setSelectedMember] = useState(members[0]);

    return (
        <div className="w-full flex flex-col items-center justify-cente text-white p-6">
        {/* Perfiles apilados con Z-Index */}
        <div className="flex justify-center -space-x-5 font-mono text-sm leading-6 font-bold text-white mb-6">
            {members.map((member, index) => (
            <div
                key={index}
                className={`flex items-center justify-center cursor-pointer transition-all duration-300`}
                style={{
                zIndex: selectedMember.name === member.name ? 40 - index : 10 - index, // Apilamiento de cartas con diferentes zIndex
                transform: `scale(${selectedMember.name === member.name ? 1.1 : 1})`, // Efecto de escala al seleccionar
                }}
                onClick={() => setSelectedMember(member)}
            >
                <div
                className="flex items-center justify-center rounded-full bg-pink-500 shadow-lg outline-2 outline-white"
                style={{
                    width: "70px",
                    height: "70px",
                }}
                >
                <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover rounded-full"
                />
                </div>
            </div>
            ))}
        </div>

        {/* Tarjeta del miembro seleccionado */}
        <div className="w-full max-w-5xl flex border border-gray-200 dark:border-transparent bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100 p-6 rounded-2xl shadow-lg shadow-gray-300/50 dark:shadow-black/30 transition-all duration-500 ease">
 
            <div className="w-1/3 flex flex-col items-center text-center">
            <h2 className="text-2xl font-bold">{selectedMember.name}</h2>
            <p className="text-gray-600">{selectedMember.occupation}</p>
            <p className="text-gray-600">{selectedMember.age} años - {selectedMember.nationality}</p>
            <p className="mt-4 text-center">{selectedMember.description}</p>
            </div>
            <div className="w-2/3 flex items-center justify-center">
            <ResponsiveContainer width="100%" height={400}>
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={selectedMember.talents}>
                <PolarGrid stroke="#cccccc" strokeOpacity={0.5} />
                <PolarAngleAxis dataKey="skill" tick={{ fill: "white" }} />
                <PolarRadiusAxis stroke="#cccccc" strokeOpacity={0.5} />
                <Radar name="Talentos" dataKey="level" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                </RadarChart>
            </ResponsiveContainer>
            </div>
        </div>
        </div>
    );
};

export default GuildCard;
