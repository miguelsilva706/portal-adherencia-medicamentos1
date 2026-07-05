import { useEffect, useMemo, useState } from "react";
import historialService from "../../services/historialService";

export default function Historial() {

    const [historial, setHistorial] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        cargarHistorial();
    }, []);

    const cargarHistorial = async () => {

        try {

            const data = await historialService.listar();
            setHistorial(data);

        } catch (error) {

            console.error(error);
            alert("No se pudo cargar el historial.");

        } finally {

            setCargando(false);

        }

    };

    const filtrados = useMemo(() => {

        return historial.filter(h =>
            h.medicamentoNombre
                .toLowerCase()
                .includes(busqueda.toLowerCase())
        );

    }, [historial, busqueda]);

    if (cargando) {

        return (

            <div style={{ padding: 30 }}>
                <h2>Cargando historial...</h2>
            </div>

        );

    }

    return (

        <div style={contenedor}>

            <div style={header}>

                <div>

                    <h1 style={{ margin: 0 }}>
                        Historial de Adherencia
                    </h1>

                    <p style={{ color: "#64748b" }}>
                        Consulta todos los registros realizados.
                    </p>

                </div>

            </div>

            <input
                type="text"
                placeholder="Buscar medicamento..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                style={input}
            />

            <div style={stats}>

                <Card
                    titulo="Total"
                    valor={historial.length}
                />

                <Card
                    titulo="Tomados"
                    valor={
                        historial.filter(
                            h => h.estado === "TOMADO"
                        ).length
                    }
                />

                <Card
                    titulo="Retrasados"
                    valor={
                        historial.filter(
                            h => h.estado === "RETRASADO"
                        ).length
                    }
                />

                <Card
                    titulo="Omitidos"
                    valor={
                        historial.filter(
                            h => h.estado === "OMITIDO"
                        ).length
                    }
                />

            </div>

            <div style={grid}>

                {

                    filtrados.length === 0 ?

                        (

                            <div style={sinDatos}>

                                No existen registros.

                            </div>

                        )

                        :

                        (

                            filtrados.map(registro => (

                                <div
                                    key={registro.id}
                                    style={card}
                                >

                                    <h3>

                                        💊 {registro.medicamentoNombre}

                                    </h3>

                                    <p>

                                        <strong>Estado:</strong>{" "}

                                        {

                                            registro.estado === "TOMADO"

                                                ?

                                                "🟢 Tomado"

                                                :

                                                registro.estado === "RETRASADO"

                                                    ?

                                                    "🟡 Retrasado"

                                                    :

                                                    "🔴 Omitido"

                                        }

                                    </p>

                                    <p>

                                        <strong>Fecha:</strong>{" "}

                                        {new Date(registro.fechaHora).toLocaleString()}

                                    </p>

                                    <p>

                                        <strong>Observación:</strong>{" "}

                                        {

                                            registro.observacion ||

                                            "-"

                                        }

                                    </p>

                                </div>

                            ))

                        )

                }

            </div>

        </div>

    );

}

function Card({ titulo, valor }) {

    return (

        <div style={cardStat}>

            <h2>{valor}</h2>

            <span>{titulo}</span>

        </div>

    );

}

const contenedor = {
    padding: 30,
    background: "#f4f7fb",
    minHeight: "100vh"
};

const header = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25
};

const input = {
    width: "100%",
    padding: 12,
    borderRadius: 10,
    border: "1px solid #ddd",
    marginBottom: 25
};

const stats = {
    display: "flex",
    gap: 20,
    marginBottom: 30
};

const cardStat = {
    flex: 1,
    background: "white",
    borderRadius: 15,
    padding: 20,
    textAlign: "center",
    boxShadow: "0 5px 15px rgba(0,0,0,.08)"
};

const grid = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill,minmax(340px,1fr))",
    gap: 20
};

const card = {
    background: "white",
    borderRadius: 15,
    padding: 20,
    boxShadow: "0 5px 15px rgba(0,0,0,.08)"
};

const sinDatos = {
    gridColumn: "1 / -1",
    background: "white",
    borderRadius: 15,
    padding: 40,
    textAlign: "center",
    color: "#64748b"
};