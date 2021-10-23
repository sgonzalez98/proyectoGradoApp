import AsyncStorage from '@react-native-async-storage/async-storage';

class StorageService {
  static getValue = async (item) => {
    const getResp = await AsyncStorage.getItem(item);
    return getResp;
  };

  static setValue = async (item, value) => {
    const setResp = await AsyncStorage.setItem(item, String(value));
    return setResp;
  };

  static removeValue = async (item) => {
    const removeResp = await AsyncStorage.removeItem(item);
    return removeResp;
  };

  static multiRemove = async (items) => {
    const removeResp = await AsyncStorage.multiRemove(items);
    return removeResp;
  };
}

export default new StorageService();
