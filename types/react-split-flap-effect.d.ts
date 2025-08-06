declare module 'react-split-flap-effect' {
  import { ComponentType } from 'react';

  export interface FlapDisplayProps {
    chars?: string;
    length: number;
    value: string;
    timing?: number;
    className?: string;
    padChar?: string;
    padMode?: 'auto' | 'start' | 'end';
    hinge?: boolean;
    render?: ComponentType<any>;
  }

  export const FlapDisplay: ComponentType<FlapDisplayProps>;

  export const Presets: {
    NUM: string;
    ALPHANUM: string;
  };
}
