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

export const CASE_SLUGS = ["nivela", "eletrica-moro"] as const;

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
    "eletrica-moro": {
      slug: "eletrica-moro",
      client: "Elétrica Moro",
      kind: "Sistema sob medida",
      headline: "Sistema sob medida para a gestão da prestação de serviços de uma empresa de instalações elétricas.",
      ready: false,
      challenge: [],
      solution: [],
      stack: [],
      result: [],
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
    "eletrica-moro": {
      slug: "eletrica-moro",
      client: "Elétrica Moro",
      kind: "Custom system",
      headline: "A custom system to manage service delivery for an electrical installation company.",
      ready: false,
      challenge: [],
      solution: [],
      stack: [],
      result: [],
    },
  },
};

export function getCase(locale: Locale, slug: string): CaseStudy | undefined {
  return cases[locale][slug];
}
