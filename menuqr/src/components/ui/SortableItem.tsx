import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

interface SortableItemProps {
  id: string
  children: (dragHandleProps: React.HTMLAttributes<HTMLElement>) => React.ReactNode
}

export function SortableItem({ id, children }: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id })

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        zIndex: isDragging ? 999 : undefined,
      }}
    >
      {children({ ...attributes, ...listeners })}
    </div>
  )
}

export function DragHandle(props: React.HTMLAttributes<HTMLElement>) {
  return (
    <div
      {...props}
      className="cursor-grab touch-none select-none text-stone-300 hover:text-stone-500 active:cursor-grabbing"
      title="Arrastrar para reordenar"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <circle cx="5" cy="4" r="1.5" />
        <circle cx="5" cy="8" r="1.5" />
        <circle cx="5" cy="12" r="1.5" />
        <circle cx="11" cy="4" r="1.5" />
        <circle cx="11" cy="8" r="1.5" />
        <circle cx="11" cy="12" r="1.5" />
      </svg>
    </div>
  )
}
