export default function Step2Formations({ data, onChange }) {

  // Ajouter une formation
  const ajouter = () => {
    onChange([
      ...data,
      { diplome: '', etablissement: '', annee: '' }
    ]);
  };

  //compteur
  const count = data.filter(f => f.diplome.trim() !== '').length;

  // Supprimer
  const supprimer = (index) => {
    onChange(data.filter((item, i) => i !== index));
  };

  // Modifier
  const modifier = (index, champ, valeur) => {
    const updated = data.map((item, i) =>
      i === index
        ? { ...item, [champ]: valeur }
        : item
    );

    onChange(updated);
  };
  const monter = (index) => {
    if (index === 0) return;

    const newData = [...data];
    [newData[index - 1], newData[index]] =
      [newData[index], newData[index - 1]];

    onChange(newData);
  };

  const descendre = (index) => {
    if (index === data.length - 1) return;

    const newData = [...data];
    [newData[index + 1], newData[index]] =
      [newData[index], newData[index + 1]];

    onChange(newData);
  };




  return (
    <div className="space-y-6">

      <p className="text-sm text-gray-600">
        {count} {count <= 1 ? 'formation ajoutée' : 'formations ajoutées'}
      </p>

      {data.map((formation, index) => (
        <div key={index} className="border p-4 rounded space-y-2">

          <input
            placeholder="Diplôme"
            value={formation.diplome}
            onChange={(e) =>
              modifier(index, 'diplome', e.target.value)
            }
            className="w-full border p-2 rounded"
          />

          <input
            placeholder="Établissement"
            value={formation.etablissement}
            onChange={(e) =>
              modifier(index, 'etablissement', e.target.value)
            }
            className="w-full border p-2 rounded"
          />

          <input
            placeholder="Année"
            value={formation.annee}
            onChange={(e) =>
              modifier(index, 'annee', e.target.value)
            }
            className="w-full border p-2 rounded"
          />

          <button
            onClick={() => supprimer(index)}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Supprimer
          </button>
          <div className="flex gap-2">
            <button onClick={() => monter(index)}>↑</button>
            <button onClick={() => descendre(index)}>↓</button>
          </div>

        </div>
      ))}

      <button
        onClick={ajouter}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        + Ajouter une formation
      </button>

    </div>
  );
}