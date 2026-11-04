import { describe, expect, it } from "vitest";
import { cycleDuration, finalState, initialState, phases, select, step, view, type ConsoleState } from "@/lib/console-machine";

const scenario = { prompt: "abc", checks: ["a", "b"] };

function run(from: ConsoleState, n: number) {
  let s = from;
  for (let i = 0; i < n; i++) s = step(s, scenario, 3).next;
  return s;
}

describe("console machine", () => {
  it("types one character per step", () => {
    expect(run(initialState, 2)).toEqual({ index: 0, chars: 2, phase: 0 });
    expect(view(run(initialState, 2), scenario).typed).toBe("ab");
  });

  it("goes typing → thinking → proposal → checks → confirm → done", () => {
    const { confirm, done } = phases(scenario);
    const s = run(initialState, scenario.prompt.length); // terminou de digitar
    expect(s.phase).toBe(0);
    expect(run(s, 1).phase).toBe(1);
    expect(run(s, 2).phase).toBe(2);
    expect(view(run(s, 2), scenario).showProposal).toBe(true);
    // cada checagem aparece num passo: proposta (0) → 1 → … → n checagens
    expect(view(run(s, 2 + scenario.checks.length), scenario).checksShown).toBe(scenario.checks.length);
    expect(run(s, 3 + scenario.checks.length).phase).toBe(confirm);
    expect(view(run(s, 3 + scenario.checks.length), scenario).confirming).toBe(true);
    expect(run(s, 4 + scenario.checks.length).phase).toBe(done);
  });

  it("never shows more checks than the scenario has", () => {
    const end = finalState(0, scenario);
    expect(view(end, scenario).checksShown).toBe(scenario.checks.length);
    expect(view(end, scenario).done).toBe(true);
  });

  it("moves to the next scenario after done and wraps around", () => {
    const done = finalState(2, scenario);
    expect(step(done, scenario, 3).next).toEqual(select(0));
    expect(step(finalState(0, scenario), scenario, 3).next).toEqual(select(1));
  });

  it("has a finite, readable cycle", () => {
    const ms = cycleDuration(scenario);
    expect(ms).toBeGreaterThan(3000);
    expect(ms).toBeLessThan(15000);
  });
});
