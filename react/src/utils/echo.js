import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import Cookies from 'js-cookie';

Pusher.logToConsole = true;

let echoInstance = null; // Singleton instance of Echo

/**
 * Initialize Laravel Echo with Pusher.
 * Ensures a single instance of Echo is created and reused.
 *
 * @returns {Echo|null} Echo instance or null if initialization fails
 */
export const initializeEcho = () => {
  if (!echoInstance) {
    const authToken = Cookies.get('authToken'); // Retrieve token from cookies

    const apiUrl = process.env.REACT_APP_API_URL;
    const pusherKey = process.env.REACT_APP_PUSHER_KEY;
    const pusherCluster = process.env.REACT_APP_PUSHER_CLUSTER;

    

    if (!authToken) {
      console.warn('Auth token not found. Echo will not be initialized.');
      return null;
    }

    if (!pusherKey || !pusherCluster || !apiUrl) {
      console.error('Pusher configuration or API URL is missing. Please check your environment variables.');
      return null;
    }

    echoInstance = new Echo({
      broadcaster: 'pusher',
      key: pusherKey,
      cluster: pusherCluster,
      forceTLS: true,
      authEndpoint: `${apiUrl}/broadcasting/auth`,
      auth: {
        headers: {
          Authorization: `Bearer ${authToken}`, // Add token to headers
        },
      },
    });
  }

  return echoInstance;
};
