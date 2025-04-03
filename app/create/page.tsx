"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Upload, ImageIcon, Film, CuboidIcon as Cube, Plus, X, Check } from "lucide-react"
import { WalletConnect } from "@/components/wallet-connect"
import { Switch } from "@/components/ui/switch"
import gsap from "gsap"
import { NFTPreview } from "@/components/nft-preview"

export default function CreatePage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [fileType, setFileType] = useState<string>("image")
  const [nftName, setNftName] = useState<string>("")
  const [nftDescription, setNftDescription] = useState<string>("")
  const [properties, setProperties] = useState<Array<{ name: string; value: string }>>([{ name: "", value: "" }])
  const [isLazyMinting, setIsLazyMinting] = useState<boolean>(true)
  const [isCreatingCollection, setIsCreatingCollection] = useState<boolean>(false)
  const [collectionName, setCollectionName] = useState<string>("")
  const [collectionSymbol, setCollectionSymbol] = useState<string>("")
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [isSuccess, setIsSuccess] = useState<boolean>(false)

  const formRef = useRef(null)
  const successRef = useRef(null)

  useEffect(() => {
    // Animation for form elements
    if (formRef.current) {
      gsap.from(formRef.current.querySelectorAll(".animate-item"), {
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
      })
    }
  }, [])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setSelectedFile(file)

      // Create preview for images
      if (file.type.startsWith("image/")) {
        const reader = new FileReader()
        reader.onloadend = () => {
          setPreview(reader.result as string)
        }
        reader.readAsDataURL(file)
        setFileType("image")
      } else if (file.type.startsWith("video/")) {
        setFileType("video")
        // For video, we could create a thumbnail but for simplicity we'll just set the type
        setPreview(null)
      } else if (file.type.includes("model") || file.name.endsWith(".glb") || file.name.endsWith(".gltf")) {
        setFileType("3d")
        setPreview(null)
      }
    }
  }

  const addProperty = () => {
    setProperties([...properties, { name: "", value: "" }])
  }

  const removeProperty = (index: number) => {
    const newProperties = [...properties]
    newProperties.splice(index, 1)
    setProperties(newProperties)
  }

  const updateProperty = (index: number, field: "name" | "value", value: string) => {
    const newProperties = [...properties]
    newProperties[index][field] = value
    setProperties(newProperties)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)

      // Success animation
      if (successRef.current) {
        gsap.to(formRef.current, {
          opacity: 0,
          y: 20,
          duration: 0.5,
          ease: "power2.in",
        })

        gsap.fromTo(
          successRef.current,
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: "elastic.out(1, 0.5)",
            delay: 0.3,
          },
        )
      }
    }, 2000)
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Create New NFT</h1>
        <WalletConnect />
      </div>

      <Tabs defaultValue="upload" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upload">Upload</TabsTrigger>
          <TabsTrigger value="generate">Generate</TabsTrigger>
        </TabsList>
        <TabsContent value="upload">
          {isSuccess ? (
            <div ref={successRef} className="text-center py-16">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold mb-2">NFT Created Successfully!</h2>
              <p className="text-gray-500 mb-6">Your NFT has been created and is ready to be viewed.</p>
              <div className="flex justify-center gap-4">
                <Button onClick={() => (window.location.href = "/my-nfts")}>View My NFTs</Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsSuccess(false)
                    setSelectedFile(null)
                    setPreview(null)
                    setNftName("")
                    setNftDescription("")
                    setProperties([{ name: "", value: "" }])
                  }}
                >
                  Create Another
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-[1fr_350px] gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Upload your NFT</CardTitle>
                  <CardDescription>
                    Upload your digital asset to mint as an NFT. Supported formats: JPG, PNG, GIF, SVG, MP4, WEBM, GLB,
                    GLTF
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form ref={formRef} onSubmit={handleSubmit} className="grid gap-6">
                    <div className="grid gap-2 animate-item">
                      <Label htmlFor="file">File</Label>
                      <div
                        className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-12 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                        onClick={() => document.getElementById("file")?.click()}
                      >
                        {preview ? (
                          <img src={preview || "/placeholder.svg"} alt="Preview" className="max-h-64 mb-4" />
                        ) : (
                          <div className="flex flex-col items-center">
                            {fileType === "image" && <ImageIcon className="h-10 w-10 text-gray-400 mb-2" />}
                            {fileType === "video" && <Film className="h-10 w-10 text-gray-400 mb-2" />}
                            {fileType === "3d" && <Cube className="h-10 w-10 text-gray-400 mb-2" />}
                            {!selectedFile && <Upload className="h-10 w-10 text-gray-400 mb-2" />}
                            <p className="text-sm text-gray-500">
                              {selectedFile ? selectedFile.name : "Click to upload or drag and drop"}
                            </p>
                          </div>
                        )}
                        <Input id="file" type="file" className="hidden" onChange={handleFileChange} />
                      </div>
                    </div>

                    <div className="grid gap-2 animate-item">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="collection">Create Collection</Label>
                        <Switch
                          id="collection"
                          checked={isCreatingCollection}
                          onCheckedChange={setIsCreatingCollection}
                        />
                      </div>

                      {isCreatingCollection && (
                        <div className="grid gap-4 p-4 border rounded-lg mt-2">
                          <div className="grid gap-2">
                            <Label htmlFor="collectionName">Collection Name</Label>
                            <Input
                              id="collectionName"
                              placeholder="My Amazing Collection"
                              value={collectionName}
                              onChange={(e) => setCollectionName(e.target.value)}
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="collectionSymbol">Collection Symbol</Label>
                            <Input
                              id="collectionSymbol"
                              placeholder="MAC"
                              value={collectionSymbol}
                              onChange={(e) => setCollectionSymbol(e.target.value)}
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="grid gap-2 animate-item">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        placeholder="NFT Name"
                        value={nftName}
                        onChange={(e) => setNftName(e.target.value)}
                      />
                    </div>

                    <div className="grid gap-2 animate-item">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        placeholder="Describe your NFT"
                        value={nftDescription}
                        onChange={(e) => setNftDescription(e.target.value)}
                      />
                    </div>

                    <div className="grid gap-2 animate-item">
                      <Label>Properties</Label>
                      <div className="border rounded-lg p-4">
                        {properties.map((property, index) => (
                          <div key={index} className="grid grid-cols-[1fr_1fr_auto] gap-4 mb-4">
                            <Input
                              placeholder="Property name"
                              value={property.name}
                              onChange={(e) => updateProperty(index, "name", e.target.value)}
                            />
                            <Input
                              placeholder="Property value"
                              value={property.value}
                              onChange={(e) => updateProperty(index, "value", e.target.value)}
                            />
                            <Button
                              variant="ghost"
                              size="icon"
                              type="button"
                              onClick={() => removeProperty(index)}
                              disabled={properties.length === 1}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                        <Button variant="outline" size="sm" className="w-full" type="button" onClick={addProperty}>
                          <Plus className="h-4 w-4 mr-2" />
                          Add Property
                        </Button>
                      </div>
                    </div>

                    <div className="grid gap-2 animate-item">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="lazyMint">Lazy Minting</Label>
                        <Switch id="lazyMint" checked={isLazyMinting} onCheckedChange={setIsLazyMinting} />
                      </div>
                      <p className="text-sm text-gray-500">
                        Lazy minting allows you to create NFTs without paying gas fees upfront. The NFT will be minted
                        when it's purchased.
                      </p>
                    </div>

                    <Button className="w-full animate-item" type="submit" disabled={isSubmitting}>
                      {isSubmitting ? "Creating NFT..." : "Create NFT"}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* NFT Preview Card */}
              <div className="hidden md:block">
                <NFTPreview
                  name={nftName || "Untitled NFT"}
                  description={nftDescription}
                  image={preview}
                  properties={properties.filter((p) => p.name && p.value)}
                />
              </div>
            </div>
          )}
        </TabsContent>
        <TabsContent value="generate">
          <Card>
            <CardHeader>
              <CardTitle>Generate NFT</CardTitle>
              <CardDescription>Generate an NFT using AI or predefined templates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="prompt">Prompt</Label>
                  <Textarea id="prompt" placeholder="Describe what you want to generate..." />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="style">Style</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {["Abstract", "Pixel Art", "3D Render", "Realistic"].map((style) => (
                      <Button key={style} variant="outline" className="h-20">
                        {style}
                      </Button>
                    ))}
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="NFT Name" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Describe your NFT" />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Generate NFT</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

