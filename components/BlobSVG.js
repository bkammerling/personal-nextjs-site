
export default function BlobSVG({ gradient, id }) {
  console.log(gradient);
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <path id={id} fill={`url(#${gradient})`} d="M25.2,-42.5C33.3,-34.1,40.7,-28.1,51.5,-19.2C62.3,-10.3,76.4,1.3,77.7,13.1C79,24.8,67.5,36.7,54.5,41.8C41.6,46.9,27.2,45.3,14,50.6C0.7,55.9,-11.4,68,-23.5,69.3C-35.6,70.7,-47.6,61.2,-53,49.2C-58.4,37.2,-57.2,22.6,-55.7,10.1C-54.3,-2.4,-52.6,-12.8,-50.8,-25.9C-49,-38.9,-47.1,-54.6,-38.6,-62.8C-30.1,-71,-15.1,-71.8,-3.2,-66.7C8.6,-61.7,17.2,-50.9,25.2,-42.5Z" transform="translate(100 100)"></path>
      <defs>
        <linearGradient id="pinkGradient">
          <stop offset="5%" stopColor="#bc4e9c" />
          <stop offset="95%" stopColor="#f80759" />
        </linearGradient>
        <linearGradient id="orangeGradient">
          <stop offset="5%" stopColor="#ff9966" />
          <stop offset="95%" stopColor="#ff5e62" />
        </linearGradient>
        <pattern id="benPhoto" patternContentUnits="objectBoundingBox" width="1" height="1">
          <image href="/images/profile.jpg" x="0" y="0" preserveAspectRatio="xMidYMid slice" width="1" height="1" />
        </pattern>
      </defs>
    </svg>
  )
}
