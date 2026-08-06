import { useEffect, useRef } from 'react';

/**
 * ✅ SPONSORS EN VIDEO (NUEVO)
 * Fuente única de verdad para los 2 sponsors en video.
 * Para reemplazar un video: cambiar el archivo en /public/sponsors/
 * manteniendo el mismo nombre, o actualizar el campo "src" aquí.
 * Si en el futuro cada sponsor tiene un link propio, completar "url".
 */
const SPONSOR_VIDEOS = [
  {
    id: 'aoma',
    src: '/sponsors/sponsor-video-aoma.mp4',
    poster: '/sponsors/sponsor-video-aoma.jpg',
    label: 'AOMA San Juan',
    url: null, // ej: 'https://aomasanjuan.com.ar'
  },
  {
    id: 'sponsor-2',
    src: '/sponsors/sponsor-video-2.mp4',
    poster: '/sponsors/sponsor-video-2.jpg',
    label: 'Sponsor',
    url: null,
  },
];

function SponsorVideo({ sponsor, heightClass }) {
  const videoRef = useRef(null);

  // Reintenta reproducir si el navegador bloquea el autoplay inicial
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const playAttempt = video.play();
    if (playAttempt !== undefined) {
      playAttempt.catch(() => {
        /* Autoplay bloqueado: el usuario podrá reproducir manualmente (controls quedan ocultos por diseño) */
      });
    }
  }, []);

  const videoEl = (
    <video
      ref={videoRef}
      className={`w-full ${heightClass} object-contain bg-white dark:bg-gray-900`}
      src={sponsor.src}
      poster={sponsor.poster}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={`Video sponsor: ${sponsor.label}`}
    >
      Tu navegador no soporta la reproducción de video.
    </video>
  );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-blue-100 dark:border-blue-900 shadow-sm">
      {sponsor.url ? (
        <a href={sponsor.url} target="_blank" rel="noopener noreferrer sponsored" className="block">
          {videoEl}
        </a>
      ) : (
        videoEl
      )}
    </div>
  );
}

/**
 * Muestra los DOS sponsors en video AL MISMO TIEMPO, uno junto al otro.
 * Usar en: Home y en la página principal de cada sección.
 */
export function SponsorVideoDuo({ className = '' }) {
  return (
    <div className={`mb-6 ${className}`}>
      <p className="text-[11px] uppercase tracking-wide text-gray-400 dark:text-gray-500 mb-1.5 px-0.5">
        Espacio publicitario
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {SPONSOR_VIDEOS.map((sponsor) => (
          <SponsorVideo key={sponsor.id} sponsor={sponsor} heightClass="h-20 sm:h-24" />
        ))}
      </div>
    </div>
  );
}

/**
 * Muestra UN sponsor en video, alternando entre los dos según "seed"
 * (usar el id de la nota para que cada nota alterne de forma estable).
 * Usar en: dentro de cada nota particular, debajo de la foto y antes del título.
 */
export function SponsorVideoSingle({ seed, className = '' }) {
  const numericSeed = parseInt(String(seed).replace(/\D/g, ''), 10);
  const index = Number.isFinite(numericSeed) ? numericSeed % SPONSOR_VIDEOS.length : 0;
  const sponsor = SPONSOR_VIDEOS[index];

  return (
    <div className={`my-5 max-w-sm ${className}`}>
      <p className="text-[11px] uppercase tracking-wide text-gray-400 dark:text-gray-500 mb-1.5 px-0.5">
        Espacio publicitario
      </p>
      <SponsorVideo sponsor={sponsor} heightClass="h-16 sm:h-20" />
    </div>
  );
}
