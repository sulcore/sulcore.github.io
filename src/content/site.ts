// Configuração única do site. Preencha antes de publicar (ver docs/DIRECAO.md §8).
export const SITE = {
  name: "SulCore",
  // Domínio definitivo ainda não existe; troque quando registrar.
  url: "https://sulcore.dev",
  // Número com DDI e DDD, só dígitos (ex.: "5551999999999"). Vazio = botão copia a mensagem.
  whatsapp: "5551981821970",
  email: "",
  base: "Novo Hamburgo · RS",
};

export const LOCALES = ["pt", "en"] as const;
export type Locale = (typeof LOCALES)[number];

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}
