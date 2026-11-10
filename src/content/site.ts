// Configuração única do site: contato, endereço público e repositório.
export const SITE = {
  name: "SulCore",
  // Endereço público. Troque quando o domínio próprio existir (ver docs/DEPLOY.md).
  url: "https://sulcore.github.io",
  repo: "https://github.com/sulcore/sulcore.github.io",
  // Número com DDI e DDD, só dígitos (ex.: "5551999999999"). Vazio = botão copia a mensagem.
  whatsapp: "5551981821970",
  email: "",
  base: "Novo Hamburgo · RS",
  // Página de status técnico (/status). Só endereços públicos; vazio = "em configuração".
  status: {
    // Pasta "raw" do gist público em que o pipeline do Nivela grava o sinal da CI (nivela_app,
    // FLUXO_GIT.md §15). Ex.: "https://gist.githubusercontent.com/<usuario>/<id>/raw".
    signal: "",
    // Página pública de disponibilidade (UptimeRobot ou status.nivelaerp.com.br).
    uptime: "",
  },
};

export const LOCALES = ["pt", "en"] as const;
export type Locale = (typeof LOCALES)[number];

// Prefixo do GitHub Pages para caminhos que não passam pelo <Link> do Next (vídeo, ícone).
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function asset(path: string): string {
  return `${BASE_PATH}${path}`;
}

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}
