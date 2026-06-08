'use strict';

/* -------------------------------------------------------
   dataLayer bootstrap
------------------------------------------------------- */
window.dataLayer = window.dataLayer || [];

function pushEvent(event, params) {
  window.dataLayer.push(Object.assign({ event: event }, params || {}));
}

/* -------------------------------------------------------
   Mobile nav
------------------------------------------------------- */
(function () {
  const btn   = document.getElementById('nav-menu-btn');
  const panel = document.getElementById('nav-mobile');
  if (!btn || !panel) return;

  btn.addEventListener('click', function () {
    const open = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!open));
    panel.classList.toggle('is-open', !open);
  });

  panel.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      btn.setAttribute('aria-expanded', 'false');
      panel.classList.remove('is-open');
    });
  });
})();

/* -------------------------------------------------------
   FAQ accordion
------------------------------------------------------- */
(function () {
  const items = document.querySelectorAll('.faq-item');
  items.forEach(function (item) {
    const btn    = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    if (!btn || !answer) return;

    btn.addEventListener('click', function () {
      const isOpen = item.classList.contains('is-open');

      items.forEach(function (other) {
        if (other !== item) {
          other.classList.remove('is-open');
          const otherBtn = other.querySelector('.faq-question');
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
        }
      });

      item.classList.toggle('is-open', !isOpen);
      btn.setAttribute('aria-expanded', String(!isOpen));
    });
  });
})();

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
      li.setAttribute('role', 'option');
      li.setAttribute('aria-selected', 'false');
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
    var items = list.querySelectorAll('li[role="option"]');
    items.forEach(function (li) { li.setAttribute('aria-selected', 'false'); });
    if (idx >= 0 && idx < items.length) {
      activeIdx = idx;
      items[idx].setAttribute('aria-selected', 'true');
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
    var items = list.querySelectorAll('li[role="option"]');
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
