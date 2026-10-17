'use strict';

/* -------------------------------------------------------
   dataLayer bootstrap
------------------------------------------------------- */
window.dataLayer = window.dataLayer || [];

function pushEvent(event, params) {
  window.dataLayer.push(Object.assign({ event: event }, params || {}));
}

/* -------------------------------------------------------
   Smooth scroll for anchor links (supplements CSS)
------------------------------------------------------- */
(function () {
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      const id = a.getAttribute('href').slice(1);
      if (!id) return;
      const target = document.getElementById(id);
      if (!target) return;
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
})();

/* -------------------------------------------------------
   CTA click events
------------------------------------------------------- */
(function () {
  function bindCtaEvent(selector, eventName) {
    document.querySelectorAll(selector).forEach(function (a) {
      a.addEventListener('click', function () {
        pushEvent(eventName, {
          cta_label:    a.textContent.trim().replace(/\s+/g, ' '),
          cta_location: a.dataset.location || 'unknown',
        });
      });
    });
  }

  bindCtaEvent('a[data-event="whatsapp"]', 'whatsapp_click');
  bindCtaEvent('a[data-event="demo"]',     'demo_click');
  bindCtaEvent('a[data-event="cta"]',      'cta_click');

  (function () {
    const pricing = document.getElementById('preco');
    if (!pricing) return;
    let fired = false;
    const observer = new IntersectionObserver(function (entries) {
      if (!fired && entries[0].isIntersecting) {
        fired = true;
        pushEvent('pricing_view');
      }
    }, { threshold: 0.3 });
    observer.observe(pricing);
  })();
})();

/* -------------------------------------------------------
   UTM capture
------------------------------------------------------- */
function getUtms() {
  const params  = new URLSearchParams(window.location.search);
  const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
  return utmKeys.reduce(function (acc, key) {
    const val = params.get(key);
    if (val) acc[key] = val;
    return acc;
  }, {});
}

/* -------------------------------------------------------
   Form value maps (HTML value → API enum)
------------------------------------------------------- */
const PERFIL_MAP = {
  'solo':    'psychologist_solo',
  'clinica': 'clinic',
  'outro':   'other',
};

const ATEND_MAP = {
  'ate-10': 'up_to_10',
  '11-20':  'from_11_to_20',
  '21-40':  'from_21_to_40',
  '40+':    'more_than_40',
};

const AGENDA_MAP = {
  'google':    'google_calendar',
  'caderno':   'notebook',
  'sistema':   'system',
  'whatsapp':  'whatsapp',
  'outro':     'other',
};

const PAGAMENTOS_MAP = {
  'planilha': 'spreadsheet',
  'caderno':  'notebook',
  'sistema':  'system',
  'memoria':  'memory',
  'outro':    'other',
};

const INCOMODA_MAP = {
  'agenda':     'agenda',
  'faltas':     'absences_reschedules',
  'pagamentos': 'pending_payments',
  'evolucoes':  'clinical_evolutions',
  'whatsapp':   'whatsapp_disorganized',
  'outro':      'other',
};

const DEMO_MAP = {
  'sim':      'yes',
  'sozinho':  'prefer_test_alone',
  'info':     'only_information',
};

