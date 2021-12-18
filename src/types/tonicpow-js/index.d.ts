declare module TonicPow {
  export const config: Config;
  export const events: Events;
  export const storage: Storage;

  export const sessionId: string | null;
  export const start: number;

  export function setOreo(name: string, value: string, days: number): void;
  export function captureVisitorSession(customSessionId: string): string | null;
  export function getVisitorSession(): string | null;
  export function loadDivs(): Promise<void>;
  export function load(): Promise<void>;
  export function captureVisitorSession(): void;

  export interface Widget {
    height: number;
    image_url: string;
    link_url: string;
    title: string;
    width: number;
    id?: string;
  }

  export const widgets: Map<string, Widget>;
  export class Events {
    sessionId: string;
    start: number;
    detectBounce: () => void;
    detectInteraction: () => void;
    detectWidgetClick: () => void;
    sendEvent: (eventName: string, data: string) => Promise<void>;
  }

  export class Config {}

  export class Storage {
    removeStorage(name: string): void;
    getStorage(key: string): string;
    setStorage(key: string, value: string, expires: number | null): void;
  }
}

export default TonicPow;
