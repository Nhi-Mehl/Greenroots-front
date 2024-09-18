import { useEffect, useRef } from 'react';

function Video() {
  // Utilisation de la référence avec un type HTMLVideoElement
  const videoRef = useRef<HTMLVideoElement | null>(null);
  console.log('videoRef', videoRef);

  useEffect(() => {
    const videoElement = videoRef.current;
    console.log('videoElement', videoElement);

    // Vérifier que l'élément vidéo existe avant de l'utiliser
    if (!videoElement) {
      return; // On s'assure que rien n'est renvoyé ici
    }

    const handlePlayVideo: IntersectionObserverCallback = (entries) => {
      const [entry] = entries;
      console.log('entry', entry);

      // Lancer la vidéo si elle est visible
      if (entry.isIntersecting) {
        return videoElement.play(); // Jouer la vidéo quand elle est visible
      }
      return videoElement.pause(); // Pause quand elle n'est plus visible
    };

    const observer = new IntersectionObserver(handlePlayVideo, {
      root: null, // Utilise le viewport comme conteneur de défilement
      threshold: 0.5, // 50% de la vidéo doit être visible pour jouer
    });

    observer.observe(videoElement); // Observer l'élément vidéo

    // Nettoyage pour désenregistrer l'observateur
    return () => {
      observer.unobserve(videoElement);
    };
  }, []);

  return (
    <div>
      <video
        ref={videoRef}
        controls
        autoPlay
        muted
        className="lg:mt-20 lg:mx-auto"
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
    </div>
  );
}

export default Video;
