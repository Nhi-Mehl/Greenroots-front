import { useEffect, useState } from "react";
import { IUser } from "../../@types";
import { useUser } from "../../context/UserContext";
import api from "../../api/index";
import { Navigate } from "react-router-dom";

function ProfilDetails() {
  const { user } = useUser()
  // const [userDetails, setUserDetails] = useState<IUser | null>(null)

  // useEffect(() => {
  //   const fetchUserDetails = async () => {
  //     try {
  //       const response = await api.get(`/users/users/${user?.id}`); 
  //       setUserDetails(response.data); 
  //     } catch (error) {
  //       console.error('Erreur lors de la récupération des détails de l\'utilisateur', error); 
  //     }
  //   };

  //   if (user?.id) {
  //     fetchUserDetails(); 
  //   }
  // }, [user?.id]); 

  // if (!userDetails) {
  //   return <p>Chargement des détails...</p>; 
  // }
if (!user) {
  return <Navigate to="/login" replace />;
}
  return (
    <div className="flex flex-col gap-8 m-10">
      <h1 className="text-center h3-title">Details de mon profil</h1>
      <div className="mr-16 ml-16 flex flex-row  justify-evenly border-2 border-solid border-greenRegular w ">
        <div className="p-6 text-left">
          <p className="">Nom : {user.last_name}</p>
          <p className="">Prénom : {user.first_name}</p>
          <p className="">Email : {user.email}</p>
          <p className="">Téléphone : {user.phone_number}</p>
        </div>

        <div className="p-6 text-left">
          <p className="">Adresse : {user.address}</p>
          <p className="">Code postal : {user.zip_code}</p>
          <p className="">Ville : {user.city}</p>
          <p className="uppercase">Pays : {user.country}</p>
        </div>
      </div>

      <button className="btn m-auto" type="submit">
        Modifier
      </button>
    </div>
  );
}

export default ProfilDetails;
