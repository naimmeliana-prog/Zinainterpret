# Cabina — Estudio de Interpretación de Conferencias

Plataforma web gratuita, de código abierto (MIT) y con soporte offline (PWA) para la formación progresiva en **interpretación simultánea y consecutiva**.

## Características principales
- **Currículo progresivo (Etapas 1–4)**: Shadowing y décalage, segmentación sintáctica, toma de notas consecutiva (principios de Rozan y Matyssek), cifras y discursos institucionales completos.
- **Estudio de Audio y Grabación Comparativa**: Selección de idioma de origen y destino (`ES`, `EN`, `FR`, `DE`, `IT`, `PT`, `AR`, `ZH`), síntesis de voz de conferencia, grabación de alta fidelidad y reproductor dual A/B para comparar original vs. interpretación.
- **Toma de Notas Consecutiva en Tiempo Real**: Lienzo interactivo para ratón/táctil/stylus con barra rápida de símbolos habituales y sugerencias contextuales mediante IA.
- **Análisis de Voz con IA**: Evaluación de fluidez, precisión terminológica, entonación, velocidad (PPM/WPM) y análisis de pausas.
- **Privacidad Total y Cifrado Local AES-GCM-256**: El historial de sesiones, notas y grabaciones permanece cifrado en IndexedDB dentro del dispositivo.
- **Autenticación sin PII y Sincronización Segura**: Acceso anónimo o mediante usuario/contraseña (sin correo electrónico ni datos personales) en Firebase Auth, copia de seguridad cifrada en Firestore y exportación en PDF, JSON y sincronización directa con GitHub/Vercel.
- **Repositorios Oficiales Verificados**: Acceso directo a UN Web TV, UN Speech Repository, EU DG SCIC Speech Repository, Parlamento Europeo y facultades de Traducción e Interpretación.

## Despliegue en GitHub y Vercel
1. Haz push de este repositorio a GitHub.
2. Importa el repositorio en Vercel (`Framework Preset: Vite`).
3. Configura la variable de entorno `GEMINI_API_KEY` en Vercel Project Settings.
4. En Firebase Console > Authentication > Sign-in method, habilita **Email/Password** y **Anonymous** para el registro sin email y acceso anónimo.
