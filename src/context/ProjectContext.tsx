import React, { createContext, useContext, useMemo, useState } from 'react';
import { IProject } from '../@types';

interface ProjectContextType {
  project: IProject | null;
  setProject: (project: IProject | null) => void;
}

// Création du contexte avec une valeur par défaut
const ProjectContext = createContext<ProjectContextType>({
  project: null,
  setProject: () => {},
});

// Hook personnalisé pour accéder au contexte
export const useProject = () => {
  const context = useContext(ProjectContext);

  if (!context) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
};

// Composant provider pour gérer le projet
export const ProjectProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [project, setProject] = useState<IProject | null>(null);

  // Mémorisation de la valeur du contexte pour éviter des rendus inutiles
  const projectContextValue = useMemo(
    () => ({ project, setProject }),
    [project]
  );

  return (
    <ProjectContext.Provider value={projectContextValue}>
      {children}
    </ProjectContext.Provider>
  );
};
