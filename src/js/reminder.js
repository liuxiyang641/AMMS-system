
function toIcon(type) {
  var _map = {
    success: 'checkmark',
    warning: 'exclamation',
    error: 'times'
  };
  return _map[type];
}

function normal() {
  $('.reminder')
    .hide()
    .removeClass('success')
    .removeClass('warning')
    .removeClass('error');
  $('.reminder i')
    .removeClass('spinner loading')
    .removeClass('checkmark')
    .removeClass('times')
    .removeClass('exclamation');
  $('.reminder .header').text('');
  $('.reminder p').text('');
}

function remind(param) {
  var info = ('info' in param) ? param.info : '';
  var icon = toIcon(param.type);
  if('finished' in param) {
    icon = 'spinner loading';
  }
  normal();
  $('.reminder p').text(info);
  $('.reminder .header').text(param.header);
  $('.reminder i').addClass(icon);
  $('.reminder').addClass(param.type).show();
  if(!('finished' in param)) {
     setTimeout(function() {
       normal();
     }, 2500);
  }
  else {
    /*setTimeout(function() {
      remind({
        type: 'error',
        header: '请求超时！'
      })
    }, 8000)*/
  }
}

export default {
  remind, normal
}
