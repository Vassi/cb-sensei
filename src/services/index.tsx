import { createContext, useContext, useEffect, useRef } from 'react';
import PlayerService from './playerService';
import SkillService from './skillService';
import AppService from './appService';
import RotationService from './rotationService';
import worker from 'worker-loader!../workers/LogListener.ts'; // eslint-disable-line import/no-webpack-loader-syntax
import { LogEvent, LogEventTypes } from 'types/LogEvents';


type AppStores = {
  player: PlayerService,
  app: AppService,
  skills: SkillService,
  rotation: RotationService,
};

// Some weird double-invocation shenanigans are happening so this is to prevent multiple threads from being made.
function connectToNgldListener(listener: worker, stores: AppStores) {
  const params = new URLSearchParams(window.location.search);
  const connectUrl = params.get('HOST');
  listener.postMessage({ connect: true, connectUrl });

  listener.addEventListener('message', (e: MessageEvent<LogEvent>) => {
    if ((window as any).logEvents) {
      // Set this var through dev-tools in ACT
      console.log(e.data);
    }

    switch (e.data.type) {
      case LogEventTypes.SkillUsed:
        stores.rotation.skillWasUsed(e.data.args);
        break;
      case LogEventTypes.EffectGained:
        stores.rotation.gainEffect(e.data.args);
        break;
      case LogEventTypes.EffectLost:
        stores.rotation.loseEffect(e.data.args);
        break;
      case LogEventTypes.PlayerUpdate:
        stores.player.updatePlayerInfo(e.data.args);
        break;
      case LogEventTypes.InCombatUpdate:
        stores.app.setCombatState(e.data.args.inACTCombat); // ACT seems to know this faster.
        break;
      case LogEventTypes.GameExistsUpdate:
        stores.app.setGameActive(e.data.args.exists);
        break;
      case LogEventTypes.GameActiveUpdate:
        stores.app.setGameActive(e.data.args.active);
        break;
    }
  });

  document.addEventListener("onOverlayStateUpdate", function (e: any) {
    stores.app.setLockedState(e.detail.isLocked);
  });

  callOverlayHandler({ call: 'cactbotRequestState' });
}

function createStore() {
  const app = new AppService();
  const player = new PlayerService(app);
  const skills = new SkillService(app);
  const rotation = new RotationService(app, skills, player);

  return {
    player,
    app,
    skills,
    rotation,
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