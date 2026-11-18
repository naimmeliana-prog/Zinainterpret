import React, { useEffect, useRef, useState } from 'react';
import {
  Activity,
  AudioLines,
  Mic,
  Pause,
  Play,
  RotateCcw,
  Save,
  ShieldCheck,
  Square,
  Volume2,
} from 'lucide-react';
import { SPEECH_LANGUAGES } from '../data/curriculumAndRepos';
import type {
  ConferenceExercise,
  InterpretingMode,
  LocalPracticeSession,
  SpeechLang,
  UiLang,
  VoiceEvaluation,
} from '../types';
import type { Translations } from '../i18n/translations';
import { ConsecutiveNotePad } from './ConsecutiveNotePad';

interface InterpretingStudioProps {
  uiLang: UiLang;
  t: Translations;
  exercise: ConferenceExercise;
  requestedMode?: { mode: InterpretingMode; tick: number };
  sourceLang: SpeechLang;
  targetLang: SpeechLang;
  onSourceLangChange: (lang: SpeechLang) => void;
  onTargetLangChange: (lang: SpeechLang) => void;
  onSaveSession: (session: LocalPracticeSession) => Promise<void>;
}

function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = String(reader.result || '');
      const idx = result.indexOf(',');
      resolve(idx >= 0 ? result.slice(idx + 1) : result);
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(blob);
  });
}

