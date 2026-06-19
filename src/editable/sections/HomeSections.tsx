import Link from 'next/link'
import { ArrowRight, Database, Search, ShieldCheck, Zap } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { HomeTimeSection } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { editableDesignContract as dc } from '@/editable/layouts/design-contract'
import { ArticleListCard, getEditableCategory, getEditableExcerpt, getEditablePostImage, postHref, RailPostCard } from '@/editable/cards/PostCards'

type HomeSectionProps = {
  primaryTask: TaskKey
  primaryRoute: string
  posts: SitePost[]
  timeSections: HomeTimeSection[]
}

function taskLabel(task: TaskKey) {
  return SITE_CONFIG.tasks.find((item) => item.key === task)?.label || task
}

export function EditableHomeHero({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const lead = posts[0]
  const side = posts.slice(1, 4)
  const heroTitle = pagesContent.home.hero.title.join(' ') || `${SITE_CONFIG.name}: media distribution that travels further.`

  return (
    <section className="overflow-hidden bg-[#111010] text-white">
      <div className={`${dc.shell.section} pb-10 pt-20 sm:pt-28`}>
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-sm font-semibold text-white">{pagesContent.home.hero.badge}</p>
          <h1 className="mcp-gradient-text mt-5 text-5xl font-medium leading-[1.08] tracking-[-0.045em] sm:text-7xl">{heroTitle}</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg font-semibold leading-8 text-white/86">{pagesContent.home.hero.description}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/search" className={dc.button.primary}>Start for free</Link>
            <Link href="/contact" className={dc.button.accent}>Talk to sales <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>

        <div className="relative mx-auto mt-14 max-w-[1140px] rounded-lg border border-[#77eee5]/20 bg-[#242120] p-4 mcp-glow-card">
          <div className="grid min-h-[360px] gap-2 overflow-hidden rounded-md md:grid-cols-[1.45fr_.32fr_.32fr]">
            <Link href={lead ? postHref(primaryTask, lead, primaryRoute) : primaryRoute} className="group relative overflow-hidden rounded bg-[#f7f5ef] text-[#111010]">
              {lead ? <img src={getEditablePostImage(lead)} alt={lead.title} className="absolute inset-0 h-full w-full object-cover opacity-15 transition duration-700 group-hover:scale-105" /> : null}
              <div className="relative flex min-h-[360px] flex-col justify-between p-8">
                <div className="max-w-xl">
                  <span className="rounded-full bg-[#111010] px-3 py-1 text-xs font-semibold text-white">Media assistant</span>
                  <h2 className="mt-6 text-4xl font-medium tracking-[-.04em]">{lead?.title || 'Launch a release and follow the opportunity.'}</h2>
                  <p className="mt-5 text-base leading-7 text-black/65">{lead ? getEditableExcerpt(lead, 180) : 'Publication details, summaries, categories, and media assets stay ready for discovery.'}</p>
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  {['Draft release', 'Find coverage', 'Track reach'].map((item) => <span key={item} className="rounded border border-black/10 bg-white/80 px-4 py-3 text-sm font-semibold">{item}</span>)}
                </div>
              </div>
            </Link>
            {side.map((post, index) => (
              <Link key={post.id || post.slug} href={postHref(primaryTask, post, primaryRoute)} className="group relative min-h-[260px] overflow-hidden rounded bg-[#7f8987] text-[#111010]">
                <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover opacity-25 transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,.45),rgba(17,16,16,.75))]" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                  <p className="text-[10px] font-black uppercase tracking-[.28em]">{index === 0 ? 'OpenAI' : index === 1 ? 'Copilot' : 'Network'}</p>
                  <h3 className="mt-3 line-clamp-4 text-2xl font-medium leading-tight tracking-[-.035em]">{post.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export function EditableStoryRail({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const railPosts = posts.slice(4, 14).length ? posts.slice(4, 14) : posts
  if (!railPosts.length) return null
  const marquee = [...railPosts, ...railPosts]
  return (
    <section className="bg-[#111010] text-white">
      <div className="border-y border-white/5 bg-[#1b1818] py-10">
        <div className="mcp-marquee gap-12">
          {['Nutanix', 'NYU', 'Stitch Fix', 'Zendesk', 'Adobe', 'Atlassian', 'Gartner', 'Nasdaq', 'Vodafone', 'Samsara'].map((name, index) => (
            <span key={`${name}-${index}`} className="text-lg font-black uppercase tracking-[.08em] text-white/55">{name}</span>
          ))}
        </div>
      </div>
      <div className={`${dc.shell.section} ${dc.shell.sectionY}`}>
        <div className="text-center">
          <h2 className={dc.type.sectionTitle}>Turn trusted announcements into powerful media reach</h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/62">Browse the latest distributed stories, coverage notes, and brand updates in a moving editorial rail.</p>
        </div>
        <div className="mt-12 flex gap-4 overflow-hidden">
          <div className="mcp-marquee gap-4">
            {marquee.map((post, index) => <RailPostCard key={`${post.id || post.slug}-${index}`} post={post} href={postHref(primaryTask, post, primaryRoute)} index={index % railPosts.length} />)}
          </div>
        </div>
      </div>
    </section>
  )
}

export function EditableMagazineSplit({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const feature = posts[0]
  const cards = posts.slice(1, 5)
  if (!feature) return null
  return (
    <section className="bg-[#111010] px-4 py-16 text-white sm:px-6 lg:py-24">
      <div className="mx-auto max-w-[1160px]">
        <h2 className="text-center text-4xl font-medium tracking-[-.04em] sm:text-5xl">The next generation of releases are built on reliable distribution</h2>
        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          <Link href={postHref(primaryTask, feature, primaryRoute)} className="group rounded-lg bg-[#252221] p-8 mcp-glow-card">
            <p className="text-center text-3xl font-light text-white">Featured release</p>
            <p className="mt-2 text-center text-xl text-white/62">{getEditableCategory(feature)}</p>
            <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded bg-[#eef1f4]">
              <img src={getEditablePostImage(feature)} alt={feature.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
            </div>
            <h3 className="mt-7 text-3xl font-medium leading-tight tracking-[-.04em] text-[var(--slot4-accent)]">{feature.title}</h3>
          </Link>
          <div className="rounded-lg bg-[radial-gradient(circle_at_80%_0%,rgba(143,183,255,.5),transparent_35%),linear-gradient(135deg,#24302f,#211d35)] p-8 mcp-glow-card">
            <p className="text-center text-3xl font-light text-[var(--slot4-accent)]">Enterprise media layer</p>
            <p className="mt-2 text-center text-xl text-white/72">Verified, visible updates</p>
            <div className="mt-10 rounded bg-[#a8fff8] p-8 text-[#151313]">
              <div className="grid items-center gap-5 md:grid-cols-[.5fr_1fr]">
                <div className="rounded bg-white px-5 py-4 text-center font-semibold">Release</div>
                <div className="grid gap-4">
                  {cards.map((post) => (
                    <Link key={post.id || post.slug} href={postHref(primaryTask, post, primaryRoute)} className="rounded bg-white/78 p-4 text-sm font-semibold transition hover:bg-white">{post.title}</Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function EditableTimeCollections({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const collected = timeSections.flatMap((section) => section.posts)
  const source = collected.length ? collected : posts
  const lead = source[0]
  const briefs = source.slice(1, 6)
  if (!lead) return null
  return (
    <section className="bg-[#171514] text-white">
      <div className={`${dc.shell.section} ${dc.shell.sectionY}`}>
        <h2 className="text-center text-4xl font-medium tracking-[-.04em] sm:text-5xl">No vanity metrics - real visibility signals</h2>
        <div className="mx-auto mt-12 grid max-w-[1140px] border border-white/25 lg:grid-cols-[2fr_1.35fr]">
          <Link href={postHref(primaryTask, lead, primaryRoute)} className="group border-b border-white/25 p-8 lg:border-b-0 lg:border-r">
            <p className="text-3xl font-black">Nasdaq</p>
            <h3 className="mt-10 max-w-2xl text-3xl font-light leading-[1.45] tracking-[-.03em] sm:text-4xl">&quot;{lead.title}&quot;</h3>
            <p className="mt-8 max-w-2xl text-white/68">{getEditableExcerpt(lead, 210)}</p>
          </Link>
          <div className="bg-[linear-gradient(135deg,#18201f,#276f73)] p-8">
            <p className="text-7xl font-light text-[#00d6ca] sm:text-8xl">127%</p>
            <p className="mt-8 max-w-xs text-lg font-semibold text-white/78">more discoverable media moments through consistent release distribution</p>
          </div>
          <div className="border-t border-white/25 bg-[linear-gradient(135deg,#12201f,#3a211d)] p-8">
            <p className="text-7xl font-light text-[#00d6ca] sm:text-8xl">100M+</p>
            <p className="mt-6 font-semibold text-white/72">potential impressions from organized public updates</p>
          </div>
          <div className="border-t border-white/25 p-8">
            <p className="text-7xl font-light text-[#00d6ca] sm:text-8xl">200%</p>
            <p className="mt-6 font-semibold text-white/72">faster audience discovery when assets, summaries, and categories are clear</p>
          </div>
        </div>
        <div className="mt-10 text-center">
          <Link href="/search" className={dc.button.accent}>See more customer stories <ArrowRight className="h-4 w-4" /></Link>
        </div>

        <div className="mt-20 grid gap-8 lg:grid-cols-[.9fr_1.1fr] lg:items-start">
          <div>
            <p className="text-xs font-black uppercase tracking-[.32em] text-white/40">{taskLabel(primaryTask)}</p>
            <h2 className="mt-5 text-4xl font-medium tracking-[-.04em]">Building media coverage made easy</h2>
          </div>
          <div className="grid gap-5">
            {briefs.slice(0, 3).map((post, index) => <ArticleListCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} index={index} />)}
          </div>
        </div>

        <form action="/search" className="mt-16 grid gap-4 rounded-lg border border-white/12 bg-[#242120] p-5 sm:grid-cols-[1fr_auto]">
          <label className="flex min-w-0 items-center gap-3 rounded bg-white px-4 text-black">
            <Search className="h-5 w-5 text-black/45" />
            <input name="q" placeholder="Search releases, companies, categories" className="min-w-0 flex-1 bg-transparent py-4 text-sm outline-none" />
          </label>
          <button className={dc.button.accent}>Search archive</button>
        </form>
      </div>
    </section>
  )
}

export function EditableHomeCta() {
  const benefits: Array<[LucideIcon, string]> = [
    [Zap, 'Move updates faster through a focused release flow.'],
    [ShieldCheck, 'Keep summaries and categories clear for every post.'],
    [Database, 'Make archived coverage easier to discover.'],
  ]

  return (
    <section className="bg-[#252221] text-white">
      <div className={`${dc.shell.section} py-20`}>
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-black uppercase tracking-[.34em] text-white/40">Media distribution layer</p>
          <h2 className="mcp-gradient-text mt-5 text-4xl font-medium tracking-[-.04em] sm:text-6xl">One platform to publish, amplify, and organize your public updates</h2>
          <div className="mt-10 grid gap-4 text-left sm:grid-cols-3">
            {benefits.map(([Icon, text]) => (
              <div key={text} className="rounded-lg border border-white/12 bg-[#111010] p-5">
                <Icon className="h-6 w-6 text-[var(--slot4-accent)]" />
                <p className="mt-4 text-sm leading-6 text-white/72">{text}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href="/contact" className={dc.button.accent}>Talk to sales <ArrowRight className="h-4 w-4" /></Link>
            <Link href="/signup" className={dc.button.primary}>Start for free</Link>
          </div>
        </div>
      </div>
    </section>
  )
}
