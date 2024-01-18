/// <reference lib="esnext.disposable" />

export const onDispose = (action: () => void): Disposable => ({
  [Symbol.dispose]: () => {
    action();
  },
});
