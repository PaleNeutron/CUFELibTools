module.exports = {
    pluginOptions: {
      electronBuilder: {
        builderOptions: {
          // options placed here will be merged with default configuration and passed to electron-builder
          "appId": "com.johnlyu.cufelibtools",
          "productName": "CUFE Lib Tools",
          "copyright": "MIT",
          "mac": {
            "category": "public.build.automation",
            "icon": "assets/icons/mac/Icon-1024.png"
          },
          "dmg": {
            "contents": [
              {
                "x": 110,
                "y": 150
              },
              {
                "x": 440,
                "y": 150,
                "type": "link",
                "path": "/Applications"
              }
            ],
            "artifactName": "cufe_lib_tools-${version}.${ext}"
          },
          "win": {
            "target": [
              {
                "target": "nsis",
                "arch": [
                  "x64"
                ]
              },
              {
                "target": "portable"
              }
            ],
            "icon": "assets/icons/win/icon.ico"
          },
          "nsis": {
            "runAfterFinish": true,
            "installerIcon": "assets/icons/win/icon.ico",
            "artifactName": "cufe_lib_tools-${version}.${ext}"
          },
          "portable": {
            "artifactName": "cufe_lib_tools.exe"
          },
          "appx": {
            "applicationId": "cufe_lib_tools",
            "backgroundColor": "#464646",
            "identityName": "cufe_lib_tools",
            "publisherDisplayName": "JohnLyu",
            "artifactName": "cufe_lib_tools-${version}.${ext}"
          },
          "publish": [
            {
              "provider": "github",
              "releaseType": "release"
            }
          ]
        }
      }
    }
  }