import React, { useRef, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';

const DraggableItem = ({ item, fromZone, reorderItem, updateItemText }) => {
  const ref = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const [tempText, setTempText] = useState(item.text);

  const [, drop] = useDrop({
    accept: 'ITEM',
    hover: (draggedItem) => {
      if (
        draggedItem.id !== item.id &&
        draggedItem.fromZone === fromZone
      ) {
        reorderItem(fromZone, draggedItem.id, item.id);
      }
    },
  });

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'ITEM',
    item: { id: item.id, fromZone },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  drag(drop(ref));

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    setTempText(e.target.value);
  };

  const handleBlur = () => {
    updateItemText(fromZone, item.id, tempText.trim());
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.target.blur();
    }
  };

  return (
    <li
      ref={ref}
      className="guest-input"
      onDoubleClick={handleDoubleClick}
    >
      {isEditing ? (
        <input
          autoFocus
          type="text"
          value={tempText}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <span style={{ opacity: item.text === '' ? '.5' : '1' }}>{item.text || 'Guest'}</span>
      )}
    </li>
  );
};

export default DraggableItem;
