import { ThemeToggle } from '../ThemeToggle/ThemeToggle';
import logo from '../../assets/66bit-logo.svg';
import './Header.css';

export const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-logo">
          <img src={logo} alt="66bit Logo" className="header-logo-img" />
        </div>
        <div className="header-actions">
          <div className="header-contacts">
            <a href="tel:+79001234567">+7 343 290 84 76</a>
            <a href="mailto:info@company.com">info@66bit.ru</a>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};