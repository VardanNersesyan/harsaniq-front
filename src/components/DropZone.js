import React from 'react';
import { useDrop } from 'react-dnd';
import DraggableItem from './DraggableItem';

const DropZone = ({ id, title, items, moveItem, reorderItem, updateItemText }) => {
    const [, drop] = useDrop(() => ({
        accept: 'ITEM',
        drop: (draggedItem) => {
            moveItem(draggedItem.id, draggedItem.fromZone, id);
        },
    }));

    return (
        <div
            ref={drop}
            className="table"
        // style={{
        //     flex: 1,
        //     padding: '20px',
        //     minHeight: '300px',
        //     border: '2px dashed #999',
        //     borderRadius: '10px',
        //     backgroundColor: '#f9f9f9',
        // }}
        >
            <h3 className="table-title">{title}</h3>
            <ol className="guest-list">
                {items.map((item, i) => (
                    <DraggableItem
                        key={item.id}
                        item={item}
                        fromZone={id}
                        reorderItem={reorderItem}
                        updateItemText={updateItemText}
                    />
                ))}
            </ol>
        </div>
    );
};

export default DropZone;
