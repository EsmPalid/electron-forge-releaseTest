import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { existsSync, readFileSync } from "node:fs";
import { test } from "node:test";

const require = createRequire(import.meta.url);
const forgeConfig = require("../forge.config.cjs");

test("Forge packages the app with ASAR and the supported platform makers", () => {
    assert.equal(forgeConfig.packagerConfig.asar, true);

    const makers = new Map(
        forgeConfig.makers.map(({ name, platforms }) => [name, platforms]),
    );

    assert.deepEqual([...makers.keys()].sort(), [
        "@electron-forge/maker-deb",
        "@electron-forge/maker-rpm",
        "@electron-forge/maker-squirrel",
        "@electron-forge/maker-zip",
    ]);
    assert.deepEqual(makers.get("@electron-forge/maker-zip"), ["darwin"]);
});

test("the configured Electron entry point and renderer dependencies exist", () => {
    const packageJson = JSON.parse(readFileSync("package.json", "utf8"));

    assert.ok(existsSync(packageJson.main), `${packageJson.main} must exist`);
    assert.ok(existsSync("preload.js"));
    assert.ok(existsSync("renderer.js"));
    assert.match(readFileSync("index.html", "utf8"), /<script src="\.\/renderer\.js"><\/script>/);
});
