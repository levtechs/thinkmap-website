const SleepingServerPanel = () => (
    <div
        style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.6)", // dark overlay
            backdropFilter: "blur(4px)",
            color: "white",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
        }}
    >
        <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
            💤 Server is sleeping
        </h2>
        <p style={{ fontSize: "1rem", maxWidth: "400px", textAlign: "center" }}>
            Our backend server is currently asleep. Please check back in a few moments once it wakes up. You may still view pre-created spaces
        </p>
    </div>
);

export default SleepingServerPanel;