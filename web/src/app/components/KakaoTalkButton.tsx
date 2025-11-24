interface KakaoTalkButtonProps {
  kakaoTalkId: string
  proName: string
}

export function KakaoTalkButton({ kakaoTalkId, proName }: KakaoTalkButtonProps) {
  const kakaoUrl = `https://pf.kakao.com/${kakaoTalkId}/chat`

  return (
    <a
      href={kakaoUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative overflow-hidden rounded-full border-2 border-[#d4af37] bg-[#1a1f3a]/90 px-8 py-4 text-lg font-bold text-[#d4af37] shadow-2xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-[#d4af37] hover:text-[#1a1f3a] hover:shadow-[0_0_40px_rgba(212,175,55,0.6)]"
      aria-label={`카카오톡으로 ${proName}에게 문의`}
    >
      <span className="relative z-10 flex items-center gap-2">
        💬 카카오톡으로 문의
      </span>
    </a>
  )
}
