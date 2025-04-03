"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Wallet, AlertCircle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import gsap from "gsap"

export function WalletConnect() {
  const [account, setAccount] = useState<string | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const buttonRef = useRef(null)
  const dialogContentRef = useRef(null)

  useEffect(() => {
    // Check if MetaMask is installed
    if (typeof window !== "undefined") {
      const { ethereum } = window as any
      setIsMetaMaskInstalled(!!ethereum && !!ethereum.isMetaMask)
    }

    // Button animation
    if (buttonRef.current && !account) {
      const timeline = gsap.timeline({ repeat: 2, repeatDelay: 15 })
      timeline
        .to(buttonRef.current, {
          scale: 1.05,
          duration: 0.3,
          ease: "power1.inOut",
        })
        .to(buttonRef.current, {
          scale: 1,
          duration: 0.3,
          ease: "power1.inOut",
        })
    }

    return () => {
      gsap.killTweensOf(buttonRef.current)
    }
  }, [account])

  useEffect(() => {
    // Dialog animation
    if (isDialogOpen && dialogContentRef.current) {
      gsap.fromTo(
        dialogContentRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" },
      )
    }
  }, [isDialogOpen])

  const connectWallet = async () => {
    setIsConnecting(true)
    setError(null)

    try {
      const { ethereum } = window as any

      if (!ethereum) {
        throw new Error("MetaMask is not installed")
      }

      // Request account access
      const accounts = await ethereum.request({ method: "eth_requestAccounts" })

      if (accounts.length > 0) {
        setAccount(accounts[0])
        setIsDialogOpen(false)

        // Success animation
        gsap.fromTo(
          buttonRef.current,
          { scale: 0.95 },
          {
            scale: 1,
            duration: 0.5,
            ease: "elastic.out(1, 0.5)",
          },
        )
      } else {
        throw new Error("No accounts found")
      }
    } catch (err: any) {
      console.error("Error connecting wallet:", err)
      setError(err.message || "Failed to connect wallet")
    } finally {
      setIsConnecting(false)
    }
  }

  const disconnectWallet = () => {
    setAccount(null)
  }

  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
  }

  return (
    <>
      {account ? (
        <Button ref={buttonRef} variant="outline" onClick={disconnectWallet} className="relative">
          <Wallet className="mr-2 h-4 w-4" />
          {formatAddress(account)}
          <span className="absolute top-0 right-0 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
        </Button>
      ) : (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button ref={buttonRef} className="relative">
              <Wallet className="mr-2 h-4 w-4" />
              Connect Wallet
            </Button>
          </DialogTrigger>
          <DialogContent ref={dialogContentRef}>
            <DialogHeader>
              <DialogTitle>Connect your wallet</DialogTitle>
              <DialogDescription>Connect your wallet to mint and manage your NFTs</DialogDescription>
            </DialogHeader>

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {!isMetaMaskInstalled ? (
              <div className="space-y-4">
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>MetaMask not detected</AlertTitle>
                  <AlertDescription>Please install MetaMask to connect your wallet</AlertDescription>
                </Alert>
                <Button className="w-full" onClick={() => window.open("https://metamask.io/download/", "_blank")}>
                  Install MetaMask
                </Button>
              </div>
            ) : (
              <Button className="w-full" onClick={connectWallet} disabled={isConnecting}>
                {isConnecting ? "Connecting..." : "Connect with MetaMask"}
              </Button>
            )}
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}

