export default function HighLight({ highlight, data }) {
  const parts = data.split(new RegExp(`(${highlight})`, "gi"));
  return (
    <span>
      {parts.map((part, index) =>
        part.toLowerCase() === highlight.toLowerCase() ? (
          <b key={index} className="highlight">
            {part}
          </b>
        ) : (
          part
        )
      )}
    </span>
  );
}
