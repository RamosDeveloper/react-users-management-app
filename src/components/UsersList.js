import Swal from 'sweetalert2';

import Loading from './Loading';

const UsersList = ({users, setUser, fetchAndSetUsers}) => {
    if(users.length === 0) return <Loading />

    const deleteUserAlert = (userToBeDelete) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to delete the user [" + userToBeDelete.id + "]" ,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                deleteUser(userToBeDelete);
            }
          });
    };
        
    const deleteUser = async (userToBeDelete) => {
        const response = await fetch(`https://users-crud1.herokuapp.com/users/${userToBeDelete.id}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }); 

        fetchAndSetUsers();

        Swal.fire(
            'Deleted!',
            'The user [' + userToBeDelete.id + '] has been deleted.',
            'success'
        );       
    };

    return (
        <div className="container my-4">
            {users?.map((user) => 
                <div key={user.id} className='card mb-2 shadow'>
                    <div className='card-body'>
                        <div className='row'>
                            <div className='col-12 col-md-6'>
                                <div className=''>
                                    <i className="fab fa-react"></i>
                                    <span className="mx-3 text-muted">{user.id}</span>
                                </div>                                
                                <div className=''>
                                    <i className="fas fa-id-card"></i>
                                    <span className="mx-3 font-bolder">{user.first_name} {user.last_name}</span>
                                </div>
                                <div className="">
                                    <i className="fas fa-envelope"></i>
                                    <span className="mx-3 text-muted">{user.email}</span>
                                </div> 
                                <div className="">
                                    <i className="fas fa-calendar-alt"></i>
                                    <span className="mx-3 text-muted">{user.birthday}</span>
                                </div>                                 
                            </div>
                            <div className='col-12 col-md-6 d-flex align-items-center justify-content-end'>
                                <i className="far fa-edit mx-2" onClick={() => setUser(user)}></i>
                                <i className="fas fa-trash-alt mx-2" onClick={() => deleteUserAlert(user)}></i>                             
                            </div>                            
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
};

export default UsersList;