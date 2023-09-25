FIREBASE HOSTING

for admin hosting
{
  "hosting": {
    "site": "wpi-admin",
    "public": "public",
    ...
  }
}


firebase deploy --only hosting:wpi-admin

for ticketing hosting
{
  "hosting": {
    "site": "wellnessproinc-ticket-request",
    "public": "public",
    ...
  }
}

firebase deploy --only hosting:wellnessproinc-ticket-request