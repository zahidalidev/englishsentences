import { getNetworkStateAsync } from "expo-network";

const isConnected = async () => {
  const net = await getNetworkStateAsync();
  return net.isConnected;
};

export default isConnected;
