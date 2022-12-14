import * as React from 'react';
import { Text, StyleSheet, Pressable, Alert, SafeAreaView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { validateGender, validatePronouns } from './helperFunctions.js';

/*
UPDATES FOR NEXT MEETING:
1. Added title with font and color according to monolog website
2. added placeholder for picker (can be subject to change)
3. styled button with shape, color, text font, position, and on press change color
4. shortened error message so picker items wont overlap with error message
5. shortened pronouns items because it still overlapped with error message
6. made button change color when pressed, so it feels more like a button and less like an image
7. pressing the button triggers the button to change color
8. i added an alert for 2 reasons
  1. it felt weird that an error message just pops onto the screen, so it would be good to let users know
  2. pressing the "OK" on the alert message will trigger the button to turn back to blue
  ^ i couldn't find any other way to make the button change back after a reasonable time period
*/

const GENDERS = [{'label': "--Select--", 'value': ""}, {'label': "Male", 'value': "Male"}, {'label': 'Female', 'value': "Female"}, {'label': 'Other', 'value' : 'Other'}]

const PRONOUNS = [{'label': "--Select--", 'value': ""}, {'label': "He/Him", 'value': "He/Him"}, {'label': 'She/Her', 'value': "She/Her"}, {'label': 'They/Them', 'value' : 'They/Them'}, {'label': 'Other', 'value' : 'Other'}]

export default function App() {
  const [selectedGender, setSelectedGender] = React.useState<string>("");
  const [selectedPronouns, setSelectedPronouns] = React.useState<string>("");
  const [displayGenderError, setDisplayGenderError] = React.useState<boolean>(false);
  const [displayPronounsError, setDisplayPronounsError] = React.useState<boolean>(false);
  const [pressedButtonColor, setPressedButtonColor] = React.useState<boolean>(false);

  const alertMessage = ():void => {
    Alert.alert(
      "Signup Error",
      "Please check again",
      [{ text: "OK", onPress: () => setPressedButtonColor(false)}]
    )
  }

  const handleSignUp = ():void => {
    setPressedButtonColor(true);

    if (!validateGender(selectedGender) || !validatePronouns(selectedPronouns))
      alertMessage()

    setDisplayGenderError(!validateGender(selectedGender));
    setDisplayPronounsError(!validatePronouns(selectedPronouns));
  }

  return (
    <SafeAreaView style={styles.container}>
      {displayGenderError && <Text style={styles.genderError}>*Choose a gender</Text> }
      
      <Text style={styles.genderTitle}>Gender</Text>

      <Picker
        selectedValue={selectedGender}
        onValueChange={(itemValue, itemIndex):void => setSelectedGender(itemValue)}
      >
        {GENDERS.map(gender => <Picker.Item label={gender.label} value={gender.value} />)}
        
      </Picker>

      {displayPronounsError && <Text style={styles.pronounsError}>*Choose a pronoun</Text>}
      <Text style={styles.pronounsTitle}>Pronouns</Text>
      
      <Picker
        selectedValue={selectedPronouns}
        onValueChange={(itemValue, itemIndex) => setSelectedPronouns(itemValue)}
      >
        {PRONOUNS.map(pronouns => <Picker.Item label={pronouns.label} value={pronouns.value} />)}
      </Picker>

      <Pressable
        style={ [styles.signUpPressable, { backgroundColor: pressedButtonColor ? "white" : '#6bc5f5' }] }
        onPress={handleSignUp}
      >
        <Text
          style={{
            color: pressedButtonColor ? '#6bc5f5' : 'white',
            fontFamily: 'PT Serif',
            fontSize: 19,
            left: '40%'
          }}
        >
          Sign Up
        </Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 8,
  },
  signUpPressable: {
    borderWidth: 1.3,
    padding: 16,
    width: '80%',
    borderRadius: 30,
    borderColor: '#6bc5f5',
    left: '10%',
    bottom: '-6.5%'
  },

  genderError: {
    color: 'red',
    fontSize: 15,
    position: 'absolute',
    left: 20,
    top: '32.3%',
  },

  pronounsError: {
    color: 'red',
    fontSize: 15,
    position: 'absolute',
    left: 20,
    top: '57.7%',
  },
  genderTitle: {
    color: '#6bc5f5',
    fontSize: 34,
    font: 'PT Serif',
    position: 'absolute',
    left: 20,
    top: '26.7%',
  },
  pronounsTitle: {
    color: '#6bc5f5',
    fontSize: 33,
    font: 'PT Serif',
    position: 'absolute',
    left: 20,
    top: '52.2%',
  }
});