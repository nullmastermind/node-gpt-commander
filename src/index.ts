#!/usr/bin/env node
import { clipGet, clipPut, init, mouseGetPos, send } from "node-autoit-koffi";
import path from "node:path";
import { execSync } from "node:child_process";

const gptCommanderExeDir = path.join(__dirname, "../bin");

const main = async () => {
  await init();

  const currentClip = await clipGet();
  await clipPut("");
  await send("^c");
  await new Promise((rel) => setTimeout(rel, 50));
  let highlightedText = await clipGet();

  if (!highlightedText) {
    await send("^a");
    await send("^c");
    highlightedText = await clipGet();
  }

  if (highlightedText) {
    const mousePos = await mouseGetPos();
    execSync(`gpt-commander.exe ${mousePos.x} ${mousePos.y}`, {
      cwd: gptCommanderExeDir,
    });
    const resultText = await clipGet();

    if (resultText !== highlightedText) {
      // Pressed OK
      await send("^v");
      await clipPut(resultText);

      return;
    }
  }

  await clipPut(currentClip);
};

main().catch(console.error);
