"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, ChevronDown } from "lucide-react"
import { FaWhatsapp, FaEnvelope, FaPhone, FaFacebookF, FaInstagram } from "react-icons/fa6"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { defaultNavigation as staticMainNav, defaultSiteSettings } from "@/lib/cms/default-content"
import { cn } from "@/lib/utils"

const staticSiteConfig = {
  ...defaultSiteSettings,
  logo: defaultSiteSettings.logoPath || "/logo.png",
}

function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/"
  if (href.startsWith("/#")) return pathname === "/"
  return pathname.startsWith(href)
}

function NavDropdown({ item, pathname }: { item: { label: string; href: string; children?: { label: string; href: string }[] }; pathname: string }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const hasActiveChild = item.children?.some((child) => isActivePath(pathname, child.href))

  return (
    <div ref={ref} className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          "flex items-center gap-1 px-3 py-2 text-xs font-bold tracking-widest uppercase transition-colors",
          hasActiveChild || (item.href !== "#" && isActivePath(pathname, item.href))
            ? "text-white underline underline-offset-4"
            : "text-white/80 hover:text-white"
        )}
      >
        {item.label}
        {item.children && <ChevronDown className={cn("size-3 transition-transform", open && "rotate-180")} />}
      </button>
      {item.children && open && (
        <div className="absolute left-0 top-full z-50 min-w-[250px] bg-white shadow-lg border border-gray-100">
          {item.children.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              onClick={() => setOpen(false)}
              className={cn(
                "block px-4 py-3 text-xs font-medium tracking-wide border-b border-gray-50 transition-colors",
                isActivePath(pathname, child.href)
                  ? "bg-primary text-white"
                  : "text-foreground hover:bg-primary hover:text-white"
              )}
            >
              {child.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export function SiteHeader({
  siteConfig = staticSiteConfig,
  mainNav = staticMainNav,
}: {
  siteConfig?: {
    name?: string
    shortName: string
    tagline: string
    logo: string
    whatsapp: string
    whatsappLabel?: string
    email?: string
    phone?: string
    phoneDisplay?: string
    officeHours?: string
    facebook?: string
  }
  mainNav?: {
    label: string
    href: string
    children?: { label: string; href: string }[]
  }[]
}) {
  const pathname = usePathname()

  const waNumber = siteConfig.whatsapp.replace(/\D/g, "")
  const waHref = waNumber.startsWith("62")
    ? `https://wa.me/${waNumber}`
    : waNumber.startsWith("0")
    ? `https://wa.me/62${waNumber.substring(1)}`
    : `https://wa.me/${waNumber}`

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top Info Bar with Social Media */}
      <div className="w-full bg-white border-b border-gray-100 py-2">
        <div className="site-shell flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            {siteConfig.phone && (
              <a href={`tel:${siteConfig.phone}`} className="flex items-center gap-1.5 hover:text-primary transition-colors">
                <FaPhone className="size-3 text-primary" />
                <span className="hidden sm:inline">{siteConfig.phoneDisplay || siteConfig.phone}</span>
              </a>
            )}
            {siteConfig.email && (
              <a href={`mailto:${siteConfig.email}`} className="hidden sm:flex items-center gap-1.5 hover:text-primary transition-colors">
                <FaEnvelope className="size-3 text-primary" />
                <span>{siteConfig.email}</span>
              </a>
            )}
          </div>
          <div className="flex items-center gap-2">
            {siteConfig.facebook && (
              <a href={siteConfig.facebook} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center size-7 bg-primary text-white hover:bg-primary/80 transition-colors" aria-label="Facebook">
                <FaFacebookF className="size-3" />
              </a>
            )}
            <a href={waHref} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center size-7 bg-green-600 text-white hover:bg-green-700 transition-colors" aria-label="WhatsApp">
              <FaWhatsapp className="size-3" />
            </a>
          </div>
        </div>
      </div>

      {/* Logo Bar */}
      <div className="w-full bg-white py-3 border-b border-gray-100">
        <div className="site-shell flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <Image
              src={siteConfig.logo}
              alt={siteConfig.shortName}
              width={64}
              height={64}
              className="size-12 sm:size-14 object-contain"
            />
            <div>
              <p className="font-heading text-base sm:text-lg font-bold text-primary tracking-tight leading-tight">
                {siteConfig.shortName}
              </p>
              <p className="text-[10px] text-muted-foreground font-sans leading-none mt-0.5">
                {siteConfig.tagline}
              </p>
            </div>
          </Link>

          {/* Mobile Sheet Trigger */}
          <div className="flex lg:hidden items-center gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-10 rounded-none border border-gray-200 text-primary"
                  aria-label="Buka menu"
                >
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" showCloseButton={false} className="w-full max-w-[300px] border-r border-border bg-white rounded-none p-0 flex flex-col">
                <div className="flex items-center justify-between p-4 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <Image
                      src={siteConfig.logo}
                      alt={siteConfig.shortName}
                      width={40}
                      height={40}
                      className="size-9 object-contain"
                    />
                    <div>
                      <p className="font-heading text-sm font-bold text-primary tracking-tight leading-tight">
                        {siteConfig.shortName}
                      </p>
                    </div>
                  </div>
                  <SheetClose asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-9 rounded-none border border-gray-200 text-muted-foreground"
                      aria-label="Tutup menu"
                    >
                      <span className="font-sans text-sm font-bold">X</span>
                    </Button>
                  </SheetClose>
                </div>

                <nav className="flex-1 overflow-y-auto flex flex-col">
                  {mainNav.map((item) => {
                    const hasActiveChild = item.children?.some((child) => isActivePath(pathname, child.href))
                    return (
                      <div key={item.label}>
                        {item.href !== "#" ? (
                          <SheetClose asChild>
                            <Link
                              href={item.href}
                              className={cn(
                                "px-6 py-4 text-xs font-bold uppercase tracking-wider border-b border-gray-100 transition-colors block text-left",
                                isActivePath(pathname, item.href) || hasActiveChild
                                  ? "text-primary font-bold bg-primary/5"
                                  : "text-foreground hover:bg-secondary/10"
                              )}
                            >
                              {item.label}
                            </Link>
                          </SheetClose>
                        ) : (
                          <div className="px-6 py-4 text-xs font-bold uppercase tracking-wider border-b border-gray-100 text-primary bg-primary/5">
                            {item.label}
                          </div>
                        )}
                        {item.children && (
                          <div className="bg-gray-50">
                            {item.children.map((child) => (
                              <SheetClose asChild key={child.href}>
                                <Link
                                  href={child.href}
                                  target={child.href.startsWith("http") ? "_blank" : undefined}
                                  rel={child.href.startsWith("http") ? "noopener noreferrer" : undefined}
                                  className={cn(
                                    "pl-10 pr-6 py-3 text-xs tracking-wider border-b border-gray-100 transition-colors block text-left",
                                    isActivePath(pathname, child.href)
                                      ? "text-primary font-bold"
                                      : "text-muted-foreground hover:text-primary"
                                  )}
                                >
                                  {child.label}
                                </Link>
                              </SheetClose>
                            ))}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </nav>

                {/* Social Media in Mobile Menu */}
                <div className="p-4 border-t border-gray-100 flex items-center gap-3">
                  {siteConfig.facebook && (
                    <a href={siteConfig.facebook} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center size-9 bg-primary text-white" aria-label="Facebook">
                      <FaFacebookF className="size-4" />
                    </a>
                  )}
                  <a href={waHref} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center size-9 bg-green-600 text-white" aria-label="WhatsApp">
                    <FaWhatsapp className="size-4" />
                  </a>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop WhatsApp */}
          <div className="hidden lg:block">
            <Button size="sm" className="bg-primary text-white hover:bg-primary/90 rounded-none px-5 py-5 text-xs font-bold uppercase tracking-widest flex items-center gap-2" asChild>
              <a href={waHref} target="_blank" rel="noopener noreferrer">
                <FaWhatsapp className="size-4" />
                WHATSAPP
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="w-full bg-primary">
        <div className="site-shell flex items-center justify-between">
          {/* Mobile nav bar */}
          <div className="flex lg:hidden w-full items-center justify-between py-2">
            <span className="text-white text-xs font-bold uppercase tracking-wider">Menu</span>
            <Button size="sm" className="bg-white text-primary hover:bg-white/90 rounded-none px-4 py-4 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5" asChild>
              <a href={waHref} target="_blank" rel="noopener noreferrer">
                <FaWhatsapp className="size-4" />
                WHATSAPP
              </a>
            </Button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center">
            {mainNav.map((item) => {
              if (item.children) {
                return <NavDropdown key={item.label} item={item} pathname={pathname} />
              }
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "px-3 py-3 text-xs font-bold tracking-widest uppercase transition-colors",
                    isActivePath(pathname, item.href)
                      ? "text-white underline underline-offset-4"
                      : "text-white/80 hover:text-white"
                  )}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>
        </div>
      </div>
    </header>
  )
}
