import type { Locale } from "./site";

export type CaseStudy = {
  slug: string;
  client: string;
  kind: string;
  headline: string;
  ready: boolean;
  challenge: string[];
  solution: string[];
  stack: string[];
  result: string[];
  link?: { href: string; label: string };
};

export const CASE_SLUGS = ["nivela", "repara"] as const;

const cases: Record<Locale, Record<string, CaseStudy>> = {
  pt: {
    nivela: {
      slug: "nivela",
      client: "Nivela",
      kind: "Produto próprio · SaaS",
      headline: "Um ERP completo para negócios de serviço, construído com arquitetura de produto grande.",
      ready: true,
      challenge: [
        "Pequenos e médios negócios de serviço operam com WhatsApp, caderno e planilha. Os ERPs existentes são pesados demais ou nichados demais.",
        "O produto precisava ser simples para quem está no balcão e, ao mesmo tempo, correto em financeiro e fiscal, sem depender de intermediários pagos.",
      ],
      solution: [
        "Plataforma multiempresa com isolamento de dados por empresa no próprio banco (RLS), permissões em dois eixos e autenticação em dois fatores.",
        "Operação completa: agenda com quatro visões, fila de atendimento, lançamentos, planos recorrentes com créditos e agendamento público por link.",
        "Motor financeiro com títulos, parcelas e baixas, conciliação bancária OFX/CSV, Open Finance e resultado gerencial.",
        "Emissão fiscal direta: NFS-e Nacional e NF-e/NFC-e na SEFAZ, com certificado A1 cifrado e preparação para IBS/CBS.",
        "Cobrança SaaS com Stripe e Asaas, Pix, webhooks idempotentes, trial, upgrade e adicionais.",
        "API pública documentada (OpenAPI) com webhooks, para integrar site, robô de WhatsApp, planilha e BI.",
        "Nivela IA: a IA propõe a ação, a pessoa confirma e o servidor executa com a mesma regra da tela, com cota, teto de custo e avaliação automática.",
      ],
      stack: [
        "Python 3.12",
        "Flask",
        "SQLAlchemy",
        "Alembic",
        "PostgreSQL",
        "Redis + RQ",
        "Docker",
        "Railway",
        "GitHub Actions",
        "Stripe",
        "Asaas",
        "Anthropic",
        "Sentry",
      ],
      result: [
        "Em produção, com ambientes de homologação e produção separados e promoção só por revisão.",
        "~157 mil linhas de Python, 200+ services de domínio, 170 migrations e 275 arquivos de teste.",
        "14 decisões de arquitetura registradas e documentação viva por módulo.",
      ],
      link: { href: "https://www.nivelaerp.com.br/", label: "nivelaerp.com.br" },
    },
    repara: {
      slug: "repara",
      client: "Repara",
      kind: "Produto próprio · em desenvolvimento",
      headline: "O cliente pergunta se ficou pronto. O Repara responde.",
      ready: true,
      challenge: [
        "Assistências técnicas autorizadas trabalham com WhatsApp lotado, planilha em cada setor e muito clique repetido para cada orçamento aprovado.",
        "O cliente pergunta “já ficou pronto?” e quem atende não tem a OS na frente. Equipamento pronto fica na prateleira sem aviso, peça chega e não vira nova data, visita é marcada em planilha.",
      ],
      solution: [
        "Painel único da operação ligado ao WhatsApp oficial: cada conversa já mostra a OS, o status ao vivo e o histórico do cliente. Cliente esperando há mais de 15 minutos vira alerta.",
        "Aprovação pelo WhatsApp: o cliente responde SIM ou NÃO e a OS anda sozinha. Técnico agendado, retirada calculada pela regra da loja (sábado, domingo e feriado) e cliente avisado, sem ninguém clicar.",
        "IA de atendimento que consulta o status real da OS e responde a qualquer hora. Nunca fala valor nem observação interna; o que depende da equipe vai para a equipe, com o motivo à vista.",
        "Mesa de Visitas: a IA coleta endereço, fotos da etiqueta e vídeo do defeito, e a pré-análise cruza o código de erro com a base técnica oficial do fabricante para pedir a peça certa antes de o técnico sair. Quem confirma é sempre o técnico.",
        "Peças: a nota fiscal entra por XML, PDF ou foto, cada item é casado com o pedido que o originou e vira aviso de retirada ou nova data de serviço.",
        "Ensinar IA: a gestão comenta uma resposta e a IA transforma o comentário em regra, que pode ser editada, pausada ou excluída.",
        "Segurança por padrão: a IA que fala com o cliente não grava dados nem envia nada a terceiros, regra coberta por teste. Agente novo entra em modo sombra, sugerindo antes de responder sozinho.",
      ],
      stack: [
        "Python 3.12",
        "FastAPI",
        "SQLAlchemy",
        "PostgreSQL",
        "JavaScript",
        "Tailwind CSS",
        "WhatsApp Cloud API",
        "OpenAI",
        "Google Agenda",
        "Playwright",
        "Vercel",
      ],
      result: [
        "Nasceu de um sistema que a SulCore construiu sob medida para uma assistência técnica autorizada, em uso todos os dias, inclusive no fim de semana, quando a IA atende sozinha.",
        "Agora vira produto: multiempresa, com as regras de cada loja configuráveis (agenda, feriados, textos da IA e base técnica).",
        "Cerca de 2.500 testes automatizados, 9 rotinas agendadas e CI a cada mudança. Nada vai para produção sem teste.",
      ],
    },
  },
  en: {
    nivela: {
      slug: "nivela",
      client: "Nivela",
      kind: "Own product · SaaS",
      headline: "A complete ERP for service businesses, built with big-product architecture.",
      ready: true,
      challenge: [
        "Small and mid-sized service businesses run on WhatsApp, notebooks and spreadsheets. Existing ERPs are either too heavy or too niche.",
        "The product had to be simple for the front desk and, at the same time, correct on finance and tax — without paid intermediaries.",
      ],
      solution: [
        "Multi-company platform with per-company data isolation in the database itself (RLS), two-axis permissions and two-factor authentication.",
        "Full operations: scheduling with four views, walk-in queue, sales records, recurring plans with credits and public booking by link.",
        "Finance engine with invoices, installments and settlements, OFX/CSV bank reconciliation, Open Finance and management reporting.",
        "Direct Brazilian e-invoicing: NFS-e and NF-e/NFC-e with the tax authority, encrypted A1 certificate, ready for the IBS/CBS reform.",
        "SaaS billing with Stripe and Asaas, Pix, idempotent webhooks, trials, upgrades and add-ons.",
        "Documented public API (OpenAPI) with webhooks to connect websites, WhatsApp bots, spreadsheets and BI.",
        "Nivela AI: the AI proposes an action, the person confirms and the server executes it with the same rule as the screen — with quotas, cost ceilings and automated evaluation.",
      ],
      stack: [
        "Python 3.12",
        "Flask",
        "SQLAlchemy",
        "Alembic",
        "PostgreSQL",
        "Redis + RQ",
        "Docker",
        "Railway",
        "GitHub Actions",
        "Stripe",
        "Asaas",
        "Anthropic",
        "Sentry",
      ],
      result: [
        "In production, with separate staging and production environments and promotion only through review.",
        "~157k lines of Python, 200+ domain services, 170 migrations and 275 test files.",
        "14 recorded architecture decisions and living documentation per module.",
      ],
      link: { href: "https://www.nivelaerp.com.br/", label: "nivelaerp.com.br" },
    },
    repara: {
      slug: "repara",
      client: "Repara",
      kind: "Own product · in development",
      headline: "The customer asks if it's ready. Repara answers.",
      ready: true,
      challenge: [
        "Authorized repair centers run on a crowded WhatsApp, a spreadsheet per department and the same clicks repeated for every approved quote.",
        "The customer asks “is it ready yet?” and whoever answers doesn't have the job in front of them. Finished devices sit on the shelf unannounced, parts arrive without a new date, visits are booked in a spreadsheet.",
      ],
      solution: [
        "One operations panel connected to the official WhatsApp: every conversation already shows the job, its live status and the customer's history. A customer waiting more than 15 minutes becomes an alert.",
        "Approval over WhatsApp: the customer replies YES or NO and the job moves on its own. Technician scheduled, pickup date computed from the shop's rules (weekends and holidays) and customer notified, with no one clicking.",
        "A customer-service AI that checks the job's real status and answers at any hour. It never mentions prices or internal notes; anything that needs the team goes to the team, with the reason on screen.",
        "Visit desk: the AI collects the address, photos of the label and a video of the fault, and the pre-diagnosis matches the error code against the manufacturer's official technical material so the right part is ordered before the technician leaves. The technician always confirms.",
        "Parts: the invoice comes in as XML, PDF or a photo, each item is matched to the order that created it and becomes a pickup notice or a new service date.",
        "Teach the AI: managers comment on a reply and the AI turns the comment into a rule that can be edited, paused or deleted.",
        "Safe by default: the AI that talks to customers can't write data or send anything to third parties, a rule covered by tests. A new agent starts in shadow mode, suggesting before it answers on its own.",
      ],
      stack: [
        "Python 3.12",
        "FastAPI",
        "SQLAlchemy",
        "PostgreSQL",
        "JavaScript",
        "Tailwind CSS",
        "WhatsApp Cloud API",
        "OpenAI",
        "Google Calendar",
        "Playwright",
        "Vercel",
      ],
      result: [
        "Born from a system SulCore built for an authorized repair center, used every day, weekends included, when the AI answers on its own.",
        "Now it becomes a product: multi-company, with each shop's rules configurable (schedule, holidays, AI wording and technical material).",
        "About 2,500 automated tests, 9 scheduled jobs and CI on every change. Nothing reaches production untested.",
      ],
    },
  },
};

export function getCase(locale: Locale, slug: string): CaseStudy | undefined {
  return cases[locale][slug];
}
