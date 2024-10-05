import logo from "../../assets/images/MillenniumPuzzleIcon.png";

export const Header = () => {
  return (
    <header>
      <img src={logo} alt="logo" />
      <h1>ola mundo!</h1>
      <div className="links-container"></div>
    </header>
  );
};
