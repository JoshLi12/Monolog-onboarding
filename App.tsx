import * as React from 'react';
import { Text, View, StyleSheet, Pressable, Alert } from 'react-native';
import Constants from 'expo-constants';
import { Picker } from '@react-native-picker/picker';


export default function App() {
  const [selectedLanguage, setSelectedLanguage] = React.useState();

  const handleSignUp = () => {
    // TODO: validate user's data

    /*
    sdasds
    if (success) {
      Alert.alert(
        "User Signup", `Language: ${selectedLanguage}`
      );
      // navigate to next page
    } else {
      // Alert to display error message
    }
    */
  }

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={selectedLanguage}
        onValueChange={(itemValue, itemIndex) =>
          setSelectedLanguage(itemValue)
        }>
        <Picker.Item label="Hello" value="java" />
        <Picker.Item label="JavaScript" value="js" />
      </Picker>

      <Pressable
        onPress={handleSignUp}
        style={styles.signUpButton}
      >
        <Text style={styles.signUpText}>
          Sign Up
        </Text>
      </Pressable>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  signUpButton: {
    borderWidth: 1,
    padding: 10,
    backgroundColor: 'green'
  },
  signUpText: {
    color: "red",
    fontSize: 10
  }
});
