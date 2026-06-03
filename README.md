# poc_share

Halaman React berbentuk kartu Instagram Story (9:16) untuk dibagikan via React Native WebView + `react-native-view-shot`.

## Cara kerja

1. Halaman menampilkan kartu ucapan pemenang undian full-screen
2. Tombol share (ikon, pojok kanan atas) diklik → tombol hilang → `postMessage` dikirim ke RN
3. RN menangkap pesan dan men-screenshot WebView menggunakan `react-native-view-shot`

## Setup

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # output ke dist/
```

## Integrasi React Native

```jsx
<WebView
  source={{ uri: 'https://your-deployed-url.com/' }}
  onMessage={(event) => {
    const { type } = JSON.parse(event.nativeEvent.data)
    if (type === 'share') {
      // screenshot WebView dengan react-native-view-shot
    }
  }}
/>
```

## Kustomisasi

| File | Keterangan |
|---|---|
| `src/App.jsx` | Teks nama pemenang, hadiah, konten kartu |
| `public/car.svg` | Ganti dengan foto BYD M6 asli (`.png`/`.jpg` juga bisa) |
| `src/index.css` | Warna, font, layout |
