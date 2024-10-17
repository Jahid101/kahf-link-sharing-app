// components/VerticalDnd.js
import { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { HiOutlineMenu } from 'react-icons/hi';

// Custom modifier for vertical axis restriction
const restrictToVerticalAxis = ({ transform }) => {
  return {
    ...transform,
    x: 0, // Restrict horizontal movement
  };
};

function DraggableItem({ id, item }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center p-2 border mb-2 bg-white shadow-md rounded"
    >
      <button {...listeners} {...attributes} className="p-2 cursor-move">
        <HiOutlineMenu className="text-gray-600" />
      </button>
      <span className="ml-4">{item}</span>
    </div>
  );
}

export default function VerticalDnd2() {
  const [items, setItems] = useState(['Item 1', 'Item 2', 'Item 3', 'Item 4']);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  const handleDragEnd = ({ active, over }) => {
    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      modifiers={[restrictToVerticalAxis]} // Use custom vertical restriction
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {items.map((item) => (
          <DraggableItem key={item} id={item} item={item} />
        ))}
      </SortableContext>
    </DndContext>
  );
}
