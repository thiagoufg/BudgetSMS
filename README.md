# BudgetSMS
Budget and Expenses Management app built with NativeScript Angular TypeScriptn JavaScript

## INITIAL SETUP
I assume that you have NativeScript installed on your computer.
Create the NativeScript project based on a SideDrawer template:

tns create BudgetSMS --template nativescript-angular-drawer-template
tns platform add android
npm install tns-platform-declarations --save-dev
tns plugin add nativescript-sms-inbox
tns plugin add nativescript-sqlite

## Testing the project
First, enable USB debuggin on your device or emulator (like Bluestacks, Memu, AVD, etc).
Then, install an app called wireless adb.
It will tell you to type this on your computer:

adb connect 192.168.0.15:5555
adb devices
tns run android

Wait for a few minutes. The app should run on your device.
Leave that terminal/command prompt window open because it will detect every code change and refresh the app on your device or emulator.
Open another terminal/command prompt window so that you may work.

## uploading to GITHUB
Create the BudgetSMS repository on GITHUB.
Add the .gitignore file, which I copied from someone else on the internet.
Add a README file, like this.
Run the following code:

cd BudgetSMS
git init
git add .
git commit -m "initial commit"
git remote add origin https://github.com/thiagoufg/BudgetSMS.git
git push -u origin master

## Reading SMS
tns plugin add nativescript-sms-inbox

## Intercepting incoming sms
Change AndroidManifest
npm install tns-platform-declarations --save-dev
edit /references.d.ts including:
/// <reference path="./node_modules/tns-platform-declarations/android.d.ts" /> Needed for autocompletion and compilation.