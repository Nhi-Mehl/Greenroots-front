import { useEffect, useRef } from 'react';

/**
 * Composant Video
 *
 * Lecture automatique et mise en pause en fonction de la visibilité.
 * Optimisation avec Intersection Observer.
 * Accessibilité améliorée avec des sous-titres.
 */
function Video() {
  // Utilisation de la référence avec un type HTMLVideoElement
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Utilisation de useEffect pour observer la visibilité de la vidéo
  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoElement.play().catch(() => {});
        } else {
          videoElement.pause();
        }
      },
      { root: null, threshold: 0.5 }
    );

    observer.observe(videoElement);
    /* eslint-disable consistent-return */
    // Arrow function expected no return value.eslintconsistent-return
    return () => observer.unobserve(videoElement);
  }, []);

  return (
    <section aria-labelledby="Vidéo présentaion de GreenRoots">
      <video
        ref={videoRef}
        controls
        autoPlay
        muted
        className="rounded-lg shadow-lg lg:mt-20 lg:mx-auto "
      >
        <source src="/videos/greenroots-mission.mp4" type="video/mp4" />
        {/* Sous-titres pour l'accessibilité */}
        Découvrez comment Greenroots transforme notre planète grâce à ses
        projets de reforestation révolutionnaires ! 🌳 Dans cette vidéo, nous
        explorons l&apos;approche stratégique de Greenroots pour restaurer les
        forêts en sélectionnant les bonnes espèces indigènes et en engageant les
        communautés locales pour une croissance durable. Découvrez comment la
        technologie de pointe, notamment les drones et l&apos;analyse de
        données, joue un rôle essentiel dans l&apos;amélioration de leurs
        efforts et la garantie de la santé des écosystèmes. Rejoignez-nous dans
        ce voyage vers un avenir plus vert. Aimez et partagez pour faire
        connaître cette incroyable initiative !
        <track
          kind="captions"
          srcLang="fr"
          // src="sous-titres.vtt"
          label="Français"
          default
        />
        {/* Message de secours si la vidéo n'est pas prise en charge */}
        Votre navigateur ne prend pas en charge la lecture de vidéos.
      </video>
    </section>
  );
}

export default Video;
