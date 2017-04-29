# BudgetSMS
Budget and Expenses Management app built with NativeScript Angular TypeScriptn JavaScript

## INITIAL SETUP

I assume that you have NativeScript installed on your computer.
I started by creating my github repository, BudgetSMS, without initializing it.
Then I created my NativeScript project

tns create BudgetSMS --template nativescript-angular-drawer-template

Then I added the .gitignore file, which I copied from someone else on the internet.
I also added this README file.
Then I've run following code:

cd BudgetSMS
git init
git add .
git commit -m "initial commit"
git remote add origin https://github.com/thiagoufg/BudgetSMS.git
git push -u origin master

## Testing the project

First, enable USB debuggin on your device or emulator (like Bluestacks, Memu, AVD, etc).
Then, install an app called wireless adb.
It will tell you to type this on your computer:

adb connect 192.168.0.15:5555

To test that de connection worked, type:

adb devices

Then cd to the folder where your NativeScript project is and:

tns run android

Wait for a few minutes and the app should popup on your device or emulator.
Leave that terminal/command prompt window open because it will detect every code change and refresh the app on your device or emulator.
Open another terminal/command prompt window so that you may work.

## Installing the SideDrawer

tns plugin add nativescript-telerik-ui

https://www.npmjs.com/package/nativescript-angular-drawer-template

https://github.com/shripalsoni04/nativescript-angular-drawer-template

