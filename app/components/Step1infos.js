export default function Step1Infos({ data, onChange }) {

    const handleChange = (e) => {
        onChange({
            ...data,
            [e.target.name]: e.target.value
        });
    };
    //validation email
    const isEmailValid =
        data.email === '' ||
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email);

    //validation telephone
    const isPhoneValid =
        data.telephone === '' ||
        /^[0-9]{9,15}$/.test(data.telephone);
    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold ">Informations Personnelles</h2>
            <h4 className="text-lg  mb-8">Ces informations apparaîtront en haut de votre cv</h4>
            <input
                name="prenom"
                placeholder="Prénom"
                value={data.prenom}
                onChange={handleChange}
                className="w-full border p-2 rounded"
            />

            <input
                name="nom"
                placeholder="Nom"
                value={data.nom}
                onChange={handleChange}
                className="w-full border p-2 rounded"
            />

            <input
                name="titre"
                placeholder="Titre professionel (ex: Développeur Web)"
                value={data.titre}
                onChange={handleChange}
                className="w-full border p-2 rounded"
            />

            <input
                name="email"
                placeholder="Email"
                value={data.email}
                onChange={handleChange}
                className={`w-full border p-2 rounded
                   ${!isEmailValid
                        ? 'border-red-400 bg-red-50'
                        : data.email
                            ? 'border-green-400'
                            : 'border-gray-300'
                    }`}
            />
            {!isEmailValid && (
                <p className="text-red-500 text-sm">
                    Email invalide
                </p>
            )}

            <input
                name="telephone"
                placeholder="Téléphone"
                value={data.telephone}
                onChange={handleChange}
                className={`w-full border p-2 rounded
                     ${!isPhoneValid
                        ? 'border-red-400 bg-red-50'
                        : data.telephone
                            ? 'border-green-400'
                            : 'border-gray-300'
                    }`}
            />

            <input
                name="adresse"
                placeholder="Adresse"
                value={data.adresse}
                onChange={handleChange}
                className="w-full border p-2 rounded"
            />

            <textarea
                name="resume"
                placeholder="Résumé / Profil"
                value={data.resume}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                rows={4}
            />

        </div>
    );
}