import React, { useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DropZone from './components/DropZone';
import { v4 as uuidv4 } from 'uuid';
import { postData, getData } from './api';

import './App.scss';

const initialZones = Array.from({ length: 12 }, (_, zoneIndex) => ({
  id: `zone-${zoneIndex + 1}`,
  title: `Table ${zoneIndex + 1}`,
  items: Array.from({ length: 12 }, (_, itemIndex) => ({
    id: `zone-${zoneIndex + 1}-${itemIndex + 1}`,
    text: ``,
  })),
}));

function App() {
  const [zones, setZones] = useState(initialZones);
  const [dataUpdated, setDataUpdated] = useState(false);

  useEffect(() => {
    getData().then((res) => {
      setZones(res.content.data)
    });
  }, [])

  useEffect(() => {
    if (dataUpdated) {
      postData(zones);
    }
  }, [zones])

  const moveItem = (itemId, fromZoneId, toZoneId) => {
    if (fromZoneId === toZoneId) return;

    setZones((prevZones) => {
      const newZones = prevZones.map((zone) => {
        if (zone.id === fromZoneId) {
          return {
            ...zone,
            items: zone.items.filter((item) => item.id !== itemId),
          };
        }
        return zone;
      });

      const draggedItem = prevZones
        .find((z) => z.id === fromZoneId)
        ?.items.find((item) => item.id === itemId);

      return newZones.map((zone) => {
        if (zone.id === toZoneId && draggedItem) {
          return {
            ...zone,
            items: [...zone.items, draggedItem],
          };
        }
        return zone;
      });
    });
  };

  const reorderItem = (zoneId, dragId, hoverId) => {
    setZones((prevZones) =>
      prevZones.map((zone) => {
        if (zone.id !== zoneId) return zone;

        const items = [...zone.items];
        const dragIndex = items.findIndex((i) => i.id === dragId);
        const hoverIndex = items.findIndex((i) => i.id === hoverId);

        if (dragIndex === -1 || hoverIndex === -1) return zone;

        const [draggedItem] = items.splice(dragIndex, 1);
        items.splice(hoverIndex, 0, draggedItem);

        return { ...zone, items };
      })
    );
  };

  const updateItemText = (zoneId, itemId, newText) => {
    setZones((prevZones) =>
      prevZones.map((zone) => {
        if (zone.id !== zoneId) return zone;

        return {
          ...zone,
          items: zone.items.map((item) =>
            item.id === itemId ? { ...item, text: newText } : item
          ),
        };
      })
    );
    setDataUpdated(true)
  };

  const addZone = () => {
    const newId = uuidv4();
    const newZone = {
      id: newId,
      title: `Table ${zones.length + 1}`,
      items: Array.from({ length: 12 }, (_, itemIndex) => ({
        id: `zone-${newId + 1}-${itemIndex + 1}`,
        text: `Guest`,
      })),
    };
    setZones([...zones, newZone]);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="app-container">
        <div className="button-group">
          <button className="table-btn" onClick={addZone}>+ Add Table</button>
        </div>

        <div className="tables-wrapper">
          {zones.map((zone) => (
            <DropZone
              key={zone.id}
              id={zone.id}
              title={zone.title}
              items={zone.items}
              moveItem={moveItem}
              reorderItem={reorderItem}
              updateItemText={updateItemText}
            />
          ))}
        </div>
      </div>
    </DndProvider>
  );
}

export default App;
