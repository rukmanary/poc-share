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

function UploadIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <polyline points="16 6 12 2 8 6" />
      <line x1="12" y1="2" x2="12" y2="15" />
    </svg>
  )
}

function Wrapped() {
  const frameRef = useRef(null)
  const [showButton, setShowButton] = useState(true)
  const [capturing, setCapturing] = useState(false)

  const captureImage = async () => {
    setShowButton(false)
    await new Promise(resolve => requestAnimationFrame(resolve))
    setCapturing(true)
    try {
      return await domToPng(frameRef.current, { scale: 3 })
    } finally {
      setCapturing(false)
      setShowButton(true)
    }
  }

  const handleShare = async () => {
    const dataUrl = await captureImage()
    if (globalThis.ReactNativeWebView) {
      globalThis.ReactNativeWebView.postMessage(JSON.stringify({ type: 'share', image: dataUrl }))
    } else {
      console.log('[poc_share] captured image:', dataUrl.slice(0, 80) + '...')
    }
  }

  const handleWebShare = async () => {
    const dataUrl = await captureImage()
    const res = await fetch(dataUrl)
    const blob = await res.blob()
    const file = new File([blob], 'pemenang.png', { type: 'image/png' })

    if (navigator.canShare?.({ files: [file] })) {
      await navigator.share({
        files: [file],
        title: 'Undian Berhadiah 2025',
        text: 'Selamat kepada pemenang undian berhadiah!',
      })
    } else {
      const a = document.createElement('a')
      a.href = dataUrl
      a.download = 'pemenang.png'
      a.click()
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
        <>
          <button className="share-btn" onClick={handleShare} aria-label="Share via app">
            <ShareIcon />
          </button>
          <button className="share-btn share-btn--web" onClick={handleWebShare} aria-label="Share to social media">
            <UploadIcon />
          </button>
        </>
      )}
    </div>
  )
}

export default Wrapped
