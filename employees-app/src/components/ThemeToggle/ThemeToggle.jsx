import { useTheme } from '../ThemeProvider';
import { SunIcon, MoonIcon } from '../Icons/Icons';
import './ThemeToggle.css';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button className={`theme-toggle ${isDark ? 'dark' : 'light'}`} onClick={toggleTheme} type="button">
      <div className="theme-toggle-track">
        <div className="theme-toggle-thumb">
          {isDark ? <SunIcon /> : <MoonIcon />}
        </div>
      </div>
    </button>
  );
};