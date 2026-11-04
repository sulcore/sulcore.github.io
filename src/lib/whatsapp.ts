// Mensagem de contato montada no navegador. Nada é enviado: só vira um link wa.me.

export type ContactCopy = { greeting: string; typeLabel: string; nameLabel: string };

export function buildMessage(copy: ContactCopy, input: { type: string; who: string; msg: string }): string {
  const lines = [copy.greeting, "", `${copy.typeLabel}: ${input.type}`];
  const who = input.who.trim();
  if (who) lines.push(`${copy.nameLabel}: ${who}`);
  lines.push("", input.msg.trim());
  return lines.join("\n").trim();
}

// Só dígitos, com DDI e DDD. Número inválido ou vazio devolve null (o botão copia a mensagem).
export function whatsappLink(number: string, text: string): string | null {
  if (!/^\d{10,15}$/.test(number)) return null;
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}
