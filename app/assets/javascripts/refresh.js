var refreshTimeout = 60 * 1000; // 1 minute
var currentTimeout = null;
var refresh, scheduleRefresh;

refresh = function() {
  $(".project:not(.empty-project)").each(function(index,element) {
    var projectCssId = $(element).attr("id");
    var project_id = $(element).data('id');
    var project_type = $(element).hasClass('aggregate') ? 'aggregate_project' : 'project';
    $.ajax({
      url: '/'+project_type+'s/'+project_id+'/status',
      method: 'GET',
      dataType: 'html',
      success: function(response) {
        $('#' + projectCssId).replaceWith(response);
      },
      error: function() {
        $('#' + projectCssId).addClass("server-unreachable");
      }
    });
  });
  scheduleRefresh();
};

scheduleRefresh = function () {
  clearTimeout(currentTimeout);
  currentTimeout = setTimeout(refresh, refreshTimeout);
};

$(function(){
  $(document).bind("ajaxStart", function() {
    $('#indicator').removeClass('idle');
  });

  $(document).bind("ajaxStop", function() {
    $('#indicator').addClass('idle');
  });

  scheduleRefresh();
});
