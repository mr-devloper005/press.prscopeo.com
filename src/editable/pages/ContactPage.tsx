'use client'

import { FileText, Mail, Megaphone } from 'lucide-react'
import { pagesContent } from '@/editable/content/pages.content'
import { EditableContactLeadForm } from '@/editable/components/EditableContactLeadForm'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

const desks = [
  { icon: FileText, title: 'Release desk', body: 'Send publication questions, source material, corrections, and announcement details.' },
  { icon: Megaphone, title: 'Media partnerships', body: 'Discuss distribution, syndication, visibility programs, and campaign support.' },
  { icon: Mail, title: 'General support', body: 'Reach the team for account, publishing, or site-related help.' },
]

export default function ContactPage() {
  return (
    <EditableSiteShell>
      <main className="bg-[#111010] text-white">
        <section className="border-b border-white/10">
          <div className="mx-auto max-w-[1280px] px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-24">
            <p className="text-xs font-black uppercase tracking-[0.28em] text-[var(--slot4-accent)]">{pagesContent.contact.eyebrow}</p>
            <h1 className="mcp-gradient-text mx-auto mt-5 max-w-5xl text-5xl font-medium leading-[1.08] tracking-[-0.045em] sm:text-7xl">{pagesContent.contact.title}</h1>
            <p className="mx-auto mt-6 max-w-2xl text-base font-semibold leading-8 text-white/70">{pagesContent.contact.description}</p>
          </div>
        </section>

        <section className="mx-auto grid max-w-[1180px] gap-5 px-4 py-14 sm:px-6 lg:grid-cols-[0.72fr_1.28fr] lg:px-8">
          <aside className="grid gap-5">
            {desks.map((desk, index) => (
              <div key={desk.title} className="rounded-lg border border-white/12 bg-[#252221] p-7 sm:p-8">
                <div className="flex items-center justify-between"><desk.icon className="h-5 w-5 text-[var(--slot4-accent)]" /><span className="text-xs font-black text-white/45">0{index + 1}</span></div>
                <h2 className="mt-6 text-3xl font-medium">{desk.title}</h2>
                <p className="mt-3 text-sm leading-7 text-white/65">{desk.body}</p>
              </div>
            ))}
          </aside>
          <div className="rounded-lg bg-white p-6 text-[#111010] shadow-[0_24px_80px_rgba(0,0,0,.25)] sm:p-10 lg:p-14">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#00bdb2]">Send a message</p>
            <h2 className="mt-3 text-4xl font-medium">{pagesContent.contact.formTitle}</h2>
            <EditableContactLeadForm />
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
