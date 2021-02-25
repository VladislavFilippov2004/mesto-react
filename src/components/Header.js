import logo from  '../images/logo.svg';

function Header () {
    return (
        <header className="header">
     <img className="header__logo" src={logo}  alt="Плохое соединение с интернетом" />   
</header>
    )
}

export default Header;