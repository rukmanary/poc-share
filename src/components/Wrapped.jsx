import { useRef, useState } from 'react'
import { domToPng } from 'modern-screenshot'

function ShareIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  )
}

function Wrapped() {
  const frameRef = useRef(null)
  const [showButton, setShowButton] = useState(true)
  const [capturing, setCapturing] = useState(false)

  const handleShare = async () => {
    setShowButton(false)

    // Wait for button to be removed from DOM before capturing
    await new Promise(resolve => requestAnimationFrame(resolve))

    setCapturing(true)
    try {
      const dataUrl = await domToPng(frameRef.current)

      if (globalThis.ReactNativeWebView) {
        globalThis.ReactNativeWebView.postMessage(JSON.stringify({ type: 'share', image: dataUrl }))
      } else {
        console.log('[poc_share] captured image:', dataUrl.slice(0, 80) + '...')
      }
    } finally {
      setCapturing(false)
      setShowButton(true)
    }
  }

  return (
    <div className="story-frame" ref={frameRef}>
      <div className="header">
        <span className="sparkle">✦</span>
        <span className="brand-name">Undian Berhadiah 2025</span>
        <span className="sparkle">✦</span>
      </div>

      <div className="winner-section">
        <div className="trophy">🏆</div>
        <p className="subtitle">Selamat kepada</p>
        <h1 className="winner-name">Captain Orion!</h1>
        <div className="divider">🎉</div>
        <p className="prize-label">Pemenang Undian berhadiah</p>
        <div className="prize-name">Mobil BYD M6</div>
      </div>

      <div className="car-image-wrapper">
        <img src="/car.svg" alt="BYD M6" className="car-image" />
      </div>

      <div className="stars">✦ ✦ ✦ ✦ ✦</div>

      {showButton && !capturing && (
        <button className="share-btn" onClick={handleShare} aria-label="Share">
          <ShareIcon />
        </button>
      )}
    </div>
  )
}

export default Wrapped
