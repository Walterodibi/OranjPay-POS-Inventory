"use client"

import type React from "react"

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { Edit, Trash, Copy, Share, Eye } from "lucide-react"

interface ContextMenuItemProps {
  children: React.ReactNode
  onView?: () => void
  onEdit?: () => void
  onDelete?: () => void
  onDuplicate?: () => void
  onShare?: () => void
}

export function ContextMenuWrapper({ children, onView, onEdit, onDelete, onDuplicate, onShare }: ContextMenuItemProps) {
  return (
    <ContextMenu>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>
      <ContextMenuContent className="w-48">
        {onView && (
          <ContextMenuItem onClick={onView}>
            <Eye className="mr-2 h-4 w-4" />
            View
          </ContextMenuItem>
        )}
        {onEdit && (
          <ContextMenuItem onClick={onEdit}>
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </ContextMenuItem>
        )}
        {onDuplicate && (
          <ContextMenuItem onClick={onDuplicate}>
            <Copy className="mr-2 h-4 w-4" />
            Duplicate
          </ContextMenuItem>
        )}
        {(onView || onEdit || onDuplicate) && (onDelete || onShare) && <ContextMenuSeparator />}
        {onShare && (
          <ContextMenuItem onClick={onShare}>
            <Share className="mr-2 h-4 w-4" />
            Share
          </ContextMenuItem>
        )}
        {onDelete && (
          <ContextMenuItem onClick={onDelete} className="text-red-600">
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </ContextMenuItem>
        )}
      </ContextMenuContent>
    </ContextMenu>
  )
}
