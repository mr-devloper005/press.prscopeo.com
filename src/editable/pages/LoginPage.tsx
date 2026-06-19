import type { Metadata } from 'next'
import Link from 'next/link'
import { buildPageMetadata } from '@/lib/seo'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableLocalLoginForm } from '@/editable/components/EditableLocalAuthForms'
import { pagesContent } from '@/editable/content/pages.content'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: '/login', title: 'Login', description: pagesContent.auth.login.metadataDescription })
}

export default function LoginPage() {
  return (
    <EditableSiteShell>
      <main className="bg-[#111010] text-white">
        <section className="mx-auto grid min-h-[calc(100vh-12rem)] max-w-[1180px] gap-5 px-4 py-12 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:px-8">
          <div className="flex flex-col justify-center rounded-lg border border-white/12 bg-[#252221] p-8 sm:p-12 lg:p-16">
            <p className="text-xs font-black uppercase tracking-[0.28em] text-[var(--slot4-accent)]">{pagesContent.auth.login.badge}</p>
            <h1 className="mcp-gradient-text mt-5 max-w-xl text-5xl font-medium leading-[1.08] tracking-[-0.045em] sm:text-7xl">{pagesContent.auth.login.title}</h1>
            <p className="mt-6 max-w-lg text-sm font-semibold leading-8 text-white/70">{pagesContent.auth.login.description}</p>
          </div>
          <div className="flex flex-col justify-center rounded-lg bg-white p-7 text-[#111010] shadow-[0_24px_80px_rgba(0,0,0,.25)] sm:p-12 lg:p-16">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#00bdb2]">Member access</p>
            <h2 className="mt-3 text-4xl font-medium">{pagesContent.auth.login.formTitle}</h2>
            <EditableLocalLoginForm />
            <p className="mt-5 border-t border-black/10 pt-5 text-sm text-black/65">New here? <Link href="/signup" className="font-black text-[#00a99f] underline-offset-4 hover:underline">{pagesContent.auth.login.createCta}</Link></p>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
