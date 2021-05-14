/* eslint-disable no-restricted-globals */
import equal from 'fast-deep-equal';
import { PlayerDetail } from 'types/EventMap';
import { LogEvent } from 'types/LogEvents';
(self as any).$RefreshReg$ = () => { };
(self as any).$RefreshSig$$ = () => () => { };

importScripts('/common.worker.js');

const ignoreAttribs = {
  pos: { x: 0, y: 0, z: 0 },
  rotation: 0,
  bait: 0,
  debugJob: ''
};

let lastNotifiedChangeEvent: PlayerDetail | null = null;

let playerId: string | null = null;

function changeEventIsInteresting(a: PlayerDetail | null, b: PlayerDetail) {
  if (a === null) {
    return true;
  }
  // This can't be very efficient but it's quick and good enough for our use.
  const compA = { ...a, ...ignoreAttribs };
  const compB = { ...b, ...ignoreAttribs };

  return !equal(compA, compB);
}

function isInterestingPlayer(a: string) {
  if (playerId == null) {
    return false;
  }

  if (a.toUpperCase() === playerId) {
    return true;
  }
}

addOverlayListener('ChangePrimaryPlayer', (e) => {
  playerId = Number(e.charID).toString(16).toUpperCase();
});


addOverlayListener('LogLine', (event) => {
  switch (event.line[0]) {
    case '21':
    case '22': {
      const [, timestamp, casterId, casterName, effectId, effectName, targetId, targetName] = event.line
      const message: LogEvent = {
        type: 'SkillUsed',
        args: {
          timestamp,
          timeUsed: new Date(timestamp),
          effectId,
          effectName,
          casterId,
          casterName,
          targetId,
          targetName,
          duration: 0
        }
      };
      if (isInterestingPlayer(casterId) && effectId !== '08' && effectId !== '07') { // 07 == Autoattack 08 == Autoshot.
        postMessage(message);
      }
      break;
    }
    case '26': {
      const [, timestamp, effectId, effectName, durationString, casterId, casterName, targetId, targetName] = event.line
      const message: LogEvent = {
        type: 'EffectGained',
        args: {
          timestamp,
          timeUsed: new Date(timestamp),
          effectId,
          effectName,
          casterId,
          casterName,
          targetId,
          targetName,
          duration: Number(durationString)
        }
      };
      if (isInterestingPlayer(casterId)) {
        postMessage(message);
      }
      break;
    }
    case '30': {
      const [, timestamp, effectId, effectName, durationString, casterId, casterName, targetId, targetName] = event.line
      const message: LogEvent = {
        type: 'EffectLost',
        args: {
          timestamp,
          timeUsed: new Date(timestamp),
          effectId,
          effectName,
          casterId,
          casterName,
          targetId,
          targetName,
          duration: Number(durationString)
        }
      };
      if (isInterestingPlayer(casterId)) {
        postMessage(message);
      }
      break;
    }
  }
});

addOverlayListener('onPlayerChangedEvent', (e) => {
  if (changeEventIsInteresting(lastNotifiedChangeEvent, e.detail)) {
    lastNotifiedChangeEvent = e.detail;
  } else {
    return;
  }

  postMessage(e.detail);
});

addOverlayListener('onInCombatChangedEvent', (e) => {
  postMessage(e);
});

addOverlayListener('onGameExistsEvent', (e) => {
  postMessage(e);
});

addOverlayListener('onGameActiveChangedEvent', (e) => {
  postMessage(e);
});

/* Possibly interesting triggers later on.

addOverlayListener('onZoneChangedEvent', (e) => {
  postMessage(e);
});

*/

startOverlayEvents();
