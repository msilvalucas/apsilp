import { Mic, FileText, Edit3, Save } from "lucide-react";

const steps = [
  { icon: Mic, title: "Gravar ou enviar áudio", text: "Capture o resumo da sessão pelo app ou WhatsApp." },
  { icon: FileText, title: "Rascunho transcrito", text: "O APSI transforma o áudio em um rascunho de texto para revisão." },
  { icon: Edit3, title: "Revisar e editar", text: "Você sempre revisa, ajusta e dá o tom clínico antes de salvar." },
  { icon: Save, title: "Salvar como evolução", text: "Texto final, revisado por você, vai para o histórico do paciente." },
];

export function MockAudioEvolution() {
  return (
    <div className="rounded-2xl border border-border bg-card shadow-lg shadow-primary/5 overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border bg-secondary/50">
        <Mic className="size-4 text-primary" />
        <p className="text-sm font-semibold">Evolução por áudio</p>
        <span className="ml-auto text-[10px] px-2 py-0.5 rounded-full bg-primary-soft text-primary font-medium">
          rascunho revisável
        </span>
      </div>
      <div className="p-4 space-y-3">
        <div className="rounded-lg border border-border p-3 bg-secondary/40">
          <div className="flex items-center gap-2 mb-2">
            <div className="size-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
              <Mic className="size-3.5" />
            </div>
            <div className="flex-1 h-1.5 bg-border rounded-full overflow-hidden">
              <div className="h-full w-2/3 bg-primary rounded-full" />
            </div>
            <span className="text-[11px] font-mono text-muted-foreground">01:42</span>
          </div>
          <div className="flex items-end gap-0.5 h-6">
            {[30, 60, 45, 80, 55, 70, 40, 90, 65, 50, 75, 35, 60, 80, 45, 55, 70, 40, 85, 50].map((h, i) => (
              <div key={i} className="flex-1 bg-primary/50 rounded-sm" style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-dashed border-border p-3">
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Transcrição (rascunho)</p>
          <p className="text-xs text-foreground/90 leading-relaxed">
            Paciente relatou melhora no sono ao longo da semana. Trouxe registros do diário de pensamentos.
            Trabalhamos reestruturação cognitiva sobre situação X. Combinamos tarefa para próxima sessão.
            <span className="text-primary font-medium"> [revisar termos]</span>
          </p>
        </div>

        <div className="flex gap-2">
          <button className="flex-1 text-xs font-medium rounded-md border border-border bg-card py-2 hover:bg-secondary/60">
            Editar
          </button>
          <button className="flex-1 text-xs font-medium rounded-md bg-primary text-primary-foreground py-2">
            Salvar evolução
          </button>
        </div>
      </div>
    </div>
  );
}

export function AudioSteps() {
  return (
    <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {steps.map((s, i) => (
        <li key={s.title} className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-mono font-bold text-primary">0{i + 1}</span>
            <div className="size-8 rounded-lg bg-primary-soft text-primary flex items-center justify-center">
              <s.icon className="size-4" />
            </div>
          </div>
          <p className="font-semibold text-sm">{s.title}</p>
          <p className="text-xs text-muted-foreground mt-1">{s.text}</p>
        </li>
      ))}
    </ol>
  );
}
