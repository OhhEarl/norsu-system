// Import necessary modules and dependencies
import { AsyncStorage } from 'react-native';
import axios from 'axios';

// Export the function directly without using useState
export const HandleLogout = async (navigation) => {
  try {
    const authToken = await AsyncStorage.getItem('authToken');

    if (!authToken) {
      navigation.navigate('Login');
      return;
    }

    const response = await axios.post(
      `${BASE_URL}/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'X-CSRF-TOKEN': authToken,
        },
      }
    );

    if (response.status === 200) {
      await AsyncStorage.removeItem('authToken');
      navigation.navigate('Login');
      console.log('Logout successful');
    } else {
      console.error('Logout failed');
    }
  } catch (error) {
    if (error.response && error.response.status === 401) {
      alert('Unauthorized request. Please log in again.');
      await AsyncStorage.removeItem('authToken');
      navigation.navigate('Login');
    } else {
      console.error('An unexpected error occurred during logout.'. error);
    }
  }
};
