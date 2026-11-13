(function () {
  var KEY = 'autocar-hub-ip';
  var radios = document.querySelectorAll('input[name=net]');
  var custom = document.getElementById('customIp');
  var openApp = document.getElementById('openApp');
  var openJupyter = document.getElementById('openJupyter');

  function currentIp() {
    var sel = document.querySelector('input[name=net]:checked').value;
    return sel === 'custom' ? custom.value.trim() : sel;
  }
  function update() {
    var sel = document.querySelector('input[name=net]:checked').value;
    custom.hidden = sel !== 'custom';
    var ip = currentIp() || '192.168.101.101';
    openApp.href = 'http://' + ip + ':8080';
    openJupyter.href = 'http://' + ip + ':8888';
    try { localStorage.setItem(KEY, JSON.stringify({ sel: sel, custom: custom.value })); } catch (e) {}
  }
  try {
    var saved = JSON.parse(localStorage.getItem(KEY) || 'null');
    if (saved) {
      custom.value = saved.custom || '';
      radios.forEach(function (r) { r.checked = r.value === saved.sel; });
    }
  } catch (e) {}
  radios.forEach(function (r) { r.addEventListener('change', update); });
  custom.addEventListener('input', update);
  update();
})();
