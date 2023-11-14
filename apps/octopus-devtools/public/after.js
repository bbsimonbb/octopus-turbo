// this code will be executed after page load
(function() {
  //console.log('after.js executed');
  window.postMessage({octopusDevtoolsPresent:true},"*")
})();

/*
 * agent -> **content-script.js** -> background.js -> dev tools
 */
window.addEventListener('message', function(event) {
  // Only accept messages from same frame
  if (event.source !== window) {
    return;
  }
  var message = event.data
  message.origin = event.origin

  // Only accept messages of correct format (our messages)
  if (typeof message !== 'object' || message === null ||
      message.source !== 'octopus') {
    return;
  }
  //console.log("after.js captured message and will resend to service worker")

  chrome?.runtime?.sendMessage(message)
  chrome?.tabs?.sendMessage(message)
});