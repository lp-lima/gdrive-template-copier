# *GDrive Template Copier*

[![Version][version-badge]][version]

#### *GDrive Template Copier* lets you copy a static template folder into your currently viewed Google Drive folder with a single click.

## Installation

Install *GDrive Template Copier* locally by following these steps:

1. Open Google Chrome.
2. Navigate to `chrome://extensions/`.
3. Enable **Developer mode** in the top right.
4. Click **Load unpacked** and select the folder containing this extension.

## Usage

1. Open Google Drive and navigate inside the folder where you want to copy the template.
2. Click the *GDrive Template Copier* icon in the Chrome toolbar.
3. Click the **Copy Template Here** button.
4. Wait for the copy operation to complete.

## How it Works

Because Google Drive does not support native folder copying in the web interface, this extension relies on a backend Google Apps Script. 

When you click the button, the extension securely triggers a Standalone Web App using your hardcoded credentials and folder IDs, bypassing the need for manual script execution or complex Workspace Add-on configurations.

## Setup Google Apps Script

To make the extension work, you must host the copy script on your own Google account:

1. Create a new Google Apps Script project at [script.google.com](https://script.google.com/).
2. Paste the provided Apps Script code.
3. Replace the `SOURCE_FOLDER_ID` and `SECRET_TOKEN`.
4. Deploy as a Web App (Execute as: **Me**, Access: **Anyone**).
5. Copy the Web App URL and your Secret Token into the extension's `popup.js`.

[version-badge]: https://img.shields.io/badge/version-1.0-blue.svg
[version]: #
