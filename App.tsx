import * as React from 'react';
import { Text, StyleSheet, Pressable, Alert, SafeAreaView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { validateGender, validatePronouns } from './helperFunctions.js';

const GENDERS = [{'label': "--Select--", 'value': ""}, {'label': "Male", 'value': "Male"}, {'label': 'Female', 'value': "Female"}, {'label': 'Other', 'value' : 'Other'}]

const PRONOUNS = [{'label': "--Select--", 'value': ""}, {'label': "He/Him", 'value': "He/Him"}, {'label': 'She/Her', 'value': "She/Her"}, {'label': 'They/Them', 'value' : 'They/Them'}, {'label': 'Other', 'value' : 'Other'}]


export default function App() {
  const [selectedGender, setSelectedGender] = React.useState();
  const [selectedPronouns, setSelectedPronouns] = React.useState();
  const [displayGenderError, setDisplayGenderError] = React.useState(false);
  const [displayPronounsError, setDisplayPronounsError] = React.useState(false);
  const [pressedButtonColor, setPressedButtonColor] = React.useState(false);

  const alertMessage = () => {
    Alert.alert(
      "Signup Error",
      "Please check again",
      [
        {
          text: "OK",
          onPress: () => setPressedButtonColor(false)
        }
      ]
    )
  }

  const handleSignUp = () => {
    setPressedButtonColor(true);

    if (!validateGender(selectedGender) || !validatePronouns(selectedPronouns)) {
      alertMessage()
    }

    if (!validateGender(selectedGender)) {
      setDisplayGenderError(true);

    } else if (validateGender(selectedGender)) {

      setDisplayGenderError(false);
    }

    if (!validatePronouns(selectedPronouns)) {
      setDisplayPronounsError(true);

    } else if (validatePronouns(selectedPronouns)) {
      setDisplayPronounsError(false);
    }
  };


  return (
    <SafeAreaView style={styles.container}>

      {displayGenderError && (
        <Text style={styles.genderError}>*Choose a gender</Text>
      )}

      <Text style={styles.genderTitle}>Gender</Text>

      <Picker

        selectedValue={selectedGender}

        onValueChange={(itemValue, itemIndex) => setSelectedGender(itemValue)}>

        {GENDERS.map(gender => <Picker.Item label={gender.label} value={gender.value} />)}


      </Picker>

      <Text style={styles.pronounsTitle}>Pronouns</Text>

      {displayPronounsError && (
        <Text style={styles.pronounsError}>*Choose a pronoun</Text>
      )}

      <Picker

        selectedValue={selectedPronouns}

        onValueChange={(itemValue, itemIndex) =>
          setSelectedPronouns(itemValue)
        }>

        {PRONOUNS.map(pronouns => <Picker.Item label={pronouns.label} value={pronouns.value} />)}

      </Picker>

      <Pressable
        style={ [styles.signUpPressable, { backgroundColor: pressedButtonColor ? "white" : '#6bc5f5' }] }
        onPress={handleSignUp}
>

        <Text
          style={{
            color: pressedButtonColor ? '#6bc5f5' : 'white',
            font: 'PT Serif',
            fontSize: 19,
            left: '40%'
          }}>
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
  },
});
