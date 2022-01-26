import { useEffect } from "react";

import Swal from 'sweetalert2';

import useFormulario from '../hooks/useFormulario';

const UsersForm = ({user,setUser,fetchAndSetUsers}) => {
    const initialValue = {
        id: 0,
        email: "",
        password: "",
        first_name: "",
        last_name: "",
        birthday: ""
    };
    const [formulario, handleChange, setFormulario, reset] = useFormulario(initialValue);

    useEffect(() => {
        if(user != null) {
            setFormulario(user);
        }
    },[user]);

    const handleSubmit = () => {        
        if(user === null) {
            createUser(formulario);
        }else {
            updateUser(formulario);
        }
    }

    const clearUserForm = () => {
        reset();
        setUser(null);
    };

    const processSuccess = () => {
        fetchAndSetUsers();
        clearUserForm();

        Swal.fire('Saved!', '', 'success');
    };

    const createUser = async (userToCreate) => {
        const response = await fetch(`https://users-crud1.herokuapp.com/users/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },            
            body: JSON.stringify(userToCreate)
        }); 

        const data = await response.json();

        processSuccess();
    };

    const updateUser = async (userToUpdate) => {
        const response = await fetch(`https://users-crud1.herokuapp.com/users/${userToUpdate.id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },            
            body: JSON.stringify(userToUpdate)
        }); 

        const data = await response.json(); 
        
        processSuccess();
    };

    let title = user != null ? 'Edit User' : 'Create User';

    return (
        <div className="card shadow w-100">
            <div className="card-header">
                <h3 className='text-center'>{title}</h3>
            </div>
            <div className="card-body">
                <form>
                    <div className="mb-3">
                        <label htmlFor="txtFirstName" className="form-label">First Name:</label>
                        <input 
                            id="txtFirstName"
                            name="first_name" 
                            type="text"
                            className="form-control"
                            placeholder="First Name" 
                            value={formulario.first_name} 
                            onChange={handleChange}
                        />        
                    </div>
                    <div className="mb-3">
                        <label htmlFor="txtLastName" className="form-label">Last Name:</label>
                        <input 
                            id="txtLastName"
                            name="last_name" 
                            type="text"
                            className="form-control"
                            placeholder="Last Name" 
                            value={formulario.last_name} 
                            onChange={handleChange}
                        />        
                    </div> 
                    <div className="mb-3">
                        <label htmlFor="txtEmail" className="form-label">Email:</label>
                        <input 
                            id="txtEmail"
                            name="email" 
                            type="email"
                            className="form-control"
                            placeholder="email" 
                            value={formulario.email} 
                            onChange={handleChange}
                        />        
                    </div>    
                    <div className="mb-3">
                        <label htmlFor="txtPassword" className="form-label">Password:</label>
                        <input 
                            id="txtPassword"
                            name="password" 
                            type="password"
                            className="form-control"
                            placeholder="password" 
                            value={formulario.password} 
                            onChange={handleChange}
                        />        
                    </div>
                    <div className="mb-3">
                        <label htmlFor="dtpBirthday" className="form-label">Birthday:</label>
                        <input 
                            id="dtpBirthday"
                            name="birthday" 
                            type="date"
                            className="form-control"
                            placeholder="" 
                            value={formulario.birthday} 
                            onChange={handleChange}
                        />        
                    </div>
                    <div className='mb-3 d-grid gap-2'>
                        <button className='btn btn-primary' type="button" onClick={() => handleSubmit()}>
                            Upload
                        </button>
                        {user != null && 
                            <button className="btn btn-danger" type="button" onClick={() => clearUserForm()}>
                                Clear
                            </button>                        
                        }

                    </div>                                                                            
                </form>
            </div>
        </div>
    )
};

export default UsersForm;