import { version } from "@/app/version";

/* Way Canguk fork: credit to Whombat, licence, and a link to this fork's source. */
export function Footer() {
  return (
    <nav className="mt-auto">
      <div className="flex z-50 flex-wrap justify-between items-center gap-2 p-4 text-sm text-stone-500">
        <span>Anotasi Way Canguk</span>
        <span>
          Built on{" "}
          <a className="underline" href="https://github.com/mbsantiago/whombat">
            Whombat
          </a>{" "}
          {version} © Martínez Balvanera et al., GPL-3.0 ·{" "}
          <a
            className="underline"
            href="https://github.com/ikhwanuddin/whombat/tree/waycanguk"
          >
            source code
          </a>
        </span>
      </div>
    </nav>
  );
}
