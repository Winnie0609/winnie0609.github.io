'use client';

import Image from 'next/image';
import { Loader, MapPin } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="flex flex-col mt-8">
      <div className="flex flex-col md:flex-row gap-8 items-center md:flex-row-reverse">
        <div className="flex-shrink-0">
          <Image
            src="/images/about.jpg"
            alt="About"
            width={170}
            height={170}
            className="rounded-full"
          />
        </div>
        <div className="flex-1 max-w-none ">
          <div className="mb-6">
            <div className="text-content-secondary text-sm font-medium leading-relaxed flex items-center ">
              <Loader className="w-4 h-4" />
              <p className="ml-2">狀態：仍然在努力摘星星</p>
            </div>
            <div className="text-content-secondary text-sm font-medium leading-relaxed flex items-center">
              <MapPin className="w-4 h-4" />
              <p className="ml-2">座標：台北</p>
            </div>
          </div>

          <p className="mb-4 text-content-secondary leading-relaxed">
            嗨，我是{' '}
            <strong className="font-semibold text-content-primary">
              Winnie
            </strong>
            . 一個前端工程師，圍繞著 React 生態系開發，專注於 Web 以及 React
            Native App 開發。
          </p>
          <p className="mb-4 text-content-secondary leading-relaxed">
            寫寫文章以及週記，關於學習、關於愛、關於生活碎片，以及腦袋中亂七八糟的想法。
          </p>
          <p className="mb-4 text-content-secondary leading-relaxed">
            關注有趣新奇的事物。一個異鄉人，來自 3°08&apos;52&quot;N
            101°41&apos;43&quot;E, 目前住在 25°02&apos;15&quot;N
            121°33&apos;45&quot;E。
          </p>
        </div>
      </div>

      <hr className="my-2 border-border-medium" />

      {/* Resume block */}
      <p className="mb-4 text-content-secondary leading-relaxed">
        目前正在積極求職中（
        <a
          href="/resume"
          className="text-link font-medium underline text-content-tertiary dark:text-content-primary dark:hover:text-link-hover dark:hover:no-underline hover:text-link-hover hover:no-underline decoration-link/60 decoration-1 underline-offset-2 transition-colors duration-200"
        >
          點我看履歷
        </a>
        ），於是把首頁改成求職版本：我是一位前端開發工程師，專注於使用 React,
        Next.js 和 React Native 打造高品質的 Web 與行動應用 (iOS &
        Android)。曾開發並部署多個行動裝置與網頁應用程式，近期專注於 AI
        整合。具備從零到一設計前端架構、制定技術選型、到最終部署的完整專案經驗。
      </p>

      <div className="flex flex-col">
        <p className="mb-2 text-content-secondary leading-relaxed">
          Languages:{' '}
          <strong className="font-semibold text-content-primary">
            JavaScript, TypeScript, HTML5, CSS3
          </strong>
        </p>
        <p className="mb-2 text-content-secondary leading-relaxed">
          Libraries & Frameworks:{' '}
          <strong className="font-semibold text-content-primary">
            React, React Native, Next.js, Redux, Styled-Components, LangChain
          </strong>
        </p>
        <p className="mb-2 text-content-secondary leading-relaxed">
          Tools:{' '}
          <strong className="font-semibold text-content-primary">
            Firebase, Git, Mixpanel
          </strong>
        </p>
        <p className="mb-2 text-content-secondary leading-relaxed">
          Core：{' '}
          <strong className="font-semibold text-content-primary">
            前端架構設計, 效能優化, A/B 測試, Serverless, AI/LLM 應用
          </strong>
        </p>
      </div>

      <hr className="my-4 border-border-medium" />
      <div>
        <p className="mb-2 text-content-secondary leading-relaxed">
          你可以在這裡找到我：
        </p>
        <p className="mb-2 text-content-secondary leading-relaxed">
          <a
            href="https://github.com/Winnie0609"
            target="_blank"
            rel="noopener noreferrer"
            className="text-link font-medium underline text-content-tertiary dark:text-content-primary dark:hover:text-link-hover dark:hover:no-underline hover:text-link-hover hover:no-underline decoration-link/60 decoration-1 underline-offset-2 transition-colors duration-200"
          >
            Github
          </a>
          ｜
          <a
            href="https://www.linkedin.com/in/hui-ni-ong/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-link font-medium underline text-content-tertiary dark:text-content-primary dark:hover:text-link-hover dark:hover:no-underline hover:text-link-hover hover:no-underline decoration-link/60 decoration-1 underline-offset-2 transition-colors duration-200"
          >
            LinkedIn
          </a>
          ｜
          <a
            href="mailto:winnieong0609@gmail.com"
            className="text-link font-medium underline text-content-tertiary dark:text-content-primary dark:hover:text-link-hover dark:hover:no-underline hover:text-link-hover hover:no-underline decoration-link/60 decoration-1 underline-offset-2 transition-colors duration-200"
          >
            Email
          </a>
        </p>
      </div>
    </div>
  );
}
