import { Platform } from "react-native";
import * as Device from 'expo-device';

const questionBannertestID = 'ca-app-pub-3940256099942544/6300978111';
const questionBannerProductionID = 'ca-app-pub-8549462325132397/2232672556';
// Is a real device and running in production.

// export const banner1History = Platform.OS === "ios" ? "ca-app-pub-3883602119077591/9416702704" : "ca-app-pub-3883602119077591/3119065274";
export const questionBannerId = Device.isDevice && !__DEV__ ? questionBannerProductionID : questionBannertestID; //test