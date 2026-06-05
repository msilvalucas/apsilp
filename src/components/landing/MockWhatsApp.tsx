import { MessageSquare, Check, CheckCheck } from "lucide-react";

export function MockWhatsApp() {
  return (
    <div className="rounded-2xl border border-border bg-card shadow-lg shadow-primary/5 overflow-hidden max-w-sm mx-auto">
      <div className="flex items-center gap-3 px-4 py-3 bg-[#075E54] text-white">
        <div className="size-9 rounded-full bg-white/20 flex items-center justify-center">
          <MessageSquare className="size-4" />
        </div>
        <div>
          <p className="text-sm font-semibold leading-tight">APSI Assistente</p>
          <p className="text-[11px] opacity-80">online</p>
        </div>
      </div>
      <div className="p-4 space-y-2 bg-[#ECE5DD] min-h-[360px]">
        <Bubble side="in">Olá, Dra. Marina 👋<br />O que você quer fazer agora?</Bubble>
        <Bubble side="in">
          <span className="block mb-1">Menu rápido:</span>
          <span className="block">1️⃣ Minha agenda de hoje</span>
          <span className="block">2️⃣ Resumo financeiro</span>
          <span className="block">3️⃣ Confirmar sessão</span>
          <span className="block">4️⃣ Registrar pagamento</span>
          <span className="block">5️⃣ Adicionar evolução</span>
        </Bubble>
        <Bubble side="out">1</Bubble>
        <Bubble side="in">
          <span className="font-semibold block mb-1">📅 Hoje, terça</span>
          <span className="block">14:00 · Ana L. ✅ pago</span>
          <span className="block">15:00 · Rafael M. ⏳ pendente</span>
          <span className="block">16:00 · Júlia T. ✅ pago</span>
          <span className="block">17:00 · Carlos S. ❌ falta</span>
        </Bubble>
        <Bubble side="out">Registrar pagamento Rafael</Bubble>
        <Bubble side="in">Pagamento de R$ 180 registrado ✅</Bubble>
      </div>
    </div>
  );
}

function Bubble({ side, children }: { side: "in" | "out"; children: React.ReactNode }) {
  const isOut = side === "out";
  return (
    <div className={`flex ${isOut ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[80%] rounded-lg px-3 py-2 text-[12px] leading-snug shadow-sm ${
          isOut ? "bg-[#DCF8C6] text-foreground" : "bg-white text-foreground"
        }`}
      >
        {children}
        {isOut && (
          <span className="ml-1 inline-flex text-[#34B7F1] align-middle">
            <CheckCheck className="size-3" />
          </span>
        )}
        {!isOut && false && <Check className="size-3" />}
      </div>
    </div>
  );
}
