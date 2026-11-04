// Máquina de estados da demo do console, sem React: fácil de testar e de raciocinar.
// Fases: 0 digitando · 1 pensando · 2 proposta · 3..3+n checagens · confirmando · executado.

export type ConsoleState = { index: number; chars: number; phase: number };

export type ScenarioShape = { prompt: string; checks: readonly string[] };

export const TIMING = {
  typeMs: 26,
  afterTypingMs: 450,
  thinkingMs: 1000,
  proposalMs: 650,
  checkMs: 420,
  confirmMs: 900,
  holdMs: 3600,
} as const;

export const initialState: ConsoleState = { index: 0, chars: 0, phase: 0 };

export function phases(scenario: ScenarioShape) {
  const confirm = 3 + scenario.checks.length;
  return { confirm, done: confirm + 1 };
}

// Próximo estado e quanto esperar até ele. Depois de "executado", passa para o próximo cenário.
export function step(state: ConsoleState, scenario: ScenarioShape, total: number): { next: ConsoleState; delay: number } {
  const { confirm, done } = phases(scenario);
  const { phase, chars, index } = state;
  if (phase === 0) {
    return chars < scenario.prompt.length
      ? { next: { ...state, chars: chars + 1 }, delay: TIMING.typeMs }
      : { next: { ...state, phase: 1 }, delay: TIMING.afterTypingMs };
  }
  if (phase === 1) return { next: { ...state, phase: 2 }, delay: TIMING.thinkingMs };
  if (phase < confirm) return { next: { ...state, phase: phase + 1 }, delay: phase === 2 ? TIMING.proposalMs : TIMING.checkMs };
  if (phase === confirm) return { next: { ...state, phase: done }, delay: TIMING.confirmMs };
  return { next: select((index + 1) % total), delay: TIMING.holdMs };
}

export function select(index: number): ConsoleState {
  return { index, chars: 0, phase: 0 };
}

// Estado final de um cenário: usado com prefers-reduced-motion.
export function finalState(index: number, scenario: ScenarioShape): ConsoleState {
  return { index, chars: scenario.prompt.length, phase: phases(scenario).done };
}

export function view(state: ConsoleState, scenario: ScenarioShape) {
  const { confirm, done } = phases(scenario);
  return {
    typed: scenario.prompt.slice(0, state.chars),
    typing: state.phase === 0,
    thinking: state.phase === 1,
    showProposal: state.phase >= 2,
    checksShown: Math.max(0, Math.min(scenario.checks.length, state.phase - 2)),
    confirming: state.phase === confirm,
    done: state.phase >= done,
  };
}

// Tempo total de um ciclo completo do cenário, em ms (útil para testes e para ajustar ritmo).
export function cycleDuration(scenario: ScenarioShape): number {
  let state: ConsoleState = select(0);
  let total = 0;
  for (;;) {
    const { next, delay } = step(state, scenario, 1);
    total += delay;
    if (state.phase === phases(scenario).done) return total;
    state = next;
  }
}
