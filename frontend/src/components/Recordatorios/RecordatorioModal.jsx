import "./RecordatorioModal.css";

export default function RecordatorioModal({
    abierto,
    titulo,
    children,
    onClose
}) {

    if (!abierto) return null;

    return (
        <div className="modal-overlay">

            <div className="modal-container">

                <div className="modal-header">

                    <h2>{titulo}</h2>

                    <button
                        className="modal-close"
                        onClick={onClose}
                    >
                        ✖
                    </button>

                </div>

                <div className="modal-body">
                    {children}
                </div>

            </div>

        </div>
    );
}