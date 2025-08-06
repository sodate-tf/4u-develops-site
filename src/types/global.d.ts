// src/types/global.d.ts

// Define a interface para os parâmetros do comando 'config'
interface GtagConfigParams {
  page_path: string;
}

// Define a interface para os parâmetros do comando 'event'
interface GtagEventParams {
  event_category: string;
  event_label?: string;
  value?: number;
}

// Estende a interface global Window para incluir a função gtag
declare global {
  interface Window {
    
    // Sobrecarga 2: Assinatura para o comando 'event'
    gtag: (
      command: 'event',
      action: string,
      params: GtagEventParams
    ) => void;
    
    // Sobrecarga 1: Assinatura para o comando 'config'
    gtag: (
      command: 'config',
      targetId: string,
      params: GtagConfigParams
    ) => void;

  }
}

// Isso é necessário para que o TypeScript trate este arquivo como um módulo
export {};