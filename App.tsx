import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Enter a workout value:</Text>
      <StatusBar style="auto" />
      <TextInput
        style={{
          height: 40,
          width: '80%',
          borderColor: 'gray',
          borderWidth: 1,
        }}
        defaultValue=""
        placeholder="Type here"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