/* -------------------------------------------------------
   Lead form
------------------------------------------------------- */
(function () {
  const form      = document.getElementById('lead-form-el');
  const success   = document.getElementById('form-success');
  const errorEl   = document.getElementById('form-error');
  const submitBtn = form ? form.querySelector('[type="submit"]') : null;
  if (!form || !submitBtn) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    if (submitBtn.disabled) return;

    const nome       = document.getElementById('f-nome').value.trim();
    const whatsapp   = document.getElementById('f-whatsapp').value.trim();
    const cidade     = document.getElementById('f-cidade').value.trim();
    const atend      = document.getElementById('f-atendimentos').value;
    const agenda     = document.getElementById('f-agenda').value;
    const pagamentos = document.getElementById('f-pagamentos').value;
    const incomoda   = document.getElementById('f-incomoda').value;
    const demo       = document.getElementById('f-demo').value;
    const perfilEl   = form.querySelector('input[name="perfil"]:checked');
    const perfil     = perfilEl ? perfilEl.value : '';
    const honeypot   = document.getElementById('f-website');

    var hasErrors = false;

    clearAllFieldErrors();

    if (!nome) {
      setFieldError('f-nome', 'Informe seu nome.');
      hasErrors = true;
    }

    var waClean = whatsapp.replace(/\D/g, '');
    if (!whatsapp) {
      setFieldError('f-whatsapp', 'Informe seu WhatsApp.');
      hasErrors = true;
    } else if (waClean.length < 10 || waClean.length > 13) {
      setFieldError('f-whatsapp', 'Formato inválido. Use (54) 99999-9999.');
      hasErrors = true;
    }

    if (!cidade) {
      setFieldError('f-cidade', 'Informe sua cidade.');
      hasErrors = true;
    }

    if (!atend)      { setFieldError('f-atendimentos', 'Selecione uma opção.'); hasErrors = true; }
    if (!agenda)     { setFieldError('f-agenda',        'Selecione uma opção.'); hasErrors = true; }
    if (!pagamentos) { setFieldError('f-pagamentos',    'Selecione uma opção.'); hasErrors = true; }
    if (!incomoda)   { setFieldError('f-incomoda',      'Selecione uma opção.'); hasErrors = true; }
    if (!demo)       { setFieldError('f-demo',          'Selecione uma opção.'); hasErrors = true; }

    if (hasErrors) {
      var firstErr = form.querySelector('.form-input--error, .form-select--error');
      if (firstErr) firstErr.focus();
      return;
    }

    clearError();
    setLoading(true);

    const utms = getUtms();

    const payload = {
      lead: Object.assign({
        name:                 nome,
        whatsapp:             whatsapp,
        city:                 cidade,
        user_type:            PERFIL_MAP[perfil]        || 'other',
        monthly_appointments: ATEND_MAP[atend]           || atend,
        agenda_control:       AGENDA_MAP[agenda]         || agenda,
        payment_control:      PAGAMENTOS_MAP[pagamentos] || pagamentos,
        main_pain:            INCOMODA_MAP[incomoda]     || incomoda,
        demo_interest:        DEMO_MAP[demo]             || demo,
        page_url:             window.location.href,
        referrer:             document.referrer || undefined,
      }, utms),
      website: honeypot ? honeypot.value : '',
    };

    fetch('https://api.useapsi.com.br/public/leads', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body:    JSON.stringify(payload),
    })
    .then(function (res) {
      if (res.status === 201) {
        return res.json().then(function () {
          showSuccess(nome, { perfil: perfil, atend: atend, agenda: agenda, pagamentos: pagamentos, incomoda: incomoda, demo: demo });
        });
      }
      if (res.status === 422) {
        return res.json().then(function (data) {
          let msgs = [];
          if (data && data.errors) {
            Object.keys(data.errors).forEach(function (k) {
              msgs = msgs.concat(data.errors[k]);
            });
          }
          showError(msgs.length ? msgs.join(' ') : 'Verifique os dados e tente novamente.');
        });
      }
      throw new Error('server_error');
    })
    .catch(function (err) {
      if (err && err.message !== 'server_error') {
        console.error('[lead-form]', err);
      }
      showError('Erro ao enviar. Tente novamente em instantes.');
    })
    .finally(function () {
      setLoading(false);
    });
  });

  function setLoading(on) {
    submitBtn.disabled = on;
    submitBtn.textContent = on ? 'Enviando…' : 'Quero testar o APSI';
  }

  function showSuccess(nome, fields) {
    const firstName = nome.split(' ')[0];
    document.getElementById('success-name').textContent = firstName;
    pushEvent('lead_form_submit', {
      form_name:            'lead_form',
      lead_type:            PERFIL_MAP[fields.perfil]        || 'other',
      monthly_appointments: ATEND_MAP[fields.atend]           || fields.atend,
      agenda_control:       AGENDA_MAP[fields.agenda]         || fields.agenda,
      payment_control:      PAGAMENTOS_MAP[fields.pagamentos] || fields.pagamentos,
      main_pain:            INCOMODA_MAP[fields.incomoda]     || fields.incomoda,
      demo_interest:        DEMO_MAP[fields.demo]             || fields.demo,
    });
    form.style.display = 'none';
    if (success) {
      success.classList.add('is-visible');
      success.focus();
    }
  }

  function setFieldError(fieldId, msg) {
    var input = document.getElementById(fieldId);
    var errEl = document.getElementById(fieldId + '-error');
    var visual = (fieldId === 'f-cidade') ? document.getElementById('f-cidade-trigger') : input;
    if (visual) visual.classList.add(visual.tagName === 'SELECT' ? 'form-select--error' : 'form-input--error');
    if (errEl)  { errEl.textContent = msg; errEl.classList.add('is-visible'); }
  }

  function clearFieldError(fieldId) {
    var input = document.getElementById(fieldId);
    var errEl = document.getElementById(fieldId + '-error');
    var visual = (fieldId === 'f-cidade') ? document.getElementById('f-cidade-trigger') : input;
    if (visual) { visual.classList.remove('form-input--error', 'form-select--error'); }
    if (errEl)  { errEl.textContent = ''; errEl.classList.remove('is-visible'); }
  }

  function clearAllFieldErrors() {
    ['f-nome', 'f-whatsapp', 'f-cidade', 'f-atendimentos', 'f-agenda', 'f-pagamentos', 'f-incomoda', 'f-demo'].forEach(clearFieldError);
  }

  function showError(msg) {
    if (!errorEl) return;
    errorEl.textContent = msg;
    errorEl.classList.add('is-visible');
    errorEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function clearError() {
    if (!errorEl) return;
    errorEl.classList.remove('is-visible');
  }

  var nomeEl = document.getElementById('f-nome');
  if (nomeEl) nomeEl.addEventListener('input', function () { if (nomeEl.value.trim()) clearFieldError('f-nome'); });

  function formatBRPhone(digits) {
    if (!digits) return '';
    if (digits.length <= 2) return '(' + digits;
    if (digits.length <= 6) return '(' + digits.slice(0,2) + ') ' + digits.slice(2);
    if (digits.length <= 10) return '(' + digits.slice(0,2) + ') ' + digits.slice(2,6) + '-' + digits.slice(6);
    return '(' + digits.slice(0,2) + ') ' + digits.slice(2,7) + '-' + digits.slice(7,11);
  }

  var waInput = document.getElementById('f-whatsapp');
  if (waInput) waInput.addEventListener('input', function () {
    var cursorPos = waInput.selectionStart;
    var digitsBeforeCursor = waInput.value.slice(0, cursorPos).replace(/\D/g, '').length;
    var digits = waInput.value.replace(/\D/g, '').slice(0, 11);
    var formatted = formatBRPhone(digits);
    waInput.value = formatted;
    var count = 0;
    var newCursor = formatted.length;
    for (var i = 0; i < formatted.length; i++) {
      if (/\d/.test(formatted[i])) count++;
      if (count === digitsBeforeCursor) { newCursor = i + 1; break; }
    }
    try { waInput.setSelectionRange(newCursor, newCursor); } catch (ex) {}
    if (digits.length >= 10) clearFieldError('f-whatsapp');
  });

  ['f-atendimentos', 'f-agenda', 'f-pagamentos', 'f-incomoda', 'f-demo'].forEach(function (id) {
    var el = document.getElementById(id);
    if (el) el.addEventListener('change', function () { if (el.value) clearFieldError(id); });
  });
})();

