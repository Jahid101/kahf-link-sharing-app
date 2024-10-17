import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { IoCopy } from "react-icons/io5";
import { useToast } from "@/components/ui/use-toast";

const ShareButton = ({ open, setDialogOpen }) => {
  const { toast } = useToast()

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

  const handleCopy = (link) => {
    navigator.clipboard.writeText(link);
    toast({
      variant: "success",
      title: "Copied to clipboard",
    })
  }


  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="w-full bg-white border-slate-700"
        onOpenAutoFocus={(e) => {
          e.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle className="text-black text-xl">Share</DialogTitle>
          <DialogDescription>
            Share your links with others.
            <div className="flex justify-between items-center bg-gray-200 rounded-lg mt-3 p-3">
              <p>{window.location.href}</p>

              <TooltipProvider>
                <Tooltip delayDuration={0}>
                  <TooltipTrigger>
                    <IoCopy className='cursor-pointer text-primary w-5 h-5' onClick={() => handleCopy(window?.location?.href)} />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Copy</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

            </div>
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-y-2">
          {
            shareMenuItems.map((item) => {
              const onButtonClicked = () => {
                window.open(`${item.link}${window.location.href}`, '_blank')
              }

              return <Button variant='outline' onClick={onButtonClicked}>{item.title}</Button>
            })
          }
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ShareButton;
