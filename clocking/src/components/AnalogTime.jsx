function AnalogTime({ time }) {
  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours();

  const secDeg = (seconds / 60) * 360;
  const minDeg = ((minutes + seconds / 60) / 60) * 360;
  const hourDeg = (((hours % 12) + minutes / 60) / 12) * 360;

  const clockStyle = {
    width: "50px",
    height: "50px",
    border: "2px solid black",
    borderRadius: "50%",
    position: "relative",
  };

  const handStyle = (deg, length, color) => ({
    position: "absolute",
    bottom: "50%",
    left: "50%",
    width: "2px",
    height: length,
    backgroundColor: color,
    transformOrigin: "bottom",
    transform: `translateX(-50%) rotate(${deg}deg)`,
  });
  return (
    <div style={clockStyle}>
      <div style={handStyle(hourDeg, "15px", "black")} />
      <div style={handStyle(minDeg, "20px", "gray")} />
      <div style={handStyle(secDeg, "22px", "red")} />
    </div>
  );
}
export default AnalogTime;
