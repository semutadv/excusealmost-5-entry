// Entry runner for "The Excuse That Almost Works" (clever-harbor).
// Twenty words at most: the text a gamer sends the boss to skip work in
// GTA 6 launch week. The excuse escalates in nineteen words from a
// parrot, to the parrot's new catchphrase, to a legal theory about
// family emergencies in three states — absurd, specific, and just
// documented enough to almost work. At /output/entry.txt.
import { promises as fs } from "node:fs";
import path from "node:path";

const LINE =
  "Boss, my grandmother's parrot learned to say 'GTA launch week' and legally that's a family emergency in three states.";

async function run(): Promise<void> {
  const out = process.env.OUTPUT_DIR ?? "/output";
  await fs.mkdir(out, { recursive: true });
  for (const name of await fs.readdir(out).catch(() => [] as string[])) {
    await fs.rm(path.join(out, name), { recursive: true, force: true });
  }
  await fs.writeFile(path.join(out, "entry.txt"), LINE + "\n", "utf8");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
