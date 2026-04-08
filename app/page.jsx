"use client";
import { useState, useEffect,useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Step1Infos from "./components/Step1infos";
import Step2Formations from "./components/Step2Formations";
import Step3Experiences from "./components/step3Experiences";
import Step4Competences from "./components/Step4Competences";
import Step5Langues from "./components/Step5Langues";
import StepIndicator from "./components/StepIndicator";
import CvPreview from "./components/CvPreview";

export default function Home() {


  const INITIAL_CV = {
    infos: {
      prenom: '',
      nom: '',
      titre: '',
      email: '',
      telephone: '',
      adresse: '',
      resume: ''
    },
    formations: [],
    experiences: [],
    competences: [],
    langues: [],
    loisirs: [],
  };

  const [cv, setCv] = useState(INITIAL_CV);
  const [currentStep, setCurrentStep] = useState(1);
  const [theme, setTheme] = useState("classique");
  useEffect(() => {
    const saved = localStorage.getItem("cv");

    if (saved) {
      setCv(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cv", JSON.stringify(cv));
  }, [cv]);

  const isStep1Valid = cv.infos.prenom && cv.infos.nom
    && cv.infos.titre && cv.infos.email;

  const isStep2Valid = cv.formations.some(f => f.diplome.trim() !== '');


  // -------- UPDATE --------
  const updateInfos = (infos) => {
    setCv({ ...cv, infos });
  };

  const updateFormations = (formations) => {
    setCv({ ...cv, formations });
  };

  const updateExperiences = (experiences) => {
    setCv({ ...cv, experiences });
  };

  const updateCompetences = (competences) => {
    setCv({ ...cv, competences });
  };

  const updateLangues = (langues) => {
    setCv({ ...cv, langues });
  };

  const updateLoisirs = (loisirs) => {
    setCv({ ...cv, loisirs });
  };

  // -------- NAVIGATION --------
  const nextStep = () => {
    setCurrentStep((s) => Math.min(s + 1, 5));
  };

  const prevStep = () => {
    setCurrentStep((s) => Math.max(s - 1, 1));
  };



  // -------- RENDER STEP --------
  const renderStep = () => {
    switch (currentStep) {

      case 1:
        return (
          <Step1Infos
            data={cv.infos}
            onChange={updateInfos}
          />
        );

      case 2:
        return (
          <Step2Formations
            data={cv.formations}
            onChange={updateFormations}
          />
        );

      case 3:
        return (
          <Step3Experiences
            data={cv.experiences}
            onChange={updateExperiences}
          />
        );

      case 4:
        return (
          <Step4Competences
            data={cv.competences}
            onChange={updateCompetences}
          />
        );

      case 5:
        return (
          <Step5Langues
            dataLangues={cv.langues}
            dataLoisirs={cv.loisirs}
            onChangeLangues={updateLangues}
            onChangeLoisirs={updateLoisirs}
          />
        );

      default:
        return null;
    }
  };
  const exportPDF = async () => {
    await new Promise(resolve => setTimeout(resolve, 300));

    const element = document.getElementById("cv-preview");

    if (!element) return;

    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF();
    pdf.addImage(imgData, "PNG", 0, 0);
    pdf.save("cv.pdf");
  };
  return (
    <div className="p-10 grid grid-cols-2 gap-8">

      {/* FORMULAIRE */}
      <div className="max-w-xl mx-auto">

        <h1 className="text-3xl font-bold text-center mb-6">
          SeneCV
        </h1>

        {/* INDICATOR */}
        <StepIndicator currentStep={currentStep} />

        {/* STEP */}
        {renderStep()}

        {/* NAVIGATION */}
        <div className="flex justify-between mt-6">

          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className={`${currentStep === 1 ? 'bg-gray-300' : 'bg-blue-500'} text-white px-4 py-2 rounded`}

          >
            Précédent
          </button>

          <button
            onClick={nextStep}
            disabled={
              currentStep === 5 ||
              (currentStep === 2 && !isStep2Valid)
            }
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Suivant
          </button>


        </div>

      </div>

      {/* PREVIEW */}
      <CvPreview cv={cv}
        theme={theme}
      />
      <select
        value={theme}
        onChange={(e) => setTheme(e.target.value)}
        className="border p-2 rounded mb-4"
      >
        <option value="classique">Classique</option>
        <option value="moderne">Moderne</option>
        <option value="minimal">Minimaliste</option>
      </select>
      <button
        onClick={exportPDF}
        className="bg-purple-600 text-white px-4 py-2 rounded mt-2"
      >
        Télécharger PDF
      </button>

    </div >
  );
}