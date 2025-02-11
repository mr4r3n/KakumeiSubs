import { useState } from "react";
import { motion } from "framer-motion";
import { PolarAngleAxis, Radar, RadarChart, ResponsiveContainer, PolarGrid, PolarRadiusAxis } from "recharts";

const members = [
    {
        name: "RaiN",
        occupation: "Fundador, Traducción, Corrección, QC, Encode",
        age: 25,
        nationality: "Perú",
        description: "Fan de bandori. Espera, ¿qué? ¿Cuándo me dignaré a sacar algo de ese anime? xD",
        talents: [
        { skill: "Traducción", level: 100 },
        { skill: "Corrección", level: 100 },
        { skill: "Edición", level: 100 },
        { skill: "Karaokes", level: 100 },
        { skill: "Encode", level: 100 },
        { skill: "Quality Check", level: 100 },
        ],
        image: "https://kakumeisubs.com/wp-content/uploads/2023/06/RaiN.gif",
    },
    {
        name: "Aren",
        occupation: "Fundador, Editor",
        age: 28,
        nationality: "Cuba",
        description: "Por fin salí de latinoamérica, pero ya no tengo tiempo para hacer typesetting :'v",
        talents: [
        { skill: "Edición", level: 100 },
        { skill: "Corrección", level: 95 },
        { skill: "Quality Check", level: 100 },
        { skill: "Karaokes", level: 90 },
        { skill: "Encode", level: 85 },
        { skill: "Traducción", level: 80 },
        ],
        image: "https://kakumeisubs.com/wp-content/uploads/2023/06/aren.gif",
    }
];

const Staff = () => {
    const [selectedMember, setSelectedMember] = useState(members[0]);

    return (
        <div className="w-full text-white flex flex-col items-center justify-center p-10 space-y-10">
        <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-pink-400 to-purple-500 text-transparent bg-clip-text">
            Sobre Nosotros
        </h1>
        
        {/* Miembros apilados */}
        <div className="relative flex justify-center -space-x-6">
            {members.map((member, index) => (
            <motion.img
                key={index}
                src={member.image}
                alt={member.name}
                className={`w-24 h-24 border-4 border-transparent rounded-full cursor-pointer transition-transform ${
                selectedMember.name === member.name ? "scale-110 z-50" : "scale-90 z-10"
                }`}
                onClick={() => setSelectedMember(member)}
                whileHover={{ scale: 1.15 }}
            />
            ))}
        </div>
        
        {/* Tarjeta del miembro seleccionado */}
        <motion.div
            className="w-full max-w-4xl bg-gray-300/25 dark:bg-gray-800/25 transition-all duration-500 ease-in-out p-6 rounded-2xl shadow-lg border-transparent flex flex-col items-center text-center space-y-4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h2 className="text-2xl font-bold text-pink-400">{selectedMember.name}</h2>
            <p className="text-gray-500 dark:text-gray-400 transition-all duration-500 ease-in-out">{selectedMember.occupation}</p>
            <p className="text-gray-500 dark:text-gray-400 transition-all duration-500 ease-in-out">{selectedMember.age} años - {selectedMember.nationality}</p>
            <p className="text-gray-500 dark:text-gray-400 transition-all duration-500 ease-in-out">{selectedMember.description}</p>

            <ResponsiveContainer width="100%" height={300}>
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={selectedMember.talents}>
                <PolarGrid stroke="var(--color-emerald-600)" strokeOpacity={0.5} />
                <PolarAngleAxis dataKey="skill" tick={{ fill: "var(--color-emerald-600)" }} />
                <PolarRadiusAxis stroke="var(--color-emerald-600)" strokeOpacity={0.5} />
                <Radar name="Talentos" dataKey="level" stroke="#f472b6" fill="#f472b6" fillOpacity={0.6} />
            </RadarChart>
            </ResponsiveContainer>
        </motion.div>
        </div>
    );
};

export default Staff;