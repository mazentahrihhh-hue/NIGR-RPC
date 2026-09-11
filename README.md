# Custom RPC — Revenge

This is a Revenge-compatible rewrite of the original project.

## Why the old project did not install

The old project was a normal Python/Node desktop program. It used `pypresence` and `discord-rpc`, so it was not a Revenge plugin and had no `manifest.json`.

This version is a JavaScript-only Revenge plugin.

## Install

The folder served by your URL must contain:

- `manifest.json`
- `index.js`

For a GitHub repository, paste the repository/directory URL into Revenge if your Revenge build resolves `manifest.json` from the directory. You can also paste the direct URL to `manifest.json` if your build asks for a manifest URL.

## Configure

Open `index.js` and replace:

`YOUR_APPLICATION_ID`

with the Application ID of your Discord Developer application.

You can also change:

- `name`
- `details`
- `state`
- `largeImage`
- `largeText`
- `smallImage`
- `smallText`

After changing the file, reinstall/re-add the plugin or use a cache-busting query such as `?v=2` if your Revenge build caches plugin URLs.

## Important

The old `config.json`, Python file, and Node `discord-rpc` dependency are intentionally not used. They cannot run inside Revenge's JavaScript plugin environment.
