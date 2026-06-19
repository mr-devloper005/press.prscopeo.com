import Link from 'next/link'
import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

export default function AboutPage() {
  return (
    <EditableSiteShell>
      <main className="bg-[#111010] text-white">
        <section className="border-b border-white/10">
          <div className="mx-auto max-w-[1280px] px-4 py-20 text-center sm:px-6 lg:px-8 lg:py-28">
            <p className="text-xs font-black uppercase tracking-[0.28em] text-[var(--slot4-accent)]">{pagesContent.about.badge}</p>
            <h1 className="mcp-gradient-text mx-auto mt-5 max-w-5xl text-5xl font-medium leading-[1.08] tracking-[-0.045em] sm:text-7xl">
              Media distribution designed for clear public updates.
            </h1>
          </div>
        </section>

        <section className="mx-auto grid max-w-[1180px] gap-5 px-4 py-14 sm:px-6 lg:grid-cols-[1.45fr_0.55fr] lg:px-8">
          <article className="rounded-lg border border-white/12 bg-[#252221] p-7 sm:p-10 lg:p-14">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-[var(--slot4-accent)]">About {SITE_CONFIG.name}</p>
            <p className="mt-6 text-3xl font-medium leading-[1.25] tracking-[-.035em] sm:text-4xl">{pagesContent.about.description}</p>
            <div className="mt-10 grid gap-5 text-base leading-8 text-white/68">
              {pagesContent.about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </article>
          <aside className="grid gap-5">
            {pagesContent.about.values.map((value, index) => (
              <div key={value.title} className="rounded-lg border border-white/12 bg-[#1b1918] p-7 sm:p-8">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-[var(--slot4-accent)]">0{index + 1}</p>
                <h2 className="mt-4 text-2xl font-semibold leading-tight">{value.title}</h2>
                <p className="mt-4 text-sm leading-7 text-white/62">{value.description}</p>
              </div>
            ))}
          </aside>
        </section>

        <section className="bg-[#252221]">
          <div className="mx-auto flex max-w-[1180px] flex-col gap-6 px-4 py-12 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
            <h2 className="max-w-3xl text-4xl font-medium leading-tight tracking-[-.04em] sm:text-5xl">Explore the releases shaping the conversation.</h2>
            <Link href="/search" className="inline-flex w-fit rounded bg-[var(--slot4-accent)] px-6 py-4 text-sm font-semibold text-black">Explore the archive</Link>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
