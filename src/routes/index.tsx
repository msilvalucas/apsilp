import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Calendar,
  Users,
  Wallet,
  MessageSquare,
  CheckCircle2,
  XCircle,
  Clock,
  FileText,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  MapPin,
  Building2,
  CalendarCheck,
  Receipt,
  HandCoins,
  Store,
} from "lucide-react";
import { MockDashboard } from "@/components/landing/MockDashboard";
import {
  MockAgenda,
  MockPacientes,
  MockFinanceiro,
  MockDashboardSmall,
} from "@/components/landing/MockScreens";
import { LeadForm } from "@/components/landing/LeadForm";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "APSI — Controle agenda, pacientes e recebimentos sem planilha" },
      {
        name: "description",
        content:
          "O APSI ajuda psicólogos com agenda ativa a organizar sessões, faltas, remarcações, pagamentos e pendências em um só lugar. Beta em Passo Fundo e região.",
      },
    ],
  }),
  component: Landing,
});

const WHATSAPP_URL = "https://wa.me/5554999999999?text=Quero%20saber%20mais%20sobre%20o%20APSI";

function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Toaster />
      <Nav />
      <Hero />
      <Pain />
      <Solution />
      <Compare />
      <Screens />
      <ForWhom />
      <Pricing />
      <Roadmap />
      <Faq />
      <FinalCta />
      <Footer />
    </div>
  );
}

/* ---------- Nav ---------- */
function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 h-14 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2 font-bold text-lg tracking-tight">
          <span className="inline-flex size-7 rounded-lg bg-primary text-primary-foreground items-center justify-center text-sm">A</span>
          APSI
        </a>
        <nav className="hidden md:flex items-center gap-7 text-sm text-muted-foreground">
          <a href="#solucao" className="hover:text-foreground">Solução</a>
          <a href="#telas" className="hover:text-foreground">Telas</a>
          <a href="#preco" className="hover:text-foreground">Preço</a>
          <a href="#faq" className="hover:text-foreground">FAQ</a>
        </nav>
        <Button asChild size="sm">
          <a href="#lead">Quero testar</a>
        </Button>
      </div>
    </header>
  );
}

/* ---------- Hero ---------- */
function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div
        className="absolute inset-x-0 top-0 -z-10 h-[480px] bg-gradient-to-b from-primary-soft/60 to-transparent"
        aria-hidden
      />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-16 pb-20 lg:pt-24 lg:pb-28 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
            <MapPin className="size-3.5 text-primary" />
            Beta para psicólogos de Passo Fundo e região
          </div>
          <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.05]">
            Controle agenda, pacientes e recebimentos{" "}
            <span className="text-primary">sem planilha</span>.
          </h1>
          <p className="mt-5 text-lg text-muted-foreground max-w-xl">
            O APSI ajuda psicólogos com agenda ativa a organizar sessões, faltas,
            remarcações, pagamentos e pendências em um só lugar.
          </p>
          <p className="mt-3 text-sm text-muted-foreground max-w-xl">
            Feito para quem já atende pacientes toda semana e quer mais controle
            sem depender de caderno, planilhas e WhatsApp desorganizado.
          </p>

          <div className="mt-7 flex flex-col sm:flex-row gap-3">
            <Button asChild size="lg" className="text-base">
              <a href="#lead">Quero testar o APSI <ArrowRight className="ml-1" /></a>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-base">
              <a href="#telas">Ver demonstração</a>
            </Button>
          </div>

          <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted-foreground">
            <li className="flex items-center gap-1.5"><CheckCircle2 className="size-3.5 text-success" /> Beta para Passo Fundo e região</li>
            <li className="flex items-center gap-1.5"><CheckCircle2 className="size-3.5 text-success" /> Configuração em poucos minutos</li>
            <li className="flex items-center gap-1.5"><CheckCircle2 className="size-3.5 text-success" /> Sem cartão de crédito no teste</li>
          </ul>
        </div>

        <div className="lg:pl-6">
          <MockDashboard />
        </div>
      </div>
    </section>
  );
}

