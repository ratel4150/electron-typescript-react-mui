import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './index';

// Hook personalizado para `dispatch`
export const useAppDispatch: () => AppDispatch = useDispatch;

// Hook personalizado para `selector`
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
