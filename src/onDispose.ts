export const onDispose = (action: () => void): Disposable => ({
  [Symbol.dispose]: () => {
    action();
  },
});
