import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { NFT } from "@/lib/data/nfts"

interface NFTCardProps {
    nft: NFT;
    key?: string;
}

export function NFTCard({ nft }: NFTCardProps) {
    return (
        <Card className="w-full overflow-hidden">
            <CardHeader className="p-0">
                <div className="relative aspect-square">
                    <Image
                        src={nft.image}
                        alt={nft.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                </div>
            </CardHeader>
            <CardContent className="p-4">
                <h3 className="font-semibold text-lg">{nft.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{nft.creator}</p>
                <p className="text-sm mt-2 line-clamp-2">{nft.description}</p>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex justify-between items-center">
                <span className="font-bold">{nft.price}</span>
                <Button variant="secondary">Buy Now</Button>
            </CardFooter>
        </Card>
    )
} 