export const InterpretingStudio: React.FC<InterpretingStudioProps> = ({
  uiLang,
  t,
  exercise,
  requestedMode,
  sourceLang,
  targetLang,
  onSourceLangChange,
  onTargetLangChange,
  onSaveSession,
}) => {
  const [mode, setMode] = useState<InterpretingMode>(exercise.mode);
  const [customScript, setCustomScript] = useState(exercise.scripts[sourceLang] || exercise.scripts.en);
  const [showScriptText, setShowScriptText] = useState(false);

  // Source Audio Playback
  const [sourceAudioUrl, setSourceAudioUrl] = useState<string>('');
  const [sourceAudioBase64, setSourceAudioBase64] = useState<string>('');
  const [synthesizing, setSynthesizing] = useState(false);
  const [synthError, setSynthError] = useState('');
  const [isPlayingSource, setIsPlayingSource] = useState(false);
  const [playbackRate, setPlaybackRate] = useState<number>(1.0);
  const [decalageSec, setDecalageSec] = useState<number>(3);
  const sourceAudioRef = useRef<HTMLAudioElement | null>(null);

  // Recording & Waveform
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSec, setRecordingSec] = useState(0);
  const [recordedBlobUrl, setRecordedBlobUrl] = useState<string>('');
  const [recordedBase64, setRecordedBase64] = useState<string>('');
  const [recordedMimeType, setRecordedMimeType] = useState<string>('audio/webm');
  const [isPlayingUser, setIsPlayingUser] = useState(false);
  const [recordError, setRecordError] = useState('');
  const userAudioRef = useRef<HTMLAudioElement | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<number | null>(null);
  const waveCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const rafRef = useRef<number | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Consecutive Notes
  const [notesText, setNotesText] = useState('');
  const [notesCanvasDataUrl, setNotesCanvasDataUrl] = useState('');

  // AI Evaluation
  const [userTextOverride, setUserTextOverride] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [evalError, setEvalError] = useState('');
  const [evaluation, setEvaluation] = useState<VoiceEvaluation | null>(null);
  const [savingVault, setSavingVault] = useState(false);
  const [savedNotice, setSavedNotice] = useState('');

  useEffect(() => {
    setMode(exercise.mode);
    setCustomScript(exercise.scripts[sourceLang] || exercise.scripts.en);
    setSourceAudioUrl('');
    setSourceAudioBase64('');
    setEvaluation(null);
    setSavedNotice('');
  }, [exercise, sourceLang]);

  useEffect(() => {
    if (requestedMode) {
      setMode(requestedMode.mode);
    }
  }, [requestedMode]);

  useEffect(() => {
    if (sourceAudioRef.current) {
      sourceAudioRef.current.playbackRate = playbackRate;
    }
  }, [playbackRate]);

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((tr) => tr.stop());
      }
      window.speechSynthesis?.cancel();
    };
  }, []);

  const drawIdleWave = () => {
    const canvas = waveCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.35)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(0, h / 2);
    ctx.lineTo(w, h / 2);
    ctx.stroke();
  };

  useEffect(() => {
    drawIdleWave();
  }, []);

  const synthesizeOriginalSpeech = async () => {
    setSynthesizing(true);
    setSynthError('');
    try {
      const res = await fetch('/api/gemini/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: customScript,
          lang: sourceLang,
          voiceName: sourceLang === 'fr' || sourceLang === 'it' ? 'Kore' : 'Charon',
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'TTS failed');
      const dataUrl = `data:${data.mimeType || 'audio/wav'};base64,${data.audioBase64}`;
      setSourceAudioUrl(dataUrl);
      setSourceAudioBase64(data.audioBase64);
    } catch (err) {
      // Offline / fallback Web Speech API notification
      setSynthError(
        err instanceof Error
          ? `${err.message} — Puedes usar reproducción local del navegador.`
          : 'Modo local disponible.'
      );
    } finally {
      setSynthesizing(false);
    }
  };

  const togglePlaySource = () => {
    if (sourceAudioUrl && sourceAudioRef.current) {
      if (isPlayingSource) {
        sourceAudioRef.current.pause();
        setIsPlayingSource(false);
      } else {
        sourceAudioRef.current.playbackRate = playbackRate;
        void sourceAudioRef.current.play();
        setIsPlayingSource(true);
      }
      return;
    }

    // Offline browser speechSynthesis fallback
    if ('speechSynthesis' in window) {
      if (isPlayingSource) {
        window.speechSynthesis.cancel();
        setIsPlayingSource(false);
        return;
      }
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(customScript);
      const langMap: Record<SpeechLang, string> = {
        es: 'es-ES',
        en: 'en-GB',
        fr: 'fr-FR',
        de: 'de-DE',
        it: 'it-IT',
        pt: 'pt-PT',
        ar: 'ar-SA',
        zh: 'zh-CN',
      };
      utter.lang = langMap[sourceLang] || 'en-US';
      utter.rate = playbackRate;
      utter.onend = () => setIsPlayingSource(false);
      utter.onerror = () => setIsPlayingSource(false);
      setIsPlayingSource(true);
      window.speechSynthesis.speak(utter);
    }
  };

  const startWaveformLoop = (analyser: AnalyserNode) => {
    const canvas = waveCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const bufferLen = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLen);

    const draw = () => {
      rafRef.current = requestAnimationFrame(draw);
      analyser.getByteTimeDomainData(dataArray);
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#0EA5E9';
      ctx.beginPath();

      const sliceWidth = w / bufferLen;
      let x = 0;
      for (let i = 0; i < bufferLen; i++) {
        const v = dataArray[i] / 128.0;
        const y = (v * h) / 2;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
        x += sliceWidth;
      }
      ctx.lineTo(w, h / 2);
      ctx.stroke();
    };
    draw();
  };

  const startRecording = async () => {
    setRecordError('');
    setSavedNotice('');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
          sampleRate: 48000,
        },
      });
      streamRef.current = stream;

      const audioCtx = new AudioContext();
      const source = audioCtx.createMediaStreamSource(stream);
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 512;
      source.connect(analyser);
      analyserRef.current = analyser;
      startWaveformLoop(analyser);

      const mimeType = MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
        ? 'audio/webm;codecs=opus'
        : 'audio/webm';
      const recorder = new MediaRecorder(stream, { mimeType });
      chunksRef.current = [];

      recorder.ondataavailable = (ev) => {
        if (ev.data.size > 0) chunksRef.current.push(ev.data);
      };

      recorder.onstop = async () => {
        const blob = new Blob(chunksRef.current, { type: mimeType });
        const url = URL.createObjectURL(blob);
        setRecordedBlobUrl(url);
        setRecordedMimeType(mimeType.split(';')[0]);
        const b64 = await blobToBase64(blob);
        setRecordedBase64(b64);
        stream.getTracks().forEach((tr) => tr.stop());
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        drawIdleWave();
      };

      recorder.start(250);
      mediaRecorderRef.current = recorder;
      setIsRecording(true);
      setRecordingSec(0);
      timerRef.current = window.setInterval(() => {
        setRecordingSec((s) => s + 1);
      }, 1000);
    } catch (err) {
      setRecordError(
        err instanceof Error
          ? `Acceso al micrófono denegado o no disponible (${err.message}). Puedes introducir tu interpretación en texto abajo para evaluarla.`
          : 'No se pudo iniciar el micrófono.'
      );
    }
  };

  const stopRecording = () => {
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
  };

  const togglePlayUserRecording = () => {
    if (!userAudioRef.current || !recordedBlobUrl) return;
    if (isPlayingUser) {
      userAudioRef.current.pause();
      setIsPlayingUser(false);
    } else {
      void userAudioRef.current.play();
      setIsPlayingUser(true);
    }
  };

  const runAiEvaluation = async () => {
    setAnalyzing(true);
    setEvalError('');
    try {
      const res = await fetch('/api/gemini/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          audioBase64: recordedBase64 || undefined,
          mimeType: recordedBase64 ? recordedMimeType : undefined,
          userTextOverride: userTextOverride.trim() || undefined,
          sourceTranscript: customScript,
          sourceLang,
          targetLang,
          uiLang,
          mode,
          durationSec: Math.max(recordingSec, 15),
          notesSummary: notesText || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error en análisis');
      setEvaluation(data as VoiceEvaluation);
    } catch (err) {
      setEvalError(err instanceof Error ? err.message : 'No se pudo completar el análisis.');
    } finally {
      setAnalyzing(false);
    }
  };

  const handleSaveToLocalVault = async () => {
    setSavingVault(true);
    setSavedNotice('');
    try {
      const session: LocalPracticeSession = {
        id: `sess-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        createdAt: new Date().toISOString(),
        exerciseId: exercise.id,
        exerciseTitle: exercise.titles[uiLang],
        mode,
        sourceLang,
        targetLang,
        durationSec: Math.max(recordingSec, 15),
        decalageTargetSec: mode === 'simultaneous' ? decalageSec : undefined,
        userAudioBase64: recordedBase64 || undefined,
        userAudioMimeType: recordedBase64 ? recordedMimeType : undefined,
        sourceAudioBase64: sourceAudioBase64 || undefined,
        notesText: notesText || undefined,
        notesCanvasDataUrl: notesCanvasDataUrl || undefined,
        evaluation: evaluation || undefined,
      };
      await onSaveSession(session);
      setSavedNotice(t.savedLocally);
    } finally {
      setSavingVault(false);
    }
  };

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60)
      .toString()
      .padStart(2, '0');
    const s = (sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <section id="studio" className="space-y-6 scroll-mt-20">
      {/* Studio Header & Mode / Language Controls */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131A26] p-5 sm:p-6 space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <span>{exercise.institution}</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono">{exercise.difficulty}</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono tabular-nums">{exercise.targetWpm} PPM</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 dark:text-slate-100">
              {exercise.titles[uiLang]}
            </h2>
          </div>

          <div className="flex items-center gap-1 p-1 rounded-lg bg-slate-100 dark:bg-slate-900 self-start">
            <button
              type="button"
              onClick={() => setMode('simultaneous')}
              className={`px-3.5 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 min-h-[38px] ${
                mode === 'simultaneous'
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              {t.modeSimultaneous}
            </button>
            <button
              type="button"
              onClick={() => setMode('consecutive')}
              className={`px-3.5 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 min-h-[38px] ${
                mode === 'consecutive'
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              {t.modeConsecutive}
            </button>
          </div>
        </div>

        {/* Language Pair & Booth Parameters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2 border-t border-slate-200 dark:border-slate-800">
          <label className="space-y-1.5">
            <span className="block text-xs font-medium text-slate-600 dark:text-slate-400">
              {t.sourceLangLabel}
            </span>
            <select
              value={sourceLang}
              onChange={(e) => onSourceLangChange(e.target.value as SpeechLang)}
              className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#0B0F17] px-3 py-2.5 text-sm text-slate-900 dark:text-slate-100 min-h-[44px]"
            >
              {SPEECH_LANGUAGES.map((l) => (
                <option key={l.code} value={l.code}>
                  {l.label} ({l.native})
                </option>
              ))}
            </select>
          </label>

          <label className="space-y-1.5">
            <span className="block text-xs font-medium text-slate-600 dark:text-slate-400">
              {t.targetLangLabel}
            </span>
            <select
              value={targetLang}
              onChange={(e) => onTargetLangChange(e.target.value as SpeechLang)}
              className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#0B0F17] px-3 py-2.5 text-sm text-slate-900 dark:text-slate-100 min-h-[44px]"
            >
              {SPEECH_LANGUAGES.map((l) => (
                <option key={l.code} value={l.code}>
                  {l.label} ({l.native})
                </option>
              ))}
            </select>
          </label>

          <label className="space-y-1.5">
            <span className="block text-xs font-medium text-slate-600 dark:text-slate-400">
              {t.playbackSpeed}: <span className="font-mono tabular-nums">{playbackRate.toFixed(2)}x</span>
            </span>
            <input
              type="range"
              min="0.75"
              max="1.35"
              step="0.05"
              value={playbackRate}
              onChange={(e) => setPlaybackRate(Number(e.target.value))}
              className="w-full accent-sky-500 h-11 cursor-pointer"
            />
          </label>

          <label className="space-y-1.5">
            <span className="block text-xs font-medium text-slate-600 dark:text-slate-400">
              {t.decalageLabel}: <span className="font-mono tabular-nums">{decalageSec}s</span>
            </span>
            <input
              type="range"
              min="2"
              max="6"
              step="1"
              value={decalageSec}
              onChange={(e) => setDecalageSec(Number(e.target.value))}
              className="w-full accent-sky-500 h-11 cursor-pointer"
            />
          </label>
        </div>
      </div>

      {/* Two-Zone Studio Workspace: 60% Booth Audio Stage / 40% Consecutive Notes or Terminology */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Zone: Audio Console & A/B Comparison */}
        <div className="lg:col-span-7 space-y-6">
          {/* Source Speech Deck */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131A26] p-5 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-slate-100">
                <Volume2 className="w-4 h-4 text-sky-500" aria-hidden="true" />
                <span>Canal Original ({sourceLang.toUpperCase()})</span>
              </div>
              <button
                type="button"
                onClick={() => setShowScriptText((v) => !v)}
                className="text-xs font-medium text-sky-600 dark:text-sky-400 hover:underline min-h-[36px] px-2"
              >
                {showScriptText ? 'Ocultar transcripción guía' : 'Ver / editar texto del discurso'}
              </button>
            </div>

            {showScriptText && (
              <textarea
                value={customScript}
                onChange={(e) => setCustomScript(e.target.value)}
                rows={4}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0B0F17] p-3 text-sm text-slate-800 dark:text-slate-200 leading-relaxed focus:outline-none focus:ring-2 focus:ring-sky-500/40"
              />
            )}

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => void synthesizeOriginalSpeech()}
                disabled={synthesizing}
                className="inline-flex items-center gap-2 rounded-lg border border-slate-300 dark:border-slate-700 px-4 py-2.5 text-xs font-medium text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors disabled:opacity-50 min-h-[44px]"
              >
                <AudioLines className="w-4 h-4 text-sky-500" aria-hidden="true" />
                <span>{synthesizing ? t.generatingSpeech : t.generateSpeechBtn}</span>
              </button>

              <button
                type="button"
                onClick={togglePlaySource}
                className="inline-flex items-center gap-2 rounded-lg bg-sky-600 px-4 py-2.5 text-xs font-medium text-white hover:bg-sky-500 transition-colors min-h-[44px]"
              >
                {isPlayingSource ? (
                  <Pause className="w-4 h-4" aria-hidden="true" />
                ) : (
                  <Play className="w-4 h-4" aria-hidden="true" />
                )}
                <span>{isPlayingSource ? t.pauseAudio : t.playOriginal}</span>
              </button>

              {sourceAudioUrl && (
                <audio
                  ref={sourceAudioRef}
                  src={sourceAudioUrl}
                  onEnded={() => setIsPlayingSource(false)}
                  className="hidden"
                />
              )}
            </div>

            {synthError && (
              <p className="text-xs text-amber-600 dark:text-amber-400">{synthError}</p>
            )}
          </div>

          {/* High-Fidelity Recording & A/B Comparison Deck */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131A26] p-5 space-y-4">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-slate-100">
                <Activity className="w-4 h-4 text-emerald-500" aria-hidden="true" />
                <span>Cabina del Intérprete ({targetLang.toUpperCase()})</span>
              </div>
              <span className="font-mono text-sm font-semibold tabular-nums text-slate-700 dark:text-slate-200">
                {formatTimer(recordingSec)}
              </span>
            </div>

            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0B0F17] p-3">
              <canvas
                ref={waveCanvasRef}
                width={640}
                height={72}
                className="w-full h-[72px] block"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {!isRecording ? (
                <button
                  type="button"
                  onClick={() => void startRecording()}
                  className="inline-flex items-center gap-2 rounded-lg bg-rose-600 px-4 py-2.5 text-xs font-medium text-white hover:bg-rose-500 transition-colors min-h-[44px]"
                >
                  <Mic className="w-4 h-4" aria-hidden="true" />
                  <span>{t.recordStart}</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={stopRecording}
                  className="inline-flex items-center gap-2 rounded-lg bg-slate-900 dark:bg-slate-100 px-4 py-2.5 text-xs font-medium text-white dark:text-slate-900 transition-colors min-h-[44px]"
                >
                  <Square className="w-3.5 h-3.5 fill-current" aria-hidden="true" />
                  <span>{t.recordStop}</span>
                </button>
              )}

              {recordedBlobUrl && (
                <>
                  <button
                    type="button"
                    onClick={togglePlayUserRecording}
                    className="inline-flex items-center gap-2 rounded-lg border border-slate-300 dark:border-slate-700 px-4 py-2.5 text-xs font-medium text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors min-h-[44px]"
                  >
                    {isPlayingUser ? (
                      <Pause className="w-4 h-4" aria-hidden="true" />
                    ) : (
                      <Play className="w-4 h-4" aria-hidden="true" />
                    )}
                    <span>{t.playMyRecording}</span>
                  </button>
                  <audio
                    ref={userAudioRef}
                    src={recordedBlobUrl}
                    onEnded={() => setIsPlayingUser(false)}
                    className="hidden"
                  />
                </>
              )}

              <button
                type="button"
                onClick={() => {
                  setRecordedBlobUrl('');
                  setRecordedBase64('');
                  setRecordingSec(0);
                  setEvaluation(null);
                  setUserTextOverride('');
                }}
                className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-lg text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 min-h-[44px]"
              >
                <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Reiniciar</span>
              </button>
            </div>

            {recordError && (
              <p className="text-xs text-amber-600 dark:text-amber-400 leading-relaxed">
                {recordError}
              </p>
            )}

            {/* Text fallback / manual transcript for evaluation without mic */}
            <div className="space-y-1.5 pt-2 border-t border-slate-200 dark:border-slate-800">
              <label className="block text-xs text-slate-500 dark:text-slate-400">
                Transcripción manual opcional (si practicas sin micrófono o deseas corregir texto):
              </label>
              <textarea
                value={userTextOverride}
                onChange={(e) => setUserTextOverride(e.target.value)}
                rows={2}
                placeholder={`Escribe o dicta tu interpretación en ${targetLang.toUpperCase()}...`}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0B0F17] px-3 py-2 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
              />
            </div>

            {/* Action Bar: AI Evaluate + Save Encrypted */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                type="button"
                onClick={() => void runAiEvaluation()}
                disabled={analyzing || (!recordedBase64 && !userTextOverride.trim())}
                className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-xs font-medium text-white hover:bg-emerald-500 transition-colors disabled:opacity-45 min-h-[44px]"
              >
                <Activity className="w-4 h-4" aria-hidden="true" />
                <span>{analyzing ? t.analyzingAi : t.analyzeAiBtn}</span>
              </button>

              <button
                type="button"
                onClick={() => void handleSaveToLocalVault()}
                disabled={savingVault || (!recordedBase64 && !notesText && !evaluation && !userTextOverride)}
                className="inline-flex items-center gap-2 rounded-lg border border-slate-300 dark:border-slate-700 px-4 py-2.5 text-xs font-medium text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors disabled:opacity-45 min-h-[44px]"
              >
                <Save className="w-4 h-4 text-sky-500" aria-hidden="true" />
                <span>{t.saveLocalEncrypted}</span>
              </button>

              {savedNotice && (
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                  <ShieldCheck className="w-4 h-4" aria-hidden="true" />
                  <span>{savedNotice}</span>
                </span>
              )}
            </div>

            {evalError && (
              <p className="text-xs text-rose-600 dark:text-rose-400">{evalError}</p>
            )}
          </div>

          {/* AI Voice & Fluency Evaluation Results */}
          {evaluation && (
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131A26] p-5 space-y-5">
              <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                {t.evaluationTitle}
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0B0F17] p-3">
                  <div className="text-xs text-slate-500 dark:text-slate-400">{t.fluencyLabel}</div>
                  <div className="text-2xl font-bold font-mono tabular-nums text-sky-600 dark:text-sky-400 mt-1">
                    {evaluation.fluencyScore}
                    <span className="text-xs font-normal text-slate-400">/100</span>
                  </div>
                </div>
                <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0B0F17] p-3">
                  <div className="text-xs text-slate-500 dark:text-slate-400">{t.precisionLabel}</div>
                  <div className="text-2xl font-bold font-mono tabular-nums text-emerald-600 dark:text-emerald-400 mt-1">
                    {evaluation.precisionScore}
                    <span className="text-xs font-normal text-slate-400">/100</span>
                  </div>
                </div>
                <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0B0F17] p-3">
                  <div className="text-xs text-slate-500 dark:text-slate-400">{t.intonationLabel}</div>
                  <div className="text-2xl font-bold font-mono tabular-nums text-amber-600 dark:text-amber-400 mt-1">
                    {evaluation.intonationScore}
                    <span className="text-xs font-normal text-slate-400">/100</span>
                  </div>
                </div>
                <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0B0F17] p-3">
                  <div className="text-xs text-slate-500 dark:text-slate-400">{t.wpmLabel}</div>
                  <div className="text-2xl font-bold font-mono tabular-nums text-slate-900 dark:text-slate-100 mt-1">
                    {evaluation.estimatedWpm}
                    <span className="text-xs font-normal text-slate-400"> PPM</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                <div>
                  <span className="font-semibold text-slate-900 dark:text-slate-100">
                    Transcripción detectada:{' '}
                  </span>
                  <span className="italic">“{evaluation.transcript}”</span>
                </div>
                <div>
                  <span className="font-semibold text-slate-900 dark:text-slate-100">
                    {t.fidelityLabel}:{' '}
                  </span>
                  {evaluation.semanticFidelityFeedback}
                </div>
                <div>
                  <span className="font-semibold text-slate-900 dark:text-slate-100">
                    {t.prosodyLabel}:{' '}
                  </span>
                  {evaluation.prosodyAndIntonationFeedback}
                </div>
                <div>
                  <span className="font-semibold text-slate-900 dark:text-slate-100">
                    {t.pauseAnalysisLabel}:{' '}
                  </span>
                  {evaluation.pauseAnalysis}
                </div>
              </div>

              {evaluation.actionableRecommendations.length > 0 && (
                <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-2">
                  <div className="text-xs font-semibold text-slate-900 dark:text-slate-100">
                    {t.recommendationsLabel}
                  </div>
                  <ul className="space-y-1.5 text-sm text-slate-600 dark:text-slate-300 list-disc pl-5">
                    {evaluation.actionableRecommendations.map((rec, i) => (
                      <li key={i}>{rec}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Zone: Consecutive Pad OR Simultaneous Terminology & Strategy */}
        <div className="lg:col-span-5 space-y-6">
          {mode === 'consecutive' ? (
            <ConsecutiveNotePad
              uiLang={uiLang}
              sourceLang={sourceLang}
              sourceExcerpt={customScript}
              t={t}
              notesText={notesText}
              onNotesTextChange={setNotesText}
              onCanvasSnapshotChange={setNotesCanvasDataUrl}
            />
          ) : (
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131A26] p-5 space-y-4">
              <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                Glosario de Cabina y Estrategia Simultánea
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {exercise.objectives[uiLang]}
              </p>

              <div className="divide-y divide-slate-200 dark:divide-slate-800 border-t border-b border-slate-200 dark:border-slate-800">
                {exercise.terminology.map((item) => (
                  <div key={item.term} className="py-2.5 flex items-center justify-between gap-4 text-sm">
                    <span className="font-medium text-slate-900 dark:text-slate-100">
                      {item.term}
                    </span>
                    <span className="text-slate-600 dark:text-slate-400 text-right">
                      {item.note}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-2 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                <div>1. Espera {decalageSec}s para captar la unidad mínima de sentido (S+V).</div>
                <div>2. Transforma subordinadas largas en oraciones coordinadas cortas.</div>
                <div>3. Anota cifras y siglas breves mientras escuchas en el micrófono.</div>
                <div className="pt-2">
                  <a
                    href="#techniques"
                    className="font-medium text-sky-600 dark:text-sky-400 hover:underline"
                  >
                    Ver manual completo de técnicas (Simultánea y Rozan) →
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
