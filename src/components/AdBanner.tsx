import { useEffect, useRef } from "react";

interface AdBannerProps {
  slot: string;
  format?: "auto" | "horizontal" | "vertical" | "rectangle";
  responsive?: boolean;
  className?: string;
  isPremium?: boolean;
}

export const AdBanner = ({ 
  slot, 
  format = "auto", 
  responsive = true, 
  className = "",
  isPremium = false
}: AdBannerProps) => {
  const adRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    if (!isPremium && adRef.current) {
      try {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      } catch (err) {
        console.error("AdSense error:", err);
      }
    }
  }, [isPremium]);

  if (isPremium) {
    return null;
  }

  return (
    <div className={`ad-container my-8 flex justify-center ${className}`}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-5329416782079269"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive.toString()}
      />
    </div>
  );
};
