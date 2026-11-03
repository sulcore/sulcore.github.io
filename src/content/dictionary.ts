import type { Locale } from "./site";

type Scenario = {
  tab: string;
  prompt: string;
  kind: string;
  fields: [string, string][];
  checks: string[];
  done: string;
};

const pt = {
  meta: {
    title: "SulCore — Software sob medida, com engenharia de verdade",
    description:
      "Sistemas de gestão, integrações e IA aplicada a processos. Desenvolvimento sob medida com arquitetura documentada, testes e quality gates. Novo Hamburgo, RS — atendemos o Brasil e o exterior.",
  },
  nav: {
    services: "Serviços",
    cases: "Cases",
    ai: "IA aplicada",
    process: "Como trabalhamos",
    team: "Equipe",
    cta: "Mandar mensagem",
  },
  hero: {
    eyebrow: "Software development · Novo Hamburgo, RS",
    title: ["Software sob medida,", "com engenharia de verdade."],
    lead:
      "Construímos sistemas de gestão, integrações e IA aplicada aos processos da sua empresa. Do jeito que um sistema deveria ser: claro para quem usa, sólido por dentro e pronto para crescer.",
    primary: "Conte seu projeto",
    secondary: "Ver o case Nivela",
    proof: [
      ["ERP SaaS", "em produção, construído por nós"],
      ["PT · EN", "Brasil e exterior"],
    ],
  },
  console: {
    title: "operacao.sulcore",
    input: "Pedido",
    proposal: "Proposta montada a partir do banco",
    confirm: "Confirmar",
    adjust: "Ajustar",
    pending: "Nada foi gravado ainda.",
    note: "Demonstração. Em produção, cada passo roda com as permissões de quem pede.",
    scenarios: [
      {
        tab: "Agenda",
        prompt: "Agenda a manutenção do quadro da Padaria Sol pra sexta às 14h com o Rafael",
        kind: "Ordem de serviço",
        fields: [
          ["Serviço", "Manutenção preventiva · quadro elétrico"],
          ["Cliente", "Padaria Sol Ltda."],
          ["Técnico", "Rafael M."],
          ["Quando", "sex · 14:00 – 16:00"],
        ],
        checks: [
          "Permissão do usuário verificada",
          "Agenda do técnico sem conflito",
          "Mesma regra da tela manual",
        ],
        done: "Gravado uma vez · auditoria #A-2381",
      },
      {
        tab: "Financeiro",
        prompt: "Gera a cobrança Pix das parcelas vencidas da Construtora Vale",
        kind: "Cobrança Pix",
        fields: [
          ["Títulos", "3 parcelas vencidas"],
          ["Total", "R$ 4.380,00"],
          ["Envio", "WhatsApp + e-mail do cadastro"],
          ["Baixa", "automática ao receber"],
        ],
        checks: [
          "Valores lidos dos títulos, não do texto",
          "Conta de recebimento padrão da empresa",
          "Cliente sem cobrança em aberto duplicada",
        ],
        done: "3 cobranças emitidas · auditoria #F-0917",
      },
      {
        tab: "Atendimento",
        prompt: "WhatsApp: \"disjuntor desarmando toda hora, é urgente\"",
        kind: "Triagem de chamado",
        fields: [
          ["Categoria", "Problema elétrico"],
          ["Prioridade", "Alta · cliente com contrato"],
          ["Responsável", "Plantão técnico"],
          ["Responder até", "30 min"],
        ],
        checks: [
          "Regra de triagem explicável",
          "Histórico do cliente anexado",
          "Rascunho de resposta para revisão",
        ],
        done: "Chamado #4471 aberto · equipe avisada",
      },
    ] as Scenario[],
  },
  problem: {
    eyebrow: "De onde viemos",
    title: "Nascemos dentro de um ERP legado. Sabemos o que não fazer.",
    body:
      "Antes da SulCore, passamos anos desenvolvendo e mantendo um ERP de grande porte para fábricas, empresas de monitoramento, importadoras e exportadoras. Foi lá que aprendemos regra de negócio de verdade, e também o preço de um sistema construído sem arquitetura: cada mudança quebra outra coisa, e quem paga é o cliente.",
    columns: { left: "O que é comum", right: "Como a SulCore faz" },
    rows: [
      ["Regra de negócio espalhada pelas telas", "Regra em um só lugar, reaproveitada por tela, API e IA"],
      ["Ninguém sabe por que foi feito assim", "Toda decisão de arquitetura registrada e justificada"],
      ["Teste é o cliente usando", "Baterias de testes e quality gates antes de cada entrega"],
      ["Integração que quebra em silêncio", "Webhooks idempotentes, filas e monitoramento de erro"],
      ["Sistema que só o desenvolvedor entende", "Interface pensada para quem usa todo dia"],
    ] as [string, string][],
  },
  services: {
    eyebrow: "O que fazemos",
    title: "Tecnologia sob medida para o processo da sua empresa.",
    lead:
      "Cada projeto é analisado do zero: entendemos a operação, desenhamos a solução e acompanhamos de perto até ela rodar no dia a dia.",
    groups: [
      {
        id: "01",
        name: "Sistemas sob medida",
        summary: "Quando planilha e sistema de prateleira já não dão conta.",
        items: [
          "Sistemas de gestão e back-office: ordens de serviço, agenda, estoque, financeiro, comissões",
          "Portais de cliente, áreas logadas, PWA e apps",
          "SaaS: transformar o seu processo em produto vendável, com planos e cobrança recorrente",
          "Modernização de sistema legado, por partes, sem parar a operação",
        ],
      },
      {
        id: "02",
        name: "IA aplicada a processos",
        summary: "IA que trabalha dentro do seu sistema, com regra e auditoria.",
        items: [
          "Assistentes que executam ações: a IA propõe, a pessoa confirma, o sistema executa",
          "Triagem e roteamento de atendimento, rascunho de respostas",
          "Leitura e extração de dados de documentos",
          "Avaliação de qualidade e controle de custo de IA já existente",
        ],
      },
      {
        id: "03",
        name: "Integrações e automação",
        summary: "Seus sistemas conversando, sem digitar a mesma coisa duas vezes.",
        items: [
          "API oficial do WhatsApp (Meta): número, templates, webhooks e chatbot",
          "Pagamentos: Pix, Stripe, Asaas, assinatura recorrente, conciliação bancária",
          "Fiscal: NF-e, NFC-e e NFS-e Nacional emitidas direto, preparação para IBS/CBS",
          "APIs, webhooks, n8n e integração com ERP legado e BI",
        ],
      },
      {
        id: "04",
        name: "Presença digital e comercial",
        summary: "A parte que o cliente vê, com o mesmo cuidado da parte de dentro.",
        items: [
          "Sites e landing pages pensadas para conversão",
          "Vídeos comerciais com estética de cinema para produto, marca e anúncio",
          "Chat comercial que qualifica o visitante e gera lead",
          "Documentação de API e material técnico de venda",
        ],
      },
    ],
  },
  nivela: {
    eyebrow: "Case · Produto próprio",
    title: "Nivela: um ERP SaaS completo, do banco de dados ao balcão.",
    lead:
      "Sistema de gestão multiempresa para negócios de serviço: agenda, atendimento, financeiro, fiscal, planos recorrentes, cobrança e IA. Concebido, construído e operado inteiramente pela nossa equipe.",
    stats: [
      ["157 mil", "linhas de Python"],
      ["200+", "services de domínio"],
      ["170", "migrations versionadas"],
      ["275", "arquivos de teste automatizado"],
      ["14", "decisões de arquitetura registradas"],
    ] as [string, string][],
    videos: [
      ["painel", "Painel do dia"],
      ["agenda", "Agenda"],
      ["resultado", "Financeiro"],
      ["api", "API pública"],
    ] as [string, string][],
    highlights: [
      ["Fiscal direto, sem intermediário", "NFS-e Nacional e NF-e/NFC-e transmitidas direto, com certificado cifrado."],
      ["Financeiro que fecha", "Títulos, parcelas, baixas, conciliação bancária e resultado do período."],
      ["Cobrança e pagamentos", "Stripe, Asaas e Pix, com webhooks idempotentes e assinatura recorrente."],
      ["IA com confirmação", "Ações por linguagem natural, com cota, teto de custo e auditoria."],
    ] as [string, string][],
    archTitle: "Arquitetura",
    arch: {
      surfaces: ["ERP web", "Agendamento público", "App mobile", "API pública + webhooks"],
      http: "Camada HTTP fina · autenticação, permissão, validação",
      domain: ["Agenda", "Financeiro", "Fiscal", "Cobrança", "Atendimento", "IA"],
      domainLabel: "Domínio em services · regra em um só lugar",
      data: "PostgreSQL · isolamento por empresa com RLS",
      side: ["Fila assíncrona", "Monitoramento de erros"],
      integrations: ["SEFAZ", "NFS-e Nacional", "Pix", "Stripe", "Asaas", "Open Finance", "Google Calendar", "WhatsApp"],
      integrationsLabel: "Integrações diretas",
    },
    link: "Ver case completo",
    visit: "Visitar nivelaerp.com.br",
  },
  ai: {
    eyebrow: "IA aplicada",
    title: "A IA propõe. A pessoa confirma. O sistema executa.",
    lead:
      "É o padrão que usamos para colocar IA em operação real. O modelo nunca grava nada sozinho: ele monta uma proposta, o sistema valida com as mesmas regras da tela manual e só executa quando alguém confirma.",
    steps: [
      ["Pedido", "A pessoa escreve o que precisa, em linguagem natural."],
      ["Proposta", "A IA consulta o sistema só com leitura e monta a ação."],
      ["Validação", "O servidor aplica permissão, regra de negócio e conflitos. O resumo vem do banco, não do texto da IA."],
      ["Confirmação", "A pessoa vê exatamente o que será gravado e confirma."],
      ["Execução", "Uma vez só, com a linha travada e registro de auditoria."],
    ] as [string, string][],
    human: "humano",
    guardsTitle: "Proteções que não dependem da IA obedecer",
    guards: [
      "Dado pessoal mínimo enviado ao modelo",
      "Mesmas permissões de quem pede",
      "Bateria de avaliação com casos de segurança a cada mudança",
      "Teto de custo por cliente e cache para gastar pouco",
      "Chave para desligar sem deploy",
    ],
  },
  process: {
    eyebrow: "Como trabalhamos",
    title: "Uma esteira de engenharia que não deixa a velocidade virar bagunça.",
    lead:
      "Usamos as ferramentas mais modernas de desenvolvimento, dentro de um processo com regras escritas, verificação automática e revisão em cada etapa.",
    stages: [
      ["Decisão", "Arquitetura registrada antes do código, com o porquê de cada escolha."],
      ["Código", "Padrões obrigatórios: camada HTTP fina, regra em services, migrations versionadas."],
      ["Testes", "Unitários, integração, segurança e smoke em banco real."],
      ["Quality gate", "Cada pull request analisado: segredo vazado, arquivo proibido e migration sem aviso bloqueiam."],
      ["Homologação", "Ambiente separado, com dados de exemplo, antes de qualquer cliente ver."],
      ["Validação visual", "Navegador real, desktop e celular. Elemento presente não basta, precisa estar certo."],
      ["Produção", "Promoção só por revisão, com relatório de entrega e limitações declaradas."],
    ] as [string, string][],
    docsTitle: "Documentação é parte do produto",
    docs: [
      "Decisões de arquitetura (ADRs)",
      "Mapa de módulos e armadilhas conhecidas",
      "Regras de negócio por domínio",
      "Runbooks de operação e deploy",
      "Dívida técnica rastreada",
      "Relatório de cada entrega",
    ],
  },
  cases: {
    eyebrow: "Cases",
    title: "Trabalho real, em uso.",
    items: [
      {
        slug: "nivela",
        client: "Nivela",
        kind: "Produto próprio · SaaS",
        summary: "ERP multiempresa para negócios de serviço, com fiscal direto, cobrança, API pública e IA.",
        tags: ["Python", "PostgreSQL", "Multi-tenant", "IA", "Fiscal"],
        status: "Em produção",
      },
      {
        slug: "eletrica-moro",
        client: "Elétrica Moro",
        kind: "Sistema sob medida",
        summary: "Sistema para a gestão da prestação de serviços de uma empresa de instalações elétricas.",
        tags: ["Prestação de serviços", "Sob medida"],
        status: "Case completo em breve",
      },
    ],
    open: "Abrir case",
  },
  team: {
    eyebrow: "Equipe",
    title: "Quem constrói.",
    lead: "Uma equipe pequena, de propósito: quem conversa com você é quem desenha e escreve o sistema.",
    people: [
      {
        initials: "JV",
        name: "João Vargas",
        role: "Fundador · Produto e engenharia",
        bio: "Veio de anos desenvolvendo um ERP de grande porte para fábricas, empresas de monitoramento, importadoras e exportadoras. Cuida de produto, arquitetura, desenvolvimento e da esteira de engenharia.",
      },
      {
        initials: "TH",
        name: "Theilor Pies",
        role: "Co-fundador · Produto e desenvolvimento",
        bio: "Co-idealizador do Nivela. Transforma problema de negócio em ideia de produto e atua no desenvolvimento de ponta a ponta.",
      },
    ],
  },
  contact: {
    eyebrow: "Contato",
    title: "Conte o problema. A gente responde com um caminho.",
    lead:
      "Sem formulário longo. Escolha o tipo de projeto, descreva em poucas linhas e a mensagem chega pronta no nosso WhatsApp.",
    typeLabel: "Tipo de projeto",
    types: ["Sistema sob medida", "IA nos processos", "Integração / WhatsApp", "Site ou vídeo comercial", "Ainda não sei"],
    nameLabel: "Seu nome e empresa",
    namePlaceholder: "Ana · Construtora Vale",
    msgLabel: "O que você precisa resolver?",
    msgPlaceholder: "Hoje controlamos as ordens de serviço em planilha e...",
    send: "Enviar pelo WhatsApp",
    copy: "Copiar mensagem",
    copied: "Mensagem copiada",
    greeting: "Olá, SulCore!",
    base: "Base em Novo Hamburgo, RS. Atendemos todo o Brasil e o exterior, em português e inglês.",
  },
  footer: {
    tagline: "Software development",
    rights: "Todos os direitos reservados.",
    language: "English",
  },
  casePage: {
    back: "Voltar",
    challenge: "Desafio",
    solution: "Solução",
    stack: "Tecnologias",
    result: "Resultado",
    soon: "Em detalhamento. Este case será publicado em breve.",
    cta: "Quer algo assim para a sua empresa?",
  },
};

