export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 px-6 py-12 md:px-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">
        <a href="#" className="font-display text-xl font-black tracking-tight">
          Phase One<span className="text-accent"> Coaching</span>
        </a>

        <p className="font-light text-sm text-muted">
          © {new Date().getFullYear()} Phase One Coaching. All rights reserved.
        </p>

        <div className="flex items-center gap-6 text-sm font-light text-muted">
          <a
            href="https://www.instagram.com/phase.one.coaching/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-highlight"
          >
            Instagram
          </a>
          <a
            href="https://www.linkedin.com/in/xavier-pope-890ba8284/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-highlight"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
