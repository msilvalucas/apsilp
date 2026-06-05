import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { CheckCircle2 } from "lucide-react";

export function LeadForm() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    nome: "",
    whatsapp: "",
    cidade: "",
    perfil: "psicologo",
    atendimentos: "",
    controle: "",
    dificuldade: "",
  });

  function update<K extends keyof typeof form>(k: K, v: (typeof form)[K]) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.nome.trim() || !form.whatsapp.trim() || !form.cidade.trim()) {
      toast.error("Preencha nome, WhatsApp e cidade.");
      return;
    }
    if (!form.atendimentos || !form.controle) {
      toast.error("Selecione as opções obrigatórias.");
      return;
    }
    // No backend yet — store locally and show success
    console.log("APSI lead", form);
    setSubmitted(true);
    toast.success("Inscrição recebida. Entraremos em contato em breve.");
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-border bg-card p-8 text-center">
        <div className="mx-auto size-12 rounded-full bg-success-soft text-success flex items-center justify-center mb-4">
          <CheckCircle2 className="size-6" />
        </div>
        <h3 className="text-xl font-semibold mb-2">Tudo certo, {form.nome.split(" ")[0]}!</h3>
        <p className="text-muted-foreground text-sm">
          Recebemos sua inscrição na fase beta. Entraremos em contato pelo WhatsApp em breve.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-5">
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="nome">Nome</Label>
          <Input id="nome" value={form.nome} onChange={(e) => update("nome", e.target.value)} placeholder="Seu nome" maxLength={120} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="whatsapp">WhatsApp</Label>
          <Input id="whatsapp" value={form.whatsapp} onChange={(e) => update("whatsapp", e.target.value)} placeholder="(54) 99999-9999" maxLength={20} />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="cidade">Cidade</Label>
          <Input id="cidade" value={form.cidade} onChange={(e) => update("cidade", e.target.value)} placeholder="Ex.: Passo Fundo - RS" maxLength={100} />
        </div>
        <div className="space-y-1.5">
          <Label>Você é</Label>
          <RadioGroup value={form.perfil} onValueChange={(v) => update("perfil", v)} className="flex gap-4 pt-2">
            <div className="flex items-center gap-2">
              <RadioGroupItem value="psicologo" id="r-psi" />
              <Label htmlFor="r-psi" className="font-normal">Psicólogo(a)</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="clinica" id="r-cli" />
              <Label htmlFor="r-cli" className="font-normal">Clínica</Label>
            </div>
          </RadioGroup>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label>Atendimentos por mês</Label>
          <Select value={form.atendimentos} onValueChange={(v) => update("atendimentos", v)}>
            <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="ate-10">Até 10</SelectItem>
              <SelectItem value="11-20">11 a 20</SelectItem>
              <SelectItem value="21-40">21 a 40</SelectItem>
              <SelectItem value="40+">Mais de 40</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <Label>Como controla pagamentos hoje?</Label>
          <Select value={form.controle} onValueChange={(v) => update("controle", v)}>
            <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="planilha">Planilha</SelectItem>
              <SelectItem value="caderno">Caderno</SelectItem>
              <SelectItem value="sistema">Sistema</SelectItem>
              <SelectItem value="whatsapp">WhatsApp</SelectItem>
              <SelectItem value="memoria">Memória</SelectItem>
              <SelectItem value="outro">Outro</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="dificuldade">Qual sua maior dificuldade hoje?</Label>
        <Textarea
          id="dificuldade"
          value={form.dificuldade}
          onChange={(e) => update("dificuldade", e.target.value)}
          placeholder="Conte rapidamente o que mais te incomoda na rotina."
          maxLength={600}
          rows={3}
        />
      </div>

      <Button type="submit" size="lg" className="w-full">Quero testar o APSI</Button>
      <p className="text-[11px] text-muted-foreground text-center">
        Não pedimos CPF, CRP ou endereço. Seus dados serão usados apenas para contato sobre o beta.
      </p>
    </form>
  );
}
