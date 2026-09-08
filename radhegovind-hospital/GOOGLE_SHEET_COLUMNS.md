Columns for Google Sheet (use these exact headers in this order):

1. Patient Name — Required
2. Phone — Required (10 digits)
3. Date — Required (preferred: YYYY-MM-DD; DD/MM/YYYY also accepted)
4. Time — Required (formats: HH:MM or H:MM AM/PM)
5. Doctor — Optional (username or display name; falls back to import modal selection if blank)
6. Purpose — Optional
7. Age — Optional (used only when creating a new patient)
8. Gender — Optional (used only when creating a new patient)
9. Address — Optional (used only when creating a new patient)
10. Referred By — Optional (used only when creating a new patient)
11. Notes — Optional

Notes:
- The web form sends these exact column names as query parameters to the Google Apps Script URL.
- The server API now accepts matching JSON fields: `patientName`, `phone`, `date`, `time`, `doctor`, `purpose`, `age`, `gender`, `address`, `referredBy`, `notes` and stores a normalized `dateTime` in ISO format.
- Phone numbers are validated to 10 digits on the client and server.
