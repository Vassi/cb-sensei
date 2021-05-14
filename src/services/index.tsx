import { createContext, useContext, useEffect, useRef } from 'react';
import PlayerService from './playerService';
import SkillService from './skillService';
import AppService from './appService';
import worker from 'worker-loader!../workers/LogListener.ts'; // eslint-disable-line import/no-webpack-loader-syntax


type AppStores = {
  player: PlayerService,
  app: AppService,
  skills: SkillService
};

// Some weird double-invocation shenanigans are happening so this is to prevent multiple threads from being made.
function connectToNgldListener(listener: worker, stores: AppStores) {
  listener.postMessage({ connect: true, connectUrl: 'ws://127.0.0.1:10501/ws' });

  listener.addEventListener('message', (message: any) => {
    console.log(message.data);
  });

  document.addEventListener("onOverlayStateUpdate", function (e) {
    console.log(e);
  });
}

function createStore() {
  const app = new AppService();
  const player = new PlayerService(app);
  const skills = new SkillService(app);

  return {
    player,
    app,
    skills
  } as AppStores;
}

export const ServiceContext = createContext<AppStores | null>(null);

export const ServiceProvider = ({ children }: ChildProps) => {
  const store = useRef<AppStores>(createStore());
  const ngldListener = useRef<worker | null>(null);

  useEffect(() => {
    ngldListener.current = new worker();
    connectToNgldListener(ngldListener.current, store.current);

    return () => {
      ngldListener.current?.terminate();
    };
  }, []);

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