/* ---------- Pain ---------- */
function Pain() {
  const items = [
    { icon: Calendar, text: "Agenda no Google ou caderno" },
    { icon: MessageSquare, text: "Pacientes no WhatsApp" },
    { icon: FileText, text: "Pagamentos em planilha" },
    { icon: XCircle, text: "Faltas e remarcações sem controle" },
    { icon: Clock, text: "Pendências esquecidas" },
    { icon: Wallet, text: "Receita do mês pouco clara" },
  ];
  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
          Sua rotina está mais espalhada do que deveria?
        </h2>
        <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
          Quando a agenda cresce, controlar tudo de cabeça começa a ficar perigoso.
          Sessões ficam em um lugar, pacientes no WhatsApp, pagamentos na planilha
          e faltas na memória.
        </p>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-3 text-left">
          {items.map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-start gap-3 rounded-xl border border-border bg-card p-4">
              <div className="size-9 rounded-lg bg-destructive-soft text-destructive flex items-center justify-center shrink-0">
                <Icon className="size-4" />
              </div>
              <p className="text-sm font-medium pt-1.5">{text}</p>
            </div>
          ))}
        </div>

        <p className="mt-10 text-base text-foreground/80 max-w-2xl mx-auto">
          O APSI organiza o essencial da rotina clínica e financeira em uma experiência simples.
        </p>
      </div>
    </section>
  );
}

