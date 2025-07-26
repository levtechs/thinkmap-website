type Props = {
  text: string;
  onClick: () => void;
};

export default function Button({ text, onClick }: Props) {
    return (
        <button
            onClick={onClick}
            style={{
                padding: "10px 16px",
                backgroundColor: "rgba(147, 197, 253, 0.2)",
                color: "white",
                border: "1px solid rgba(147, 197, 253, 0.5)",
                borderRadius: 6,
                fontSize: 16,
                fontWeight: "bold",
                cursor: "pointer",
                transition: "background-color 0.2s, transform 0.2s",
            }}
            onMouseOver={e => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = "rgba(147, 197, 253, 0.35)";
            }}
            onMouseOut={e => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = "rgba(147, 197, 253, 0.2)";
            }}
        >
            {text}
        </button>
    );
}
