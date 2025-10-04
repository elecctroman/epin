# EPINX Dijital Ürün Platformu

EPINX; oyun keyi, EPIN ve dijital hesap satışı yapan işletmeler için tasarlanmış, otomatik teslimat ve yönetim panelli bir platformdur. Bu repo Next.js 14 tabanlı frontend ile Express.js + Prisma tabanlı backend'i aynı monorepoda barındırır.

## Mimarinin Özeti

- **Frontend:** Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS, Shadcn/UI bileşenleri, Framer Motion animasyonları
- **Backend:** Express.js API, Prisma ORM, PostgreSQL, Stripe ödeme entegrasyonu, Nodemailer/Resend e-posta altyapısı
- **Kimlik Doğrulama:** NextAuth.js (JWT stratejisi ve OAuth sağlayıcıları)
- **Güvenlik:** Zod validasyonları, CSRF koruması, rate limiting, JWT süresi, rol tabanlı yetkilendirme, helmet, Winston loglama
- **Depolama:** PostgreSQL (Railway/Render/NeonDB uyumlu)
- **Queue & Rate Limiting:** Upstash Redis için REDIS_URL desteği (örnek konfig)
- **Dokümantasyon:** Swagger UI `/docs`

## Dizim Yapısı

```
frontend/   → Next.js arayüzü (kullanıcı & admin)
backend/    → Express API + Prisma şeması
.env.example
README.md
```

## Frontend

- `/` ana sayfa, kampanyalar ve animasyonlu hero
- `/urunler`, `/urun/[slug]`, `/sepet`, `/odeme`, `/destek`, `/blog` kullanıcı sayfaları
- `/hesabim` korumalı alan (NextAuth + server actions)
- `/giris`, `/kayit`, `/sifremi-unuttum` kimlik doğrulama ekranları
- `/admin` altında satış dashboardu için rota altyapısı (örnek içerikler)
- Tailwind + Shadcn tabanlı bileşenler, theme toggler, sonner toaster

### Frontend Komutları

```bash
cd frontend
pnpm install
pnpm dev # http://localhost:3000
```

> Not: NextAuth oturumları için `.env` değerlerini doldurun ve backend API adresini `BACKEND_URL` ile işaretleyin.

## Backend

- Express tabanlı REST API (`/api/...`) ve Stripe webhook desteği
- Prisma PostgreSQL şeması; kullanıcılar, ürünler, key stokları, siparişler, ticket ve bildirim modelleri
- Zod ile endpoint validasyonları, JWT tabanlı kimlik doğrulama, rol bazlı middleware
- Swagger dokümantasyonu `/docs`

### Önemli API Uç Noktaları

| Metot | Yol | Açıklama |
|-------|-----|----------|
| `POST` | `/api/auth/register` | Kullanıcı kaydı |
| `POST` | `/api/auth/login` | JWT erişim & refresh token |
| `GET` | `/api/auth/me` | Oturum sahibi bilgisi |
| `POST` | `/api/auth/password` | Şifre güncelleme |
| `POST` | `/api/auth/tokens` | API token üretimi |
| `GET` | `/api/products` | Ürün listesi |
| `POST` | `/api/products` | (Admin) ürün oluştur |
| `PATCH` | `/api/products/:id` | (Admin) ürün güncelle |
| `DELETE` | `/api/products/:id` | (Admin) ürün sil |
| `GET` | `/api/keys/:productId` | (Admin) stok listesi |
| `POST` | `/api/keys` | (Admin) tekil key ekle |
| `POST` | `/api/keys/bulk` | (Admin) CSV/toplu key ekle |
| `DELETE` | `/api/keys/:id` | (Admin) key soft delete |
| `GET` | `/api/orders` | (Admin) sipariş listesi |
| `POST` | `/api/orders` | Sipariş oluştur + ödeme intent |
| `POST` | `/api/orders/:id/finalize` | Sipariş teslimatı tamamla |
| `PATCH` | `/api/orders/:id` | (Admin) sipariş durumu |
| `GET` | `/api/payment/providers` | Ödeme sağlayıcıları |
| `POST` | `/api/payment/intent` | Stripe intent |
| `POST` | `/api/payment/webhook` | Stripe webhook |
| `GET` | `/api/tickets` | (Admin) ticket listesi |
| `POST` | `/api/tickets` | Ticket oluştur |
| `PATCH` | `/api/tickets/:id` | (Admin) ticket güncelle |
| `GET` | `/api/users` | (Admin) kullanıcı listesi |
| `PATCH` | `/api/users/:id/role` | (Admin) rol güncelle |
| `POST` | `/api/users/:id/ban` | (Admin) kullanıcıyı banla |
| `GET` | `/api/notifications` | Bildirim listesi |
| `POST` | `/api/notifications` | (Admin) bildirim oluştur |
| `POST` | `/api/notifications/:id/read` | Bildirim okundu işaretle |

### Backend Komutları

```bash
cd backend
pnpm install
pnpm prisma migrate dev
pnpm dev # http://localhost:4000
```

## Test & Kalite

- Jest/Playwright entegrasyonu için yer ayrıldı (opsiyonel)
- ESLint konfigürasyonları hem frontend hem backend için mevcut
- Swagger ile API sözleşmesi `/docs`

## Docker

Geliştirme ortamı için örnek `docker-compose.yml` aşağıda verilmiştir (deploy aşamasında uyarlayın):

```yaml
version: "3.9"
services:
  db:
    image: postgres:16
    restart: unless-stopped
    environment:
      POSTGRES_USER: epinx
      POSTGRES_PASSWORD: epinx
      POSTGRES_DB: epinx
    ports:
      - "5432:5432"
  backend:
    build: ./backend
    env_file: .env
    depends_on:
      - db
  frontend:
    build: ./frontend
    env_file: .env
    ports:
      - "3000:3000"
```

## Dağıtım

### Frontend – Vercel

1. `frontend` dizinini yeni Vercel projesi olarak tanımlayın.
2. Gerekli environment değişkenlerini `.env` dosyasından aktarın (`NEXTAUTH_SECRET`, `BACKEND_URL`, OAuth anahtarları vb.).
3. Build komutu: `pnpm install && pnpm build`
4. Output: `.vercel/output`

### Backend – Railway / Render

1. PostgreSQL ve Redis (opsiyonel) servislerini oluşturun.
2. `backend` dizinini Railway/Render projesine bağlayın.
3. Environment değişkenlerini `.env` dosyasından kopyalayın.
4. Build komutu: `pnpm install && pnpm build`
5. Start komutu: `pnpm start`
6. `DATABASE_URL`, `JWT_SECRET`, `STRIPE_SECRET_KEY`, `FRONTEND_URL` değerlerinin doğru olduğundan emin olun.

## Geliştirme Notları

- `pnpm` paket yöneticisi önerilir.
- Prisma CLI komutları backend dizininden çalıştırılmalıdır.
- Stripe webhook URL’si: `https://<backend-domain>/api/payment/webhook`
- Destek entegrasyonları (Tawk.to, Discord/Telegram webhook vb.) için placeholder alanlar frontend ve backend tarafında yorum satırlarında belirtilmiştir.

## Lisans

MIT