/* -------------------------------------------------------
   Estado + City combobox (IBGE API por estado)
------------------------------------------------------- */
(function () {
  var estadoSel  = document.getElementById('f-estado');
  var trigger    = document.getElementById('f-cidade-trigger');
  var display    = document.getElementById('f-cidade-display');
  var panel      = document.getElementById('f-cidade-panel');
  var searchInp  = document.getElementById('f-cidade-search');
  var list       = document.getElementById('f-cidade-list');
  var hidden     = document.getElementById('f-cidade');
  if (!estadoSel || !trigger || !panel || !searchInp || !list || !hidden) return;

  var citiesCache = {};
  var currentUF   = '';
  var activeIdx   = -1;

  /* ---- load cities for a UF ---- */
  function loadCitiesForUF(uf, cb) {
    if (citiesCache[uf]) { cb(citiesCache[uf]); return; }
    fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados/' + uf + '/municipios?orderBy=nome')
      .then(function (r) { return r.json(); })
      .then(function (data) {
        citiesCache[uf] = data.map(function (m) {
          return { label: m.nome + ' - ' + uf, name: m.nome };
        });
        cb(citiesCache[uf]);
      })
      .catch(function () { cb([]); });
  }

  /* ---- render / filter ---- */
  function filterCities(q) {
    var cities = citiesCache[currentUF] || [];
    if (!q) return cities;
    var lower = q.toLowerCase();
    return cities.filter(function (c) { return c.name.toLowerCase().startsWith(lower); });
  }

  function renderList(items) {
    activeIdx = -1;
    list.innerHTML = '';
    if (!items.length) {
      var empty = document.createElement('li');
      empty.className = 'city-empty';
      empty.textContent = 'Nenhuma cidade encontrada';
      list.appendChild(empty);
      return;
    }
    items.forEach(function (city) {
      var li = document.createElement('li');
      li.textContent = city.label;
      li.dataset.value = city.label;
      li.addEventListener('mousedown', function (e) { e.preventDefault(); });
      li.addEventListener('click', function () { selectCity(city.label); });
      list.appendChild(li);
    });
  }

  function showLoadingInList() {
    list.innerHTML = '';
    var li = document.createElement('li');
    li.className = 'city-loading';
    li.textContent = 'Carregando cidades…';
    list.appendChild(li);
  }

  /* ---- panel open / close ---- */
  function openPanel() {
    panel.removeAttribute('hidden');
    trigger.setAttribute('aria-expanded', 'true');
    searchInp.value = '';
    searchInp.focus();
    renderList(filterCities(''));
  }

  function closePanel() {
    panel.setAttribute('hidden', '');
    trigger.setAttribute('aria-expanded', 'false');
    activeIdx = -1;
  }

  /* ---- select city ---- */
  function selectCity(label) {
    hidden.value = label;
    display.textContent = label;
    display.classList.remove('city-trigger-text--placeholder');
    closePanel();
    trigger.classList.remove('form-input--error');
    var errEl = document.getElementById('f-cidade-error');
    if (errEl) { errEl.textContent = ''; errEl.classList.remove('is-visible'); }
  }

  /* ---- reset city ---- */
  function resetCity() {
    hidden.value = '';
    display.textContent = 'Selecione a cidade';
    display.classList.add('city-trigger-text--placeholder');
    closePanel();
  }

  /* ---- keyboard nav ---- */
  function setActive(idx) {
    var items = list.querySelectorAll('li[data-value]');
    items.forEach(function (li) { li.classList.remove('is-active'); });
    if (idx >= 0 && idx < items.length) {
      activeIdx = idx;
      items[idx].classList.add('is-active');
      items[idx].scrollIntoView({ block: 'nearest' });
    }
  }

  /* ---- estado onChange ---- */
  estadoSel.addEventListener('change', function () {
    var uf = estadoSel.value;
    resetCity();
    currentUF = uf;
    if (!uf) {
      trigger.disabled = true;
      return;
    }
    trigger.disabled = true;
    if (!citiesCache[uf]) {
      showLoadingInList();
    }
    loadCitiesForUF(uf, function () {
      trigger.disabled = false;
    });
  });

  /* ---- trigger click ---- */
  trigger.addEventListener('click', function () {
    if (panel.hasAttribute('hidden')) openPanel(); else closePanel();
  });

  /* ---- search input ---- */
  searchInp.addEventListener('input', function () {
    renderList(filterCities(searchInp.value.trim()));
  });

  searchInp.addEventListener('keydown', function (e) {
    var items = list.querySelectorAll('li[data-value]');
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive(Math.min(activeIdx + 1, items.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive(Math.max(activeIdx - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (activeIdx >= 0 && items[activeIdx]) selectCity(items[activeIdx].dataset.value);
    } else if (e.key === 'Escape') {
      closePanel();
      trigger.focus();
    }
  });

  /* ---- close on outside click ---- */
  document.addEventListener('click', function (e) {
    var wrap = document.getElementById('f-cidade-wrap');
    if (wrap && !wrap.contains(e.target)) closePanel();
  });
})();

/* -------------------------------------------------------
   Audio waveform (decorative bars)
------------------------------------------------------- */
(function () {
  var wave = document.querySelector('[data-waveform]');
  if (!wave) return;
  var n = 56;
  for (var i = 0; i < n; i++) {
    var h = 8 + Math.abs(Math.sin(i * 0.55) * 18 + Math.sin(i * 1.7) * 9 + Math.cos(i * 0.23) * 6);
    var t = i / (n - 1);
    var bar = document.createElement('span');
    bar.setAttribute('data-bar', '');
    bar.style.height = h + 'px';
    bar.style.background = 'rgb(' + Math.round(22 + t * 3) + ',' + Math.round(117 + t * 67) + ',' + Math.round(242 - t * 76) + ')';
    wave.appendChild(bar);
  }
})();

/* -------------------------------------------------------
   Hero scene: scale the 560px artboard to its column
------------------------------------------------------- */
(function () {
  var scene = document.querySelector('[data-hero-scene]');
  if (!scene) return;

  function fit() {
    var vw = window.innerWidth;
    var colW = vw >= 960 ? (Math.min(vw, 1296) - 56 - 40) / 2 : vw - 56;
    scene.style.setProperty('--scene-scale', Math.min(1, colW / 560).toFixed(3));
  }

  fit();
  window.addEventListener('resize', fit, { passive: true });
})();

/* -------------------------------------------------------
   Scroll motion (GSAP + ScrollTrigger)
   Everything renders fully without JS; GSAP only sets the
   animated start states, so a load failure is harmless.
------------------------------------------------------- */
(function () {
  var g  = window.gsap;
  var ST = window.ScrollTrigger;
  if (!g || !ST) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  g.registerPlugin(ST);

  function $(sel) { return Array.prototype.slice.call(document.querySelectorAll(sel)); }

  function delta(el, to) {
    var a = el.getBoundingClientRect();
    var b = to.getBoundingClientRect();
    return {
      x: b.left + b.width / 2 - (a.left + a.width / 2),
      y: b.top + b.height / 2 - (a.top + a.height / 2),
    };
  }

  function resetAll() {
    g.set('[data-reveal],[data-hero-copy] > *,[data-fbar],[data-jline],[data-jstep],[data-of],[data-wm],[data-wlist],[data-tl],[data-saved],[data-ov-a],[data-ov-app],[data-ov-b],[data-ov-item],[data-tool],[data-core],[data-ccol],[data-aw],[data-hf],[data-hero-core],[data-bar]',
      { x: 0, y: 0, scale: 1, rotation: 0, clearProps: 'opacity,clipPath,visibility' });
  }

  try {
    g.context(function () {
      var mm = g.matchMedia();

      // Shared: reveals, hero copy, finance bars, journey line
      $('[data-reveal]').forEach(function (el) {
        ST.create({
          trigger: el, start: 'top 92%', once: true,
          onEnter: function () {
            g.fromTo(el, { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', clearProps: 'opacity,transform' });
          },
        });
      });

      g.from('[data-hero-copy] > *', { y: 24, stagger: 0.08, duration: 0.9, ease: 'power3.out', clearProps: 'transform' });

      ST.create({
        trigger: '#financeiro', start: 'top 70%', once: true,
        onEnter: function () {
          g.fromTo('[data-fbar]', { scaleY: 0 }, { scaleY: 1, stagger: 0.07, duration: 0.8, ease: 'power3.out', clearProps: 'transform' });
        },
      });

      g.fromTo('[data-jline]', { scaleY: 0 }, {
        scaleY: 1, ease: 'none',
        scrollTrigger: { trigger: '[data-jlist]', start: 'top 65%', end: 'bottom 65%', scrub: true },
      });

      $('[data-jstep]').forEach(function (li) {
        g.from(li, { opacity: 0.25, ease: 'none', scrollTrigger: { trigger: li, start: 'top 85%', end: 'top 62%', scrub: true } });
        g.to(li.querySelector('[data-jdot]'), {
          backgroundColor: '#1675F2', duration: 0.2,
          scrollTrigger: { trigger: li, start: 'top 65%', toggleActions: 'play none none reverse' },
        });
      });

      // Desktop: pinned storytelling scenes.
      // Scrubbed timelines use fromTo(): with invalidateOnRefresh a plain from()
      // re-reads its end values from the already-hidden start state on refresh.
      mm.add('(min-width: 960px)', function () {
        // Hero: fragments enter, then drift toward the core on scroll
        var hf   = $('[data-hf]');
        var core = document.querySelector('[data-hero-core]');
        g.from(hf, { opacity: 0, scale: 0.85, stagger: 0.05, duration: 0.8, ease: 'power3.out', delay: 0.25 });
        g.from(core, { scale: 0.8, opacity: 0, duration: 1, ease: 'power3.out' });
        g.to(hf, {
          x: function (i, el) { return delta(el, core).x * 0.4; },
          y: function (i, el) { return delta(el, core).y * 0.4; },
          ease: 'none',
          scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true, invalidateOnRefresh: true },
        });

        // Overload -> one place
        var app = document.querySelector('[data-ov-app]');
        g.timeline({ scrollTrigger: { trigger: '#sobrecarga', start: 'top top', end: '+=220%', pin: true, scrub: 0.6, invalidateOnRefresh: true } })
          .fromTo('[data-of]', { opacity: 0, scale: 0.7, y: 30 }, { opacity: 1, scale: 1, y: 0, stagger: 0.04, duration: 0.4 })
          .set(app, { opacity: 0, scale: 0.86, y: 40 }, 0)
          .set('[data-ov-b]', { opacity: 0, y: 20 }, 0)
          .to({}, { duration: 0.35 })
          .addLabel('conv')
          .to('[data-of]', {
            x: function (i, el) { return delta(el, app).x; },
            y: function (i, el) { return delta(el, app).y; },
            scale: 0.2, opacity: 0, stagger: 0.02, duration: 0.7, ease: 'power2.in',
          }, 'conv')
          .to('[data-ov-a]', { opacity: 0.35, scale: 0.94, duration: 0.5 }, 'conv')
          .to(app, { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: 'power2.out' }, 'conv+=.35')
          .fromTo('[data-ov-item]', { opacity: 0, y: 10 }, { opacity: 1, y: 0, stagger: 0.03, duration: 0.3 }, 'conv+=.6')
          .to('[data-ov-b]', { opacity: 1, y: 0, duration: 0.35 }, 'conv+=.8')
          .to({}, { duration: 0.3 });

        // WhatsApp: conversation advances with scroll
        var view    = document.querySelector('[data-wview]');
        var list    = document.querySelector('[data-wlist]');
        var msgs    = $('[data-wm]');
        var prompts = $('[data-wp]');
        view.style.overflowY = 'hidden';
        var wt = g.timeline({ scrollTrigger: { trigger: '#whatsapp', start: 'top top', end: '+=240%', pin: true, scrub: 0.5, invalidateOnRefresh: true } });
        g.set(msgs, { opacity: 0, y: 14 });
        for (var k = 0; k < msgs.length; k += 2) {
          (function (k) {
            var hasPrompt = k / 2 < prompts.length;
            var p = prompts[Math.min(k / 2, prompts.length - 1)];
            if (hasPrompt) wt.to(p, { backgroundColor: '#EAF2FE', borderColor: '#1675F2', color: '#1675F2', duration: 0.2 });
            wt.to(msgs[k], { opacity: 1, y: 0, duration: 0.3 });
            wt.to(msgs[k + 1], { opacity: 1, y: 0, duration: 0.3 }, '+=.15');
            wt.to(list, {
              y: function () { return -Math.max(0, msgs[k + 1].offsetTop + msgs[k + 1].offsetHeight + 20 - view.clientHeight); },
              duration: 0.3,
            }, '<');
            if (hasPrompt) wt.to(p, { backgroundColor: '#fff', borderColor: '#E3E8F0', color: '#0E1A33', duration: 0.2 }, '+=.25');
          })(k);
        }

        // Audio -> draft -> saved
        var bars = $('[data-bar]');
        var ap   = $('[data-ap]');
        function on()  { return { backgroundColor: '#1675F2', borderColor: '#1675F2', color: '#fff', duration: 0.15 }; }
        function off() { return { backgroundColor: 'rgba(0,0,0,0)', borderColor: '#DCE3EE', color: '#4A5875', duration: 0.15 }; }
        g.set('[data-tl]', { clipPath: 'inset(0 100% 0 0)' });
        g.set('[data-saved]', { opacity: 0 });
        g.timeline({ scrollTrigger: { trigger: '#evolucao', start: 'top top', end: '+=200%', pin: true, scrub: 0.5 } })
          .to(ap[0], on())
          .fromTo(bars, { scaleY: 0.15 }, { scaleY: 1, stagger: { each: 0.01, from: 'start' }, duration: 0.5 }, '<')
          .to(ap[0], off()).to(ap[1], on(), '<')
          .to(bars, { opacity: 0.25, scaleY: 0.3, stagger: 0.006, duration: 0.4 })
          .to('[data-tl]', { clipPath: 'inset(0 0% 0 0)', stagger: 0.18, duration: 0.35, ease: 'none' }, '<')
          .to(ap[1], off()).to(ap[2], on(), '<')
          .to({}, { duration: 0.2 })
          .to(ap[2], off()).to(ap[3], on(), '<')
          .to({}, { duration: 0.25 })
          .to(ap[3], off()).to(ap[4], { backgroundColor: '#19B8A6', borderColor: '#19B8A6', color: '#fff', duration: 0.15 }, '<')
          .to('[data-saved]', { opacity: 1, duration: 0.2 }, '<')
          .to({}, { duration: 0.2 });

        // "Aha" words light up
        $('[data-aha]').forEach(function (p) {
          g.from(p.querySelectorAll('[data-aw]'), {
            opacity: 0.12, stagger: 0.1, ease: 'none',
            scrollTrigger: { trigger: p, start: 'top 80%', end: 'top 40%', scrub: true },
          });
        });

        // Before / after: scattered tools connect to the core
        g.set('[data-tline]', { strokeDasharray: 1, strokeDashoffset: 1 });
        g.timeline({ scrollTrigger: { trigger: '#antes-depois', start: 'top top', end: '+=180%', pin: true, scrub: 0.6 } })
          .fromTo('[data-tool]', {
            x: function (i, el) { return +el.dataset.sx; },
            y: function (i, el) { return +el.dataset.sy; },
            rotation: function (i, el) { return +el.dataset.sr; },
          }, { x: 0, y: 0, rotation: 0, duration: 1, ease: 'power2.inOut', stagger: 0.03 })
          .fromTo('[data-core]', { scale: 0.5, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5 }, '-=.5')
          .to('[data-tline]', { strokeDashoffset: 0, stagger: 0.05, duration: 0.5 }, '-=.2')
          .to({}, { duration: 0.3 });

        // Clinic: one agenda expands into a team
        var cols = $('[data-ccol]');
        g.timeline({ scrollTrigger: { trigger: '[data-cl-pin]', start: 'top top', end: '+=160%', pin: true, scrub: 0.6, invalidateOnRefresh: true } })
          .fromTo(cols.slice(1), {
            x: function (i, el) { return -(el.offsetLeft - cols[0].offsetLeft); },
            opacity: 0,
          }, { x: 0, opacity: 1, duration: 1, stagger: 0.12, ease: 'power2.out' })
          .to({}, { duration: 0.3 });

        return function () { view.style.overflowY = 'auto'; };
      });

      // Mobile / tablet: light entrance animations only
      mm.add('(max-width: 959px)', function () {
        g.from('[data-wm]', { opacity: 0, y: 12, stagger: 0.12, duration: 0.5, scrollTrigger: { trigger: '#whatsapp', start: 'top 40%', once: true } });
        g.from('[data-tl]', { opacity: 0, y: 8, stagger: 0.15, duration: 0.5, scrollTrigger: { trigger: '#evolucao', start: 'top 40%', once: true } });
      });
    });
  } catch (err) {
    console.error('[motion]', err);
    resetAll();
  }

  window.addEventListener('load', function () { ST.refresh(); }, { once: true });
})();
