# Strengthsheet Client

## Install

```
brew update
brew install node
brew install watchman
```

Click [here](https://reactnative.dev/docs/environment-setup) for more info.

## Run

### Expo Server

```
npx expo start
```

### Android Emulator

https://docs.expo.dev/workflow/android-studio-emulator/

### iOS Simulator

1. Open Xcode, and find the simulator option: Xcode > Open Developer Tool > Simulator.
2. Run `npm expo run:ios`.

### iOS Device

#### Development build

1. Make sure device is connected to the same network.
2. Run `npx expo run:ios --device` and select the device when prompted.

#### Preview build

See https://docs.expo.dev/build/internal-distribution/.
