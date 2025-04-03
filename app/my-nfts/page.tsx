"use client"

import { useState, useEffect, useRef } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { WalletConnect } from "@/components/wallet-connect"
import { AlertCircle, BarChart2, TrendingUp, DollarSign } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import gsap from "gsap"

export default function MyNFTsPage() {
  const [connected, setConnected] = useState(false)
  const [activeTab, setActiveTab] = useState("collected")

  const statsRef = useRef(null)
  const nftGridRef = useRef(null)

  // This would normally be populated from the blockchain
  const myNFTs = [
    {
      id: 1,
      name: "Abstract Dimensions #001",
      creator: "You",
      image: "/placeholder.svg?height=400&width=400",
    },
    {
      id: 2,
      name: "Digital Dreamscape #042",
      creator: "You",
      image: "/placeholder.svg?height=400&width=400",
    },
  ]

  const createdNFTs = [
    {
      id: 1,
      name: "Abstract Dimensions #001",
      status: "Minted",
      image: "/placeholder.svg?height=400&width=400",
    },
  ]

  useEffect(() => {
    // Set connected state for demo purposes
    setConnected(true)

    // Animate stats cards
    if (statsRef.current) {
      gsap.from(statsRef.current.querySelectorAll(".stat-card"), {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: "power2.out",
      })
    }
  }, [])

  useEffect(() => {
    // Animate NFT cards when tab changes
    if (nftGridRef.current) {
      const cards = nftGridRef.current.querySelectorAll(".nft-card")

      gsap.fromTo(
        cards,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.5,
          ease: "power2.out",
        },
      )
    }
  }, [activeTab])

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My NFTs</h1>
        <WalletConnect />
      </div>

      {/* Analytics Dashboard */}
      {connected && (
        <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="stat-card">
            <CardContent className="p-6 flex items-center">
              <div className="mr-4 bg-primary/10 p-3 rounded-full">
                <BarChart2 className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total NFTs</p>
                <p className="text-2xl font-bold">{myNFTs.length + createdNFTs.length}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="stat-card">
            <CardContent className="p-6 flex items-center">
              <div className="mr-4 bg-green-100 p-3 rounded-full dark:bg-green-900">
                <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Floor Value</p>
                <p className="text-2xl font-bold">1.2 ETH</p>
              </div>
            </CardContent>
          </Card>

          <Card className="stat-card">
            <CardContent className="p-6 flex items-center">
              <div className="mr-4 bg-blue-100 p-3 rounded-full dark:bg-blue-900">
                <DollarSign className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Value</p>
                <p className="text-2xl font-bold">3.5 ETH</p>
              </div>
            </CardContent>
          </Card>

          <Card className="stat-card">
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-500">Gas Price</p>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full dark:bg-green-900 dark:text-green-400">
                  Low
                </span>
              </div>
              <p className="text-2xl font-bold mt-1">25 Gwei</p>
            </CardContent>
          </Card>
        </div>
      )}

      <Tabs defaultValue="collected" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="collected">Collected</TabsTrigger>
          <TabsTrigger value="created">Created</TabsTrigger>
        </TabsList>

        <TabsContent value="collected">
          {!connected ? (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Not connected</AlertTitle>
              <AlertDescription>Please connect your wallet to view your collected NFTs</AlertDescription>
            </Alert>
          ) : myNFTs.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium">No NFTs found</h3>
              <p className="text-gray-500 mt-2">You haven't collected any NFTs yet</p>
              <Button className="mt-4">Explore NFTs</Button>
            </div>
          ) : (
            <div ref={nftGridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {myNFTs.map((nft) => (
                <Card key={nft.id} className="nft-card overflow-hidden group">
                  <CardContent className="p-0">
                    <img
                      src={nft.image || "/placeholder.svg"}
                      alt={nft.name}
                      className="w-full aspect-square object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="p-4">
                      <h3 className="font-semibold text-lg truncate">{nft.name}</h3>
                      <p className="text-sm text-gray-500">Created by {nft.creator}</p>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between border-t p-4">
                    <Button variant="outline">Transfer</Button>
                    <Button className="transition-transform duration-200 hover:scale-105">Sell</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="created">
          {!connected ? (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Not connected</AlertTitle>
              <AlertDescription>Please connect your wallet to view your created NFTs</AlertDescription>
            </Alert>
          ) : createdNFTs.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium">No NFTs found</h3>
              <p className="text-gray-500 mt-2">You haven't created any NFTs yet</p>
              <Button className="mt-4">Create NFT</Button>
            </div>
          ) : (
            <div ref={nftGridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {createdNFTs.map((nft) => (
                <Card key={nft.id} className="nft-card overflow-hidden group">
                  <CardContent className="p-0">
                    <img
                      src={nft.image || "/placeholder.svg"}
                      alt={nft.name}
                      className="w-full aspect-square object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="p-4">
                      <h3 className="font-semibold text-lg truncate">{nft.name}</h3>
                      <p className="text-sm text-gray-500">Status: {nft.status}</p>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between border-t p-4">
                    <Button variant="outline">Edit</Button>
                    <Button className="transition-transform duration-200 hover:scale-105">List for Sale</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

