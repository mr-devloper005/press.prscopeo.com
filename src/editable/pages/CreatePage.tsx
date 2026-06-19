'use client'

import { FormEvent, useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, FileText, ImageIcon, Lock, PlusCircle, Send, Sparkles } from 'lucide-react'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'
import { pagesContent } from '@/editable/content/pages.content'

type DraftPost = {
  id: string
  task: TaskKey
  title: string
  category: string
  summary: string
  url: string
  image: string
  body: string
  createdAt: string
}

const STORE_KEY = 'slot4:created-posts'

const taskIcon: Record<string, typeof FileText> = {
  article: FileText,
  listing: Sparkles,
  classified: PlusCircle,
  image: ImageIcon,
  profile: Sparkles,
  pdf: FileText,
  sbm: ArrowRight,
}

const fieldClass = 'rounded-lg border border-white/12 bg-white px-4 py-3 text-sm font-semibold text-[#111010] outline-none transition placeholder:text-black/35 focus:border-[#77eee5] focus:ring-2 focus:ring-[#77eee5]/25'

const saveDraft = (draft: DraftPost) => {
  try {
    const existing = JSON.parse(window.localStorage.getItem(STORE_KEY) || '[]')
    const list = Array.isArray(existing) ? existing : []
    window.localStorage.setItem(STORE_KEY, JSON.stringify([draft, ...list].slice(0, 50)))
  } catch {
    window.localStorage.setItem(STORE_KEY, JSON.stringify([draft]))
  }
}

