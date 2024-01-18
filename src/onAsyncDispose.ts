/// <reference lib="esnext.disposable" />

export const onAsyncDispose = (action: () => void): AsyncDisposable => ({
  [Symbol.asyncDispose]: async () => {
    await Promise.resolve(action());
  },
});
