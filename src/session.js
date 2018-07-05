var personalService = {
  individual_user: ['个人信息', '我的收藏', '我的投稿', '我的注册'],
  group_user: ['单位信息', '内部用户管理', '发布会议', '我的会议'],
  internal_user: ['个人信息', '发布会议', '我的会议']
}

var conferenceService = {
  individual_user: ['会议信息', '在线投稿', '我的投稿', '注册会议'],
  group_user: ['会议信息', '投稿列表', '注册列表'],
  internal_user: ['会议信息', '投稿列表', '注册列表']
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
  login,
  individualUser, groupUser, internalUser, instituteUser,
  personal, conference
}
