export default function Step4Competences({ data, onChange }) {

  // Ajouter
  const ajouter = () => {
    onChange([
      ...data,
      { nom: '', niveau: 50 }
    ]);
  };

  // Supprimer
  const supprimer = (index) => {
    onChange(data.filter((_, i) => i !== index));
  };

  // Modifier
  const modifier = (index, champ, valeur) => {
    const updated = data.map((comp, i) =>
      i === index
        ? { ...comp, [champ]: valeur }
        : comp
    );

    onChange(updated);
  };

  // Infos visuelles
  const getInfo = (niveau) => {
    switch (parseInt(niveau)) {
      case 25:
        return { label: 'Débutant', color: 'bg-red-400' };
      case 50:
        return { label: 'Intermédiaire', color: 'bg-yellow-400' };
      case 75:
        return { label: 'Avancé', color: 'bg-blue-400' };
      case 100:
        return { label: 'Expert', color: 'bg-green-500' };
      default:
        return { label: '', color: 'bg-gray-400' };
    }
  };

  return (
    <div className="space-y-6">

      {data.map((comp, index) => {
        const info = getInfo(comp.niveau);

        return (
          <div key={index} className="border p-4 rounded space-y-3">

            <input
              placeholder="Compétence (ex: React)"
              value={comp.nom}
              onChange={(e) =>
                modifier(index, 'nom', e.target.value)
              }
              className="w-full border p-2 rounded"
            />

            {/* Range */}
            <input
              type="range"
              min="25"
              max="100"
              step="25"
              value={comp.niveau}
              onChange={(e) =>
                modifier(index, 'niveau', e.target.value)
              }
              className="w-full"
            />

            {/* Label */}
            <p className="text-sm font-semibold">
              Niveau : {info.label} ({comp.niveau}%)
            </p>

            {/* Barre */}
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className={`h-3 rounded-full ${info.color}`}
                style={{ width: `${comp.niveau}%` }}
              />
            </div>

            <button
              onClick={() => supprimer(index)}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Supprimer
            </button>

          </div>
        );
      })}

      <button
        onClick={ajouter}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        + Ajouter une compétence
      </button>

    </div>
  );
}