# on-dispose

This package provides helpers for conveniently triggering dispose/asyncDispose
actions using the `using` syntax in JavaScript/TypeScript.

## Install

```sh
# If you're using npm
npm install on-dispose

# If you're using yarn
yarn add on-dispose

# If you're using pnpm
pnpm add on-dispose
```

## Usage

A `using` statement in JavaScript / TypeScript will trigger the method
`[Symbol.dispose]()` when the object goes out of scope.

An `await using` statement in JavaScript / TypeScript will trigger the method
`[Symbol.asyncDispose]()` when the object goes out of scope.

Both types of `using` statements are similar in behaviour to a
`try { ... } finally { ... }` statement.

`on-dispose` provides two helper functions `onDispose` and `onAsyncDispose` that
accept an action you would like to trigger on dispose / async dispose
respectively without having to define a class or object for it.

```ts
import { onDispose, onAsyncDispose } from "on-dispose";

// You can use onDispose with a synchronous action in a regular function.

const fn1 = () => {
    using _ = onDispose(() => {
        console.log("Synchronous dispose action in a synchronous function with using");
    })
}

// onDispose also works with a synchronous action in an async function.

const fn2 = async () => {
    using _ = onDispose(() => {
        console.log("Synchronous dispose action in an async function with using")
    })
}

// You can use onAsyncDispose with an asynchronous action in an async function.

const fn3 = async () => {
    await using _ = onAsyncDispose(async () => {
        console.log("Asynchronous dispose action in an async function with await using")
    })
}

// onAsyncDispose also works with a synchronous action.

const fn4 = async () => {
    await using _ = onAsyncDispose(() => {
        console.log("Synchronous dispose action in an async function with await using")
    })
}

const main = async () => {
    fn1();
    await fn2()
    await fn3()
    await fn4()
}

void main();

// Will print:
//
// Synchronous dispose action in a synchronous function with using
// Synchronous dispose action in an async function with using
// Asynchronous dispose action in an async function with await using
// Synchronous dispose action in an async function with await using
```

> Naturally, you cannot run async dispose actions in regular / non-async
functions.

`onDispose` returns a `Disposable` object and `onAsyncDispose` returns an
`AsyncDisposable` object, so you can also use both with `DisposableStack` and
`AsyncDisposableStack`.

## License

[MIT](./LICENSE)
