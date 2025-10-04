export default function ForgotPasswordPage() {
  return (
    <div className="container flex min-h-screen items-center justify-center py-12">
      <form className="w-full max-w-md space-y-6 rounded-xl border bg-card p-8 shadow-xl">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold">Şifre sıfırlama</h1>
          <p className="text-sm text-muted-foreground">
            E-posta adresinize şifre sıfırlama bağlantısı gönderilecektir.
          </p>
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            E-posta
          </label>
          <input id="email" name="email" type="email" required className="w-full rounded-md border px-3 py-2 text-sm shadow-sm" />
        </div>
        <button type="submit" className="flex w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:bg-primary/90">
          Bağlantı Gönder
        </button>
      </form>
    </div>
  );
}
