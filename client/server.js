
var logError = function(xhr, status, err) {
  console.log(status + ' ' + err);
};


module.exports = function(ajax, controller) {
  var errorCount = 0; // used to stop after so main server failures
  return {
    'createWorld': function() {
      ajax({
        url: 'world',
        dataType: 'json',
        success: function(data) {
          controller.beginSuccess(data);
        },
        error: function(xhr, status, err) {
          logError(xhr, status, err);
          controller.error('error getting world from server', 'could not contact server');
        }
      });
    },
    'sync': function(command) {
      var url = 'world/go';
      if(command) {
        url += '/' + command;
      }
      ajax({
        url: url,
        dataType: 'json',
        success: function(data) {
          controller.syncSuccess(data);
          errorCount = 0;
        },
        error: function(xhr, status, err) {
          logError(xhr, status, err);
          controller.error('error getting state from server');
          if(errorCount++ == 10) {
            controller.error(null, 'server stopped responding');
            controller.stopSuccess();
          }
        }
      });
    },
    'reset': function() {
      ajax({
        url: 'world/reset',
        dataType: 'json',
        success: function(data) {
          controller.resetSuccess(data);
        },
        error: function(xhr, status, err) {
          logError(xhr, status, err);
          controller.error('error resetting server', 'could not reset server');
        }
      });
    }
  };
};
