function Tooltip ({ text }) {
    return (
        <span className="tooltip-wrapper">
        <span className="tooltip-icon">i</span>
        <span className="tooltip-text">{text}</span>
        </span>
    );
}

export default Tooltip;