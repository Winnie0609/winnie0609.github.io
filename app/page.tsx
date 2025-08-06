'use client';

import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import Typewriter from 'typewriter-effect';
import LanguageSwitch from '@/components/LanguageSwitch';
import { useLanguage } from '@/components/LanguageProvider';

export default function Home() {
  const { language: currentLanguage } = useLanguage();

  return (
    <div className="flex flex-row gap-2">
      <div>
        <LanguageSwitch />
        {/* <div className="bg-blue-100 rounded-xs p-4">
          <div className="text-sm text-content-secondary font-normal">
            I'm currently exploring new opportunities to join a product-driven
            team as a Frontend Developer. I thrive on transforming complex
            challenges into elegant, user-centric interfaces.
          </div>

          <div className="text-sm text-content-secondary font-normal">
            Explore what I can bring to your team and let's connect!
          </div>
        </div> */}

        <div className="text-7xl font-semibold mt-20">
          <Typewriter
            key={`greeting-${currentLanguage}`}
            options={{
              delay: 75,
              cursor: '',
            }}
            onInit={(typewriter) => {
              typewriter
                .typeString(
                  currentLanguage === 'zh'
                    ? '嗨，我是 Winnie!'
                    : "Hi, I'm Winnie!"
                )
                .pauseFor(1000)
                .start();
            }}
          />
        </div>
        <div className="flex flex-row gap-2 items-center mt-1">
          <div className="text-5xl font-normal">
            <Typewriter
              key={`titles-${currentLanguage}`}
              options={{
                strings: [
                  currentLanguage === 'zh'
                    ? '前端工程師'
                    : 'A FRONTEND DEVELOPER.',
                  currentLanguage === 'zh' ? '探索者' : 'AN EXPLORER.',
                  currentLanguage === 'zh' ? '火鍋愛好者' : 'A HOT POT LOVER.',
                ],
                autoStart: true,
                loop: true,
                delay: 75,
                deleteSpeed: 20,
              }}
            />
          </div>
        </div>

        <div className="text-lg font-normal mt-10">
          <Typewriter
            key={`description-${currentLanguage}`}
            options={{
              delay: 10,
              cursor: '',
            }}
            onInit={(typewriter) => {
              typewriter
                .typeString(
                  currentLanguage === 'zh'
                    ? '前端開發工程師，專注於使用 <b>React</b> 和 <b>React Native</b> 打造高品質的 Web 與行動應用 (iOS & Android)。曾開發並部署多個行動裝置與網頁應用程式，近期專注於 AI 整合。具備從零到一設計前端架構、制定技術選型、到最終部署的完整專案經驗。'
                    : 'A Frontend Developer specializing in building high-quality web and mobile applications (iOS & Android) using <b>React</b> and <b>React Native</b>. I have developed and deployed multiple mobile and web applications, with a focus on AI integration. I have extensive experience from design to deployment of frontend architecture, technical selection, and final deployment.'
                )
                .pauseFor(1000)
                .start();
            }}
          />
        </div>

        {/* social media links with icons */}
        <div className="flex flex-row gap-4 mt-6 items-center">
          <a
            href="https://github.com/Winnie0609"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-content-secondary hover:text-primary transition-colors group"
          >
            <Github className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </a>

          <a
            href="https://www.linkedin.com/in/hui-ni-ong/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-content-secondary hover:text-primary transition-colors group"
          >
            <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </a>

          <a
            className="flex items-center gap-2 text-content-secondary hover:text-primary transition-colors group"
            href="mailto:winnieong0609@gmail.com"
          >
            <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </a>

          <a
            href="/resume"
            className="flex items-center gap-2 text-content-secondary hover:text-primary transition-colors group decoration-content-secondary hover:decoration-primary underline-offset-2 underline hover:no-underline"
          >
            {currentLanguage === 'zh' ? '查看履歷' : 'View Resume'}
          </a>
        </div>
      </div>
    </div>
  );
}
