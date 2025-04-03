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
      <header className="px-4 lg:px-6 h-14 flex items-center border-b">
        <Link className="flex items-center justify-center" href="#">
          <span className="font-bold text-xl">NFT Marketplace</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/explore">
            Explore
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/create">
            Create
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/my-nfts">
            My NFTs
          </Link>
        </nav>
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
              <div className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last">
                <img
                  alt="NFT Showcase"
                  className="aspect-video object-cover w-full"
                  height="310"
                  src="https://img.freepik.com/free-vector/holographic-city-futuristic_52683-95526.jpg"
                  width="550"
                />
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
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full border-t px-4 md:px-6">
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2023 NFT Marketplace. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}

