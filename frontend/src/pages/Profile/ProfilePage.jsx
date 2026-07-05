import { useEffect, useState } from "react";
import { getProfile, updateProfile } from "../services/profileService";

export default function ProfilePage() {
  const [user, setUser] = useState({
    nombreCompleto: "",
    telefono: ""
  });

  useEffect(() => {
    getProfile().then(res => setUser(res.data));
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateProfile(user);
    alert("Perfil actualizado");
  };

  return (
    <div>
      <h2>Mi Perfil</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="nombreCompleto"
          value={user.nombreCompleto}
          onChange={handleChange}
        />

        <input
          name="telefono"
          value={user.telefono}
          onChange={handleChange}
        />

        <button type="submit">Guardar</button>
      </form>
    </div>
  );
}