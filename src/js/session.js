import util from 'util'

function iinfo() {
  return {
    service: '个人信息',
    route: util.format('/user/%s/%s/info', get('type'), get('user_id'))
  }
}
function icol() {
  return {
    service: '我的收藏',
    route: util.format('/user/%s/%s/collection', get('type'), get('user_id'))
  }
}
function ipaper() {
  return {
    service: '我的投稿',
    route: util.format('/user/%s/%s/paper', get('type'), get('user_id'))
  }
}
function iattend() {
  return {
    service: '我的注册',
    route: util.format('/user/%s/%s/attendance', get('type'), get('user_id'))
  }
}
function ginfo() {
  return {
    service: '单位信息',
    route: util.format('/user/%s/%s/info', get('type'), get('user_id'))
  }
}
function grelease() {
  return {
    service: '发布会议',
    route: util.format('/user/%s/%s/release', get('type'),get('user_id'))
  }
}
function ginternal() {
  return {
    service: '内部用户管理',
    route: util.format('/user/%s/%s/internal', get('type'),get('user_id'))
  }
}
function gconfs() {
  return {
    service: '我的会议',
    route: util.format('/user/%s/%s/conference', get('type'),get('user_id'))
  }
}
function cinfo() {
  return {
    service: '会议信息',
    route: '/conference/_filler_/info'
  }
}
function csubmit() {
  return {
    service: '在线投稿',
    route: '/conference/_filler_/submit'
  }
}
function cpaper() {
  return {
    service: '我的投稿',
    route: '/conference/_filler_/papers'
  }
}
function cattend() {
  return {
    service: '注册会议',
    route: '/conference/_filler_/attend'
  }
}

var personalService = {
  individual_user: [iinfo(), icol(), ipaper(), iattend()],
  group_user: [ginfo(), ginternal(), grelease(), gconfs()],
  group_internal_user: [ginfo(), grelease(), gconfs()],
  null: []
}

var conferenceService = {
  individual_user: [cinfo(), csubmit(), cpaper(), cattend()],
  group_user: [cinfo()],
  group_internal_user: [cinfo()],
  null: [cinfo()]
}

var type2Text = {
  individual_user: '个人用户',
  group_user: '单位用户',
  group_internal_user: '单位内部用户'
}

function type() {
  return type2Text[get('type')];
}

function personal() {
  return personalService[get('type')];
}

function conference() {
  return conferenceService[get('type')];
}

function get(key) {
  return window.localStorage.getItem(key);
}

function set(key, val) {
  window.localStorage.setItem(key, val);
}

function remove(key) {
  window.localStorage.removeItem(key); 
}

function login() {
  return get('is_login') == '1';
}

function individualUser() {
  return get('type') == 'individual_user';
}

function groupUser() {
  return get('type') == 'group_user';
}

function internalUser() {
  return get('type') == 'group_internal_user';
}

function instituteUser() {
  return groupUser() || internalUser();
}

function clear() {
  window.localStorage.clear();
}

export default {
  get, set, remove, clear,
  login, type,
  individualUser, groupUser, internalUser, instituteUser,
  personal, conference
}
