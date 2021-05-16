import Database from './database';
import worker from 'worker-loader!../workers/LogListener.ts'; // eslint-disable-line import/no-webpack-loader-syntax
import { LogEvent, LogEventTypes } from 'types/LogEvents';
import { Skill } from './models/Skill';
import { useEffect, useRef } from 'react';
import { AppStores } from './createStore';
import { JobConfig } from './models/JobConfig';
import { GlobalConfig } from './models/GlobalConfig';

async function connectToNgldListener(listener: worker, stores: AppStores) {
  try {
    console.log('Opening database.');
    // Prepping datbase.
    Database.config.mapToClass(GlobalConfig);
    Database.jobConfig.mapToClass(JobConfig);
    Database.skills.mapToClass(Skill);
    await Database.open();

    // Initialize config
    await stores.app.initialize();

    // Connect to NGLD and events.
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
    console.log('Overlay initialized.');
    stores.app.setReadyState(true);
  } catch (error) {
    console.error('Unable to initialize NGLD Listener', error);
  }
}

export default function useNgldListener(stores: AppStores) {
  const ngldListener = useRef<worker | null>(null);

  useEffect(() => {
    ngldListener.current = new worker();
    connectToNgldListener(ngldListener.current, stores);

    return () => {
      ngldListener.current?.terminate();
    };
  }, [stores]);
}