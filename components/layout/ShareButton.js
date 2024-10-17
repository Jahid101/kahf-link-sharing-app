import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import {
  Github,
  MessageCircle,
  Share2,
  UserRound
} from "lucide-react";
import { useState } from "react";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getValueAtIndex, scrollToView } from "@/lib/utils";

const ShareButton = ({ open, setDialogOpen }) => {
  const [isDialogOpen, setDialogOpen] = useState(false)

  const shareMenuItems = [
    {
      title: "Facebook",
      link: "https://www.facebook.com/sharer/sharer.php?u=",
      color: "#0165E1"
    },
    {
      title: "WhatsApp",
      link: "https://api.whatsapp.com/send?text=",
      color: "#28D146"
    },
    {
      title: "Twitter",
      link: "https://twitter.com/intent/tweet?url=",
      color: "#1D9BF0"
    },
    {
      title: "LinkedIn",
      link: "https://www.linkedin.com/sharing/share-offsite/?url=",
      color: "#0A66C2"
    },
    {
      title: "Tumblr",
      link: "https://www.tumblr.com/widgets/share/tool?shareSource=legacy&canonicalUrl=&url=",
      color: "#35465C"
    },
    {
      title: "Pinterest",
      link: "https://www.pinterest.com/pin/create/button/?url=",
      color: "#BD081B"
    },
    {
      title: "Reddit",
      link: "https://www.reddit.com/submit?url=",
      color: "#FF4500"
    },
  ]

  const onOpenChange = (b) => {
    setDialogOpen(b)
  }

  return <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="w-full bg-primaryBg border-slate-700">
      <DialogHeader>
        <DialogTitle>Share</DialogTitle>
        <DialogDescription>
          Share this portfolio with others.
        </DialogDescription>
      </DialogHeader>
      <div className="flex flex-col gap-y-2">
        {
          shareMenuItems.map((item) => {
            const onButtonClicked = () => {
              window.open(`${item.link}${window.location.href}`, '_blank')
            }

            return <Button onClick={onButtonClicked}>{item.title}</Button>
          })
        }
      </div>
    </DialogContent>
  </Dialog>
}

export default ShareButton;
