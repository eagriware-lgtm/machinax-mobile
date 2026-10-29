# MachinaX Mobile

A beginner-friendly, build-first CAD app from The Epic Builders (EBS).

## Current prototype
- Expo + React Native + TypeScript
- Inventor Mode / Engineer Mode switch
- Add Cube, Cylinder, and Wheel parts
- Select parts from the list and preview
- Starter EAS Build profiles for Android and iOS

**Honest status:** this is a functional UI prototype, not a real 3D CAD engine yet. The next milestone is a touch-friendly 3D workspace, then transforms, exact dimensions, and project save/load.

## Run locally
Install Node.js LTS, then run:

```bash
npm install
npx expo start
```

Scan the QR code with Expo Go or use a simulator. For type checking, run `npm run typecheck`.

## EAS builds
Install EAS CLI and sign in:

```bash
npm install --global eas-cli
eas login
eas build:configure
eas build --platform android --profile preview
```

Native store publishing and developer accounts are separate steps.

## Workflow
Develop on `feat/expo-typescript-starter`; keep `main` stable until changes are reviewed and tested.
