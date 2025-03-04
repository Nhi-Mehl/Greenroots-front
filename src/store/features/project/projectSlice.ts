import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProject, InitialProjectState } from '../../../@types/Project';

const initialState: InitialProjectState = {
  project: null,
};

const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    // Action pour définir le projet
    setProject: (state, action: PayloadAction<IProject>) => {
      state.project = action.payload;
    },
  },
});

// Exporter les actions générées
export const { setProject } = projectSlice.actions;

// Exporter le reducer pour l'intégrer dans le store Reduxs
export default projectSlice.reducer;
