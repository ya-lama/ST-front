import http from './apiConfig';
import history from '../../utils/history';
import RouterPaths from '../../constants/routerPaths';

/**
 * @param body {Object}
 * @param body.operator_id {string}
 * @param body.id {string}
 * @returns {Promise<AxiosResponse<T>>}
 */

// const initConnection = body => http.post('tnl/init/connection', body);

const authMe = () => http.get('auth/me/');
/**
 *
 * @param login {String}
 * @param password {String}
 * @returns {Promise<AxiosResponse<T>>}
 */
const auth = (login, password) =>
  http.post('auth/token/', { login, password }).then(response => {
    sessionStorage.setItem('refresh', response.refresh);
    sessionStorage.setItem('token', `Bearer ${response.access}`);
    return response;
  });

const logout = () =>
  new Promise((resolve, reject) => {
    try {
      sessionStorage.removeItem('refresh');
      sessionStorage.removeItem('token');
      history.push(RouterPaths.loginPage);
      resolve();
    } catch (e) {
      reject(e);
    }
  });

const getDisciplines = () => http.get('teacher/disciplines/');

const getDiscipline = id => http.get(`teacher/discipline/${id}/`);

const getGroups = () => http.get('teacher/group-list/');

const getThemes = discipline => http.get(`teacher/themes/${discipline}/`);

const createTest = data => {
  const formattedData = {
    name: data.name,
    type: 'GROUPS',
    duration: data.duration,
    discipline: data.discipline,
    description: data.description,
    try_count: Number(data.tryCount),
    date_start: data.startDate,
    date_end: data.endDate,
    rules: data.rules,
    themes: data.themes.map(theme => ({
      theme: theme.theme,
      count_questions: Number(theme.count),
    })),
    groups: data.groups,
  };
  return http.post('/teacher/create-test/', formattedData);
};

// WTFAK
const getTabs = id => http.get(`teacher/get-tabs/${id}/`);

const sendTheme = body => http.post('teacher/theme/', body);

const Api = {
  authMe,
  auth,
  logout,
  getDisciplines,
  getDiscipline,
  getThemes,
  getGroups,
  createTest,
  getTabs,
  sendTheme,
};

export default Api;
