import { Platform } from "react-native";
import * as Device from 'expo-device';

const bannerTestId = 'ca-app-pub-3940256099942544/6300978111';
const interstitialTestId = 'ca-app-pub-3940256099942544/1033173712';

const androidBannerProdID =  Platform.OS === "ios" ? 'ca-app-pub-8549462325132397/8989614606' : 'ca-app-pub-8549462325132397/2232672556';
const androidInterstitialProdAdID = Platform.OS === "ios" ? 'ca-app-pub-8549462325132397/7384340158' :'ca-app-pub-8549462325132397/6746594645';

export const questionBannerId = Device.isDevice && !__DEV__ ? androidBannerProdID : bannerTestId; //test
export const duringQuizinterstitialId = Device.isDevice && !__DEV__ ? androidInterstitialProdAdID : interstitialTestId; //test
