// Adapted from https://github.com/quisquous/cactbot/blob/main/resources/overlay_plugin_api.ts
import { EventMap, EventType } from 'types/EventMap';

declare global {
  function addOverlayListener<T extends EventType>(event: T, cb: EventMap[T]): void;
  function removeOverlayListener<T extends EventType>(event: T, cb: EventMap[T]): void;
  function startOverlayEvents(): void;

  // Web Worker API
  function importScripts(src: string): void;
  function postMessage(payload: any): void;
}