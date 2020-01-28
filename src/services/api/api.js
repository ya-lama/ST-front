import http from './apiConfig';
import history from '../../utils/history';
import RouterPaths from '../../constants/routerPaths';
import AppActions from '../../store/actions/appActions';

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

const Api = { authMe, auth, logout, getDisciplines, getThemes, getGroups, createTest };

export default Api;