/* ---------- Solution ---------- */
function Solution() {
  const cards = [
    {
      icon: Calendar,
      title: "Agenda",
      text: "Veja sua semana, crie sessões recorrentes, remarque, cancele e acompanhe o status de cada atendimento.",
      items: ["Visão diária e semanal", "Sessões recorrentes", "Faltas e remarcações", "Status da sessão"],
    },
    {
      icon: Users,
      title: "Pacientes",
      text: "Centralize os dados principais, histórico de sessões, anotações simples e pendências de cada paciente.",
      items: ["Dados principais", "Histórico de sessões", "Anotações clínicas simples", "Financeiro por paciente"],
    },
    {
      icon: Wallet,
      title: "Financeiro",
      text: "Controle receitas, despesas, pagamentos recebidos e valores pendentes sem virar um ERP.",
      items: ["Recebido no mês", "A receber", "Despesas", "Pendências por paciente"],
    },
    {
      icon: MessageSquare,
      title: "WhatsApp manual",
      text: "Gere mensagens prontas para lembrete, cobrança ou reagendamento, revise e envie pelo WhatsApp.",
      items: ["Lembrete de sessão", "Cobrança delicada", "Recuperação de falta", "Envio manual"],
      note: "O APSI não envia mensagens automáticas no beta.",
    },
  ];
  return (
    <section id="solucao" className="py-20 sm:py-24 bg-secondary/40 border-y border-border">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-3xl">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            O APSI conecta agenda, pacientes e financeiro.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Cada sessão pode ter status, valor e situação de pagamento. Assim você sabe
            o que aconteceu, quem pagou e quanto ainda tem para receber.
          </p>
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-5">
          {cards.map(({ icon: Icon, title, text, items, note }) => (
            <div key={title} className="rounded-2xl border border-border bg-card p-6 sm:p-7">
              <div className="flex items-center gap-3 mb-3">
                <div className="size-10 rounded-xl bg-primary-soft text-primary flex items-center justify-center">
                  <Icon className="size-5" />
                </div>
                <h3 className="text-xl font-semibold">{title}</h3>
              </div>
              <p className="text-sm text-muted-foreground">{text}</p>
              <ul className="mt-4 grid sm:grid-cols-2 gap-y-2 gap-x-4 text-sm">
                {items.map((it) => (
                  <li key={it} className="flex items-center gap-2">
                    <CheckCircle2 className="size-4 text-primary shrink-0" />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
              {note && (
                <p className="mt-4 text-xs text-warning-foreground bg-warning-soft border border-warning/30 rounded-lg p-2.5">
                  {note}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Compare ---------- */
function Compare() {
  const without = [
    "Pagamentos espalhados",
    "Sessões pendentes esquecidas",
    "Faltas sem impacto claro",
    "Pacientes em vários lugares",
    "Planilhas manuais",
    "Pouca visão do mês",
  ];
  const withApsi = [
    "Agenda organizada",
    "Pendências visíveis",
    "Status de cada sessão",
    "Histórico por paciente",
    "Receitas e despesas no mesmo lugar",
    "Previsão financeira do mês",
  ];
  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="grid md:grid-cols-2 gap-5">
          <div className="rounded-2xl border border-border bg-card p-7">
            <div className="flex items-center gap-2 mb-5">
              <div className="size-9 rounded-lg bg-destructive-soft text-destructive flex items-center justify-center">
                <XCircle className="size-5" />
              </div>
              <h3 className="text-lg font-semibold">Sem o APSI</h3>
            </div>
            <ul className="space-y-3">
              {without.map((t) => (
                <li key={t} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                  <XCircle className="size-4 text-destructive mt-0.5 shrink-0" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border-2 border-primary/30 bg-card p-7 shadow-lg shadow-primary/5">
            <div className="flex items-center gap-2 mb-5">
              <div className="size-9 rounded-lg bg-primary-soft text-primary flex items-center justify-center">
                <CheckCircle2 className="size-5" />
              </div>
              <h3 className="text-lg font-semibold">Com o APSI</h3>
            </div>
            <ul className="space-y-3">
              {withApsi.map((t) => (
                <li key={t} className="flex items-start gap-2.5 text-sm">
                  <CheckCircle2 className="size-4 text-success mt-0.5 shrink-0" />
                  <span className="font-medium">{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Screens ---------- */
function Screens() {
  const items = [
    { mock: <MockDashboardSmall />, title: "Dashboard", text: "Saiba o que acontece hoje e quanto tem para receber." },
    { mock: <MockAgenda />, title: "Agenda", text: "Controle sessões, faltas, remarcações e recorrências." },
    { mock: <MockPacientes />, title: "Pacientes", text: "Veja histórico, anotações e pendências por paciente." },
    { mock: <MockFinanceiro />, title: "Financeiro", text: "Acompanhe recebido, pendente, despesas e saldo estimado." },
  ];
  return (
    <section id="telas" className="py-20 sm:py-24 bg-secondary/40 border-y border-border">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Veja o controle acontecendo na prática.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Quatro telas centrais do APSI, pensadas para a rotina real de quem atende toda semana.
          </p>
        </div>
        <div className="mt-12 grid md:grid-cols-2 gap-8">
          {items.map(({ mock, title, text }) => (
            <div key={title}>
              {mock}
              <div className="mt-4">
                <h3 className="font-semibold">{title}</h3>
                <p className="text-sm text-muted-foreground">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- For whom ---------- */
function ForWhom() {
  const yes = [
    "Você atende pacientes toda semana",
    "Sua agenda já começa a ficar cheia",
    "Você controla pagamentos em planilha, caderno ou memória",
    "Você já esqueceu de conferir alguma pendência",
    "Você quer saber quanto recebeu e quanto ainda tem a receber",
    "Você quer uma ferramenta simples, sem virar ERP",
  ];
  const no = [
    "Você ainda não atende pacientes",
    "Você procura apenas uma agenda gratuita",
    "Você quer um sistema hospitalar completo",
    "Você precisa agora de emissão fiscal, Open Finance ou automações avançadas",
    "Você não pretende registrar sessões ou pagamentos no sistema",
  ];
  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 grid md:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-border bg-card p-7">
          <h3 className="text-xl font-bold mb-1">APSI é para você se…</h3>
          <p className="text-xs text-muted-foreground mb-5">Sinais de que o produto se encaixa na sua rotina.</p>
          <ul className="space-y-3">
            {yes.map((t) => (
              <li key={t} className="flex items-start gap-2.5 text-sm">
                <CheckCircle2 className="size-4 text-success mt-0.5 shrink-0" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-border bg-card p-7">
          <h3 className="text-xl font-bold mb-1">Talvez o APSI ainda não seja para você se…</h3>
          <p className="text-xs text-muted-foreground mb-5">Tudo bem se for o caso, queremos ser honestos.</p>
          <ul className="space-y-3">
            {no.map((t) => (
              <li key={t} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                <span className="mt-1.5 size-1.5 rounded-full bg-muted-foreground/50 shrink-0" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ---------- Pricing ---------- */
function Pricing() {
  const features = [
    "Agenda diária e semanal",
    "Pacientes",
    "Histórico de sessões",
    "Controle de faltas e remarcações",
    "Receitas e despesas",
    "Pendências por paciente",
    "Mensagens prontas para WhatsApp",
    "Dashboard financeiro simples",
    "Suporte próximo durante a fase beta",
  ];
  return (
    <section id="preco" className="py-20 sm:py-24 bg-secondary/40 border-y border-border">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="rounded-3xl border-2 border-primary/30 bg-card p-8 sm:p-10 shadow-xl shadow-primary/10">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="size-4 text-primary" />
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">Plano Beta APSI</span>
          </div>
          <div className="flex items-end gap-2">
            <span className="text-5xl font-extrabold tracking-tight">R$ 79,90</span>
            <span className="text-muted-foreground mb-2">/mês</span>
          </div>
          <p className="mt-4 text-sm text-muted-foreground max-w-md">
            Para psicólogos autônomos com agenda ativa que querem controlar
            agenda, pacientes e recebimentos com simplicidade.
          </p>

          <ul className="mt-7 grid sm:grid-cols-2 gap-y-2.5 gap-x-4 text-sm">
            {features.map((f) => (
              <li key={f} className="flex items-start gap-2">
                <CheckCircle2 className="size-4 text-success mt-0.5 shrink-0" />
                <span>{f}</span>
              </li>
            ))}
          </ul>

          <div className="mt-7 flex flex-wrap gap-2">
            <Tag>14 dias grátis</Tag>
            <Tag>Sem cartão de crédito</Tag>
            <Tag>Vagas limitadas para beta regional</Tag>
          </div>

          <Button asChild size="lg" className="mt-7 w-full text-base">
            <a href="#lead">Quero testar o APSI</a>
          </Button>

          <p className="mt-5 text-xs text-muted-foreground text-center">
            Clínicas pequenas entrarão em uma fase futura do produto.{" "}
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="text-primary underline-offset-2 hover:underline">
              Quer participar da lista de espera? Fale conosco.
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-primary-soft text-primary">
      {children}
    </span>
  );
}

/* ---------- Roadmap ---------- */
function Roadmap() {
  const items = [
    { icon: Building2, title: "Clínicas e secretárias" },
    { icon: CalendarCheck, title: "Página pública de agendamento" },
    { icon: Receipt, title: "Recibos e relatórios" },
    { icon: Wallet, title: "Conciliação financeira" },
    { icon: Store, title: "Marketplace regional" },
    { icon: HandCoins, title: "Parceiros de crédito" },
  ];
  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Roadmap</span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight">O que vem depois</h2>
          <p className="mt-3 text-muted-foreground">
            Estamos começando pelo que mais gera controle no dia a dia: agenda,
            pacientes e recebimentos. Recursos avançados serão evoluídos com base
            no uso real dos primeiros profissionais.
          </p>
        </div>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {items.map(({ icon: Icon, title }) => (
            <div key={title} className="flex items-center gap-3 rounded-xl border border-dashed border-border bg-card/60 p-4">
              <div className="size-9 rounded-lg bg-secondary text-muted-foreground flex items-center justify-center shrink-0">
                <Icon className="size-4" />
              </div>
              <div>
                <p className="text-sm font-medium">{title}</p>
                <p className="text-[11px] text-muted-foreground">Em estudo · futuro</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */
function Faq() {
  const items = [
    {
      q: "O APSI envia mensagens automaticamente pelo WhatsApp?",
      a: "No beta, não. O APSI gera mensagens prontas para WhatsApp e você revisa antes de enviar.",
    },
    {
      q: "O APSI substitui um prontuário completo?",
      a: "No beta, o APSI oferece anotações clínicas simples e histórico de sessões. Recursos avançados de prontuário serão evoluídos com feedback dos usuários.",
    },
    {
      q: "O APSI emite nota fiscal ou Receita Saúde?",
      a: "Ainda não. O foco inicial é controle de agenda, pacientes e recebimentos. Recursos fiscais estão no roadmap futuro.",
    },
    {
      q: "O APSI é para clínicas?",
      a: "A primeira versão é focada em psicólogos autônomos. Clínicas pequenas estão no roadmap e poderão entrar em uma fase futura.",
    },
    {
      q: "Posso exportar meus dados?",
      a: "A exportação de dados faz parte do roadmap inicial para dar mais segurança e autonomia aos usuários.",
    },
    {
      q: "Preciso cadastrar cartão para testar?",
      a: "Não. A fase beta pode ser testada sem cartão de crédito.",
    },
  ];
  return (
    <section id="faq" className="py-20 sm:py-24 bg-secondary/40 border-y border-border">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h2 className="text-3xl font-bold tracking-tight text-center">Perguntas frequentes</h2>
        <Accordion type="single" collapsible className="mt-10">
          {items.map((it, i) => (
            <AccordionItem key={i} value={`i-${i}`} className="border-border">
              <AccordionTrigger className="text-left text-base font-semibold">{it.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{it.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

/* ---------- Final CTA + Lead ---------- */
function FinalCta() {
  return (
    <section id="lead" className="py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 grid lg:grid-cols-2 gap-10 items-start">
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Quer parar de controlar seu consultório no improviso?
          </h2>
          <p className="mt-4 text-muted-foreground">
            Entre na fase beta do APSI e teste uma forma mais simples de organizar
            agenda, pacientes e recebimentos.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Button asChild size="lg">
              <a href="#lead-form">Quero testar o APSI</a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">Falar pelo WhatsApp</a>
            </Button>
          </div>
          <p className="mt-5 text-xs text-muted-foreground flex items-center gap-1.5">
            <ShieldCheck className="size-3.5 text-primary" />
            Beta para psicólogos de Passo Fundo e região.
          </p>
        </div>
        <div id="lead-form">
          <LeadForm />
        </div>
      </div>
    </section>
  );
}

/* ---------- Footer ---------- */
function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-2 font-semibold text-foreground">
          <span className="inline-flex size-6 rounded-md bg-primary text-primary-foreground items-center justify-center text-xs">A</span>
          APSI
        </div>
        <p>© {new Date().getFullYear()} APSI · Feito para psicólogos com agenda ativa.</p>
      </div>
    </footer>
  );
}
