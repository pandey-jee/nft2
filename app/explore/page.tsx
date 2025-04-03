"use client"

import { useRef, useState, useEffect } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, Search, Filter } from "lucide-react"
import { WalletConnect } from "@/components/wallet-connect"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import gsap from "gsap"
import { nfts } from "@/lib/data/nfts"
import { NFTCard } from "@/components/nft-card"

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const nftGridRef = useRef<HTMLDivElement>(null)

  const categories = Array.from(new Set(nfts.map(nft => nft.category)))

  // Filter NFTs based on search and category
  const filteredNFTs = nfts.filter(nft => {
    const matchesSearch = nft.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      nft.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = !selectedCategory || nft.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  // Animation for NFT grid
  useEffect(() => {
    if (nftGridRef.current) {
      gsap.from(nftGridRef.current.querySelectorAll(".nft-card"), {
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
      })
    }
  }, [filteredNFTs])

  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <h1 className="text-3xl font-bold">Explore NFTs</h1>
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <Input
            type="search"
            placeholder="Search NFTs..."
            className="w-full md:w-[300px]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div ref={nftGridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredNFTs.length === 0 ? (
          <div className="col-span-full text-center py-10">
            <p className="text-gray-500">No NFTs found matching your criteria.</p>
          </div>
        ) : (
          filteredNFTs.map((nft) => (
            <NFTCard key={nft.id} nft={nft} />
          ))
        )}
      </div>
    </div>
  )
}

