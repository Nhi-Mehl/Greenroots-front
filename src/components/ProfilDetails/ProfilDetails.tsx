

function ProfilDetails () {


    return(
        <div className="flex flex-col gap-8 m-10">
           <h1 className="text-center h3-title">Details de mon profil</h1>
            <div className="mr-16 ml-16 flex flex-row  justify-evenly border-2 border-solid border-greenRegular w ">
            <div className="p-6" >
            <p className="text-center">Nom :</p>
            <p className="text-center">Prénom :</p>
            <p className="text-center">Email :</p>
            <p className="text-center">Téléphone :</p> 
            </div>
            
            <div className="p-6">
            <p className="text-center">Adresse :</p>
            <p className="text-center">Code postal :</p>
            <p className="text-center">Ville</p>
            <p className="text-center">Pays :</p> 
            </div>
            </div>

<button className="btn m-auto" type="submit">Modifier</button> 
        </div>

    )
}

export default ProfilDetails