/**
 * WebContainer manager — lazily boots a StackBlitz WebContainer instance.
 * Used for live in-browser preview and Synapse request interception.
 */

import { WebContainer } from "@webcontainer/api";

let instance: WebContainer | null = null;

export async function getWebContainer(): Promise<WebContainer> {
  if (!instance) {
    instance = await WebContainer.boot();
  }
  return instance;
}

export async function teardown(): Promise<void> {
  if (instance) {
    instance.teardown();
    instance = null;
  }
}