export default function CreatePage() {
  const { session } = useEditableLocalAuthSession()
  const enabledTasks = useMemo(() => SITE_CONFIG.tasks.filter((task) => task.enabled), [])
  const [task, setTask] = useState<TaskKey>((enabledTasks[0]?.key || 'article') as TaskKey)
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [summary, setSummary] = useState('')
  const [url, setUrl] = useState('')
  const [image, setImage] = useState('')
  const [body, setBody] = useState('')
  const [created, setCreated] = useState<DraftPost | null>(null)

  const activeTask = enabledTasks.find((item) => item.key === task) || enabledTasks[0]

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const draft: DraftPost = {
      id: `draft-${Date.now()}`,
      task,
      title: title.trim(),
      category: category.trim() || 'uncategorized',
      summary: summary.trim(),
      url: url.trim(),
      image: image.trim(),
      body: body.trim(),
      createdAt: new Date().toISOString(),
    }
    saveDraft(draft)
    setCreated(draft)
    setTitle('')
    setCategory('')
    setSummary('')
    setUrl('')
    setImage('')
    setBody('')
  }

  if (!session) {
    return (
      <EditableSiteShell>
        <main className="min-h-screen bg-[#111010] px-4 py-16 text-white sm:px-6 lg:px-8">
          <section className="mx-auto grid max-w-5xl gap-6 rounded-lg border border-white/12 bg-[#1b1918] p-6 shadow-[0_24px_90px_rgba(0,0,0,.32)] md:grid-cols-[0.9fr_1.1fr] md:p-8">
            <div className="relative flex h-full min-h-72 items-center justify-center overflow-hidden rounded-lg bg-[radial-gradient(circle_at_50%_15%,rgba(119,238,229,.35),transparent_35%),linear-gradient(135deg,#252221,#111010)]">
              <div className="absolute inset-x-10 top-1/2 h-24 -translate-y-1/2 rounded-full bg-[#77eee5]/20 blur-3xl" />
              <Lock className="relative h-20 w-20 text-[#77eee5]" />
            </div>
            <div className="self-center">
              <p className="text-xs font-black uppercase tracking-[0.28em] text-[#77eee5]">{pagesContent.create.locked.badge}</p>
              <h1 className="mcp-gradient-text mt-5 text-5xl font-medium leading-[1.08] tracking-[-0.05em] sm:text-7xl">{pagesContent.create.locked.title}</h1>
              <p className="mt-6 max-w-xl text-base font-semibold leading-8 text-white/70">{pagesContent.create.locked.description}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/login" className="inline-flex items-center gap-2 rounded bg-[#77eee5] px-6 py-3 text-sm font-semibold text-black transition hover:-translate-y-0.5">Login <ArrowRight className="h-4 w-4" /></Link>
                <Link href="/signup" className="inline-flex items-center gap-2 rounded border border-white/25 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-black">Register</Link>
              </div>
            </div>
          </section>
        </main>
      </EditableSiteShell>
    )
  }

  return (
    <EditableSiteShell>
      <main className="min-h-screen bg-[#111010] text-white">
        <section className="mx-auto max-w-[1280px] px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
          <div className="grid gap-6 rounded-lg border border-white/12 bg-[#1b1918] p-5 shadow-[0_24px_90px_rgba(0,0,0,.32)] lg:grid-cols-[0.85fr_1.15fr] lg:p-8">
            <aside>
              <p className="text-xs font-black uppercase tracking-[0.28em] text-[#77eee5]">{pagesContent.create.hero.badge}</p>
              <h1 className="mcp-gradient-text mt-5 text-5xl font-medium leading-[1.08] tracking-[-0.05em] sm:text-7xl">{pagesContent.create.hero.title}</h1>
              <p className="mt-6 max-w-xl text-base font-semibold leading-8 text-white/70">{pagesContent.create.hero.description}</p>
              <div className="mt-8 rounded-lg border border-white/12 bg-[#252221] p-5">
                <p className="text-xs font-black uppercase tracking-[0.22em] text-white/42">Release flow</p>
                <div className="mt-5 grid gap-3">
                  {['Choose content type', 'Add source details', 'Publish a clean media-ready draft'].map((step, index) => (
                    <div key={step} className="flex items-center gap-3 text-sm font-semibold text-white/70">
                      <span className="flex h-7 w-7 items-center justify-center rounded bg-[#77eee5] text-xs font-black text-black">{index + 1}</span>
                      {step}
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {enabledTasks.map((item) => {
                  const Icon = taskIcon[item.key] || FileText
                  const active = item.key === task
                  return (
                    <button key={item.key} type="button" onClick={() => setTask(item.key)} className={`rounded-lg border p-4 text-left transition ${active ? 'border-[#77eee5]/60 bg-[#77eee5] text-black shadow-[0_0_35px_rgba(119,238,229,.22)]' : 'border-white/12 bg-[#252221] text-white hover:-translate-y-0.5 hover:border-[#77eee5]/45'}`}>
                      <Icon className="h-5 w-5" />
                      <span className="mt-3 block text-sm font-black">{item.label}</span>
                      <span className="mt-1 block text-xs font-semibold opacity-70">{item.description}</span>
                    </button>
                  )
                })}
              </div>
            </aside>

            <form onSubmit={submit} className="rounded-lg border border-[#77eee5]/20 bg-[#252221] p-5 shadow-[0_0_0_1px_rgba(119,238,229,.08),0_24px_80px_rgba(0,0,0,.2)] sm:p-7">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.22em] text-[#77eee5]">Create {activeTask?.label || 'post'}</p>
                  <h2 className="mt-2 text-3xl font-medium tracking-[-0.04em] text-white">{pagesContent.create.formTitle}</h2>
                </div>
                <span className="rounded-full bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-black">{session.name}</span>
              </div>

              <div className="mt-6 grid gap-4">
                <input className={fieldClass} value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Post title" required />
                <div className="grid gap-4 sm:grid-cols-2">
                  <input className={fieldClass} value={category} onChange={(event) => setCategory(event.target.value)} placeholder="Category" />
                  <input className={fieldClass} value={url} onChange={(event) => setUrl(event.target.value)} placeholder="Website or source URL" />
                </div>
                <input className={fieldClass} value={image} onChange={(event) => setImage(event.target.value)} placeholder="Featured image URL" />
                <textarea className={`${fieldClass} min-h-24`} value={summary} onChange={(event) => setSummary(event.target.value)} placeholder="Short summary" required />
                <textarea className={`${fieldClass} min-h-48`} value={body} onChange={(event) => setBody(event.target.value)} placeholder="Main content, details, notes, or description" required />
              </div>

              {created ? (
                <div className="mt-5 rounded-lg border border-[#77eee5]/35 bg-[#77eee5]/12 p-4 text-white">
                  <p className="flex items-center gap-2 text-sm font-black"><CheckCircle2 className="h-5 w-5" /> {pagesContent.create.successTitle}</p>
                  <p className="mt-1 text-sm font-semibold text-white/75">{created.title}</p>
                </div>
              ) : null}

              <button type="submit" className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#77eee5] px-6 text-sm font-black uppercase tracking-[0.18em] text-black transition hover:-translate-y-0.5 hover:shadow-[0_0_35px_rgba(119,238,229,.28)]">
                <Send className="h-4 w-4" /> {pagesContent.create.submitLabel}
              </button>
            </form>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
