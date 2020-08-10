import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Switch, ImageBackground, Alert, Button, Linking } from 'react-native';
import bgImg from './assets/background.png';

export default function App() {

  const [isEnabled, setIsEnabled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [value, setValue] = useState(0);
  const [converted, setConverted] = useState(0);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  useEffect(() => {
    if (!isEnabled) {
      setIsVisible(false);
      //se for Decimal
      let result = "";
      let temp = value;
      while (temp > 0) {
        if (temp % 2 == 0) {
          result = "0" + result;
        } else {
          result = "1" + result;
        }
        temp = Math.floor(temp / 2);
      }
      setConverted(Number(result));
    } else {
      //se for binario
      const valueString = value.toString();
      let result = 0;
      if (valueString.match("[23456789]") != null) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
        let lenghtString = valueString.length;
        for (var i = 0; i < valueString.length; i++) {
          lenghtString--;
          result = result + (parseInt(valueString[i]) * (Math.pow(2, lenghtString)));
        }
      }

      setConverted(result);
    }
  }, [value])

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <ImageBackground source={bgImg} style={styles.img}>
          <Text style={styles.title}>Bin2{'\n'}Dec</Text>
        </ImageBackground>
      </View>
      <View style={styles.inputGroup}>
        <View style={styles.switchOption}>
          <Text style={styles.label}>Decimal</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#767577" }}
            thumbColor={isEnabled ? "#04D361" : "#81b0ff"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
          <Text style={styles.label}>Binario</Text>
        </View>
        <Text style={styles.label}>Valor</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={value}
          onChangeText={text => setValue(Number(text))}
        />
        {isVisible && <Text style={styles.warning}>Valores digitados não podem ser convertidos</Text>}
      </View>
      <View style={styles.result}>
        <Text style={styles.labelResult}>Resultado</Text>
        <Text style={styles.resultText}>{converted}</Text>
      </View>
      <View style={styles.footer}>
      <Button
        title="Meu perfil no Github"
        onPress={() => Linking.openURL("https://github.com/modernfunkboss")} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    backgroundColor: '#04D361',
    height: 300,
    width: '100%',
  },
  warning: {
    color: '#F00',
    textAlign: 'center',
  },
  img: {
    flex: 1,
    marginTop: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#FFF',
    fontSize: 34,
    lineHeight: 32,
    maxWidth: 180,
    marginVertical: 40,
    textAlign: 'center',
  },
  inputGroup: {
    marginTop: -60,
    padding: 20,
    backgroundColor: '#FFF',
    width: '90%',
    borderRadius: 8,
    elevation: 8,
  },
  select: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
  },
  input: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
  },
  result: {
    width: '100%',
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelResult: {
    color: '#000',
    fontSize: 16,
  },
  label: {
    color: '#000',
    fontSize: 16,
  },
  resultText: {
    color: '#000',
    fontSize: 36,
  },
  switchOption: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  footer: {
    width: '100%',
    height: 30,
    marginTop: 32,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
