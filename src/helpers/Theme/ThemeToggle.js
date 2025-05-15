import { useAppContext } from "@/context/AppContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useAppContext();

  return (
    <button onClick={toggleTheme} style={{ padding: '10px', marginTop: '20px' }}>
      Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
    </button>
  );
};

export default ThemeToggle;
