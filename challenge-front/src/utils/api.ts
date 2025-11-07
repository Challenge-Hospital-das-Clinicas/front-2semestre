// Helper para 'dormir'
const sleep = (ms: number) => new Promise(res => setTimeout(res, ms));

// A sua função de retry, agora 'exportada' para o resto do app
export async function fetchWithRetry(input: RequestInfo | URL, init?: RequestInit, tries = 3) {
  
  let lastErr: unknown;

  for (let i = 0; i < tries; i++) {
    try {
      
      const resp = await fetch(input, init);

    
      if (resp.status === 429) { 
        const wait = 500 * (i + 1); 
        await sleep(wait);
        continue; 
      }

      if (resp.status === 503) {
        const wait = 1000 * (i + 1); 
        await sleep(wait);
        continue; 
      }

      return resp;

    } catch (e) {
  
      lastErr = e;
      const wait = 300 * (i + 1);
      await sleep(wait);
    }
  }

  throw lastErr ?? new Error('Falha ao conectar após 3 tentativas');
}