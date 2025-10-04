export default function SignUpPage() {
  return (
    <div className="container flex min-h-screen items-center justify-center py-12">
      <form className="w-full max-w-md space-y-6 rounded-xl border bg-card p-8 shadow-xl">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold">Hesap oluşturun</h1>
          <p className="text-sm text-muted-foreground">Satış panelinizi dakikalar içinde hazırlayın.</p>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              E-posta
            </label>
            <input id="email" name="email" type="email" required className="w-full rounded-md border px-3 py-2 text-sm shadow-sm" />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              Şifre
            </label>
            <input id="password" name="password" type="password" required className="w-full rounded-md border px-3 py-2 text-sm shadow-sm" />
          </div>
        </div>
        <button type="submit" className="flex w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:bg-primary/90">
          Kayıt Ol
        </button>
      </form>
    </div>
  );
}
