# toDO-list

Tarayıcıda çalışan basit bir yapılacaklar listesi uygulaması. Framework, build adımı veya bağımlılık yok; saf HTML/CSS/JavaScript.

- Canlı site: https://mrtdgny1903.github.io/toDO-list/
- Repo: https://github.com/mrtdgny1903/toDO-list

## Dosyalar

- `index.html` — sayfa yapısı (form, filtre butonları, liste, alt bilgi)
- `style.css` — tüm stiller
- `app.js` — uygulama mantığı. `todos` dizisi tek durum kaynağıdır; her değişiklikten sonra `save()` ve `render()` çağrılır.

Görev verisi: `{ id, text, done, due }`. `due` ya `"YYYY-MM-DD"` ya `null`. Veriler `localStorage`'da `"todos"` anahtarı altında tutulur; sunucu/veritabanı yok.

## Çalıştırma ve kontrol

- Yerelde açmak: `open index.html`
- Sözdizimi kontrolü: `node --check app.js` (yalnızca sözdizimini doğrular, davranışı değil — değişiklikler tarayıcıda denenmeli)

## Yayınlama

`main` dalına `git push` yapınca GitHub Pages siteyi 1–2 dakika içinde günceller. Yani `main`'e giden her şey canlıya çıkar.

Bu makinede `gh` Homebrew ile `/opt/homebrew/bin` altında; komutlardan önce `export PATH="/opt/homebrew/bin:$PATH"` gerekebilir.

## Kurallar

- Arayüz metinleri ve kod yorumları Türkçe.
- Bağımlılık veya framework ekleme; her şey tarayıcıda doğrudan açılabilir kalsın.
- Kullanıcı metnini DOM'a `textContent` ile yaz, `innerHTML` ile değil.
- `localStorage` veri yapısını değiştirirsen eski kayıtlarla uyumlu kal (eksik alanları varsayılanla doldur).
- Tarihleri yerel saatle `"YYYY-MM-DD"` olarak karşılaştır (`todayStr()`); `toISOString()` UTC'ye çevirdiği için kullanma.
