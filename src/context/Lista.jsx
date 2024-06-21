import { useState, useEffect } from "react";

const Lista = () => {
    // Declarar estados iniciales
    const [users, setUsers] = useState([]);
    const [newUserName, setNewUserName] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Declarar la URL de la API
    const apiUrl = "https://6668c909f53957909ff92b19.mockapi.io/df-9";

    useEffect(() => {
        // Realizar solicitud GET al montar el componente
        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => setUsers(data))
            .catch((error) => console.error("Error al obtener usuarios:", error))
            .finally(() => setLoading(false));
    }, []);

    const handleCreateUser = () => {
        // Realizar solicitud POST para agregar un nuevo usuario
        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: newUserName }),
        })
            .then((response) => response.json())
            .then((newUser) => {
                setUsers([...users, newUser]);
                setNewUserName('');
            })
            .catch((error) => console.error('Error al crear usuario:', error));
    };

    const handleUpdateUser = () => {
        if (!selectedUser) return;

        // Realizar solicitud PUT para actualizar un usuario existente
        fetch(`${apiUrl}/${selectedUser.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: newUserName }),
        })
            .then((response) => response.json())
            .then((updatedUser) => {
                setUsers(users.map((user) => (user.id === selectedUser.id ? updatedUser : user)));
                setNewUserName('');
                setSelectedUser(null);
            })
            .catch((error) => console.error('Error al actualizar usuario:', error));
    };

    const handleDeleteUser = (userId) => {
        // Realizar solicitud DELETE para eliminar un usuario
        fetch(`${apiUrl}/${userId}`, {
            method: 'DELETE',
        })
            .then(() => {
                setUsers(users.filter((user) => user.id !== userId));
                setNewUserName('');
                setSelectedUser(null);
            })
            .catch((error) => console.error('Error al eliminar usuario:', error));
    };

    return (
        <div className="card mx-auto my-4" style={{ width: "18rem" }}>
            <div className="card-body text-center">
                <h5 className="card-title">Lista de Usuarios</h5>
                <div>
                    {loading ? (
                        <h1>Cargando...</h1>
                    ) : (
                        <ul className="list-unstyled">
                            {users.map((user) => (
                                <li key={user.id} className="mb-3">
                                    <img src={user.avatar} alt="..." className="rounded-circle mb-2" style={{ width: "50px", height: "50px" }} />
                                    <p>{user.name}</p>
                                    <button onClick={() => {
                                        setSelectedUser(user);
                                        setNewUserName(user.name);
                                    }} className="btn btn-danger btn-sm mx-1">Seleccionar para editar</button>
                                    <button onClick={() => handleDeleteUser(user.id)} className="btn btn-danger btn-sm mx-1">Eliminar</button>
                                </li>
                            ))}
                        </ul>
                    )}

                    <div>
                        <input
                            type="text"
                            value={newUserName}
                            onChange={(e) => setNewUserName(e.target.value)}
                            placeholder="Nombre del Usuario"
                            className="form-control my-2"
                        />
                        {selectedUser ? (
                            <button onClick={handleUpdateUser} className="btn btn-primary">Actualizar Usuario</button>
                        ) : (
                            <button onClick={handleCreateUser} className="btn btn-primary">Crear Usuario</button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Lista;
