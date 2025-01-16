// bugSolution.js
import * as React from 'react';
import { Camera, CameraType } from 'expo-camera';
import { StyleSheet, Text, View, Button } from 'react-native';

const App = () => {
  const [hasPermission, setHasPermission] = React.useState(null);
  const [type, setType] = React.useState(CameraType.back);
  const [cameraError, setCameraError] = React.useState(null);

  React.useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleCameraError = (error) => {
    setCameraError(error);
  };

  if (hasPermission === null) {
    return <View><Text>Requesting permissions...</Text></View>;
  }
  if (hasPermission === false) {
    return <View><Text>No access to camera</Text></View>;
  }
  if (cameraError) {
    return (
      <View>
        <Text>Camera error: {cameraError.message}</Text>
        <Button title="Retry" onPress={() => setCameraError(null)} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type} onError={handleCameraError}>
        <View style={styles.buttonContainer}>
          <Button title="Flip Camera" onPress={() => setType(type === CameraType.back ? CameraType.front : CameraType.back)} />
        </View>
      </Camera>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 20,
  },
});