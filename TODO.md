# TODO — APSI Landing Page

## 🔴 Crítico (bloqueiam tráfego pago)

- [ ] Criar e publicar `assets/img/og-image.webp` (1200×630px) — og:image, twitter:image e JSON-LD logo apontam para arquivo inexistente
- [x] Integrar formulário com endpoint real (Zapier / Make / n8n / API própria) — atualmente só faz `console.log`
- [x] Remover `console.log('APSI lead:', payload)` em `assets/js/main.js:183` — expõe PII (nome, WhatsApp, cidade) no console
- [x] Substituir número WhatsApp fictício `5554999999999` pelo número real — ocorre em `index.html:1217` e `index.html:1375`
- [ ] Ativar GTM, GA4, Meta Pixel (e Clarity/Hotjar se necessário) — todos estão como TODO comentado em `index.html:63-71`
- [ ] Criar e referenciar favicon real — `favicon.ico` na raiz tem 0 bytes; adicionar `<link rel="icon">` no `<head>`

---

## 🟡 Importante (qualidade e UX)

### Formulário
- [x] Adicionar prevenção de duplo submit — desabilitar botão e trocar texto enquanto envia
- [x] Adicionar validação de formato do campo WhatsApp — qualquer string passa hoje (ex: "a")
- [ ] Adicionar `required` nos campos obrigatórios do HTML — nome, whatsapp, cidade, selects — atualmente só validado via JS
- [ ] Substituir `<span class="form-label">Você é</span>` por `<fieldset><legend>` para o radio group — bug de acessibilidade

### HTML
- [ ] Trocar `<div role="navigation">` do menu mobile por `<nav>` em `index.html:113`
- [x] Corrigir copyright de `2025` para `2025–2026` em `index.html:1526`
- [ ] Revisar comportamento de `id="top"` na section hero — conflita com comportamento nativo de `href="#top"` em alguns browsers

### CSS
- [ ] Adicionar `@media (prefers-reduced-motion: reduce)` no final de `styles.css` — todas as transições e scroll-behavior ignoram preferência do usuário
- [ ] Corrigir FAQ `max-height: 600px` em `styles.css:1566` — conteúdo maior que 600px é cortado; migrar para animação com `grid-template-rows`
- [ ] Remover `scroll-behavior: smooth` do CSS (`styles.css:6`) — duplicado com `scrollIntoView({ behavior: 'smooth' })` no JS

### SEO
- [ ] Adicionar `og:image:width`, `og:image:height`, `og:image:type` nas meta tags OG
- [ ] Criar logo quadrada (`assets/img/logo.png`, mínimo 512×512px) e atualizar JSON-LD `Organization.logo` — atualmente aponta para og-image retangular
- [ ] Adicionar `<link rel="icon">`, `<link rel="apple-touch-icon">` no `<head>`

---

## 🟢 Melhorias estruturais (próxima versão)

- [ ] Extrair ~30 inline styles do HTML para classes CSS — prejudicam responsividade e especificidade
- [ ] Criar variante de classe para seções `section--sm` com padding customizado (ex: `section--cta`) em vez de override inline
- [ ] Separar `styles.css` em arquivos por responsabilidade: `tokens.css`, `base.css`, `components.css`, `mockups.css`, `responsive.css`
- [ ] Adicionar validação de erro por campo no formulário (não só banner global)
- [ ] Adicionar passo de build: minificação CSS (`csso`/`lightningcss`) + JS (`terser`)
- [ ] Configurar `.htaccess` com `Cache-Control`, gzip e headers de segurança (`X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`)
- [ ] Adicionar CSP básico antes de ativar pixels de terceiros
- [ ] Otimizar range da Google Fonts de `wght@200..800` para `wght@400..800` (peso 200 não é usado)
- [ ] Adicionar `<link rel="preload">` para a fonte variável Manrope (reduz FOUT / CLS)
- [ ] Fixar ordem do smooth scroll JS — mover `e.preventDefault()` para antes dos guards em `main.js:70`
