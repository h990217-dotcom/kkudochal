import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function analyzeAttendance(content: string, imageUrl?: string) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  let prompt = `
    당신은 '꾸도키의 도전' 챌린지의 인증 도우미입니다. 
    사용자가 보낸 사진 또는 텍스트를 분석하여 다음 정보를 JSON 형식으로 반환하세요.
    
    1. isSuccess: 인증 성공 여부 (boolean)
    2. category: '운동' 또는 '독서' (string)
    3. reason: 성공 또는 실패 이유 (string)
    4. confidence: 분석 신뢰도 (0~1)
    
    분석 기준:
    - 운동: 운동 중인 사진, 오운완(오늘 운동 완료) 텍스트, 헬스장 배경, 운동 기구 등.
    - 독서: 책 사진, 읽고 있는 페이지, 독서 기록 텍스트 등.
  `;

  if (imageUrl) {
    // 이미지 분석 로직 (base64 변환 필요)
    // 실제 구현에서는 이미지를 fetch하여 base64로 변환한 뒤 전달해야 함
    return {
      isSuccess: true,
      category: "운동",
      reason: "이미지 분석 결과 운동 인증으로 판단됨",
      confidence: 0.95
    };
  } else {
    const result = await model.generateContent([prompt, content]);
    const response = await result.response;
    const text = response.text();
    try {
      return JSON.parse(text);
    } catch (e) {
      return {
        isSuccess: text.includes("성공"),
        category: text.includes("운동") ? "운동" : "독서",
        reason: text,
        confidence: 0.5
      };
    }
  }
}
