/**
 * Build the DOM for the notificiation on the page and initialize
 * listeners.
 */
var init = function() {
  var container = document.createElement('div');
  container.innerHTML = 
      '<div class="hidden" id="time-counter-notification">' +
        'You spent a total of: ' +
        '<span id="time-counter-time"></span>' +
        'seconds on <span id="time-counter-site"></span>.' +
      '</div>';
  document.body.appendChild(container);

  chrome.extension.onMessage.addListener(messageRecieved);
};

/**
 * Handles recieving a message from the extension.
 * @param {object} data An object with some data sent from the extension.
 *   Example: {site: 'facebook', time: 300}
 * @param {MessageSender} sender The sender of the message,
 * @param {function} sendResponse Callback for sending a response.
 */
var messageRecieved = function (data, sender, sendResponse) {
  var notificationEl = document.getElementById('time-counter-notification'),
      timeEl = document.getElementById('time-counter-time'),
      siteEl = document.getElementById('time-counter-site');

  if (data && data.site) {
    // Update the notification count.
    timeEl.innerText = data.time;
    siteEl.innerText = data.site;

    // Show the notification and hide it after 3 seconds.
    notificationEl.className = '';
    setTimeout(function(){notificationEl.className = 'hidden'}, 3000);
  }
};

init();
