import { Globe, Calendar as CalendarIcon } from "lucide-react";

const slots = [
  { time: "08:00", available: true },
  { time: "09:00", available: false },
  { time: "10:00", available: true },
  { time: "11:00", available: true },
  { time: "14:00", available: false },
  { time: "15:00", available: true },
  { time: "16:00", available: true },
  { time: "17:00", available: false },
];

export function MockBooking() {
  return (
    <div className="rounded-2xl border border-border bg-card shadow-lg shadow-primary/5 overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border bg-secondary/50">
        <Globe className="size-4 text-primary" />
        <p className="text-sm font-semibold">apsi.app/dra-marina</p>
        <span className="ml-auto text-[10px] px-2 py-0.5 rounded-full bg-warning-soft text-warning-foreground font-medium">
          beta
        </span>
      </div>
      <div className="p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="size-11 rounded-full bg-primary-soft text-primary text-base font-bold flex items-center justify-center">
            MR
          </div>
          <div>
            <p className="font-semibold leading-tight">Dra. Marina Reis</p>
            <p className="text-xs text-muted-foreground">Psicóloga · Passo Fundo, RS</p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm font-medium mb-3">
          <CalendarIcon className="size-4 text-primary" />
          <span>Quinta-feira, 06 jun</span>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {slots.map((s) => (
            <button
              key={s.time}
              disabled={!s.available}
              className={`text-xs font-medium rounded-md py-2 border transition ${
                s.available
                  ? "border-primary/30 bg-primary-soft text-primary hover:bg-primary hover:text-primary-foreground"
                  : "border-border bg-secondary text-muted-foreground line-through cursor-not-allowed"
              }`}
            >
              {s.time}
            </button>
          ))}
        </div>

        <div className="mt-4 rounded-lg bg-success-soft/60 border border-success/20 p-3 text-[11px] text-success-foreground/90">
          <span className="font-semibold text-success">Agendamento criado</span> — sessão registrada,
          transação financeira gerada e mensagem enviada via WhatsApp.
        </div>
      </div>
    </div>
  );
}
