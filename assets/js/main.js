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
  var btn   = document.getElementById('nav-menu-btn');
  var panel = document.getElementById('nav-mobile');
  if (!btn || !panel) return;

  btn.addEventListener('click', function () {
    var open = btn.getAttribute('aria-expanded') === 'true';
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
  var items = document.querySelectorAll('.faq-item');
  items.forEach(function (item) {
    var btn    = item.querySelector('.faq-question');
    var answer = item.querySelector('.faq-answer');
    if (!btn || !answer) return;

    btn.addEventListener('click', function () {
      var isOpen = item.classList.contains('is-open');

      items.forEach(function (other) {
        if (other !== item) {
          other.classList.remove('is-open');
          var otherBtn = other.querySelector('.faq-question');
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
      var id = a.getAttribute('href').slice(1);
      e.preventDefault();
      if (!id) return;
      var target = document.getElementById(id);
      if (!target) return;
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
})();

/* -------------------------------------------------------
   CTA click events
------------------------------------------------------- */
(function () {
  document.querySelectorAll('a[data-event="whatsapp"]').forEach(function (a) {
    a.addEventListener('click', function () {
      pushEvent('whatsapp_click', { cta_label: a.textContent.trim().replace(/\s+/g, ' '), cta_location: a.dataset.location || 'unknown' });
    });
  });

  document.querySelectorAll('a[data-event="demo"]').forEach(function (a) {
    a.addEventListener('click', function () {
      pushEvent('demo_click', { cta_label: a.textContent.trim().replace(/\s+/g, ' '), cta_location: a.dataset.location || 'unknown' });
    });
  });

  document.querySelectorAll('a[data-event="cta"]').forEach(function (a) {
    a.addEventListener('click', function () {
      pushEvent('cta_click', { cta_label: a.textContent.trim().replace(/\s+/g, ' '), cta_location: a.dataset.location || 'unknown' });
    });
  });

  (function () {
    var pricing = document.getElementById('preco');
    if (!pricing) return;
    var fired = false;
    var observer = new IntersectionObserver(function (entries) {
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
  var params = new URLSearchParams(window.location.search);
  return {
    utm_source:   params.get('utm_source')   || undefined,
    utm_medium:   params.get('utm_medium')   || undefined,
    utm_campaign: params.get('utm_campaign') || undefined,
    utm_content:  params.get('utm_content')  || undefined,
    utm_term:     params.get('utm_term')     || undefined,
  };
}

/* -------------------------------------------------------
   Form value maps (HTML value → API enum)
------------------------------------------------------- */
var PERFIL_MAP = {
  'solo':    'psychologist_solo',
  'clinica': 'clinic',
  'outro':   'other',
};

var ATEND_MAP = {
  'ate-10': 'up_to_10',
  '11-20':  'from_11_to_20',
  '21-40':  'from_21_to_40',
  '40+':    'more_than_40',
};

var AGENDA_MAP = {
  'google':    'google_calendar',
  'caderno':   'notebook',
  'sistema':   'system',
  'whatsapp':  'whatsapp',
  'outro':     'other',
};

var PAGAMENTOS_MAP = {
  'planilha': 'spreadsheet',
  'caderno':  'notebook',
  'sistema':  'system',
  'memoria':  'memory',
  'outro':    'other',
};

var INCOMODA_MAP = {
  'agenda':     'agenda',
  'faltas':     'absences_reschedules',
  'pagamentos': 'pending_payments',
  'evolucoes':  'clinical_evolutions',
  'whatsapp':   'whatsapp_disorganized',
  'outro':      'other',
};

var DEMO_MAP = {
  'sim':      'yes',
  'sozinho':  'prefer_test_alone',
  'info':     'only_information',
};

/* -------------------------------------------------------
   Lead form
------------------------------------------------------- */
(function () {
  var form      = document.getElementById('lead-form-el');
  var success   = document.getElementById('form-success');
  var errorEl   = document.getElementById('form-error');
  var submitBtn = form ? form.querySelector('[type="submit"]') : null;
  if (!form || !submitBtn) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    if (submitBtn.disabled) return;

    var nome       = document.getElementById('f-nome').value.trim();
    var whatsapp   = document.getElementById('f-whatsapp').value.trim();
    var cidade     = document.getElementById('f-cidade').value.trim();
    var atend      = document.getElementById('f-atendimentos').value;
    var agenda     = document.getElementById('f-agenda').value;
    var pagamentos = document.getElementById('f-pagamentos').value;
    var incomoda   = document.getElementById('f-incomoda').value;
    var demo       = document.getElementById('f-demo').value;
    var perfilEl   = form.querySelector('input[name="perfil"]:checked');
    var perfil     = perfilEl ? perfilEl.value : '';
    var honeypot   = document.getElementById('f-website');

    if (!nome || !whatsapp || !cidade) {
      showError('Preencha nome, WhatsApp e cidade.');
      return;
    }

    var waClean = whatsapp.replace(/\D/g, '');
    if (waClean.length < 10 || waClean.length > 13) {
      showError('WhatsApp inválido. Use o formato (54) 99999-9999.');
      return;
    }

    if (!atend || !agenda || !pagamentos || !incomoda || !demo) {
      showError('Selecione todas as opções para personalizarmos seu acesso.');
      return;
    }

    clearError();
    setLoading(true);

    var utms = getUtms();

    var payload = {
      lead: Object.assign({
        name:                 nome,
        whatsapp:             whatsapp,
        city:                 cidade,
        user_type:            PERFIL_MAP[perfil]     || 'other',
        monthly_appointments: ATEND_MAP[atend]        || atend,
        agenda_control:       AGENDA_MAP[agenda]      || agenda,
        payment_control:      PAGAMENTOS_MAP[pagamentos] || pagamentos,
        main_pain:            INCOMODA_MAP[incomoda]  || incomoda,
        demo_interest:        DEMO_MAP[demo]          || demo,
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
      if (res.status === 201) return res.json().then(function () { showSuccess(nome); });
      if (res.status === 422) return res.json().then(function (data) {
        var msgs = [];
        if (data && data.errors) {
          Object.keys(data.errors).forEach(function (k) {
            msgs = msgs.concat(data.errors[k]);
          });
        }
        showError(msgs.length ? msgs.join(' ') : 'Verifique os dados e tente novamente.');
      });
      throw new Error('server_error');
    })
    .catch(function () {
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

  function showSuccess(nome) {
    var firstName = nome.split(' ')[0];
    document.getElementById('success-name').textContent = firstName;
    pushEvent('lead_form_submit', {
      form_name:            'lead_form',
      lead_type:            PERFIL_MAP[perfil]           || 'other',
      monthly_appointments: ATEND_MAP[atend]              || atend,
      agenda_control:       AGENDA_MAP[agenda]            || agenda,
      payment_control:      PAGAMENTOS_MAP[pagamentos]    || pagamentos,
      main_pain:            INCOMODA_MAP[incomoda]        || incomoda,
      demo_interest:        DEMO_MAP[demo]                || demo,
    });
    form.style.display = 'none';
    if (success) {
      success.classList.add('is-visible');
      success.focus();
    }
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
})();
