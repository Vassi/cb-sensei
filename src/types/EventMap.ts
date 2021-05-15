// Adapted from https://github.com/quisquous/cactbot/blob/main/types/event.d.ts
import { JobDetail } from './JobDetail';
import { Job } from './Job';

export interface EventMap {
  // #region OverlayPlugin built-in Event
  'CombatData': (ev: {
    type: 'CombatData';
  }) => void;

  'LogLine': (ev: OnLogLineArgs) => void;

  'ChangeZone': (ev: {
    type: 'ChangeZone';
    zoneID: number;
    zoneName: string;
  }) => void;

  'ChangePrimaryPlayer': (ev: {
    type: 'ChangePrimaryPlayer';
    charID: string;
    charName: string;
  }) => void;

  'FileChanged': (ev: {
    type: 'FileChanged';
    file: string;
  }) => void;

  'OnlineStatusChanged': (ev: {
    type: 'OnlineStatusChanged';
    target: string; rawStatus:
    number; status: string;
  }) => void;

  'PartyChanged': (ev: {
    type: 'PartyChanged';
    party: Party[];
  }) => void;

  'BroadcastMessage': (ev: {
    type: 'BroadcastMessage';
    source: string;
    msg: unknown;
  }) => void;

  'onOverlayStateUpdate': (ev: any) => void;

  'EnmityTargetData': (ev: OnEnmityTargetDataArgs) => void;
  // #endregion

  // #region Cactbot Event
  // Fill up all event types
  'onForceReload': (ev: {
    type: 'onForceReload';
  }) => void;

  'onGameExistsEvent': (ev: {
    type: 'onGameExistsEvent';
    detail: OnGameExistsEventArgs;
  }) => void;

  'onGameActiveChangedEvent': (ev: {
    type: 'onGameActiveChangedEvent';
    detail: OnGameActiveChangedEventArgs;
  }) => void;

  'onLogEvent': (ev: OnLogEventArgs) => void;

  'onImportLogEvent': (ev: {
    type: 'onImportLogEvent';
    detail: {
      logs: string[];
    };
  }) => void;

  'onInCombatChangedEvent': (ev: {
    type: 'onInCombatChangedEvent';
    detail: OnInCombatChangedEventArgs
  }) => void;

  'onZoneChangedEvent': (ev: {
    type: 'onZoneChangedEvent';
    detail: {
      zoneName: string;
    };
  }) => void;

  'onFateEvent': (ev: {
    type: 'onFateEvent';
    detail: {
      eventType: 'add' | 'update' | 'remove';
      fateID: number;
      progress: number;
    };
  }) => void;

  'onCEEvent': (ev: {
    type: 'onCEEvent';
    detail: {
      eventType: 'add' | 'update' | 'remove';
      data: {
        popTime: number;
        timeRemaining: number;
        ceKey: number;
        numPlayers: number;
        status: number;
        progress: number;
      };
    };
  }) => void;

  'onPlayerDied': (ev: {
    type: 'onPlayerDied';
  }) => void;

  'onPartyWipe': (ev: {
    type: 'onPartyWipe';
  }) => void;

  'onPlayerChangedEvent': (ev: OnPlayerChangedEventArgs) => void;

  'onUserFileChanged': (ev: {
    type: 'onUserFileChanged';
    file: string;
  }) => void;
  // #endregion
};

export type EventType = keyof EventMap;

export type OnEnmityTargetDataArgs = {
  type: 'EnmityTargetData';
  Target: {
    Name: string;
    ID: number;
    Distance: number;
    EffectiveDistance: number;
  };
};

export type OnLogLineArgs = {
  type: 'LogLine';
  line: string[];
  rawLine: string;
};

export type OnLogEventArgs = {
  type: 'onLogEvent';
  detail: {
    logs: string[];
  };
};

export type OnInCombatChangedEventArgs = {
  inACTCombat: boolean;
  inGameCombat: boolean;
};

export type OnGameExistsEventArgs = {
  exists: boolean;
};

export type OnGameActiveChangedEventArgs = {
  active: boolean;
};


export type OnPlayerChangedEventArgs = {
  type: 'onPlayerChangedEvent';
  detail: PlayerDetail
};

export type PlayerDetail = {
  name: string;
  job: Job;
  level: number;
  currentHP: number;
  maxHP: number;
  currentMP: number;
  maxMP: number;
  currentCP: number;
  maxCP: number;
  currentGP: number;
  maxGP: number;
  currentShield: number;
  // TODO: Is there a cleaner way to do this? It would be better if there were a way to
  // determine which job was passed in with the event and explicitly use that JobDetail
  // Potentially add the job to the jobDetail passed back from the C# plugin, and use
  // that information to decide the type
  jobDetail: JobDetail['PLD'] & JobDetail['WAR'] & JobDetail['DRK'] & JobDetail['GNB'] & JobDetail['WHM'] &
  JobDetail['SCH'] & JobDetail['AST'] & JobDetail['PGL'] & JobDetail['MNK'] & JobDetail['DRG'] &
  JobDetail['NIN'] & JobDetail['SAM'] & JobDetail['BRD'] & JobDetail['MCH'] & JobDetail['DNC'] &
  JobDetail['THM'] & JobDetail['BLM'] & JobDetail['ACN'] & JobDetail['SMN'] & JobDetail['RDM'];
  pos: {
    x: number;
    y: number;
    z: number;
  };
  rotation: number;
  bait: number;
  debugJob: string;
};

export interface Party {
  id: string;
  name: string;
  worldId: number;
  job: number;
  inParty: boolean;
}
