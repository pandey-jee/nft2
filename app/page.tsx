"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Upload, Sparkles, Wallet } from "lucide-react"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { nfts } from "@/lib/data/nfts"
import { NFTCard } from "@/components/nft-card"

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null)
  const featuresRef = useRef<HTMLDivElement>(null)

  // Get featured NFTs (first 4 for now)
  const featuredNFTs = nfts.slice(0, 4)

  useEffect(() => {
    // Hero section animations
    if (heroRef.current) {
      const elements = heroRef.current.querySelectorAll("h1, p, div")
      gsap.from(elements, {
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
      })
    }

    // Features section animations with ScrollTrigger
    if (featuresRef.current) {
      const cards = featuresRef.current.querySelectorAll(".feature-card")
      gsap.from(cards, {
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: featuresRef.current,
          start: "top center",
        },
      })
    }

    // Clean up ScrollTrigger on component unmount
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link className="flex items-center gap-2" href="/">
              <span className="font-bold text-xl bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                NFT Marketplace
              </span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative w-64">
              <input
                type="search"
                placeholder="Search NFTs..."
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-muted-foreground"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              </button>
            </div>
            <nav className="flex items-center gap-6">
              <Link
                className="text-sm font-medium transition-colors hover:text-primary"
                href="/explore"
              >
                Explore
              </Link>
              <Link
                className="text-sm font-medium transition-colors hover:text-primary"
                href="/create"
              >
                Create
              </Link>
              <Link
                className="text-sm font-medium transition-colors hover:text-primary"
                href="/my-nfts"
              >
                My NFTs
              </Link>
              <div className="relative group">
                <button className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary">
                  More
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>
                <div className="absolute right-0 mt-2 w-48 rounded-md border bg-popover py-1 text-popover-foreground shadow-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <Link
                    href="/stats"
                    className="block px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
                  >
                    Stats
                  </Link>
                  <Link
                    href="/activity"
                    className="block px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
                  >
                    Activity
                  </Link>
                  <Link
                    href="/rankings"
                    className="block px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
                  >
                    Rankings
                  </Link>
                </div>
              </div>
            </nav>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2"
                >
                  <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
                  <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
                  <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
                </svg>
                0.5 ETH
              </Button>
              <Button variant="default" size="sm" className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
                  <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
                  <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
                </svg>
                Connect Wallet
              </Button>
            </div>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section ref={heroRef} className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Create, Collect, and Sell Digital Art
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                    Mint your digital creations as NFTs on the blockchain and connect with collectors around the world.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row buttons-container">
                  <Link href="/create">
                    <Button size="lg" className="group">
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                  <Link href="/explore">
                    <Button size="lg" variant="outline">
                      Explore NFTs
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last relative group">
                <img
                  alt="NFT Showcase"
                  className="aspect-video object-cover w-full transition-transform duration-500 group-hover:scale-105"
                  height="310"
                  src="https://img.freepik.com/free-vector/cyberpunk-city-neon-lights_23-2151100250.jpg"
                  width="550"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="text-white text-center p-4">
                    <h3 className="text-2xl font-bold mb-2">Explore the Future</h3>
                    <p className="text-sm">Discover unique digital assets</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section ref={featuresRef} className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Features</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Everything you need to create, manage, and sell your NFTs
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="feature-card flex flex-col justify-center space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-white">
                  <img
                    src="https://img.freepik.com/free-vector/digital-human-avatar_23-2147507024.jpg"
                    alt="Upload"
                    className="h-6 w-6"
                  />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">NFT Upload</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Upload your digital assets (images, videos, or 3D models) to mint as NFTs.
                  </p>
                </div>
              </div>
              <div className="feature-card flex flex-col justify-center space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-white">
                  <img
                    src="https://img.freepik.com/free-vector/quantum-physics-abstract_23-2149611045.jpg"
                    alt="Generation"
                    className="h-6 w-6"
                  />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">NFT Generation</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Generate NFTs with metadata, attributes, and smart contracts.
                  </p>
                </div>
              </div>
              <div className="feature-card flex flex-col justify-center space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-white">
                  <img
                    src="https://img.freepik.com/free-vector/cyberpunk-city-neon-lights_23-2151100250.jpg"
                    alt="Wallet"
                    className="h-6 w-6"
                  />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Wallet Integration</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Connect your crypto wallets (like MetaMask) and transfer/mint NFTs to your wallets.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured NFTs */}
        <section ref={featuresRef} className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Featured NFTs</h2>
            <Button variant="ghost" className="gap-2" asChild>
              <Link href="/explore">
                View All
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredNFTs.map(nft => (
              <NFTCard key={nft.id} nft={nft} />
            ))}
          </div>
        </section>

        {/* Categories Section */}
        <section>
          <h2 className="text-2xl font-bold mb-8">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from(new Set(nfts.map(nft => nft.category))).map(category => (
              <Button
                key={category}
                variant="outline"
                className="h-24 text-lg"
                asChild
              >
                <Link href={`/explore?category=${category}`}>
                  {category}
                </Link>
              </Button>
            ))}
          </div>
        </section>

        {/* New Collections Section */}
        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter">Trending Collections</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Discover the most popular NFT collections
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  id: 1,
                  image: "https://img.freepik.com/free-vector/mecha-warrior-giant-robot_23-2151666311.jpg",
                  name: "Mecha Warriors",
                  artist: "Artist1"
                },
                {
                  id: 2,
                  image: "https://img.freepik.com/free-vector/quantum-physics-abstract_23-2149611045.jpg",
                  name: "Quantum Realm",
                  artist: "Artist2"
                },
                {
                  id: 3,
                  image: "https://img.freepik.com/free-vector/cyberpunk-street-night_23-2149480714.jpg",
                  name: "Neon Streets",
                  artist: "Artist3"
                }
              ].map((collection) => (
                <div
                  key={collection.id}
                  className="group relative overflow-hidden rounded-xl border bg-background transition-all hover:shadow-lg"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={collection.image}
                      alt={collection.name}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold">{collection.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">By {collection.artist}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">Floor</p>
                        <p className="font-semibold">{collection.id * 0.5} ETH</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Volume</p>
                        <p className="font-semibold">{collection.id * 10} ETH</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t">
        <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
          <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
              Built by{" "}
              <a
                href="#"
                target="_blank"
                rel="noreferrer"
                className="font-medium underline underline-offset-4"
              >
                NFT Marketplace
              </a>
              . The source code is available on{" "}
              <a
                href="#"
                target="_blank"
                rel="noreferrer"
                className="font-medium underline underline-offset-4"
              >
                GitHub
              </a>
              .
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Terms
            </Link>
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Privacy
            </Link>
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

