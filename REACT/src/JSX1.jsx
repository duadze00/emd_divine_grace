import adwoa from "../assets/adwoa.jpg";

export default function JSX() {
  return (
    <>
      <h1>React is {5 + 5} times better with JSX.</h1>
      {/* IMAGE IN THE ASSET FOLDER */}
      <p>This image was inside assets folder</p>
      <img src={adwoa} alt="Adwoa" className="adwoa" />
      {/* IMAGE IN THE PUBLIC FOLDER */}
      <p>This image was inside public folder</p>
      <img src="/be.jpg" alt="Adwoa" className="adwoa" />
    </>
  );
}