export type Dict = typeof pt;

const en: Dict = {
  meta: {
    title: "SulCore — Custom software, properly engineered",
    description:
      "Management systems, integrations and AI applied to business processes. Custom development with documented architecture, test suites and quality gates. Based in southern Brazil, working worldwide.",
  },
  nav: {
    services: "Services",
    cases: "Cases",
    ai: "Applied AI",
    process: "How we work",
    team: "Team",
    cta: "Send a message",
  },
  hero: {
    eyebrow: "Software development · Southern Brazil",
    title: ["Custom software,", "properly engineered."],
    lead:
      "We build management systems, integrations and AI that works inside your company's processes. The way software should be: clear for the people using it, solid on the inside, ready to grow.",
    primary: "Tell us about your project",
    secondary: "See the Nivela case",
    proof: [
      ["SaaS ERP", "in production, built by us"],
      ["EN · PT", "Brazil and abroad"],
    ],
  },
  console: {
    title: "operations.sulcore",
    input: "Request",
    proposal: "Proposal built from the database",
    confirm: "Confirm",
    adjust: "Adjust",
    pending: "Nothing has been saved yet.",
    note: "Demo. In production, every step runs with the requester's permissions.",
    scenarios: [
      {
        tab: "Scheduling",
        prompt: "Book the panel maintenance at Sun Bakery for Friday 2pm with Rafael",
        kind: "Work order",
        fields: [
          ["Service", "Preventive maintenance · electrical panel"],
          ["Customer", "Sun Bakery Ltd."],
          ["Technician", "Rafael M."],
          ["When", "Fri · 2:00 – 4:00 pm"],
        ],
        checks: [
          "User permission verified",
          "No conflict on technician's schedule",
          "Same rule as the manual screen",
        ],
        done: "Saved exactly once · audit #A-2381",
      },
      {
        tab: "Finance",
        prompt: "Issue Pix charges for Vale Construction's overdue installments",
        kind: "Pix charge",
        fields: [
          ["Invoices", "3 overdue installments"],
          ["Total", "R$ 4,380.00"],
          ["Delivery", "WhatsApp + email on file"],
          ["Settlement", "automatic on payment"],
        ],
        checks: [
          "Amounts read from invoices, not from text",
          "Company's default receiving account",
          "No duplicate open charge for customer",
        ],
        done: "3 charges issued · audit #F-0917",
      },
      {
        tab: "Support",
        prompt: "WhatsApp: \"breaker keeps tripping, it's urgent\"",
        kind: "Ticket triage",
        fields: [
          ["Category", "Electrical issue"],
          ["Priority", "High · contract customer"],
          ["Assignee", "On-call technician"],
          ["Reply within", "30 min"],
        ],
        checks: [
          "Explainable triage rule",
          "Customer history attached",
          "Draft reply ready for review",
        ],
        done: "Ticket #4471 opened · team notified",
      },
    ],
  },
  problem: {
    eyebrow: "Where we come from",
    title: "We grew up inside a legacy ERP. We know what not to do.",
    body:
      "Before SulCore, we spent years building and maintaining a large ERP for factories, monitoring companies, importers and exporters. That's where we learned real business rules — and the cost of software built without architecture: every change breaks something else, and the customer pays for it.",
    columns: { left: "What's common", right: "How SulCore does it" },
    rows: [
      ["Business rules scattered across screens", "Rules in one place, reused by UI, API and AI"],
      ["Nobody knows why it was built that way", "Every architecture decision recorded and justified"],
      ["Testing means the customer using it", "Test suites and quality gates before every delivery"],
      ["Integrations that fail silently", "Idempotent webhooks, queues and error monitoring"],
      ["Software only the developer understands", "Interfaces designed for people who use them daily"],
    ],
  },
  services: {
    eyebrow: "What we do",
    title: "Technology shaped around your company's process.",
    lead:
      "Every project starts from scratch: we learn the operation, design the solution and stay close until it runs day to day.",
    groups: [
      {
        id: "01",
        name: "Custom systems",
        summary: "When spreadsheets and off-the-shelf software stop being enough.",
        items: [
          "Management and back-office systems: work orders, scheduling, inventory, finance, commissions",
          "Customer portals, authenticated areas, PWAs and apps",
          "SaaS: turning your process into a sellable product, with plans and recurring billing",
          "Legacy modernization, piece by piece, without stopping operations",
        ],
      },
      {
        id: "02",
        name: "AI applied to processes",
        summary: "AI that works inside your system, with rules and audit trails.",
        items: [
          "Assistants that take action: AI proposes, a person confirms, the system executes",
          "Support triage and routing, draft replies",
          "Reading and extracting data from documents",
          "Quality evaluation and cost control for existing AI",
        ],
      },
      {
        id: "03",
        name: "Integrations & automation",
        summary: "Your systems talking to each other — no typing the same thing twice.",
        items: [
          "Official WhatsApp API (Meta): number, templates, webhooks and chatbot",
          "Payments: Pix, Stripe, Asaas, subscriptions, bank reconciliation",
          "Brazilian e-invoicing (NF-e, NFC-e, NFS-e) issued directly",
          "APIs, webhooks, n8n, legacy ERP and BI integration",
        ],
      },
      {
        id: "04",
        name: "Digital & commercial presence",
        summary: "The part customers see, built with the same care as the inside.",
        items: [
          "Websites and landing pages designed to convert",
          "Cinematic commercial videos for product, brand and ads",
          "Sales chat that qualifies visitors and captures leads",
          "API documentation and technical sales material",
        ],
      },
    ],
  },
  nivela: {
    eyebrow: "Case · Our own product",
    title: "Nivela: a complete SaaS ERP, from the database to the front desk.",
    lead:
      "Multi-company management software for service businesses: scheduling, operations, finance, tax, recurring plans, billing and AI. Designed, built and operated entirely by our team.",
    stats: [
      ["157k", "lines of Python"],
      ["200+", "domain services"],
      ["170", "versioned migrations"],
      ["275", "automated test files"],
      ["14", "recorded architecture decisions"],
    ],
    videos: [
      ["painel", "Daily dashboard"],
      ["agenda", "Scheduling"],
      ["resultado", "Finance"],
      ["api", "Public API"],
    ],
    highlights: [
      ["Direct e-invoicing, no middleman", "Brazilian NFS-e and NF-e/NFC-e transmitted directly, with an encrypted certificate."],
      ["Finance that reconciles", "Invoices, installments, settlements, bank reconciliation and period results."],
      ["Billing and payments", "Stripe, Asaas and Pix, with idempotent webhooks and subscriptions."],
      ["AI with confirmation", "Natural-language actions with quotas, cost ceilings and audit trails."],
    ],
    archTitle: "Architecture",
    arch: {
      surfaces: ["Web ERP", "Public booking", "Mobile app", "Public API + webhooks"],
      http: "Thin HTTP layer · auth, permissions, validation",
      domain: ["Scheduling", "Finance", "Tax", "Billing", "Support", "AI"],
      domainLabel: "Domain services · each rule lives in one place",
      data: "PostgreSQL · per-company isolation with RLS",
      side: ["Async job queue", "Error monitoring"],
      integrations: ["SEFAZ", "NFS-e", "Pix", "Stripe", "Asaas", "Open Finance", "Google Calendar", "WhatsApp"],
      integrationsLabel: "Direct integrations",
    },
    link: "Read the full case",
    visit: "Visit nivelaerp.com.br",
  },
  ai: {
    eyebrow: "Applied AI",
    title: "AI proposes. A person confirms. The system executes.",
    lead:
      "This is the pattern we use to put AI into real operations. The model never writes anything on its own: it builds a proposal, the system validates it with the same rules as the manual screen, and it only runs once someone confirms.",
    steps: [
      ["Request", "The person writes what they need, in plain language."],
      ["Proposal", "The AI queries the system read-only and assembles the action."],
      ["Validation", "The server applies permissions, business rules and conflicts. The summary comes from the database, not from the AI's text."],
      ["Confirmation", "The person sees exactly what will be saved and confirms."],
      ["Execution", "Exactly once, with a row lock and an audit record."],
    ],
    human: "human",
    guardsTitle: "Safeguards that don't rely on the AI behaving",
    guards: [
      "Minimal personal data sent to the model",
      "Same permissions as the requester",
      "Evaluation suite with safety cases on every change",
      "Per-customer cost ceiling and caching",
      "Kill switch without a deploy",
    ],
  },
  process: {
    eyebrow: "How we work",
    title: "An engineering pipeline that keeps speed from turning into chaos.",
    lead:
      "We use the most modern development tools, inside a process with written rules, automated checks and review at every stage.",
    stages: [
      ["Decision", "Architecture recorded before code, with the reasoning behind each choice."],
      ["Code", "Mandatory patterns: thin HTTP layer, rules in services, versioned migrations."],
      ["Tests", "Unit, integration, security and smoke tests on a real database."],
      ["Quality gate", "Every pull request analyzed: leaked secrets, forbidden files and unannounced migrations are blocked."],
      ["Staging", "A separate environment with sample data, before any customer sees it."],
      ["Visual check", "Real browser, desktop and mobile. Present isn't enough — it has to be right."],
      ["Production", "Promoted only through review, with a delivery report and stated limitations."],
    ],
    docsTitle: "Documentation is part of the product",
    docs: [
      "Architecture decision records",
      "Module map and known pitfalls",
      "Business rules by domain",
      "Operations and deploy runbooks",
      "Tracked technical debt",
      "A report for every delivery",
    ],
  },
  cases: {
    eyebrow: "Cases",
    title: "Real work, in use.",
    items: [
      {
        slug: "nivela",
        client: "Nivela",
        kind: "Own product · SaaS",
        summary: "Multi-company ERP for service businesses, with direct e-invoicing, billing, public API and AI.",
        tags: ["Python", "PostgreSQL", "Multi-tenant", "AI", "Tax"],
        status: "In production",
      },
      {
        slug: "eletrica-moro",
        client: "Elétrica Moro",
        kind: "Custom system",
        summary: "A system to manage service delivery for an electrical installation company.",
        tags: ["Field services", "Custom"],
        status: "Full case coming soon",
      },
    ],
    open: "Open case",
  },
  team: {
    eyebrow: "Team",
    title: "Who builds it.",
    lead: "A small team, on purpose: the people you talk to are the people who design and write your system.",
    people: [
      {
        initials: "JV",
        name: "João Vargas",
        role: "Founder · Product & engineering",
        bio: "Spent years building a large ERP for factories, monitoring companies, importers and exporters. Leads product, architecture, development and the engineering pipeline.",
      },
      {
        initials: "TH",
        name: "Theilor Pies",
        role: "Co-founder · Product & development",
        bio: "Co-creator of Nivela. Turns business problems into product ideas and works on development end to end.",
      },
    ],
  },
  contact: {
    eyebrow: "Contact",
    title: "Tell us the problem. We'll reply with a path.",
    lead:
      "No long forms. Pick the kind of project, describe it in a few lines, and the message arrives ready on our WhatsApp.",
    typeLabel: "Project type",
    types: ["Custom system", "AI in processes", "Integration / WhatsApp", "Website or commercial video", "Not sure yet"],
    nameLabel: "Your name and company",
    namePlaceholder: "Anna · Vale Construction",
    msgLabel: "What do you need to solve?",
    msgPlaceholder: "Today we track work orders in a spreadsheet and...",
    send: "Send via WhatsApp",
    copy: "Copy message",
    copied: "Message copied",
    greeting: "Hi, SulCore!",
    base: "Based in Novo Hamburgo, southern Brazil. Working across Brazil and abroad, in English and Portuguese.",
  },
  footer: {
    tagline: "Software development",
    rights: "All rights reserved.",
    language: "Português",
  },
  casePage: {
    back: "Back",
    challenge: "Challenge",
    solution: "Solution",
    stack: "Stack",
    result: "Outcome",
    soon: "Being written up. This case will be published soon.",
    cta: "Want something like this for your company?",
  },
};

const dictionaries: Record<Locale, Dict> = { pt, en };

export function getDict(locale: Locale): Dict {
  return dictionaries[locale];
}
