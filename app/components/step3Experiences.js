export default function Step3Experiences({ data, onChange }) {

    // Ajouter
    const ajouter = () => {
        onChange([
            ...data,
            {
                poste: '',
                entreprise: '',
                dateDebut: '',
                dateFin: '',
                enCours: false
            }
        ]);
    };

    // Supprimer
    const supprimer = (index) => {
        onChange(data.filter((_, i) => i !== index));
    };

    // Modifier
    const modifier = (index, champ, valeur) => {

        const updated = data.map((exp, i) => {

            if (i === index) {
                const newExp = { ...exp, [champ]: valeur };

                // 🔥 logique intelligente
                if (champ === 'enCours' && valeur === true) {
                    newExp.dateFin = '';
                }

                return newExp;
            }

            return exp;
        });

        onChange(updated);
    };

    return (
        <div className="space-y-6">

            {data.map((exp, index) => (
                <div key={index} className="border p-4 rounded space-y-2">

                    <input
                        placeholder="Poste"
                        value={exp.poste}
                        onChange={(e) =>
                            modifier(index, 'poste', e.target.value)
                        }
                        className="w-full border p-2 rounded"
                    />

                    <input
                        placeholder="Entreprise"
                        value={exp.entreprise}
                        onChange={(e) =>
                            modifier(index, 'entreprise', e.target.value)
                        }
                        className="w-full border p-2 rounded"
                    />
                    <label>Date de debut:
                        <input
                            type="month"
                            value={exp.dateDebut}
                            onChange={(e) =>
                                modifier(index, 'dateDebut', e.target.value)
                            }
                            className="w-full border p-2 rounded"
                        />
                    </label>

                    <label>Date de fin
                        <input
                            type="month"
                            placeholder="Date de fin"
                            value={exp.dateFin}
                            disabled={exp.enCours}
                            onChange={(e) =>
                                modifier(index, 'dateFin', e.target.value)
                            }
                            className={`w-full border p-2 rounded
                           ${exp.enCours ? 'bg-gray-100 opacity-50' : ''}`}
                        />
                    </label>

                    {/* Checkbox */}
                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={exp.enCours}
                            onChange={(e) =>
                                modifier(index, 'enCours', e.target.checked)
                            }
                        />
                        En cours
                    </label>

                    <button
                        onClick={() => supprimer(index)}
                        className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                        Supprimer
                    </button>

                </div>
            ))}

            <button
                onClick={ajouter}
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
                + Ajouter une expérience
            </button>

        </div>
    );
}