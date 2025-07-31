import './header.scss';

export interface HeaderProps {
  children?: React.ReactNode;
}

const Header = ({ children }: HeaderProps): JSX.Element => (
  <header className="header">
    {children}
  </header>
);

export default Header;
