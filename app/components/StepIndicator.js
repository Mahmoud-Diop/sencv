export default function StepIndicator({ currentStep }) {

  const steps = [
    "Infos",
    "Formations",
    "Expériences",
    "Compétences",
    "Langues"
  ];

  return (
    <div className="flex justify-between mb-6">

      {steps.map((label, index) => {
        const step = index + 1;

        return (
          <div key={index} className="flex-1 text-center">

            <div
              className={`mx-auto w-8 h-8 flex items-center justify-center rounded-full text-white
                ${currentStep >= step ? 'bg-blue-500' : 'bg-gray-300'}
              `}
            >
              {step}
            </div>

            <p className="text-xs mt-1">{label}</p>

          </div>
        );
      })}

    </div>
  );
}