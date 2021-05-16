import { createContext, useContext, useRef } from 'react';
import createStore, { AppStores } from './createStore';
import useNgldListener from './useNgldListener';

export const ServiceContext = createContext<AppStores | null>(null);

export const ServiceProvider = ({ children }: ChildProps) => {
  const store = useRef<AppStores>(createStore());
  useNgldListener(store.current);

  return <ServiceContext.Provider value={store.current}> {children} </ServiceContext.Provider>
}

export const useServices = () => {
  const store = useContext(ServiceContext);
  return store
}

export const usePlayerService = () => {
  const store = useServices()!.player;
  return store;
}

export const useSkillService = () => {
  const store = useServices()!.skills;
  return store;
}

export const useAppService = () => {
  const store = useServices()!.app;
  return store;
}

export const useRotationService = () => {
  const store = useServices()!.rotation;
  return store;
}