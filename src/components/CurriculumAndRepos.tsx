import React, { useState } from 'react';
import { ArrowUpRight, BookOpen, Globe2, GraduationCap, Landmark } from 'lucide-react';
import { INSTITUTIONAL_RESOURCES, PROGRESSIVE_EXERCISES } from '../data/curriculumAndRepos';
import type { ConferenceExercise, UiLang } from '../types';
import type { Translations } from '../i18n/translations';

interface CurriculumAndReposProps {
  uiLang: UiLang;
  t: Translations;
  activeExerciseId: string;
  onSelectExercise: (ex: ConferenceExercise) => void;
}

export const CurriculumAndRepos: React.FC<CurriculumAndReposProps> = ({
  uiLang,
  t,
  activeExerciseId,
  onSelectExercise,
}) => {
  const [repoFilter, setRepoFilter] = useState<'all' | 'un' | 'eu' | 'universities'>('all');

  const filteredResources =
    repoFilter === 'all'
      ? INSTITUTIONAL_RESOURCES
      : INSTITUTIONAL_RESOURCES.filter((r) => r.category === repoFilter);

  return (
    <div className="space-y-14">
      {/* Progressive 4-Stage Curriculum */}
      <section id="curriculum" className="space-y-6 scroll-mt-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 text-balance">
              {t.curriculumTitle}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
              {t.curriculumSubtitle}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {PROGRESSIVE_EXERCISES.map((ex) => {
            const isSelected = ex.id === activeExerciseId;
            return (
              <button
                key={ex.id}
                type="button"
                onClick={() => onSelectExercise(ex)}
                className={`group text-left rounded-2xl border p-6 transition-colors flex flex-col justify-between gap-4 ${
                  isSelected
                    ? 'border-sky-500 bg-sky-500/5 dark:bg-sky-500/10'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131A26] hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <span className="font-mono font-medium text-sky-600 dark:text-sky-400">
                      {t.stageLabel} 0{ex.stage}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>
                      {ex.mode === 'simultaneous' ? t.modeSimultaneous : t.modeConsecutive}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{ex.institution}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                    {ex.titles[uiLang]}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {ex.objectives[uiLang]}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-200/80 dark:border-slate-800/80 text-xs text-slate-500 dark:text-slate-400 font-mono tabular-nums">
                  <span>
                    {ex.difficulty} · {ex.targetWpm} PPM · {ex.durationLabel}
                  </span>
                  <span className="font-sans font-medium text-sky-600 dark:text-sky-400">
                    {isSelected ? 'En estudio' : 'Cargar ejercicio →'}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Editorial Visual Split: Consecutive & EU Hemicycle */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131A26] overflow-hidden flex flex-col">
          <div className="relative h-52 bg-slate-900">
            <img
              src="/src/assets/images/consecutive_notepad_desk_1794957054053.jpg"
              alt="Cuaderno de toma de notas consecutiva con símbolos estenográficos"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
            <div className="absolute bottom-4 left-5 right-5 text-white">
              <div className="text-xs text-slate-300 mb-1">Método Rozan & Matyssek</div>
              <div className="text-lg font-semibold">Toma de notas orientada al sentido</div>
            </div>
          </div>
          <div className="p-5 text-sm text-slate-600 dark:text-slate-300 leading-relaxed space-y-2">
            <p>
              La verticalidad y el desplazamiento diagonal permiten leer la estructura lógica de un
              discurso de un vistazo sin descifrar palabras sueltas.
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Transposición de ideas · Abreviación · Conectores al margen izquierdo · Negación y
              énfasis
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131A26] overflow-hidden flex flex-col">
          <div className="relative h-52 bg-slate-900">
            <img
              src="/src/assets/images/eu_parliament_hemicycle_1794957061994.jpg"
              alt="Hemiciclo parlamentario europeo con cabinas de interpretación simultánea"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
            <div className="absolute bottom-4 left-5 right-5 text-white">
              <div className="text-xs text-slate-300 mb-1">Práctica con material real</div>
              <div className="text-lg font-semibold">
                Repositorios de Naciones Unidas y Unión Europea
              </div>
            </div>
          </div>
          <div className="p-5 text-sm text-slate-600 dark:text-slate-300 leading-relaxed space-y-2">
            <p>
              Combina los ejercicios guiados de esta cabina con discursos reales de la ONU (DGACM)
              y la Comisión Europea (DG SCIC) para consolidar tu velocidad en condiciones reales.
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              UN Web TV · UNTERM · DG SCIC Speech Repository · IATE · Facultades EMCI
            </p>
          </div>
        </div>
      </section>

      {/* Official Institutional Repositories */}
      <section id="repositories" className="space-y-6 scroll-mt-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 text-balance">
              {t.repositoriesTitle}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
              {t.repositoriesSubtitle}
            </p>
          </div>

          <div className="flex items-center gap-1 p-1 rounded-lg bg-slate-100 dark:bg-slate-900 self-start overflow-x-auto max-w-full">
            {(
              [
                { id: 'all', label: 'Todos' },
                { id: 'un', label: t.repoUn },
                { id: 'eu', label: t.repoEu },
                { id: 'universities', label: t.repoUniversities },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setRepoFilter(tab.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 min-h-[36px] ${
                  repoFilter === tab.id
                    ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredResources.map((res) => {
            const Icon =
              res.category === 'un'
                ? Globe2
                : res.category === 'eu'
                  ? Landmark
                  : res.category === 'universities'
                    ? GraduationCap
                    : BookOpen;

            return (
              <a
                key={res.id}
                href={res.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131A26] p-5 hover:border-sky-500/60 transition-colors flex flex-col justify-between gap-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                      <Icon className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0" aria-hidden="true" />
                      <span>{res.organization}</span>
                      <span aria-hidden="true">·</span>
                      <span>{res.countryOrScope}</span>
                    </div>
                    <ArrowUpRight
                      className="w-4 h-4 text-slate-400 group-hover:text-sky-500 transition-colors shrink-0"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                    {res.name}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {res.descriptions[uiLang]}
                  </p>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800/80">
                  <span>{res.tags.join(' · ')}</span>
                  <span className="font-medium text-sky-600 dark:text-sky-400 whitespace-nowrap">
                    {t.visitResource}
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      </section>
    </div>
  );
};
