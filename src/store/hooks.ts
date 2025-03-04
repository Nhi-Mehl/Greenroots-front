import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './store';

/**
 * Utilise une version typée de useDispatch adaptée au type AppDispatch.
 * Cela permet d'éviter de répéter les types lors de l'utilisation du hook.
 */
export const useAppDispatch: () => AppDispatch = useDispatch;

/**
 * Utilise une version typée de useSelector adaptée au type RootState.
 * Cela garantit un typage fort lors de l'accès au state via le hook.
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
