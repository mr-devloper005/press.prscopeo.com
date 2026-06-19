'use client'

import Link from 'next/link'
import { ArrowRight, Globe2 } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

export function EditableFooter() {
  const year = new Date().getFullYear()
  const { session, logout, ready } = useEditableLocalAuthSession()
  const groups: Array<[string, Array<[string, string]>]> = session
    ? [
        ['Navigation', [['Home', '/'], ['About', '/about'], ['Contact', '/contact'], ['Search', '/search']]],
        ['Account', [['Logout', '#logout']]],
      ]
    : ready ? [
        ['Navigation', [['Home', '/'], ['About', '/about'], ['Contact', '/contact'], ['Search', '/search']]],
        ['Account', [['Login', '/login'], ['Register', '/signup']]],
      ] : [['Navigation', [['Home', '/'], ['About', '/about'], ['Contact', '/contact'], ['Search', '/search']]]]

  return (
    <footer className="bg-white text-[#111010]">
      {!session ? (
        <div className="border-y border-black/10 px-4 py-20 sm:px-6">
          <Link href="/signup" className="mx-auto flex max-w-[1140px] items-center justify-between gap-8 rounded-lg bg-[linear-gradient(110deg,#bafff8,#56d8cf)] px-8 py-16 text-black transition hover:-translate-y-1 hover:shadow-[0_20px_70px_rgba(86,216,207,.28)] sm:px-12">
            <span className="text-4xl font-medium tracking-[-0.04em] sm:text-5xl">Let&apos;s put media to work</span>
            <ArrowRight className="h-12 w-12 shrink-0" />
          </Link>
        </div>
      ) : null}

      <div className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2">
          {groups.map(([heading, links]) => (
            <div key={heading}>
              <h3 className="text-xs font-black uppercase tracking-[.38em]">{heading}</h3>
              <div className="mt-7 grid gap-3">
                {links.map(([label, href]) => href === '#logout' ? (
                  <button key={label} onClick={logout} className="text-left text-sm text-black/78 hover:text-[#00bdb2]">{label}</button>
                ) : (
                  <Link key={label} href={href} className="text-sm text-black/78 hover:text-[#00bdb2]">{label}</Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-black/10">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-6 px-4 py-8 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <Link href="/" className="flex items-center gap-3 text-3xl font-semibold tracking-[-0.04em]">
            <img src="/favicon.png" alt="" className="h-12 w-12 shrink-0 object-contain" />
            {SITE_CONFIG.name}
          </Link>
          <p className="max-w-xl text-xs leading-6 text-black/55">{globalContent.footer?.description || SITE_CONFIG.description}</p>
          <div className="flex items-center gap-3 text-xs text-black/55"><Globe2 className="h-4 w-4" /> (c) {year} {SITE_CONFIG.name}</div>
        </div>
      </div>
    </footer>
  )
}
