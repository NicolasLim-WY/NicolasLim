// Public career dashboard. Every line here is approved, anonymized resume wording.
// Content follows the master CV. Update the master CV first, then this file.
// No personal contact details, pay, client names or contract values.
(function () {
  'use strict';

  var FUNCS = [
    { id: 1, name: 'Support and service desk' },
    { id: 2, name: 'Business analysis' },
    { id: 3, name: 'Service delivery' },
    { id: 4, name: 'Project delivery' }
  ];

  // [title, employer, start "YYYY-MM", end "YYYY-MM" or null for present, function id, client, one line]
  var ROLES = [
    ['Customer Service Engineer', 'Ricoh (Malaysia)', '2011-11', '2012-11', 1, '', 'Onsite field service under customer contracts and SLAs.'],
    ['Product Support Engineer', 'Fuji Xerox', '2012-11', '2014-05', 1, '', 'L2 and L3 remote support for Australia, New Zealand and Singapore.'],
    ['Senior Service Desk Analyst', 'Computacenter', '2014-05', '2016-03', 1, 'European Biopharma & Healthcare Enterprise', 'Senior escalation point for high-priority incidents.'],
    ['Technical Support Engineer', 'Kofax', '2016-03', '2017-10', 1, '', 'Support on document capture and RPA products.'],
    ['Senior User Support', 'TTMS', '2017-10', '2021-12', 1, 'Tier-1 Global Pharmaceutical Enterprise', 'L2 and L3 support for international affiliates on a legacy APAC CRM.'],
    ['Business Analyst Lead', 'TTMS', '2021-12', '2025-09', 2, 'Tier-1 Global Pharmaceutical Enterprise', 'Led the business analysis to retire a legacy APAC CRM across 14 affiliates.'],
    ['Service Delivery Manager', 'TTMS', '2025-08', '2026-07', 3, 'US Direct-Selling & FMCG Enterprise', 'Led 14 DBAs on a 24/7 follow-the-sun model. MIM for three P1 outages.'],
    ['Project Manager', 'EPAM Systems', '2026-08', null, 4, 'Tier-1 property intelligence and data analytics enterprise in Australia', 'Coordinated Agile Salesforce CPQ delivery.']
  ];

  // [competency, evidence, fit for sdm, mim, ba] where 2 = core, 1 = useful, 0 = not needed
  var SKILLS = [
    ['People leadership', 'Led 14 direct reports, India-based DBAs, supporting APAC, EMEA and the Americas 24/7.', 2, 1, 0],
    ['Major incident management', 'Led the incident bridge and wrote the initial and final post-incident reports for three P1 outages.', 2, 2, 0],
    ['Queue and backlog control', 'Cut Oracle ticket volume by 74% and in-progress tickets by 82%. Reached zero tickets aged beyond seven days.', 2, 2, 0],
    ['Shift handover and process controls', 'Shift-end handover calls, a queue manager on each shift, two-day follow-ups and MIM refreshers.', 2, 2, 0],
    ['Root cause analysis', 'Facilitated root cause analysis that traced repeat database hangs to an unscheduled data purge.', 1, 2, 0],
    ['Client trust and renewals', 'Helped rebuild client trust and secure a multi-million ringgit SOW renewal for 2026.', 2, 0, 0],
    ['ITSM on ServiceNow', 'Operational use across incident, request, change and problem, plus SPM and service reporting.', 2, 2, 1],
    ['Requirements and user stories', 'Problem statements, user stories and acceptance criteria for Salesforce Sales Cloud enhancements.', 0, 0, 2],
    ['Workshops and process mapping', 'Ran workshops and built as-is and to-be process slides.', 1, 0, 2],
    ['Legacy retirement and dependency mapping', 'Led the business analysis to retire a legacy APAC CRM across 14 affiliates, mapping more than a dozen connected systems.', 1, 0, 2],
    ['Release coordination', 'Coordinated CRM and mobile app release cycles, including forced app updates to meet regulatory rules.', 1, 0, 2],
    ['Agile delivery', 'Owned the JIRA backlog, sprint cadence and definitions of ready and done for Salesforce CPQ.', 1, 0, 2],
    ['Integration coordination', 'Coordinated the TIBCO to MuleSoft migration as the BA. Developers built the interfaces.', 0, 0, 1],
    ['Mandarin with stakeholders', 'Worked with China affiliate stakeholders in Mandarin.', 1, 1, 2]
  ];

  var LANES = {
    all: ['What I bring', 'IT delivery leader with 15 years across enterprise support, Salesforce CRM delivery and global database operations.'],
    sdm: ['For a Service Delivery Manager role', 'I led 14 direct reports on a 24/7 follow-the-sun model and helped rebuild client trust and secure a multi-million ringgit SOW renewal.'],
    mim: ['For an Incident or Problem Manager role', 'I led the incident bridge for three P1 outages, wrote the initial and final post-incident reports and facilitated the root cause analysis.'],
    ba: ['For a Business Analyst role', 'Business Analyst Lead with 4 years on Salesforce CRM. I led the business analysis to retire a legacy APAC CRM across 14 affiliates.']
  };
  var COL = { sdm: 2, mim: 3, ba: 4 };

  function $(id) { return document.getElementById(id); }
  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }
  function months(ym) { var p = ym.split('-'); return +p[0] * 12 + (+p[1] - 1); }
  function nowMonths() { var d = new Date(); return d.getFullYear() * 12 + d.getMonth(); }
  function label(ym) {
    if (!ym) return 'Present';
    var p = ym.split('-');
    return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][+p[1] - 1] + ' ' + p[0];
  }

  function legend() {
    $('legend').replaceChildren.apply($('legend'), FUNCS.map(function (f) {
      var s = el('span'); s.append(el('i', 'c' + f.id), f.name); return s;
    }));
  }

  function gantt() {
    var start = months('2011-01'), end = nowMonths() + 2, span = end - start, tip = $('tip');
    var pct = function (m) { return ((m - start) / span * 100) + '%'; };
    var years = [];
    for (var y = 2012; y * 12 <= end; y += 2) years.push(y);

    var rows = ROLES.map(function (r) {
      var row = el('div', 'grow'), lbl = el('div', 'lbl'), lane = el('div', 'lane');
      lbl.append(r[0]); lbl.append(el('small', '', r[1]));
      years.forEach(function (y) { var g = el('span', 'gl'); g.style.left = pct(y * 12); lane.append(g); });
      var a = months(r[2]), b = r[3] ? months(r[3]) : nowMonths() + 1;
      var bar = el('div', 'bar c' + r[4]);
      bar.style.left = pct(a); bar.style.width = ((b - a) / span * 100) + '%';
      bar.tabIndex = 0;
      var text = r[0] + ', ' + r[1] + '. ' + label(r[2]) + ' to ' + label(r[3]) + '. ' + (r[5] ? 'Client: ' + r[5] + '. ' : '') + r[6];
      bar.setAttribute('role', 'img');
      bar.setAttribute('aria-label', text);
      var show = function (x, y) {
        var b1 = el('b', '', r[0] + ' · ' + r[1]);
        var when = el('span', '', label(r[2]) + ' – ' + label(r[3]) + ' · ' + FUNCS[r[4] - 1].name);
        var parts = [b1, when, el('br')];
        if (r[5]) { parts.push(el('span', '', 'Client: ' + r[5])); parts.push(el('br')); }
        parts.push(document.createTextNode(r[6]));
        tip.replaceChildren.apply(tip, parts);
        tip.hidden = false;
        var w = tip.offsetWidth, h = tip.offsetHeight;
        tip.style.left = Math.max(8, Math.min(x + 12, window.innerWidth - w - 8)) + 'px';
        tip.style.top = Math.max(8, Math.min(y + 14, window.innerHeight - h - 8)) + 'px';
      };
      bar.addEventListener('pointermove', function (e) { show(e.clientX, e.clientY); });
      bar.addEventListener('pointerleave', function () { tip.hidden = true; });
      bar.addEventListener('focus', function () { var rc = bar.getBoundingClientRect(); show(rc.left, rc.bottom); });
      bar.addEventListener('blur', function () { tip.hidden = true; });
      lane.append(bar);
      row.append(lbl, lane);
      return row;
    });

    var axisRow = el('div', 'grow'), axis = el('div', 'axis');
    years.forEach(function (y) { var s = el('span', '', String(y)); s.style.left = pct(y * 12); axis.append(s); });
    axisRow.append(el('span'), axis);
    $('gantt').replaceChildren.apply($('gantt'), rows.concat([axisRow]));
  }

  function matrix(lane) {
    var c = COL[lane];
    var list = SKILLS.slice();
    if (c) list.sort(function (a, b) { return b[c] - a[c]; });
    $('matrix').replaceChildren.apply($('matrix'), list.map(function (s) {
      var tr = el('tr'), td = el('td');
      if (c && !s[c]) tr.className = 'dim';
      td.append(el('div', '', s[0]), el('div', 'ev', s[1]));
      tr.append(td);
      ['sdm', 'mim', 'ba'].forEach(function (k) {
        var v = s[COL[k]], cell = el('td', 'fit' + (k === lane ? ' hl' : ''));
        if (v) cell.append(el('span', 'dot' + (v === 2 ? ' core' : ''), v === 2 ? 'Core' : 'Useful'));
        else cell.append(el('span', 'mono', '–'));
        tr.append(cell);
      });
      return tr;
    }));
    document.querySelectorAll('th[data-col]').forEach(function (th) {
      th.classList.toggle('hl', th.getAttribute('data-col') === lane);
    });
  }

  function setLane(lane) {
    document.querySelectorAll('#lanes button').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-lane') === lane));
    });
    $('pitch-label').textContent = LANES[lane][0];
    $('pitch').textContent = LANES[lane][1];
    matrix(lane);
  }

  document.querySelectorAll('#lanes button').forEach(function (b) {
    b.addEventListener('click', function () { setLane(b.getAttribute('data-lane')); });
  });
  window.addEventListener('scroll', function () { $('tip').hidden = true; }, { passive: true });

  legend();
  gantt();
  setLane('all');
})();
