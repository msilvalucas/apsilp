import { Fragment } from "react";
import { Calendar, Users, Wallet, LayoutDashboard } from "lucide-react";

export function MockAgenda() {
  const hours = ["08:00", "09:00", "10:00", "11:00", "14:00", "15:00"];
  const days = ["Seg", "Ter", "Qua", "Qui", "Sex"];
  const cells: Array<{ d: number; h: number; status: "pago" | "pendente" | "falta" | null; name?: string }> = [
    { d: 0, h: 0, status: "pago", name: "Ana" },
    { d: 0, h: 2, status: "pendente", name: "Rafael" },
    { d: 1, h: 1, status: "pago", name: "Júlia" },
    { d: 2, h: 3, status: "falta", name: "Carlos" },
    { d: 2, h: 4, status: "pago", name: "Marina" },
    { d: 3, h: 0, status: "pago", name: "Pedro" },
    { d: 4, h: 5, status: "pendente", name: "Sofia" },
  ];
  const tone = {
    pago: "bg-success-soft text-success border-success/30",
    pendente: "bg-warning-soft text-warning-foreground border-warning/40",
    falta: "bg-destructive-soft text-destructive border-destructive/30",
  };
  return (
    <MockFrame icon={<Calendar className="size-4" />} title="Agenda da semana">
      <div className="grid grid-cols-[60px_repeat(5,1fr)] gap-1 text-[10px]">
        <div />
        {days.map((d) => (
          <div key={d} className="text-center font-semibold text-muted-foreground py-1">{d}</div>
        ))}
        {hours.map((h, hi) => (
          <Fragment key={h}>
            <div className="text-right pr-1 text-muted-foreground font-mono">{h}</div>
            {days.map((_, di) => {
              const cell = cells.find((c) => c.d === di && c.h === hi);
              return (
                <div key={`${di}-${hi}`} className="h-7 rounded border border-dashed border-border/60 p-0.5">
                  {cell && (
                    <div className={`h-full rounded text-[9px] font-medium px-1 flex items-center border ${tone[cell.status!]}`}>
                      {cell.name}
                    </div>
                  )}
                </div>
              );
            })}
          </Fragment>
        ))}
      </div>
    </MockFrame>
  );
}

export function MockPacientes() {
  const list = [
    { name: "Ana Lourenço", sessions: 18, status: "Em dia", tone: "success" as const },
    { name: "Rafael Mendes", sessions: 7, status: "Pendente R$ 320", tone: "warning" as const },
    { name: "Júlia Tavares", sessions: 24, status: "Em dia", tone: "success" as const },
    { name: "Carlos Souza", sessions: 3, status: "1 falta", tone: "destructive" as const },
    { name: "Marina Reis", sessions: 12, status: "Em dia", tone: "success" as const },
  ];
  const cls = {
    success: "bg-success-soft text-success",
    warning: "bg-warning-soft text-warning-foreground",
    destructive: "bg-destructive-soft text-destructive",
  };
  return (
    <MockFrame icon={<Users className="size-4" />} title="Pacientes ativos">
      <ul className="divide-y divide-border text-sm">
        {list.map((p) => (
          <li key={p.name} className="flex items-center justify-between py-2">
            <div className="flex items-center gap-2.5">
              <div className="size-7 rounded-full bg-primary-soft text-primary text-xs font-semibold flex items-center justify-center">
                {p.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
              </div>
              <div>
                <p className="font-medium leading-tight">{p.name}</p>
                <p className="text-[11px] text-muted-foreground">{p.sessions} sessões</p>
              </div>
            </div>
            <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${cls[p.tone]}`}>{p.status}</span>
          </li>
        ))}
      </ul>
    </MockFrame>
  );
}

export function MockFinanceiro() {
  return (
    <MockFrame icon={<Wallet className="size-4" />} title="Financeiro do mês">
      <div className="grid grid-cols-2 gap-2 mb-3">
        <Box label="Recebido" value="R$ 6.320" tone="success" />
        <Box label="A receber" value="R$ 1.240" tone="warning" />
        <Box label="Despesas" value="R$ 980" tone="destructive" />
        <Box label="Saldo previsto" value="R$ 6.580" tone="primary" />
      </div>
      <div className="rounded-lg border border-border p-3">
        <p className="text-[11px] text-muted-foreground mb-2">Evolução das últimas semanas</p>
        <div className="flex items-end gap-1.5 h-16">
          {[40, 55, 35, 70, 60, 80, 65, 90].map((h, i) => (
            <div key={i} className="flex-1 rounded-t bg-primary/80" style={{ height: `${h}%` }} />
          ))}
        </div>
      </div>
    </MockFrame>
  );
}

export function MockDashboardSmall() {
  return (
    <MockFrame icon={<LayoutDashboard className="size-4" />} title="Visão geral">
      <div className="grid grid-cols-2 gap-2 mb-3">
        <Box label="Sessões hoje" value="7" tone="primary" />
        <Box label="Pendente" value="R$ 1.240" tone="warning" />
        <Box label="Pacientes" value="32" tone="muted" />
        <Box label="Receita prev." value="R$ 8.760" tone="success" />
      </div>
      <ul className="text-xs space-y-1.5">
        <li className="flex justify-between"><span>14:00 · Ana L.</span><span className="text-success font-medium">Pago</span></li>
        <li className="flex justify-between"><span>15:00 · Rafael M.</span><span className="text-warning-foreground font-medium">Pendente</span></li>
        <li className="flex justify-between"><span>17:00 · Carlos S.</span><span className="text-destructive font-medium">Falta</span></li>
      </ul>
    </MockFrame>
  );
}

function MockFrame({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-card shadow-lg shadow-primary/5 overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border bg-secondary/50">
        <span className="text-primary">{icon}</span>
        <p className="text-sm font-semibold">{title}</p>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

function Box({ label, value, tone }: { label: string; value: string; tone: "primary" | "success" | "warning" | "destructive" | "muted" }) {
  const cls = {
    primary: "bg-primary-soft text-primary",
    success: "bg-success-soft text-success",
    warning: "bg-warning-soft text-warning-foreground",
    destructive: "bg-destructive-soft text-destructive",
    muted: "bg-secondary text-foreground",
  }[tone];
  return (
    <div className={`rounded-lg p-2.5 ${cls}`}>
      <p className="text-[10px] opacity-80">{label}</p>
      <p className="text-sm font-bold">{value}</p>
    </div>
  );
}
