import { Sun, Moon } from "lucide-react";
import useTheme from "../hooks/useTheme";

const FloatingThemeButton = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
        onClick={toggleTheme}
        className="fixed bottom-4 right-4 p-3 bg-[var(--kakumei-primary)] text-white rounded-full shadow-lg cursor-pointer transition-all ease-in-out duration-500 hover:bg-[var(--kakumei-secondary)]"
        >
        {theme === "dark" ? <Sun size={24} /> : <Moon size={24} />}
    </button>
    );
};

export default FloatingThemeButton;
