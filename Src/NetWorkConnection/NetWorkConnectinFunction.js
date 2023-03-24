import {useState, useEffect} from 'react';
import NetInfo from '@react-native-community/netinfo';

const NetState = () => {
  const [connection, setConnection] = useState(true);
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(
      state => {
        console.log('Connection type', state.type);
        console.log('Is connected?', state.isConnected);
        setConnection(state.isConnected);
      },
      [connection],
    );

    return () => {
      unsubscribe();
    };
  }, []);

  return connection;
};

export default NetState;
