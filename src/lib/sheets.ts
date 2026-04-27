import { google } from 'googleapis';

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
const SPREADSHEET_ID = '17jitklt5RnuVQ4yXNGVJRhZCzRL9Wv7wCMglUbNOZlU';

async function getSheetsClient() {
  const auth = new google.auth.GoogleAuth({
    credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON || '{}'),
    scopes: SCOPES,
  });
  return google.sheets({ version: 'v4', auth });
}

export async function recordAttendance(data: {
  name: string;
  category: string;
  isSuccess: boolean;
  content: string;
  reason: string;
}) {
  const sheets = await getSheetsClient();
  const date = new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });

  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: '시트1!A:F', // 사용자가 요청한 대로 시트에 기록
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[
          date,
          data.name,
          data.category,
          data.isSuccess ? '성공' : '실패',
          data.content,
          data.reason
        ]],
      },
    });
    return { success: true };
  } catch (error) {
    console.error('Error recording to sheets:', error);
    return { success: false, error };
  }
}
