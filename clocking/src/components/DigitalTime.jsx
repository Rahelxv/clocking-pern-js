function DigitalTime({ time }) {
  const formattedTime = time
    .toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
    .replace(":", ".");
  return (
    <div style={{ fontSize: "2rem", fontWeight: "bold" }}>{formattedTime}</div>
  );
}

export default DigitalTime;
