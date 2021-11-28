import AsyncStorage from '@react-native-async-storage/async-storage';

class StorageService {
  getValue = async (item) => {
    const getResp = await AsyncStorage.getItem(item);
    return getResp;
  };

  setValue = async (item, value) => {
    const setResp = await AsyncStorage.setItem(item, String(value));
    return setResp;
  };

  removeValue = async (item) => {
    const removeResp = await AsyncStorage.removeItem(item);
    return removeResp;
  };

  multiRemove = async (items) => {
    const removeResp = await AsyncStorage.multiRemove(items);
    return removeResp;
  };
}

export default new StorageService();
