(() => {
  const player = document.querySelector('[data-game-player]');
  if (!player) return;

  const stage = player.querySelector('[data-game-stage]');
  const poster = player.querySelector('[data-game-poster]');
  const start = player.querySelector('[data-game-start]');
  const stop = player.querySelector('[data-game-stop]');
  const status = player.querySelector('[data-game-status]');
  const mobile = player.querySelector('[data-game-mobile]');
  const pointer = window.matchMedia('(any-pointer: fine)');
  let frame = null;
  let loadTimer = null;

  const updateDevice = () => {
    start.hidden = !pointer.matches;
    mobile.hidden = pointer.matches;
    if (!pointer.matches && !frame) status.textContent = '请使用配有鼠标或触控板的电脑试玩。';
    else if (!frame) status.textContent = '点击开始后加载游戏，首次加载需要一点时间。';
  };

  const finish = (message) => {
    window.clearTimeout(loadTimer);
    if (frame) {
      frame.src = 'about:blank';
      frame.remove();
      frame = null;
    }
    poster.hidden = false;
    stop.hidden = true;
    status.textContent = message;
  };

  start.addEventListener('click', () => {
    if (frame || !pointer.matches) return;
    frame = document.createElement('iframe');
    frame.className = 'game-player__frame';
    frame.title = 'Tower Defense 游戏画面';
    frame.allow = 'autoplay; fullscreen';
    frame.allowFullscreen = true;
    frame.src = player.dataset.gameSrc;
    frame.addEventListener('error', () => {
      finish('游戏未能加载，请检查网络后重新开始。');
      start.textContent = '重新加载';
      start.focus();
    });
    poster.hidden = true;
    stop.hidden = false;
    status.textContent = '正在加载游戏，首次加载需要一点时间…';
    stage.append(frame);
    frame.focus();
    loadTimer = window.setTimeout(() => {
      finish('加载超时，请检查网络后重试。');
      start.textContent = '重新加载';
      start.focus();
    }, 180000);
  });

  stop.addEventListener('click', () => {
    finish('试玩已结束。再次开始会开启新的一局。');
    start.textContent = '再次开始';
    start.focus();
  });

  window.addEventListener('message', (event) => {
    if (!frame || event.origin !== window.location.origin || event.source !== frame.contentWindow) return;
    if (event.data?.type === 'tower-defense-ready') {
      window.clearTimeout(loadTimer);
      status.textContent = '游戏已就绪。画面右下角可切换全屏。';
    } else if (event.data?.type === 'tower-defense-error') {
      finish('游戏加载失败，请检查网络后重试。');
      start.textContent = '重新加载';
      start.focus();
    }
  });

  window.addEventListener('pagehide', () => finish('试玩已结束。'));
  pointer.addEventListener('change', updateDevice);
  updateDevice();
})();
