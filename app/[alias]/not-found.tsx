import Link from "next/link";
import { LinkIcon, AlertCircle, Home, ArrowLeft } from "lucide-react";

/**
 * Custom 404 page for invalid shortened URL aliases
 */
export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-light-bg dark:bg-dark-bg px-6">
      <div className="max-w-md w-full text-center space-y-8 animate-fadeIn">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
            <AlertCircle className="w-12 h-12 text-primary" />
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <h1 className="text-5xl md:text-6xl font-syne font-extrabold text-light-text dark:text-dark-text">
            404
          </h1>
          <h2 className="text-2xl font-syne font-bold text-light-text dark:text-dark-text">
            Enlace No Encontrado
          </h2>
          <p className="text-light-muted dark:text-dark-muted max-w-sm mx-auto">
            El enlace corto que intentas acceder no existe o ha sido eliminado.
            Verifica la URL e inténtalo de nuevo.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-syne font-semibold hover:opacity-90 transition-opacity"
          >
            <Home className="w-5 h-5" />
            Ir al Inicio
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border-2 border-light-muted/20 dark:border-dark-muted/20 text-light-text dark:text-dark-text font-syne font-semibold hover:bg-light-muted/5 dark:hover:bg-dark-muted/5 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Regresar
          </button>
        </div>

        {/* Branding */}
        <div className="pt-8 opacity-50">
          <Link href="/" className="inline-flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center transform rotate-3 bg-primary group-hover:rotate-6 transition-transform duration-300">
              <LinkIcon className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-kangge font-bold tracking-wider text-light-text dark:text-dark-text">
              LINKER
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
