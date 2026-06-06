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
  Mic,
  Globe,
  QrCode,
  BellRing,
  ClipboardList,
  Link2,
  DoorOpen,
  Repeat,
} from "lucide-react";
import { MockDashboard } from "@/components/landing/MockDashboard";
import {
  MockAgenda,
  MockPacientes,
  MockFinanceiro,
  MockDashboardSmall,
} from "@/components/landing/MockScreens";
import { MockWhatsApp } from "@/components/landing/MockWhatsApp";
import { MockAudioEvolution, AudioSteps } from "@/components/landing/MockAudioEvolution";
import { MockBooking } from "@/components/landing/MockBooking";
import { LeadForm } from "@/components/landing/LeadForm";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "APSI | Sistema para psicólogos com agenda, financeiro e WhatsApp" },
      {
        name: "description",
        content:
          "Controle agenda, pacientes, pagamentos e evoluções em um só lugar. APSI é um sistema para psicólogos com apoio do WhatsApp, Pix e evolução por áudio com revisão.",
      },
      { property: "og:title", content: "APSI | Sistema para psicólogos com agenda, financeiro e WhatsApp" },
      { property: "og:description", content: "Controle agenda, pacientes, pagamentos e evoluções em um só lugar — com apoio do WhatsApp, Pix e evolução por áudio com revisão." },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://apsilpbeta.lovable.app/" }],
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
      <WhatsAppSection />
      <MidCta
        title="Quer ver o APSI funcionando na sua rotina?"
        text="Teste uma forma mais simples de organizar agenda, pacientes, pagamentos e mensagens pelo WhatsApp."
        cta="Quero testar o APSI"
      />
      <AudioSection />
      <MidCta
        title="Registre evoluções com mais agilidade."
        text="Transforme áudio em rascunho revisável e mantenha o histórico do paciente organizado."
        cta="Entrar no beta"
        variant="soft"
      />
      <BookingSection />
      <Compare />
      <Screens />
      <ForWhom />
      <Pricing />
      <ClinicSection />
      <Roadmap />
      <Faq />
      <FinalCta />
      <Footer />
    </div>
  );
}

