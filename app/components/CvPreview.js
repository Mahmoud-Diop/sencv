export default function CVPreview({ cv, theme }) {
    const { infos, formations, experiences, competences, langues, loisirs } = cv;

    const themeStyles = {
        classique: "bg-white text-black",
        moderne: "bg-gray-900 text-white",
        minimal: "bg-gray-100 text-gray-800"
    };

    return (
        <div
           id="cv-preview"
         className={`${themeStyles[theme]} p-6 rounded shadow`}>
            {/* INFOS */}
            <div>
                <h1 className="text-2xl font-bold">
                    {infos.prenom} {infos.nom}
                </h1>
                <p className="text-gray-600">{infos.titre}</p>
                <p>{infos.email} | {infos.telephone}</p>
                <p>{infos.adresse}</p>
                <p className="mt-2">{infos.resume}</p>
            </div>

            {/* FORMATIONS */}
            {formations.length > 0 && formations.some(f => f.diplome) && (
                <div>
                    <h2 className="font-bold border-b mb-2">Formations</h2>

                    {formations
                        .filter(f => f.diplome)
                        .map((f, index) => (
                            <div key={index}>
                                <p className="font-semibold">{f.diplome}</p>
                                <p className="text-sm">
                                    {f.etablissement} - {f.annee}
                                </p>

                            </div>

                        ))}
                </div>
            )}

            {/* EXPERIENCES */}
            {experiences.length > 0 && experiences.some(e => e.poste) && (
                <div>
                    <h2 className="font-bold border-b mb-2">Expériences</h2>

                    {experiences
                        .filter(e => e.poste)
                        .map((e, i) => (
                            <div key={i}>
                                <p className="font-semibold">{e.poste}</p>
                                <p className="text-sm">
                                    {e.entreprise}
                                </p>
                                <p className="text-xs">
                                    {e.dateDebut} - {e.enCours ? 'En cours' : e.dateFin}
                                </p>
                            </div>
                        ))}
                </div>
            )}

            {/* COMPETENCES */}
            {competences.length > 0 && (
                <div>
                    <h2 className="font-bold border-b mb-2">Compétences</h2>

                    {competences.map((c, i) => (
                        <div key={i} className="mb-2">
                            <p>{c.nom}</p>

                            <div className="w-full bg-gray-200 h-2 rounded">
                                <div
                                    className="bg-blue-500 h-2 rounded"
                                    style={{ width: `${c.niveau}%` }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* LANGUES */}
            {langues.length > 0 && (
                <div>
                    <h2 className="font-bold border-b mb-2">Langues</h2>

                    {langues.map((l, i) => (
                        <p key={i}>
                            {l.nom} ({l.niveau})
                        </p>
                    ))}
                </div>
            )}

            {/* LOISIRS */}
            {loisirs.length > 0 && (
                <div>
                    <h2 className="font-bold border-b mb-2">Loisirs</h2>

                    <div className="flex flex-wrap gap-2">
                        {loisirs.map((l, i) => (
                            <span
                                key={i}
                                className="bg-gray-200 px-3 py-1 rounded"
                            >
                                {l}
                            </span>
                        ))}
                    </div>
                </div>
            )}

        </div>
    );
}
