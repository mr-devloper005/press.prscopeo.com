'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, Search, X } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

export function EditableNavbar() {
  const [open, setOpen] = useState(false)
  const { session, logout, ready } = useEditableLocalAuthSession()
  const displayName = session?.name || session?.email || 'Member'
  const publicLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Search', href: '/search' },
  ]

  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-white text-[#111010]">
      <div className="mx-auto grid min-h-[88px] max-w-[1280px] grid-cols-[auto_1fr_auto] items-center gap-5 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <button type="button" onClick={() => setOpen((value) => !value)} className="inline-flex h-10 w-10 items-center justify-center border border-black/25 lg:hidden" aria-label="Toggle navigation">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          <Link href="/" className="flex items-center gap-3 text-2xl font-semibold tracking-[-0.04em]">
            <img src="/favicon.png" alt="" className="h-11 w-11 shrink-0 object-contain" />
            <span>{SITE_CONFIG.name}</span>
          </Link>
        </div>

        <nav className="hidden items-center gap-8 justify-self-start text-sm font-medium text-black/85 lg:flex">
          {publicLinks.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-[#00bdb2]">{item.label}</Link>
          ))}
          {ready && !session ? (
            <>
              <Link href="/login" className="hover:text-[#00bdb2]">Login</Link>
              <Link href="/signup" className="hover:text-[#00bdb2]">Register</Link>
            </>
          ) : null}
        </nav>

        <div className="flex items-center justify-end gap-4">
          <Link href="/search" className="hidden h-10 w-10 items-center justify-center text-black/55 hover:text-black md:inline-flex" aria-label="Search"><Search className="h-5 w-5" /></Link>
          {session ? (
            <>
              <span className="hidden max-w-[180px] truncate text-sm font-semibold text-black/75 md:inline-block">{displayName}</span>
              <Link href="/create" className="hidden rounded border border-black/50 px-6 py-3 text-sm font-medium sm:block">Create</Link>
              <button type="button" onClick={logout} className="hidden rounded border border-black/50 px-6 py-3 text-sm font-medium sm:block">Logout</button>
            </>
          ) : ready ? <Link href="/login" className="hidden rounded border border-black/50 px-6 py-3 text-sm font-medium sm:block">Login</Link> : null}
          {ready && !session ? (
            <Link href="/signup" className="rounded bg-[var(--slot4-accent)] px-4 py-3 text-sm font-medium text-black transition hover:-translate-y-0.5 sm:px-6">
              Register
            </Link>
          ) : null}
        </div>
      </div>

      {open ? (
        <div className="border-t border-black/15 bg-white px-4 py-4 lg:hidden">
          <div className="grid gap-2">
            {[...publicLinks, ...(session ? [{ label: 'Create', href: '/create' }, { label: 'Logout', href: '#logout' }] : ready ? [{ label: 'Login', href: '/login' }, { label: 'Register', href: '/signup' }] : [])].map((item) => (
              item.href === '#logout' ? (
                <button key={item.label} type="button" onClick={() => { logout(); setOpen(false) }} className="rounded border border-black/10 px-4 py-3 text-left text-sm font-semibold">{item.label}</button>
              ) : (
              <Link key={`${item.label}-${item.href}`} href={item.href} onClick={() => setOpen(false)} className="rounded border border-black/10 px-4 py-3 text-sm font-semibold">{item.label}</Link>
              )
            ))}
            {session ? <p className="rounded bg-black/[0.03] px-4 py-3 text-sm font-semibold text-black/70">Signed in as {displayName}</p> : null}
          </div>
        </div>
      ) : null}
    </header>
  )
}
