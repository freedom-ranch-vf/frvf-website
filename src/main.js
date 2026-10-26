(function () {

  function sendToZoho(z, d) {
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var branchMap = { 'Army National Guard': 'Army', 'Air National Guard': 'Air Force' };
    var valid = ['Army','Navy','Marine Corps','Air Force','Space Force','Coast Guard'];
    var branch = branchMap[d.branch] || d.branch || '';
    if (valid.indexOf(branch) < 0) branch = '';
    var date = '';
    var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(d.separation_date || '');
    if (m) date = months[parseInt(m[2], 10) - 1] + ' ' + parseInt(m[3], 10) + ', ' + m[1];
    var parts = (d.full_name || '').trim().split(/\s+/);
    var last = parts.length > 1 ? parts.pop() : parts[0] || 'Unknown';
    var first = parts.join(' ');
    var story = [
      'City/State: ' + (d.city_state || ''),
      'Age range: ' + (d.age_range || ''),
      'Branch: ' + (d.branch || ''),
      'Service status: ' + (d.service_status || ''),
      'Rank group: ' + (d.rank_group || ''),
      'Years served: ' + (d.years_served || ''),
      'Transition: ' + (d.status || ''),
      'Retreat format: ' + (d.retreat_format || ''),
      'Hoping for: ' + (d.hoping_for || ''),
      'Biggest concern: ' + (d.biggest_concern || '')
    ].join('\n');
    var fields = {
      xnQsjsdp: z.xnQsjsdp, xmIwtLD: z.xmIwtLD, actionType: z.actionType, returnURL: z.returnURL,
      'Company': 'Individual (website application)',
      'Last Name': last, 'First Name': first, 'Email': d.email || '', 'Phone': d.phone || '',
      'Lead Source': 'Website Apply Form',
      LEADCF3: d.travel || '', LEADCF4: branch, LEADCF52: date, LEADCF2: story, LEADCF1: d.how_heard || ''
    };
    var name = 'zoho-frame-' + Date.now();
    var frame = document.createElement('iframe');
    frame.name = name; frame.style.display = 'none'; frame.setAttribute('aria-hidden', 'true');
    var f = document.createElement('form');
    f.method = 'POST'; f.action = z.action; f.target = name; f.style.display = 'none';
    Object.keys(fields).forEach(function (k) {
      var i = document.createElement('input'); i.type = 'hidden'; i.name = k; i.value = fields[k]; f.appendChild(i);
    });
    document.body.appendChild(frame); document.body.appendChild(f);
    f.submit();
    setTimeout(function () { f.remove(); frame.remove(); }, 15000);
  }

  // Mobile menu
  var btn = document.querySelector('.menu-btn');
  var nav = document.getElementById('primary-nav');
  if (btn && nav) {
    btn.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      btn.textContent = open ? 'Close' : 'Menu';
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('open')) {
        nav.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
        btn.textContent = 'Menu';
        btn.focus();
      }
    });
  }

  // Click-to-play video embeds (no third-party requests until clicked)
  document.querySelectorAll('button.video-thumb[data-embed]').forEach(function (b) {
    b.addEventListener('click', function () {
      var f = document.createElement('iframe');
      f.src = b.getAttribute('data-embed');
      f.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
      f.allowFullscreen = true;
      f.title = b.getAttribute('aria-label') || 'Video';
      b.replaceChildren(f);
      b.removeAttribute('data-embed');
    });
  });

  // Article category filters
  var filters = document.querySelector('.filters');
  if (filters) {
    filters.addEventListener('click', function (e) {
      var t = e.target.closest('button');
      if (!t) return;
      var cat = t.getAttribute('data-cat');
      filters.querySelectorAll('button').forEach(function (x) {
        x.setAttribute('aria-pressed', x === t ? 'true' : 'false');
      });
      document.querySelectorAll('[data-article]').forEach(function (a) {
        a.hidden = !(cat === 'all' || a.getAttribute('data-article') === cat);
      });
    });
  }

  // Preselect the contact topic from ?topic=hosting, ?topic=vehicle, etc.
  try {
    var topic = new URLSearchParams(window.location.search).get('topic');
    var sel = document.getElementById('f-topic');
    if (topic && sel) {
      Array.prototype.forEach.call(sel.options, function (o) {
        if (o.text.toLowerCase().indexOf(topic.toLowerCase()) !== -1) sel.value = o.text;
      });
    }
  } catch (err) { /* ignore */ }

  // Forms: post to the configured endpoint, or fall back to a pre-filled email
  document.querySelectorAll('form.form').forEach(function (form) {
    var status = form.querySelector('.form-status');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      status.className = 'form-status';
      status.textContent = '';

      var bad = null;
      form.querySelectorAll('[required]').forEach(function (el) {
        var ok = el.type === 'checkbox' ? el.checked : el.value.trim() !== '';
        if (ok && el.type === 'email') ok = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(el.value);
        el.classList.toggle('invalid', !ok);
        if (!ok && !bad) bad = el;
      });
      if (bad) {
        status.className = 'form-status err';
        status.textContent = 'Please complete the highlighted fields.';
        bad.focus();
        return;
      }

      var fd = new FormData(form);
      if (fd.get('company')) return; // honeypot
      fd.delete('company');
      var data = {};
      fd.forEach(function (v, k) { data[k] = v; });

      // Copy the application into Zoho CRM (hidden form posted into an iframe, so the page never leaves).
      var zraw = form.getAttribute('data-zoho');
      if (zraw) {
        try { sendToZoho(JSON.parse(zraw), data); } catch (err) { /* Netlify copy below is the backup */ }
      }

      var endpoint = form.getAttribute('data-endpoint');
      if (endpoint) {
        status.textContent = 'Sending...';
        fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
          .then(function (r) {
            if (!r.ok) throw new Error('bad status');
            status.className = 'form-status ok';
            status.textContent = status.getAttribute('data-success');
            form.reset();
          })
          .catch(function () {
            status.className = 'form-status err';
            status.textContent = 'Something went wrong. Please email ' + form.getAttribute('data-mailto') + ' and we will help you directly.';
          });
        return;
      }

      if (form.hasAttribute('data-netlify')) {
        status.textContent = 'Sending...';
        var body = new URLSearchParams(new FormData(form)).toString();
        fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: body })
          .then(function (r) {
            if (!r.ok) throw new Error('bad status');
            status.className = 'form-status ok';
            status.textContent = status.getAttribute('data-success');
            form.reset();
          })
          .catch(function () {
            status.className = 'form-status err';
            status.textContent = 'Something went wrong. Please email ' + form.getAttribute('data-mailto') + ' and we will help you directly.';
          });
        return;
      }

      var lines = Object.keys(data).map(function (k) { return k.replace(/_/g, ' ') + ': ' + data[k]; });
      var href = 'mailto:' + form.getAttribute('data-mailto') +
        '?subject=' + encodeURIComponent(form.getAttribute('data-subject')) +
        '&body=' + encodeURIComponent(lines.join('\n'));
      window.location.href = href;
      status.className = 'form-status ok';
      status.textContent = 'Your email app should open with your details filled in. Just hit send.';
    });
  });
})();
