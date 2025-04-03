"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ImageIcon } from "lucide-react"
import gsap from "gsap"

interface NFTPreviewProps {
  name: string
  description?: string
  image: string | null
  properties: Array<{ name: string; value: string }>
}

export function NFTPreview({ name, description, image, properties }: NFTPreviewProps) {
  const cardRef = useRef(null)

  useEffect(() => {
    // Card animation on mount
    if (cardRef.current) {
      gsap.fromTo(cardRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" })
    }

    // Update animation when props change
    const updateAnimation = gsap.to(cardRef.current, {
      keyframes: {
        "0%": { scale: 1 },
        "50%": { scale: 1.02 },
        "100%": { scale: 1 },
      },
      duration: 0.5,
      ease: "power2.inOut",
      paused: true,
    })

    updateAnimation.play()

    return () => {
      updateAnimation.kill()
    }
  }, [name, description, image, properties])

  return (
    <Card ref={cardRef} className="sticky top-6">
      <CardHeader>
        <CardTitle>NFT Preview</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="border rounded-lg overflow-hidden aspect-square flex items-center justify-center bg-gray-100 dark:bg-gray-800">
          {image ? (
            <img src={image || "/placeholder.svg"} alt={name} className="w-full h-full object-cover" />
          ) : (
            <div className="flex flex-col items-center justify-center text-gray-400">
              <ImageIcon className="h-16 w-16 mb-2" />
              <p className="text-sm">No image uploaded</p>
            </div>
          )}
        </div>

        <div>
          <h3 className="text-lg font-bold">{name}</h3>
          {description && <p className="text-sm text-gray-500 mt-1">{description}</p>}
        </div>

        {properties.length > 0 && properties.some((p) => p.name && p.value) && (
          <div>
            <h4 className="text-sm font-semibold mb-2">Properties</h4>
            <div className="flex flex-wrap gap-2">
              {properties
                .filter((p) => p.name && p.value)
                .map((property, index) => (
                  <Badge key={index} variant="outline" className="px-2 py-1">
                    {property.name}: {property.value}
                  </Badge>
                ))}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="text-xs text-gray-500">Preview updates as you edit</CardFooter>
    </Card>
  )
}

