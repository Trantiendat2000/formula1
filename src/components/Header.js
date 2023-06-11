import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="header__champion">
        <img
          className="header__fiaLogo"
          src="https://www.formula1.com/etc/designs/fom-website/images/fia_logo.png"
          alt="fia"
        />
        <ul>
          <li>
            F1<sup>®</sup>
          </li>
          <li>
            F2<sup>™</sup>
          </li>
          <li>
            F3<sup>™</sup>
          </li>
          <li>
            F1<sup>®</sup>ACADEMY
          </li>
        </ul>
      </div>
      <div className="header__info">
        <ul>
          <li>AUTHENTICS</li>
          <li>STORE</li>
          <li>TICKETS</li>
          <li>HOSPITALITY</li>
          <li>EXPERRIENCES</li>
        </ul>
        <img
          src="https://www.formula1.com/etc/designs/fom-website/images/f1-tv-logo.png
        "
          alt="f1-tv"
        />
        <button className="header__btnSignIn">SIGN IN</button>
        <button className="header__btnSub">SUBSCRIBE</button>
      </div>
    </header>
  );
};

export default Header;
