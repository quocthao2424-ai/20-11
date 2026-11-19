(function () {
  'use strict';

  var data = window.NOI_DUNG_THIEP || {};
  var byId = function (id) { return document.getElementById(id); };
  var reduceMotion = window.matchMedia
    ? window.matchMedia('(prefers-reduced-motion: reduce)')
    : { matches: false };

  /* ---------- Tiện ích ---------- */
  function clean(value) {
    return typeof value === 'string' ? value.trim() : '';
  }
  function cleanList(value) {
    return Array.isArray(value) ? value.map(clean).filter(Boolean) : [];
  }
  function setText(id, value) {
    var text = clean(value);
    if (text && byId(id)) byId(id).textContent = text;
  }
  function make(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }
  function fillParagraphs(container, text) {
    container.textContent = '';
    text.replace(/\r\n?/g, '\n').split(/\n\s*\n/).forEach(function (paragraph) {
      var p = make('p');
      paragraph.split('\n').forEach(function (line, i) {
        if (i > 0) p.appendChild(document.createElement('br'));
        p.appendChild(document.createTextNode(line.trim()));
      });
      container.appendChild(p);
    });
  }
  function enabled(section) {
    return !!section && section.batDau !== false;
  }
  function center(el) {
    var r = el.getBoundingClientRect();
    return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
  }

  /* ---------- Hiệu ứng: hoa rơi và pháo hoa trái tim ---------- */
  var fx = (function () {
    var canvas = byId('fx');
    var ctx = canvas && canvas.getContext ? canvas.getContext('2d') : null;
    var colors = ['#e3a59b', '#dc978c', '#eab4ab', '#f2c9c1', '#c98a80', '#f3d29b', '#d9877c'];
    var parts = [];
    var rainUntil = 0;
    var running = false;
    var last = 0;
    var width = 0;
    var height = 0;

    function resize() {
      if (!ctx) return;
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function pick(list) { return list[Math.floor(Math.random() * list.length)]; }

    function addPetal() {
      parts.push({
        kind: Math.random() < 0.25 ? 'heart' : 'petal',
        x: Math.random() * width,
        y: -20,
        vx: (Math.random() - 0.5) * 0.6,
        vy: 0.8 + Math.random() * 1.2,
        g: 0,
        size: 6 + Math.random() * 7,
        rot: Math.random() * Math.PI * 2,
        vr: (Math.random() - 0.5) * 0.06,
        sway: Math.random() * Math.PI * 2,
        color: pick(colors),
        life: 0,
        maxLife: Infinity
      });
    }

    function drawHeart(s) {
      ctx.beginPath();
      ctx.moveTo(0, -s * 0.25);
      ctx.bezierCurveTo(0, -s * 0.5, -s * 0.5, -s * 0.5, -s * 0.5, -s * 0.2);
      ctx.bezierCurveTo(-s * 0.5, s * 0.1, 0, s * 0.3, 0, s * 0.5);
      ctx.bezierCurveTo(0, s * 0.3, s * 0.5, s * 0.1, s * 0.5, -s * 0.2);
      ctx.bezierCurveTo(s * 0.5, -s * 0.5, 0, -s * 0.5, 0, -s * 0.25);
      ctx.fill();
    }

    function frame(now) {
      var dt = last ? Math.min((now - last) / 16.67, 3) : 1;
      last = now;
      ctx.clearRect(0, 0, width, height);

      if (now < rainUntil && Math.random() < 0.35 * dt) addPetal();

      for (var i = parts.length - 1; i >= 0; i--) {
        var p = parts[i];
        p.life += dt;
        p.sway += 0.03 * dt;
        p.vy += p.g * dt;
        p.x += (p.vx + Math.sin(p.sway) * 0.5) * dt;
        p.y += p.vy * dt;
        p.rot += p.vr * dt;
        if (p.g) { p.vx *= Math.pow(0.985, dt); }

        var alpha = p.maxLife === Infinity ? 0.9 : Math.max(0, 1 - p.life / p.maxLife);
        if (p.y > height + 30 || alpha <= 0) { parts.splice(i, 1); continue; }

        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        if (p.kind === 'heart') {
          drawHeart(p.size * 1.6);
        } else {
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size, p.size * 0.55, 0, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      if (parts.length || now < rainUntil) {
        window.requestAnimationFrame(frame);
      } else {
        running = false;
        last = 0;
        ctx.clearRect(0, 0, width, height);
      }
    }

    function start() {
      if (running) return;
      running = true;
      window.requestAnimationFrame(frame);
    }

    if (ctx) {
      resize();
      window.addEventListener('resize', resize);
    }

    return {
      pop: function (x, y) {
        if (!ctx || reduceMotion.matches) return;
        for (var i = 0; i < 7; i++) {
          var angle = -Math.PI / 2 + (Math.random() - 0.5) * 2.2;
          var speed = 1.5 + Math.random() * 2.8;
          parts.push({
            kind: 'heart', x: x, y: y,
            vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed,
            g: 0.05, size: 5 + Math.random() * 4,
            rot: (Math.random() - 0.5) * 0.6, vr: (Math.random() - 0.5) * 0.05,
            sway: 0, color: pick(colors), life: 0, maxLife: 55 + Math.random() * 25
          });
        }
        start();
      },
      rain: function (ms) {
        if (!ctx || reduceMotion.matches) return;
        rainUntil = Math.max(rainUntil, performance.now() + ms);
        start();
      },
      burst: function (x, y, count) {
        if (!ctx || reduceMotion.matches) return;
        for (var i = 0; i < count; i++) {
          var angle = Math.random() * Math.PI * 2;
          var speed = 3 + Math.random() * 6;
          parts.push({
            kind: Math.random() < 0.7 ? 'heart' : 'petal',
            x: x,
            y: y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed - 3,
            g: 0.14,
            size: 6 + Math.random() * 6,
            rot: Math.random() * Math.PI * 2,
            vr: (Math.random() - 0.5) * 0.2,
            sway: 0,
            color: pick(colors),
            life: 0,
            maxLife: 90 + Math.random() * 50
          });
        }
        start();
      }
    };
  })();

  /* ---------- Nhạc nền (tùy chọn) ---------- */
  var music = (function () {
    var src = clean(data.nhac);
    var btn = byId('music-btn');
    if (!src) return { play: function () {} };
    var audio = new Audio(src);
    audio.loop = true;
    audio.preload = 'none';

    function sync(playing) {
      btn.setAttribute('aria-pressed', playing ? 'true' : 'false');
      btn.setAttribute('aria-label', playing ? 'Tắt nhạc' : 'Bật nhạc');
    }
    function play() {
      var promise = audio.play();
      if (promise && promise.then) {
        promise.then(function () { sync(true); }, function () { sync(false); });
      } else {
        sync(true);
      }
    }
    btn.addEventListener('click', function () {
      if (audio.paused) { play(); } else { audio.pause(); sync(false); }
    });
    audio.addEventListener('error', function () { btn.hidden = true; });
    btn.hidden = false;
    return { play: play };
  })();

  /* ---------- Chuyển giữa các màn (mỗi màn một màn hình) ---------- */
  var scenes = ['scene-letter'];
  if (enabled(data.baiKiemTra) && Array.isArray(data.baiKiemTra.cauHoi) && data.baiKiemTra.cauHoi.length) scenes.push('scene-quiz');
  if (enabled(data.giayKhen)) scenes.push('scene-award');
  if (enabled(data.hopQua)) scenes.push('scene-gift');
  ['scene-quiz', 'scene-award', 'scene-gift'].forEach(function (id) {
    if (scenes.indexOf(id) < 0) byId(id).hidden = true;
  });

  var current = 0;
  var unlocked = 0;          // màn xa nhất đã được phép tới
  var navNext = byId('nav-next');
  var navBack = byId('nav-back');
  var dots = byId('dots');
  var nextLabels = {
    'scene-letter': clean(data.nutSauThu) || 'Còn bất ngờ nữa đó',
    'scene-quiz': clean(data.baiKiemTra && data.baiKiemTra.nutTiep) || 'Tiếp',
    'scene-award': clean(data.giayKhen && data.giayKhen.nutTiep) || 'Tiếp'
  };

  scenes.forEach(function () { dots.appendChild(make('li')); });

  function setInert(section, value) {
    if (value) {
      section.setAttribute('inert', '');
      section.setAttribute('aria-hidden', 'true');
    } else {
      section.removeAttribute('inert');
      section.removeAttribute('aria-hidden');
    }
  }

  function updateNav() {
    navBack.hidden = current === 0;
    var canNext = unlocked > current && current < scenes.length - 1;
    navNext.hidden = !canNext;
    if (canNext) navNext.textContent = nextLabels[scenes[current]] || 'Tiếp';
    Array.prototype.forEach.call(dots.children, function (dot, i) {
      if (i === current) dot.setAttribute('aria-current', 'step');
      else dot.removeAttribute('aria-current');
      dot.classList.toggle('is-done', i <= unlocked && i !== current);
    });
    dots.setAttribute('aria-label', 'Màn ' + (current + 1) + ' trên ' + scenes.length);
  }

  function unlock(index) {
    if (index > unlocked) unlocked = Math.min(index, scenes.length - 1);
    updateNav();
  }

  function focusFirst(section) {
    var target = section.querySelector('[tabindex="-1"]');
    if (!target) return;
    try { target.focus({ preventScroll: true }); } catch (e) { target.focus(); }
  }

  function goTo(index) {
    if (index < 0 || index >= scenes.length || index > unlocked || index === current) return;
    var from = byId(scenes[current]);
    var to = byId(scenes[index]);
    var forward = index > current;

    from.classList.remove('is-active');
    from.classList.toggle('is-before', forward);
    setInert(from, true);

    to.classList.remove('is-before');
    if (!forward) to.classList.add('is-before');
    // Đặt vị trí xuất phát rồi mới bật để hiệu ứng trượt chạy đúng hướng.
    void to.offsetWidth;
    to.classList.remove('is-before');
    to.classList.add('is-active');
    to.scrollTop = 0;
    setInert(to, false);

    current = index;
    updateNav();
    focusFirst(to);

    if (scenes[index] === 'scene-award') {
      unlock(index + 1);
      window.setTimeout(function () {
        var c = center(to.querySelector('.award-stamp'));
        fx.burst(c.x, c.y, 26);
      }, reduceMotion.matches ? 0 : 900);
    }
  }

  navNext.addEventListener('click', function () { goTo(current + 1); });
  navBack.addEventListener('click', function () { goTo(current - 1); });

  // Vuốt ngang để chuyển màn.
  (function () {
    var startX = 0, startY = 0, tracking = false;
    var stage = byId('stage');
    stage.addEventListener('touchstart', function (e) {
      if (e.touches.length !== 1) { tracking = false; return; }
      tracking = true;
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    }, { passive: true });
    stage.addEventListener('touchend', function (e) {
      if (!tracking) return;
      tracking = false;
      var t = e.changedTouches[0];
      var dx = t.clientX - startX;
      var dy = t.clientY - startY;
      if (Math.abs(dx) < 60 || Math.abs(dy) > Math.abs(dx) * 0.7) return;
      if (dx < 0) goTo(current + 1); else goTo(current - 1);
    }, { passive: true });
  })();

  // Phím mũi tên trái/phải trên máy tính.
  document.addEventListener('keydown', function (e) {
    if (e.altKey || e.ctrlKey || e.metaKey) return;
    if (e.key === 'ArrowRight') goTo(current + 1);
    else if (e.key === 'ArrowLeft') goTo(current - 1);
  });

  /* ---------- Màn 1: Phong thư ---------- */
  var envelope = byId('envelope');
  var letter = byId('letter');
  var openBtn = byId('open-btn');

  function renderLetter() {
    var name = clean(data.tenNguoiNhan) || 'em';
    var title = 'Gửi ' + name;
    byId('cover-title').textContent = title;
    document.title = title + ', ngày 20/11';

    setText('cover-date', data.ngay);
    setText('letter-date', data.ngayTrongThu);
    setText('letter-closing', data.loiKet);
    setText('letter-name', data.chuKy);

    var greeting = clean(data.loiMoDau);
    if (greeting) byId('letter-greeting').textContent = greeting;
    else if (data.loiMoDau === '') byId('letter-greeting').hidden = true;

    var message = clean(data.loiChuc);
    if (message) fillParagraphs(byId('letter-body'), message);

    var src = clean(data.anhKyNiem);
    if (src) {
      var frame = byId('letter-photo');
      var img = new Image();
      img.alt = clean(data.moTaAnh) || 'Ảnh kỷ niệm';
      img.decoding = 'async';
      img.onload = function () {
        frame.appendChild(img);
        frame.hidden = false;
        measure();
      };
      img.onerror = function () { frame.hidden = true; };
      img.src = src;
    }
  }

  // Phần lá thư nhô lên khỏi phong bì khi mở.
  function measure() {
    var lift = parseFloat(getComputedStyle(envelope).getPropertyValue('--lift')) || 0;
    var rise = Math.max(0, letter.offsetHeight - envelope.offsetHeight + lift);
    envelope.style.setProperty('--rise', Math.ceil(rise) + 'px');
  }

  function openLetter() {
    if (envelope.classList.contains('is-open')) return;
    measure();
    envelope.classList.add('is-open');
    openBtn.setAttribute('aria-expanded', 'true');
    music.play();

    try { letter.focus({ preventScroll: true }); } catch (e) { letter.focus(); }
    openBtn.hidden = true;

    var wait = reduceMotion.matches ? 0 : 420;
    window.setTimeout(function () {
      var scene = byId('scene-letter');
      var top = letter.getBoundingClientRect().top - scene.getBoundingClientRect().top;
      scene.scrollTo({ top: Math.max(0, scene.scrollTop + top - 60), behavior: wait ? 'smooth' : 'auto' });
      fx.rain(5000);
      unlock(1);
    }, wait);
  }

  /* ---------- Màn 2: Bài kiểm tra (từng câu một) ---------- */
  function renderQuiz() {
    var quiz = data.baiKiemTra;
    if (scenes.indexOf('scene-quiz') < 0) return;
    var sceneIndex = scenes.indexOf('scene-quiz');

    setText('quiz-title', quiz.tieuDe);
    setText('quiz-subject', quiz.mon);
    setText('quiz-name', quiz.hoTen);
    var hint = byId('quiz-hint');
    hint.textContent = clean(quiz.huongDan);
    hint.hidden = !hint.textContent;

    var list = byId('quiz-list');
    var questions = quiz.cauHoi.filter(function (q) { return q && clean(q.hoi) && cleanList(q.traLoi).length; });
    var items = [];

    function show(i) {
      items.forEach(function (item, k) { item.hidden = k !== i; });
      var q = items[i].querySelector('.quiz-q');
      if (i > 0) { try { q.focus({ preventScroll: true }); } catch (e) { q.focus(); } }
    }

    questions.forEach(function (q, qi) {
      var item = make('li', 'quiz-item');
      var question = make('p', 'quiz-q');
      question.id = 'quiz-q-' + qi;
      question.tabIndex = -1;
      question.appendChild(make('span', 'quiz-no', 'Câu ' + (qi + 1) + '/' + questions.length));
      question.appendChild(document.createTextNode(clean(q.hoi)));
      var group = make('div', 'quiz-options');
      group.setAttribute('role', 'group');
      group.setAttribute('aria-labelledby', question.id);
      var reply = make('p', 'quiz-reply');
      reply.setAttribute('aria-live', 'polite');

      var buttons = cleanList(q.traLoi).map(function (answer) {
        var btn = make('button', 'quiz-option', answer);
        btn.type = 'button';
        btn.setAttribute('aria-pressed', 'false');
        btn.addEventListener('click', function () {
          if (item.classList.contains('is-done')) return;
          item.classList.add('is-done');
          btn.setAttribute('aria-pressed', 'true');
          buttons.forEach(function (other) { if (other !== btn) other.disabled = true; });
          reply.textContent = clean(q.phanHoi) || 'Đúng rồi!';
          var c = center(btn);
          fx.burst(c.x, c.y, 10);
          window.setTimeout(function () {
            if (qi + 1 < items.length) show(qi + 1);
            else grade(sceneIndex);
          }, 1600);
        });
        group.appendChild(btn);
        return btn;
      });

      item.appendChild(question);
      item.appendChild(group);
      item.appendChild(reply);
      list.appendChild(item);
      items.push(item);
    });

    if (items.length) show(0);
  }

  function grade(sceneIndex) {
    var quiz = data.baiKiemTra;
    var score = byId('quiz-score');
    var value = byId('quiz-score-value');
    var points = clean(quiz.diem) || '10';
    byId('quiz-list').hidden = true;
    byId('quiz-hint').hidden = true;
    value.textContent = points;
    value.setAttribute('aria-label', points + ' điểm');
    score.classList.add('is-graded');
    var remark = clean(quiz.loiPhe);
    if (remark) {
      byId('quiz-remark-text').textContent = remark;
      byId('quiz-remark').hidden = false;
    }
    var c = center(score);
    fx.burst(c.x, c.y, 40);
    unlock(sceneIndex + 1);
  }

  /* ---------- Màn 3: Giấy khen ---------- */
  function renderAward() {
    var award = data.giayKhen;
    if (scenes.indexOf('scene-award') < 0) return;
    setText('award-nation', award.quocHieu);
    setText('award-motto', award.tieuNgu);
    setText('award-title', award.tieuDe);
    setText('award-name', award.traoTang);
    setText('award-honor', award.danhHieu);
    setText('award-date', data.ngayTrongThu);
    setText('award-signer', award.nguoiTrao);
    setText('award-signature', data.chuKy);
    setText('award-stamp-text', award.chuDau);

    var reasons = cleanList(award.lyDo);
    var ul = byId('award-reasons');
    reasons.forEach(function (reason) { ul.appendChild(make('li', '', reason)); });
    if (!reasons.length) byId('award-reason-label').hidden = true;
  }

  /* ---------- Màn 4: Hộp quà ---------- */
  function renderGift() {
    var gift = data.hopQua;
    if (scenes.indexOf('scene-gift') < 0) return;
    setText('gift-title', gift.tieuDe);
    setText('gift-hint', gift.goiY);
    setText('bouquet-note', gift.loiNhanHoa);
    setText('coupons-title', gift.tieuDePhieu);
    setText('ask-question', gift.cauHoiCuoi);
    setText('ask-yes', gift.nutCo);
    setText('ask-no', gift.nutKhong);
    setText('restart-btn', gift.nutXemLai);

    var coupons = cleanList(gift.phieuQua);
    var ul = byId('coupons');
    coupons.forEach(function (text, i) {
      var li = make('li', 'coupon');
      li.style.setProperty('--d', (0.9 + i * 0.15) + 's');
      var no = make('span', 'coupon-no');
      no.appendChild(document.createTextNode('Phiếu'));
      no.appendChild(make('strong', '', String(i + 1)));
      var body = make('div', 'coupon-body');
      body.appendChild(make('p', 'coupon-text', text));
      if (clean(gift.hanDung)) body.appendChild(make('p', 'coupon-exp', clean(gift.hanDung)));
      li.appendChild(no);
      li.appendChild(body);
      ul.appendChild(li);
    });

    // Các bước bên trong hộp quà: bó hoa → phiếu quà → câu hỏi cuối.
    function showStep(id, focusId) {
      ['gift-step-flower', 'gift-step-coupons', 'gift-step-ask'].forEach(function (stepId) {
        byId(stepId).hidden = stepId !== id;
      });
      var scene = byId('scene-gift');
      scene.scrollTop = 0;
      var target = byId(focusId);
      try { target.focus({ preventScroll: true }); } catch (e) { target.focus(); }
    }
    setText('to-coupons', gift.nutXemPhieu);
    setText('to-ask', gift.nutCauHoi);
    byId('to-coupons').addEventListener('click', function () {
      if (coupons.length) showStep('gift-step-coupons', 'coupons-title');
      else showStep('gift-step-ask', 'ask-question');
    });
    byId('to-ask').addEventListener('click', function () {
      showStep('gift-step-ask', 'ask-question');
      var c = center(byId('ask-question'));
      fx.burst(c.x, c.y, 24);
    });

    var giftBtn = byId('gift-btn');
    giftBtn.addEventListener('click', function () {
      if (giftBtn.classList.contains('is-open')) return;
      giftBtn.classList.add('is-open');
      var c = center(giftBtn);
      fx.burst(c.x, c.y, 60);
      fx.rain(4000);
      window.setTimeout(function () {
        byId('gift-stage').hidden = true;
        byId('gift-content').hidden = false;
        var heading = byId('gift-title');
        try { heading.focus({ preventScroll: true }); } catch (e) { heading.focus(); }
      }, reduceMotion.matches ? 0 : 650);
    });

    // Câu hỏi cuối: bấm “Không” thì nút nhỏ dần, nút “Có” to dần.
    var yes = byId('ask-yes');
    var no = byId('ask-no');
    var pleas = cleanList(gift.khiBamKhong);
    var tries = 0;
    no.addEventListener('click', function () {
      tries += 1;
      if (pleas.length) no.textContent = pleas[(tries - 1) % pleas.length];
      yes.style.setProperty('--s', Math.min(1 + tries * 0.15, 1.75).toFixed(2));
      no.style.setProperty('--n', Math.max(1 - tries * 0.08, 0.7).toFixed(2));
    });

    yes.addEventListener('click', function () {
      var c = center(yes);
      byId('ask-buttons').hidden = true;
      var answer = byId('ask-answer');
      answer.textContent = '';
      var heart = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      heart.setAttribute('viewBox', '0 0 24 24');
      heart.setAttribute('class', 'big-heart');
      heart.setAttribute('aria-hidden', 'true');
      heart.innerHTML = '<path fill="currentColor" d="M12 20.5s-7.5-4.6-7.5-10.2A4.2 4.2 0 0 1 12 7.6a4.2 4.2 0 0 1 7.5 2.7c0 5.6-7.5 10.2-7.5 10.2z"/>';
      answer.appendChild(heart);
      answer.appendChild(make('p', '', clean(gift.loiCuoi) || 'Anh cũng thương em nhiều lắm!'));
      var restart = byId('restart-btn');
      restart.hidden = false;
      try { restart.focus({ preventScroll: true }); } catch (e) { restart.focus(); }
      fx.burst(c.x, c.y, 90);
      fx.rain(7000);
    });

    byId('restart-btn').addEventListener('click', function () {
      // Quay về màn đầu, đi lùi qua từng màn để hiệu ứng trượt tự nhiên.
      goTo(0);
    });
  }

  /* ---------- Hoạt ảnh nền: dây đèn, đốm sáng, tim bay, bướm ---------- */
  function rand(min, max) { return min + Math.random() * (max - min); }

  function buildGarland() {
    var garland = byId('garland');
    if (!garland) return;
    var count = window.innerWidth < 480 ? 9 : 15;
    for (var i = 1; i <= count; i++) {
      var t = i / (count + 1);
      // Bóng đèn nằm đúng trên đường cong của dây: y = 4 + 96·t·(1−t) trên khung cao 40.
      var y = (4 + 96 * t * (1 - t)) / 40 * 100;
      var bulb = make('span', 'bulb');
      bulb.style.setProperty('--x', (t * 100).toFixed(2) + '%');
      bulb.style.setProperty('--y', 'calc(' + y.toFixed(2) + '% - 1px)');
      bulb.style.setProperty('--dur', rand(1.4, 2.8).toFixed(2) + 's');
      bulb.style.setProperty('--delay', (-rand(0, 3)).toFixed(2) + 's');
      garland.appendChild(bulb);
    }
  }

  function buildAmbient() {
    var layer = byId('ambient');
    if (!layer || reduceMotion.matches) return;
    var small = window.innerWidth < 480;
    var glow = ['rgba(255, 214, 150, 0.55)', 'rgba(240, 180, 170, 0.5)', 'rgba(255, 236, 200, 0.6)'];
    var i, node;

    for (i = 0; i < (small ? 6 : 9); i++) {
      node = make('span', 'bokeh');
      node.style.setProperty('--x', rand(0, 100).toFixed(1) + '%');
      node.style.setProperty('--y', rand(5, 95).toFixed(1) + '%');
      node.style.setProperty('--size', Math.round(rand(70, small ? 150 : 220)) + 'px');
      node.style.setProperty('--c', glow[i % glow.length]);
      node.style.setProperty('--dx', Math.round(rand(-40, 40)) + 'px');
      node.style.setProperty('--dy', Math.round(rand(-50, 50)) + 'px');
      node.style.setProperty('--dur', rand(9, 16).toFixed(1) + 's');
      node.style.setProperty('--delay', (-rand(0, 16)).toFixed(1) + 's');
      layer.appendChild(node);
    }

    var kinds = ['heart-1', 'heart-2', 'petal'];
    for (i = 0; i < (small ? 10 : 16); i++) {
      var dur = rand(13, 24);
      node = make('span', 'float ' + kinds[i % kinds.length]);
      node.style.setProperty('--x', rand(2, 96).toFixed(1) + '%');
      node.style.setProperty('--size', Math.round(rand(10, 22)) + 'px');
      node.style.setProperty('--dur', dur.toFixed(1) + 's');
      node.style.setProperty('--delay', (-rand(0, dur)).toFixed(1) + 's');
      node.style.setProperty('--spin', Math.round(rand(-160, 160)) + 'deg');
      node.appendChild(make('span'));
      layer.appendChild(node);
    }

    var wings = [['#e7a99f', '#f3cfc6'], ['#e9c27d', '#f6e0b0']];
    [{ y: '28%', dur: 26, delay: 3, reverse: false }, { y: '62%', dur: 30, delay: 16, reverse: true }].forEach(function (b, k) {
      var fly = make('span', 'butterfly' + (b.reverse ? ' reverse' : ''));
      fly.style.setProperty('--y', b.y);
      fly.style.setProperty('--dur', b.dur + 's');
      fly.style.setProperty('--delay', b.delay + 's');
      var c = wings[k];
      fly.innerHTML =
        '<svg viewBox="0 0 40 30" focusable="false">' +
        '<g class="wing wing-l"><ellipse cx="11" cy="10" rx="10" ry="8" fill="' + c[0] + '"/><ellipse cx="13" cy="21" rx="7" ry="6" fill="' + c[1] + '"/></g>' +
        '<g class="wing wing-r"><ellipse cx="29" cy="10" rx="10" ry="8" fill="' + c[0] + '"/><ellipse cx="27" cy="21" rx="7" ry="6" fill="' + c[1] + '"/></g>' +
        '<rect x="19" y="6" width="2" height="19" rx="1" fill="#6b4a3c"/>' +
        '<path d="M20 7 q-3 -5 -6 -6 M20 7 q3 -5 6 -6" stroke="#6b4a3c" stroke-width="0.8" fill="none"/>' +
        '</svg>';
      layer.appendChild(fly);
    });
  }

  // Chạm vào đâu cũng nảy ra vài trái tim nhỏ.
  document.addEventListener('pointerdown', function (e) {
    if (e.isPrimary === false) return;
    fx.pop(e.clientX, e.clientY);
  }, { passive: true });

  /* ---------- Khởi động ---------- */
  buildGarland();
  buildAmbient();
  renderLetter();
  renderQuiz();
  renderAward();
  renderGift();
  measure();

  scenes.forEach(function (id, i) { if (i > 0) setInert(byId(id), true); });
  updateNav();

  if ('ResizeObserver' in window) {
    new ResizeObserver(measure).observe(letter);
  }
  window.addEventListener('resize', measure);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);

  openBtn.addEventListener('click', openLetter);
  openBtn.hidden = false;
})();
