import { useState } from "react";

export default function Step5Langues({ dataLangues, dataLoisirs, onChangeLangues, onChangeLoisirs }) {

    const NIVEAUX = ['Débutant', 'Intermédiaire', 'Avancé', 'Courant'];

    const [newLangue, setNewLangue] = useState('');
    const [niveau, setNiveau] = useState('Intermédiaire');
    const [newLoisir, setNewLoisir] = useState('');

    // LANGUES 

    const ajouterLangue = () => {
        if (!newLangue.trim()) return;

        onChangeLangues([
            ...dataLangues,
            { nom: newLangue, niveau }
        ]);

        setNewLangue('');
    };

    const supprimerLangue = (index) => {
        onChangeLangues(dataLangues.filter((_, i) => i !== index));
    };

    // LOISIRS

    const ajouterLoisir = () => {
        if (!newLoisir.trim()) return;

        onChangeLoisirs([
            ...dataLoisirs,
            newLoisir.trim()
        ]);

        setNewLoisir('');
    };

    const supprimerLoisir = (index) => {
        onChangeLoisirs(dataLoisirs.filter((item, i) => i !== index));
    };

    return (
        <div className="space-y-8">

            {/* LANGUES */}
            <div className="space-y-3">
                <h2 className="font-bold">Langues</h2>

                <div className="flex gap-2">
                    <input
                        placeholder="Langue"
                        value={newLangue}
                        onChange={(e) => setNewLangue(e.target.value)}
                        className="border p-2 rounded w-full"
                    />

                    <select
                        value={niveau}
                        onChange={(e) => setNiveau(e.target.value)}
                        className="border p-2 rounded"
                    >
                        {NIVEAUX.map((n) => (
                            <option key={n}>{n}</option>
                        ))}
                    </select>

                    <button
                        onClick={ajouterLangue}
                        className="bg-blue-500 text-white px-3 rounded"
                    >
                        +
                    </button>
                </div>

                {/* Liste */}
                <div className="flex flex-wrap gap-2">
                    {dataLangues.map((langue, index) => (
                        <span
                            key={index}
                            className="bg-gray-200 px-3 py-1 rounded flex items-center gap-2"
                        >
                            {langue.nom} ({langue.niveau})
                            <button onClick={() => supprimerLangue(index)}>
                                supprimer
                            </button>
                        </span>
                    ))}
                </div>
            </div>

            {/* LOISIRS */}
            <div className="space-y-3">
                <h2 className="font-bold">Loisirs</h2>

                <input
                    placeholder="Ajouter un loisir"
                    value={newLoisir}
                    onChange={(e) => setNewLoisir(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && ajouterLoisir()}
                    className="border p-2 rounded w-full"
                />

                <div className="flex flex-wrap gap-2">
                    {dataLoisirs.map((loisir, index) => (
                        <span
                            key={index}
                            className="bg-blue-200 px-3 py-1 rounded flex items-center gap-2"
                        >
                            <p>{loisir}</p>
                            <button
                                className="bg-red-500 text-white px-3 py-1 rounded"

                                onClick={() => supprimerLoisir(index)}>
                                supprimer
                            </button>
                        </span>
                    ))}
                </div>
            </div>

        </div>
    );
}