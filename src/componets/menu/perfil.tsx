import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';

interface Props {
  nombre: string;
  rol: string;
}


export const Perfil: React.FC<Props> = ({ nombre, rol }) => {

  const logout = () => {
    localStorage.clear();
    window.location.href = '/';
  }


  return (
    <>
     <div>
      <div className="profile">
        <div className="profile-container">
        <hr />
        <p> PERFIL </p>
        <hr/>
        </div>
        <div className="profile-data">

        <AccountCircleIcon/>
        <div>
          <p > {nombre ? nombre: ''}</p>
          <p > {rol ? rol: ''}</p>
          </div>
        </div>
      </div>
      <button className="salir"  onClick={logout}><LogoutIcon/> Salir</button> 

    </div>
    
    </>
  )
}
