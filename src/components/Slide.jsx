/* eslint-disable react/prop-types */
export default function Slide({ title, descr }) {
  return (
    <div className="slide">
      <div className="slide-content">
        <h3 className="slide-title">{title}</h3>
        <p className="slide-descr">{descr}</p>
      </div>
    </div>
  );
}
