var wrap;

var displayResumeJSON = function (text) {
  var code = document.getElementById('code');
  code.innerHTML = text;
  hljs.highlightBlock(code);
};

var loadResumeJSON = function () {
  var xhr = new XMLHttpRequest();
  xhr.addEventListener('load', function () {
    displayResumeJSON(this.responseText);
  });

  var url = '/?json';
  if (wrap) {
    url += '&wrap';
  }

  xhr.open('GET', url);
  xhr.send();
};

var onResize = function (event) {
  var newWrap = (window.innerWidth <= 660);
  if (newWrap == wrap) {
    return;
  }

  wrap = newWrap;
  loadResumeJSON();
};

window.onload = function () {
  wrap = (window.innerWidth <= 660);
  loadResumeJSON();
  window.addEventListener('resize', onResize);
};
