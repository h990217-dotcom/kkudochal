import { NextResponse } from 'next/server';
import { analyzeAttendance } from '@/lib/gemini';
import { recordAttendance } from '@/lib/sheets';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // 카카오톡 챗봇 스펙에 따른 데이터 추출 (예시)
    // 실제 카카오 i 오픈빌더 스펙: body.userRequest.utterance, body.userRequest.user.properties.nickname 등
    const utterance = body.userRequest?.utterance || body.content || '';
    const nickname = body.userRequest?.user?.properties?.nickname || 'Unknown';
    const imageUrl = body.userRequest?.params?.media?.url; // 이미지 URL이 있을 경우

    // 1. Gemini AI 분석
    const analysis = await analyzeAttendance(utterance, imageUrl);

    // 2. 구글 시트 기록
    await recordAttendance({
      name: nickname,
      category: analysis.category,
      isSuccess: analysis.isSuccess,
      content: utterance,
      reason: analysis.reason
    });

    // 3. 카카오톡 응답 포맷 (SimpleText)
    return NextResponse.json({
      version: "2.0",
      template: {
        outputs: [
          {
            simpleText: {
              text: `✅ [${analysis.category}] 인증 결과\n결과: ${analysis.isSuccess ? '성공' : '실패'}\n이유: ${analysis.reason}`
            }
          }
        ]
      }
    });
  } catch (error) {
    console.error('Webhook Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
