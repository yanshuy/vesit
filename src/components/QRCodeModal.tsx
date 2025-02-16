"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { BASE_URL } from "../App"

interface QRCodeModalProps {
  isOpen: boolean
  onClose: () => void
  qrCodeUrl: string
  bookingCode: string
}

export function QRCodeModal({ isOpen, onClose, qrCodeUrl, bookingCode }: QRCodeModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">Booking QR Code</DialogTitle>
          <DialogDescription className="text-center">
            Scan this QR code to verify your booking
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="relative aspect-square w-full max-w-[256px] overflow-hidden rounded-lg border">
            <img 
              src={`${BASE_URL}${qrCodeUrl}` || "/placeholder.svg"} 
              alt="Booking QR Code" 
              className="h-full w-full object-contain"
            />
          </div>
          <div className="flex items-center space-x-2 rounded-md bg-muted px-3 py-1">
            <span className="text-sm font-medium">Booking Code:</span>
            <span className="text-sm text-muted-foreground">{bookingCode}</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}