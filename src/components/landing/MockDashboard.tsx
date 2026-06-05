import { Calendar, Clock, TrendingUp, Users, CircleDollarSign, CircleAlert } from "lucide-react";

export function MockDashboard() {
  return (
    <div className="relative">
      <div className="absolute -inset-4 bg-gradient-to-br from-primary/10 to-transparent rounded-3xl blur-2xl" aria-hidden />
      <div className="relative rounded-2xl border border-border bg-card shadow-2xl shadow-primary/5 overflow-hidden">
        {/* Top bar */}
        <div className="flex items-center gap-1.5 px-4 py-3 border-b border-border bg-secondary/50">
          <div className="size-2.5 rounded-full bg-destructive/60" />
          <div className="size-2.5 rounded-full bg-warning/70" />
          <div className="size-2.5 rounded-full bg-success/60" />
          <div className="ml-3 text-xs text-muted-foreground font-medium">apsi.app / dashboard</div>
        </div>

        <div className="p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Bom dia, Dra. Marina</p>
              <h3 className="text-base font-semibold">Resumo de hoje</h3>
            </div>
            <span className="text-xs px-2 py-1 rounded-full bg-primary-soft text-primary font-medium">Terça, 04 jun</span>
          </div>

          {/* Stat cards */}
          <div className="grid grid-cols-2 gap-3">
            <StatCard icon={<Calendar className="size-4" />} label="Sessões hoje" value="7" tone="primary" />
            <StatCard icon={<CircleAlert className="size-4" />} label="Valor pendente" value="R$ 1.240" tone="warning" />
            <StatCard icon={<TrendingUp className="size-4" />} label="Receita prevista" value="R$ 8.760" tone="success" />
            <StatCard icon={<Users className="size-4" />} label="Pacientes ativos" value="32" tone="muted" />
          </div>

          {/* Next sessions */}
          <div className="rounded-xl border border-border">
            <div className="px-4 py-2.5 border-b border-border flex items-center justify-between">
              <p className="text-sm font-semibold">Próximas sessões</p>
              <Clock className="size-4 text-muted-foreground" />
            </div>
            <ul className="divide-y divide-border text-sm">
              <SessionRow time="14:00" name="Ana L." status="pago" />
              <SessionRow time="15:00" name="Rafael M." status="pendente" />
              <SessionRow time="16:00" name="Júlia T." status="pago" />
              <SessionRow time="17:00" name="Carlos S." status="falta" />
            </ul>
          </div>

          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <CircleDollarSign className="size-3.5" />
            <span>Recebido no mês: <span className="font-semibold text-foreground">R$ 6.320</span></span>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, tone }: { icon: React.ReactNode; label: string; value: string; tone: "primary" | "success" | "warning" | "muted" }) {
  const toneMap = {
    primary: "bg-primary-soft text-primary",
    success: "bg-success-soft text-success",
    warning: "bg-warning-soft text-warning-foreground",
    muted: "bg-secondary text-muted-foreground",
  } as const;
  return (
    <div className="rounded-xl border border-border p-3">
      <div className={`inline-flex items-center justify-center size-7 rounded-lg mb-2 ${toneMap[tone]}`}>{icon}</div>
      <p className="text-[11px] text-muted-foreground">{label}</p>
      <p className="text-lg font-bold tracking-tight">{value}</p>
    </div>
  );
}

function SessionRow({ time, name, status }: { time: string; name: string; status: "pago" | "pendente" | "falta" }) {
  const cfg = {
    pago: { label: "Pago", cls: "bg-success-soft text-success" },
    pendente: { label: "Pendente", cls: "bg-warning-soft text-warning-foreground" },
    falta: { label: "Falta", cls: "bg-destructive-soft text-destructive" },
  }[status];
  return (
    <li className="flex items-center justify-between px-4 py-2.5">
      <div className="flex items-center gap-3">
        <span className="text-xs font-mono text-muted-foreground w-10">{time}</span>
        <span className="font-medium">{name}</span>
      </div>
      <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${cfg.cls}`}>{cfg.label}</span>
    </li>
  );
}
