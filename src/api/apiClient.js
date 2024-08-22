import axios from 'axios';
import { refreshToken as refreshTokenAPI } from './Auth';
import { getCookie } from '../util/cookies';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

// Axios 인스턴스 생성
const apiClient = axios.create({
  baseURL: BASE_URL,
});

// 요청 인터셉터 설정 (헤더 설정)
apiClient.interceptors.request.use(
  (config) => {
    const accessToken = getCookie('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// 응답 인터셉터 설정
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config, response } = error;

    if (response && response.status === 401 && !config.__isRetryRequest) {
      config.__isRetryRequest = true;

      try {
        const accessToken = getCookie('accessToken');
        const refreshToken = getCookie('refreshToken');

        if (!accessToken || !refreshToken) {
          throw new Error('로그인을 해주세요.');
        }

        const { accessToken: newAccessToken } =
          await refreshTokenAPI(refreshToken);

        // 새로운 액세스 토큰을 쿠키에 저장
        document.cookie = `accessToken=${newAccessToken}; path=/`;

        // 실패한 요청을 새로운 액세스 토큰으로 재시도
        config.headers.Authorization = `Bearer ${newAccessToken}`;
        return apiClient(config);
      } catch (refreshError) {
        console.error('리프레시 토큰 갱신 실패', refreshError);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default apiClient;
