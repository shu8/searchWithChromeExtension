// Save options on button click

function save_options() {
  var maxHistory = document.getElementById('maxHistory').value;
  chrome.storage.sync.set({
    maxHistory: maxHistory
  }, function() {
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restore options on load
function restore_options() {
  chrome.storage.sync.get({
    maxHistory: '10' // default value
  }, function(items) {
    document.getElementById('maxHistory').value = items.maxHistory;
  });
}
document.addEventListener('DOMContentLoaded', restore_options); // ON LOAD part
document.getElementById('save').addEventListener('click',
    save_options);