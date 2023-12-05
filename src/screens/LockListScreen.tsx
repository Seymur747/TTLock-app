
import React from 'react';
import { View, Text, Button } from 'react-native';
import { useGetLockListQuery } from '../store/api/api';


function LockListScreen({ navigation }) {
  const a = useGetLockListQuery({});

  return (
    <View>
      <Text>Lock List sj</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Auth')}
      />
    </View>
  );
}

export default LockListScreen;
