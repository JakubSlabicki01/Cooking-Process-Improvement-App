
export interface ResolvedIcons {
    [key: string]: JSX.Element | string;
  }

export function checkImage(url: string) {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true); // Image loads successfully
      img.onerror = () => resolve(false); // Image fails to load (e.g., not found)
      img.src = url;
    });
  }