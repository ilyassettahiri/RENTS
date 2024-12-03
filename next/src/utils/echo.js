import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import Cookies from 'js-cookie';

Pusher.logToConsole = true;

let echoInstance = null; // Hold the Echo instance

/**
 * Initialize Laravel Echo only when required
 * @returns {Echo} Echo instance
 */
export const initializeEcho = () => {
  if (!echoInstance) {
    const authToken = Cookies.get('authToken') || ''; // Get token from cookies
    if (!authToken) {
      console.warn('Auth token not found. Echo not initialized.');
      return null; // Return null if token is not available
    }

    echoInstance = new Echo({
      broadcaster: 'pusher',
      key: process.env.NEXT_PUBLIC_PUSHER_KEY,
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
      forceTLS: true,
      authEndpoint: `${process.env.NEXT_PUBLIC_API_URL}/broadcasting/auth`,
      auth: {
        headers: {
          Authorization: `Bearer ${authToken}`, // Add token in headers
        },
      },
    });
  }

  return echoInstance;
};

export default initializeEcho;
