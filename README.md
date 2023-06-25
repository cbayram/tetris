# Tetris

TypeScript solution to the tetris take home coding exercise developed on VSCode.

## Running the solution

Open [public/index.html](./public/index.html) file using a static server such; _i.e. by running a live server in VS Code by clicking the **Go Live** button on the bottom of window_.

_Alternatively_, open [public/index.all.html](./public/index.all.html) file using a browser without a server. This file simply inlines contents of [public/index.js](./public/index.js) to circumvent CORS restrictions.

## Development

This code was developed on mac OSX.
The [src](./src/) directory contains the TypeScript source files. It's split into [client](./src/client) and [client_server_shared](./src/client_server_shared) directories, with the latter containing files usable by both the client and server.

### Prerequisites

Install the latest version of Node.

This project uses `yarn` as package manager.

```
npm install -g yarn
```

### Installation

```
yarn install
```

### Building

Esbuild is used to create bundle for entrypoint [src/client/index.ts](./src/client/index.ts) in [public](./public/) which [public/index.html](./public/index.html) references.

Iteractively

```
yarn build:watch
```

One-time **dev** build, unminified with source maps

```
yarn build:dev
```

One-time **prod** build, minified without source maps

```
yarn build:dev
```

### Testing

Run `jest` tests using

```
yarn test
```

Interactively

```
yarn test --watchAll
```

### Generate submission

Build and compress the solution into a [./tetris.tar.gz](./tetris.tar.gz) file using

```
yarn generate-submission
```
