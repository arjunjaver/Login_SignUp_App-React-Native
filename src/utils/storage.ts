import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveToStorage = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.error('Error saving data', e);
  }
};

export const getFromStorage = async (key: string): Promise<string | null> => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (e) {
    console.error('Error reading data', e);
    return null;
  }
};
