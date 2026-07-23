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
          "flex items-center gap-1 px-4 py-3 text-sm font-medium transition-colors",
          hasActiveChild || (item.href !== "#" && isActivePath(pathname, item.href))
            ? "text-primary font-semibold"
            : "text-gray-700 hover:text-primary"
        )}
      >
        {item.label}
        {item.children && <ChevronDown className={cn("size-3.5 transition-transform", open && "rotate-180")} />}
      </button>
      {item.children && open && (
        <div className="absolute left-0 top-full z-50 min-w-[260px] bg-white shadow-lg border border-gray-100">
          <div className="py-1">
            {item.children.map((child) => (
              <Link
                key={child.href}
                href={child.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "block px-5 py-3 text-sm transition-colors",
                  isActivePath(pathname, child.href)
                    ? "bg-primary/5 text-primary font-medium"
                    : "text-gray-600 hover:bg-gray-50 hover:text-primary"
                )}
              >
                {child.label}
              </Link>
            ))}
          </div>
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
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200">
      {/* Top Bar - Contact Info */}
      <div className="w-full bg-gray-50 border-b border-gray-100 py-1.5">
        <div className="site-shell flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-xs text-gray-500">
            {siteConfig.phone && (
              <a href={`tel:${siteConfig.phone}`} className="flex items-center gap-1.5 hover:text-primary transition-colors">
                <FaPhone className="size-2.5" />
                <span className="hidden sm:inline">{siteConfig.phoneDisplay || siteConfig.phone}</span>
              </a>
            )}
            {siteConfig.email && (
              <a href={`mailto:${siteConfig.email}`} className="hidden sm:flex items-center gap-1.5 hover:text-primary transition-colors">
                <FaEnvelope className="size-2.5" />
                <span>{siteConfig.email}</span>
              </a>
            )}
          </div>
          <div className="flex items-center gap-2">
            {siteConfig.facebook && (
              <a href={siteConfig.facebook} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center size-6 bg-gray-200 text-gray-600 hover:bg-primary hover:text-white transition-colors" aria-label="Facebook">
                <FaFacebookF className="size-2.5" />
              </a>
            )}
            <a href={waHref} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center size-6 bg-gray-200 text-gray-600 hover:bg-green-600 hover:text-white transition-colors" aria-label="WhatsApp">
              <FaWhatsapp className="size-2.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Main Header - Logo & Navigation */}
      <div className="w-full bg-white">
        <div className="site-shell flex items-center justify-between gap-6 py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <Image
              src={siteConfig.logo}
              alt={siteConfig.shortName}
              width={56}
              height={56}
              className="size-12 sm:size-14 object-contain"
            />
            <div>
              <p className="font-heading text-base sm:text-lg font-bold text-gray-900 tracking-tight leading-tight">
                {siteConfig.shortName}
              </p>
              <p className="text-[11px] text-gray-500 font-sans leading-none mt-0.5">
                {siteConfig.tagline}
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center border-l border-gray-100 ml-4 pl-4">
            {mainNav.map((item) => {
              if (item.children) {
                return <NavDropdown key={item.label} item={item} pathname={pathname} />
              }
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "px-4 py-3 text-sm font-medium transition-colors",
                    isActivePath(pathname, item.href)
                      ? "text-primary font-semibold"
                      : "text-gray-700 hover:text-primary"
                  )}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>

          {/* Desktop CTA & Mobile Menu */}
          <div className="flex items-center gap-3">
            <Button size="sm" className="hidden lg:flex bg-primary text-white hover:bg-primary/90 rounded-none px-5 py-2.5 text-sm font-medium" asChild>
              <a href={waHref} target="_blank" rel="noopener noreferrer">
                <FaWhatsapp className="size-4 mr-2" />
                Hubungi Kami
              </a>
            </Button>

            {/* Mobile Hamburger */}
            <div className="flex lg:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="size-10 rounded-none text-gray-700" aria-label="Buka menu">
                    <Menu className="size-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" showCloseButton={false} className="w-full max-w-[300px] bg-white rounded-none p-0 flex flex-col">
                  <div className="flex items-center justify-between p-4 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                      <Image src={siteConfig.logo} alt={siteConfig.shortName} width={36} height={36} className="size-9 object-contain" />
                      <p className="font-heading text-sm font-bold text-gray-900">{siteConfig.shortName}</p>
                    </div>
                    <SheetClose asChild>
                      <Button variant="ghost" size="icon" className="size-9 rounded-none text-gray-500" aria-label="Tutup menu">
                        <span className="text-lg font-light">&times;</span>
                      </Button>
                    </SheetClose>
                  </div>

                  <nav className="flex-1 overflow-y-auto">
                    {mainNav.map((item) => {
                      const hasActiveChild = item.children?.some((child) => isActivePath(pathname, child.href))
                      return (
                        <div key={item.label}>
                          {item.href !== "#" ? (
                            <SheetClose asChild>
                              <Link
                                href={item.href}
                                className={cn(
                                  "px-6 py-3.5 text-sm border-b border-gray-50 transition-colors block",
                                  isActivePath(pathname, item.href) || hasActiveChild
                                    ? "text-primary font-medium bg-primary/5"
                                    : "text-gray-700 hover:bg-gray-50"
                                )}
                              >
                                {item.label}
                              </Link>
                            </SheetClose>
                          ) : (
                            <div className="px-6 py-3.5 text-sm font-medium border-b border-gray-50 text-gray-400 bg-gray-50/50">
                              {item.label}
                            </div>
                          )}
                          {item.children && (
                            <div className="bg-gray-50/30">
                              {item.children.map((child) => (
                                <SheetClose asChild key={child.href}>
                                  <Link
                                    href={child.href}
                                    target={child.href.startsWith("http") ? "_blank" : undefined}
                                    rel={child.href.startsWith("http") ? "noopener noreferrer" : undefined}
                                    className={cn(
                                      "pl-10 pr-6 py-3 text-sm border-b border-gray-50 transition-colors block",
                                      isActivePath(pathname, child.href)
                                        ? "text-primary font-medium"
                                        : "text-gray-500 hover:text-primary"
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

                  <div className="p-4 border-t border-gray-100 space-y-3">
                    <Button className="w-full bg-primary text-white hover:bg-primary/90 rounded-none" asChild>
                      <a href={waHref} target="_blank" rel="noopener noreferrer">
                        <FaWhatsapp className="size-4 mr-2" />
                        Hubungi via WhatsApp
                      </a>
                    </Button>
                    <div className="flex items-center gap-2 justify-center">
                      {siteConfig.facebook && (
                        <a href={siteConfig.facebook} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center size-8 bg-gray-100 text-gray-600 hover:bg-primary hover:text-white transition-colors" aria-label="Facebook">
                          <FaFacebookF className="size-3" />
                        </a>
                      )}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
