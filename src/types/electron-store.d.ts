declare module 'electron-store' {
  interface Options<T> {
    defaults?: T;
    name?: string;
    cwd?: string;
    encryptionKey?: string;
    fileExtension?: string;
    clearInvalidConfig?: boolean;
    serialize?: (value: T) => string;
    deserialize?: (text: string) => T;
  }

  class Store<T = Record<string, unknown>> {
    constructor(options?: Options<T>);
    get<K extends keyof T>(key: K): T[K];
    get<K extends keyof T>(key: K, defaultValue: T[K]): T[K];
    set<K extends keyof T>(key: K, value: T[K]): void;
    set(object: Partial<T>): void;
    has(key: keyof T): boolean;
    delete(key: keyof T): void;
    clear(): void;
    onDidChange<K extends keyof T>(
      key: K,
      callback: (newValue?: T[K], oldValue?: T[K]) => void
    ): () => void;
    onDidAnyChange(
      callback: (newValue?: T, oldValue?: T) => void
    ): () => void;
    size: number;
    store: T;
    path: string;
  }

  export = Store;
}
