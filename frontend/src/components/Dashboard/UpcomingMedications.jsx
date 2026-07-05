import "./UpcomingMedications.css";

export default function UpcomingMedications(){

    const medicamentos=[

        {
            nombre:"Paracetamol",
            hora:"08:00"
        },

        {
            nombre:"Amoxicilina",
            hora:"13:00"
        },

        {
            nombre:"Vitamina D",
            hora:"20:00"
        }

    ];

    return(

        <div className="panel">

            <h3>💊 Próximas dosis</h3>

            {

                medicamentos.map((m,index)=>(

                    <div
                        key={index}
                        className="fila"
                    >

                        <span>{m.nombre}</span>

                        <strong>{m.hora}</strong>

                    </div>

                ))

            }

        </div>

    )

}