/* ---------- Mid CTA ---------- */
function MidCta({ title, text, cta, variant = "card" }: { title: string; text: string; cta: string; variant?: "card" | "soft" }) {
  return (
    <section className="py-10 sm:py-14">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div
          className={`rounded-2xl border p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 ${
            variant === "soft"
              ? "bg-primary-soft/60 border-primary/15"
              : "bg-card border-border"
          }`}
        >
          <div className="flex-1">
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight">{title}</h3>
            <p className="mt-1.5 text-sm text-muted-foreground">{text}</p>
          </div>
          <Button asChild size="lg" className="shrink-0">
            <a href="#lead">{cta}</a>
          </Button>
        </div>
      </div>
    </section>
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
          <a href="#whatsapp" className="hover:text-foreground">WhatsApp</a>
          <a href="#evolucao" className="hover:text-foreground">Evolução</a>
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
        className="absolute inset-x-0 top-0 -z-10 h-[520px] bg-gradient-to-b from-primary-soft/60 to-transparent"
        aria-hidden
      />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-16 pb-20 lg:pt-24 lg:pb-28 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
            <MapPin className="size-3.5 text-primary" />
            Beta para psicólogos de Passo Fundo e região
          </div>
          <h1 className="mt-5 text-4xl sm:text-5xl lg:text-[3.4rem] font-extrabold tracking-tight leading-[1.05]">
            Controle agenda, pacientes e recebimentos{" "}
            <span className="text-primary">com apoio do WhatsApp</span>.
          </h1>
          <p className="mt-5 text-lg text-muted-foreground max-w-xl">
            Organize sessões, faltas, pagamentos e evoluções em um só lugar.
          </p>
          <p className="mt-2 text-lg text-muted-foreground max-w-xl">
            Com lembretes pelo WhatsApp, Pix e registro de evolução por áudio com revisão.
          </p>
          <p className="mt-4 text-sm text-muted-foreground max-w-xl">
            Feito para quem já atende toda semana e quer mais controle sem depender de
            caderno, planilhas e conversas perdidas no WhatsApp.
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
            <li className="flex items-center gap-1.5"><CheckCircle2 className="size-3.5 text-success" /> Agenda + financeiro + WhatsApp</li>
            <li className="flex items-center gap-1.5"><CheckCircle2 className="size-3.5 text-success" /> Evoluções por áudio com revisão</li>
            <li className="flex items-center gap-1.5"><CheckCircle2 className="size-3.5 text-success" /> Beta para Passo Fundo e região</li>
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
    { icon: Calendar, text: "Agenda em uma ferramenta" },
    { icon: MessageSquare, text: "Pacientes no WhatsApp" },
    { icon: FileText, text: "Pagamentos em planilha" },
    { icon: XCircle, text: "Faltas e remarcações sem controle" },
    { icon: ClipboardList, text: "Evoluções acumuladas depois das sessões" },
    { icon: Clock, text: "Pendências financeiras esquecidas" },
  ];
  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
          Sua rotina está mais espalhada do que deveria?
        </h2>
        <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
          Quando a agenda cresce, controlar tudo de cabeça começa a ficar perigoso.
          Sessões ficam em um lugar, pacientes no WhatsApp, pagamentos na planilha,
          faltas na memória e evoluções para registrar depois.
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
          O APSI conecta esses pontos para você ter clareza do que acontece no consultório.
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
      title: "Agenda inteligente",
      text: "Veja sua agenda diária e semanal, crie sessões recorrentes, evite conflitos e acompanhe o status de cada atendimento.",
      items: ["Sessões recorrentes", "Verificação de conflito", "Remarcações e cancelamentos", "Status da sessão", "Agenda pública por link"],
    },
    {
      icon: Users,
      title: "Pacientes e histórico",
      text: "Centralize dados, sessões, anamnese, contatos, evoluções e histórico financeiro em um só lugar.",
      items: ["Cadastro de pacientes", "Anamnese", "Evoluções clínicas", "Histórico de sessões", "Consentimento LGPD"],
    },
    {
      icon: Wallet,
      title: "Financeiro com Pix",
      text: "Controle receitas, despesas, pendências e pagamentos sem transformar sua rotina em um ERP.",
      items: ["Receitas e despesas", "Métricas mensais", "Pendências por paciente", "Lembretes financeiros", "QR Code Pix estático"],
    },
    {
      icon: MessageSquare,
      title: "WhatsApp e automações",
      text: "Use o WhatsApp para reduzir tarefas manuais, enviar lembretes e consultar informações da rotina.",
      items: ["Lembretes automáticos de sessão", "Menu interativo para o psicólogo", "Menu interativo para pacientes", "Confirmação e cancelamento", "Resumo da agenda"],
    },
  ];
  return (
    <section id="solucao" className="py-20 sm:py-24 bg-secondary/40 border-y border-border">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-3xl">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Uma central simples para sua rotina clínica e financeira.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Cada sessão pode ter paciente, status, valor, pagamento, lembrete e evolução vinculados.
            Assim você sabe o que aconteceu, o que está pendente e o que precisa de atenção.
          </p>
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-5">
          {cards.map(({ icon: Icon, title, text, items }) => (
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- WhatsApp ---------- */
function WhatsAppSection() {
  const commands = [
    { icon: Calendar, text: "Minha agenda de hoje" },
    { icon: Wallet, text: "Resumo financeiro" },
    { icon: CheckCircle2, text: "Confirmar sessão" },
    { icon: HandCoins, text: "Registrar pagamento" },
    { icon: XCircle, text: "Cancelar sessão" },
    { icon: ClipboardList, text: "Adicionar evolução" },
  ];
  return (
    <section id="whatsapp" className="py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
            <MessageSquare className="size-3.5" /> WhatsApp como apoio
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight">
            O WhatsApp deixa de ser bagunça e vira apoio operacional.
          </h2>
          <p className="mt-4 text-muted-foreground">
            O APSI se conecta ao WhatsApp para ajudar em lembretes, confirmações,
            mensagens aos pacientes e consultas rápidas da rotina.
          </p>

          <ul className="mt-6 grid sm:grid-cols-2 gap-2.5">
            {commands.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-2.5 rounded-lg border border-border bg-card px-3 py-2.5 text-sm">
                <Icon className="size-4 text-primary shrink-0" />
                <span className="font-medium">{text}</span>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex items-start gap-2 rounded-lg bg-primary-soft/60 border border-primary/15 p-3 text-xs text-foreground/80">
            <BellRing className="size-4 text-primary shrink-0 mt-0.5" />
            <p>
              O APSI usa WhatsApp como apoio. O controle principal continua organizado no sistema —
              sem promessa de robô perfeito ou atendimento totalmente automatizado.
            </p>
          </div>
        </div>

        <div className="lg:pl-6">
          <MockWhatsApp />
        </div>
      </div>
    </section>
  );
}

/* ---------- Audio Evolution ---------- */
function AudioSection() {
  return (
    <section id="evolucao" className="py-20 sm:py-24 bg-secondary/40 border-y border-border">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <MockAudioEvolution />
          </div>
          <div className="order-1 lg:order-2">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
              <Mic className="size-3.5" /> Evolução por áudio
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight">
              Terminou a sessão? Registre a evolução por áudio.
            </h2>
            <p className="mt-4 text-muted-foreground">
              Envie ou grave um áudio e o APSI gera um rascunho de texto. Você revisa,
              ajusta e salva no histórico do paciente.
            </p>
            <div className="mt-5 flex items-start gap-2 rounded-lg bg-warning-soft/60 border border-warning/30 p-3 text-xs text-warning-foreground">
              <ShieldCheck className="size-4 shrink-0 mt-0.5" />
              <p>
                A transcrição é um apoio operacional. O profissional sempre revisa antes de salvar —
                não substitui julgamento clínico.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-14">
          <AudioSteps />
        </div>
      </div>
    </section>
  );
}

/* ---------- Booking ---------- */
function BookingSection() {
  const cards = [
    { icon: Link2, text: "Página pública por slug" },
    { icon: Clock, text: "Horários disponíveis" },
    { icon: CalendarCheck, text: "Criação de sessão" },
    { icon: Receipt, text: "Criação de transação" },
    { icon: MessageSquare, text: "Envio de WhatsApp ao paciente" },
  ];
  return (
    <section id="booking" className="py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
            <Globe className="size-3.5" /> Agenda pública
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight">
            Link público para facilitar agendamentos.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Compartilhe sua agenda pública para pacientes solicitarem horários. Quando o agendamento
            é criado, o APSI registra a sessão e pode gerar uma transação financeira vinculada.
          </p>
          <ul className="mt-6 space-y-2.5">
            {cards.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-3 text-sm">
                <div className="size-8 rounded-lg bg-primary-soft text-primary flex items-center justify-center shrink-0">
                  <Icon className="size-4" />
                </div>
                <span className="font-medium">{text}</span>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-xs text-muted-foreground">
            Disponível em fase beta, com regras de disponibilidade e conflitos.
          </p>
        </div>
        <div className="lg:pl-6">
          <MockBooking />
        </div>
      </div>
    </section>
  );
}

/* ---------- Compare ---------- */
function Compare() {
  const without = [
    "Agenda no Google",
    "Pagamentos em planilha",
    "Pacientes no WhatsApp",
    "Evoluções acumuladas",
    "Pendências esquecidas",
    "Cobranças desconfortáveis",
    "Pouca visão do mês",
  ];
  const withApsi = [
    "Agenda com status e recorrência",
    "Financeiro conectado às sessões",
    "Histórico completo do paciente",
    "Evoluções por áudio com revisão",
    "Lembretes automáticos",
    "Pix e pendências organizadas",
    "Dashboard de controle",
  ];
  return (
    <section className="py-20 sm:py-24 bg-secondary/40 border-y border-border">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="max-w-2xl mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Sem o APSI vs. com o APSI
          </h2>
          <p className="mt-3 text-muted-foreground">
            A mesma rotina, organizada de outro jeito.
          </p>
        </div>
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
    { mock: <MockDashboardSmall />, title: "Dashboard", text: "Veja sessões, pendências, receita prevista e alertas importantes." },
    { mock: <MockAgenda />, title: "Agenda", text: "Controle sessões, conflitos, recorrências, faltas e remarcações." },
    { mock: <MockPacientes />, title: "Pacientes", text: "Veja histórico, contatos, anamnese, evoluções e financeiro do paciente." },
    { mock: <MockFinanceiro />, title: "Financeiro", text: "Acompanhe receitas, despesas, Pix, pendências e lembretes." },
    { mock: <MockWhatsApp />, title: "WhatsApp", text: "Envie lembretes e consulte informações sem depender de conversas perdidas." },
    { mock: <MockAudioEvolution />, title: "Evoluções", text: "Transforme áudio em rascunho revisável e salve no histórico." },
  ];
  return (
    <section id="telas" className="py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Veja o APSI funcionando na prática.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Mockups das principais telas — pensadas para a rotina real de quem atende toda semana.
          </p>
        </div>
        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
    "Sua agenda já exige controle",
    "Você usa WhatsApp para falar com pacientes",
    "Você controla pagamentos em planilha, caderno ou memória",
    "Você quer reduzir tarefas manuais",
    "Você precisa saber quem pagou e quem está pendente",
    "Você quer registrar evoluções com mais agilidade",
    "Você quer uma ferramenta simples, mas com automações úteis",
  ];
  const no = [
    "Você ainda não atende pacientes",
    "Você procura apenas uma agenda gratuita",
    "Você quer um ERP hospitalar completo",
    "Você não pretende registrar sessões ou pagamentos",
    "Você precisa agora de Open Finance ou emissão fiscal completa",
    "Você não quer usar WhatsApp na rotina",
  ];
  return (
    <section className="py-20 sm:py-24 bg-secondary/40 border-y border-border">
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
          <p className="text-xs text-muted-foreground mb-5">Tudo bem se for o caso — queremos ser honestos.</p>
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
    "Sessões recorrentes",
    "Verificação de conflitos",
    "Pacientes e histórico",
    "Anamnese",
    "Evoluções clínicas",
    "Transcrição de áudio com revisão",
    "Receitas e despesas",
    "Pendências por paciente",
    "QR Code Pix estático",
    "Lembretes automáticos por WhatsApp",
    "Agenda pública em beta",
    "Suporte próximo durante a fase beta",
  ];
  return (
    <section id="preco" className="py-20 sm:py-24">
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
            Para psicólogos autônomos com agenda ativa que querem controlar agenda, pacientes,
            recebimentos e evoluções com apoio do WhatsApp.
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
            <Tag>Beta regional</Tag>
            <Tag>Suporte próximo</Tag>
            <Tag>Sem cartão no teste</Tag>
          </div>

          <Button asChild size="lg" className="mt-7 w-full text-base">
            <a href="#lead">Quero testar o APSI</a>
          </Button>

          <p className="mt-5 text-[11px] text-muted-foreground text-center">
            Uso sujeito a limites justos de mensagens e transcrições durante a fase beta.
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

/* ---------- Clinic ---------- */
function ClinicSection() {
  const items = [
    { icon: Users, title: "Membros da clínica" },
    { icon: DoorOpen, title: "Salas" },
    { icon: HandCoins, title: "Repasses" },
    { icon: Sparkles, title: "Dashboard da clínica" },
    { icon: Repeat, title: "Agenda por profissional" },
    { icon: ShieldCheck, title: "Isolamento de dados clínicos" },
  ];
  return (
    <section className="py-20 sm:py-24 bg-secondary/40 border-y border-border">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <Building2 className="size-3.5" /> Clínicas · beta
          </span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight">Tem uma clínica pequena?</h2>
          <p className="mt-3 text-muted-foreground">
            O APSI também está sendo preparado para clínicas com múltiplos profissionais, secretária,
            salas, repasses e visão de agenda por equipe.
          </p>
        </div>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {items.map(({ icon: Icon, title }) => (
            <div key={title} className="flex items-center gap-3 rounded-xl border border-border bg-card p-4">
              <div className="size-9 rounded-lg bg-primary-soft text-primary flex items-center justify-center shrink-0">
                <Icon className="size-4" />
              </div>
              <p className="text-sm font-medium">{title}</p>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <Button asChild variant="outline">
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">Entrar na lista de clínicas beta</a>
          </Button>
        </div>
      </div>
    </section>
  );
}

/* ---------- Roadmap ---------- */
function Roadmap() {
  const chips = [
    "Documentos e recibos",
    "Clínicas",
    "Marketplace regional",
    "Conciliação financeira",
    "Open Finance no futuro",
  ];
  return (
    <section className="py-12 sm:py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 text-center">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Em evolução</span>
        <h2 className="mt-2 text-2xl font-bold tracking-tight">O que vem depois do beta</h2>
        <p className="mt-3 text-sm text-muted-foreground max-w-2xl mx-auto">
          Depois do beta, o APSI deve evoluir com documentos, recibos, clínicas, marketplace regional
          e conciliação financeira — sempre com base no uso real dos primeiros profissionais.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {chips.map((c) => (
            <span key={c} className="text-xs font-medium px-3 py-1.5 rounded-full border border-dashed border-border bg-card/60 text-muted-foreground">
              {c}
            </span>
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
      a: "Sim, o APSI possui automações e lembretes via WhatsApp. Durante a fase beta, essas automações serão configuradas com cuidado para manter controle e evitar envios indevidos.",
    },
    {
      q: "A evolução por áudio substitui meu julgamento clínico?",
      a: "Não. A transcrição gera um rascunho para revisão. O profissional sempre deve revisar e editar antes de salvar como evolução.",
    },
    {
      q: "O APSI emite nota fiscal ou Receita Saúde?",
      a: "Ainda não. Recursos de documentos, recibos e emissão fiscal fazem parte do roadmap futuro.",
    },
    {
      q: "O APSI é para clínicas?",
      a: "A primeira experiência comercial é focada em psicólogos autônomos. Clínicas pequenas entram em fase beta com recursos como membros, salas, repasses e agenda por profissional.",
    },
    {
      q: "O APSI tem Pix?",
      a: "Sim. O APSI pode gerar QR Code Pix estático e apoiar o controle de pagamentos e pendências.",
    },
    {
      q: "O paciente consegue agendar por um link?",
      a: "Sim, o APSI possui agenda pública por link em fase beta, respeitando disponibilidade e conflitos.",
    },
    {
      q: "Meus dados ficam seguros?",
      a: "O APSI foi construído com separação de dados por profissional, políticas de acesso e filtros para dados sensíveis. Recursos adicionais de segurança e criptografia seguem no roadmap técnico.",
    },
    {
      q: "Preciso cadastrar cartão para testar?",
      a: "Não obrigatoriamente durante a fase beta. O objetivo é validar o uso com profissionais selecionados.",
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
      <div className="mx-auto max-w-6xl px-4 sm:px-6 grid lg:grid-cols-5 gap-10 items-start">
        <div className="lg:col-span-2">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Quer transformar sua rotina em um consultório mais organizado?
          </h2>
          <p className="mt-4 text-muted-foreground">
            Entre na fase beta do APSI e teste uma forma mais simples de controlar agenda,
            pacientes, recebimentos, WhatsApp e evoluções.
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
            Beta inicial para psicólogos de Passo Fundo e região.
          </p>
        </div>
        <div id="lead-form" className="lg:col-span-3">
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
