// The ID of the extension'
// This must match the id in about:extensions
(function() {

const editorExtensionId = "pfnccnilkknnncbaafhcaoeoifhjmibb";

function loadImage(url) {
  return new Promise(function(resolve, reject) {
    const img = new Image();
    img.onload = function() {
      resolve(img);
    }
    img.onerror = reject;
    img.src = url;
  });
}

function waitNFrames(n) {

  return new Promise(function(resolve, reject) {
    function wait() {
      if (n <= 0) {
        resolve();
      } else {
        --n;
        requestAnimationFrame(wait);
      }
    }

    wait();
  });
}

function takeScreenshot() {
  return new Promise(function(resolve, reject) {
    // Make a simple request:
    chrome.runtime.sendMessage(editorExtensionId, {takeScreenshot: {}}, function(response) {
      if (response) {
          resolve(response.url);
      } else {
          reject("Could not take screenshot: see https://github.com/greggman/webgl-conformance-test-helper-extension/");
      }
    });
  });
}

function scaleImageToCSSPixels(img) {
  const width = img.width / window.devicePixelRatio;
  const height = img.height / window.devicePixelRatio;

  const ctx = document.createElement("canvas").getContext("2d");
  ctx.canvas.width = width;
  ctx.canvas.height = height;
  ctx.drawImage(img, 0, 0, width, height);
  return ctx.getImageData(0, 0, width, height);
}

window.wcte = {
  takeScreenshot: function() {
    return waitNFrames(2)
    .then(takeScreenshot)
    .then(loadImage)
    .then(scaleImageToCSSPixels);
  },
};

}());
