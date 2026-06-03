import { useState } from 'react'

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

function App() {
  const [showButton, setShowButton] = useState(true)

  const handleShare = () => {
    setShowButton(false)
    // rAF ensures the button is removed from DOM before postMessage fires,
    // sehingga screenshot react-native-view-shot tidak menangkap tombol
    requestAnimationFrame(() => {
      if (window.ReactNativeWebView) {
        window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'share' }))
      } else {
        console.log('[poc_share] postMessage:', { type: 'share' })
        setTimeout(() => setShowButton(true), 2000)
      }
    })
  }

  return (
    <div className="story-frame">
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

      {showButton && (
        <button className="share-btn" onClick={handleShare} aria-label="Share">
          <ShareIcon />
        </button>
      )}
    </div>
  )
}

export default App
