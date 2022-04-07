import React from "react";
import Box from "@mui/material/Box"
import { styled } from "@mui/system"
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';


// ******* DATA ********
const data = [{
    id: "5f832341cc119a50d1adb972",
    picture: "http://placehold.it/32x32",
    name: {
        first: "Roger",
        last: "Robbins",
    },
}, {
    id: "987ewqiuewqewq768ewq6ui",
    picture: "http://placehold.it/32x32",
    name: {
        first: "Thelma",
        last: "Robbins",
    },
}, {
    id: "e8wq76ewq868347i32uy4736",
    picture: "http://placehold.it/32x32",
    name: {
        first: "Goff",
        last: "Robbins",
    },
},]

// ****** TYPES ********
type StateKeys = 'items' | 'items2' | 'items3';
type StateType = { [key in StateKeys]: typeof data }
type CustomDragElement = {id:string, name:string, index: number} 
// ****** STYLED ******
const BoxItem = styled(Box)`
    min-width: 100px;
    min-height: 100px;
    border-radius: 6px;
    padding: 8px;
    &.container{
        display: flex;
        align-items: flex-start;
        justify-content: baseline;
        flex-flow: row wrap;
        gap: 24px
    }
    &.dropArea {
        display: flex;
        align-items:center;
        width: 100%;
        height: auto;
        background-color: #c3c3c3;
        margin: 0;

        gap: 8px;
        &.isDraggingOver {
            background-color: #37efef;
        }
    }
    &.dragObj {
        flex: 1;
        width:100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: yellow;
        & > .handler {
            width: 64px;
            height: 64px;
            background-color: red;
            border-radius:100px;
        }
        &.first {
            background-color: red;
        }
        &.second {
            background-color: blue;
        }
        &.isDragging {
            border: 2px dashed red;
        }
    }
`;
// **** COMPONENTS ****** 
function DragItem({id, name, index}: CustomDragElement) {
    return (
        <Draggable key={id} draggableId={id} index={index} disableInteractiveElementBlocking={false}>
            {(provided, snapshot) => (
                <BoxItem 
                    ref={provided.innerRef} 
                    {...provided.draggableProps} 
                    className={`dragObj ${snapshot.isDragging ? 'isDragging' : ''}`}
                >
                    <div {...provided.dragHandleProps} className="handler" />
                    <div>{name}</div>
                    <button onClick={() => alert(name)}>Click me</button>
                </BoxItem>
            )}
        </Draggable>
    )
}

// **** DRAG AND DROP
export default function DragAndDrop() {
    const [list, reorderList] = React.useState<StateType>({
        items: [data[0]],
        items2: [data[1]],
        items3: [data[2]]
    })

    const onDragEnd = React.useCallback((result) => {
        if (result?.destination) {
            reorderList((prev: StateType) => {
                const newData = Object.keys(prev).reduce((acc) => {
                    return  {
                        ...acc,
                        [result.source.droppableId]:prev[result.destination.droppableId as StateKeys],
                        [result.destination.droppableId]: prev[result.source.droppableId as StateKeys],
                    }
                }, prev)
                return newData
            })
        }
    }, []);

    return (
        <BoxItem className="container">
            <DragDropContext onDragEnd={onDragEnd}>
                {Object.keys(list).map((item, _idx) => (
                    <Droppable droppableId={item} key={item} direction="horizontal">
                        {(provided, snapshot) => (
                            <BoxItem  ref={provided.innerRef} {...provided.droppableProps} className={`dropArea ${snapshot.isDraggingOver ? 'isDraggingOver' : ''}`}>
                                {(list[item as StateKeys] as typeof data).map((data, index: number) => (
                                    <DragItem id={data.id} name={data.name.first} key={data.id} index={index}/>
                                ))}
                                {provided.placeholder}
                            </BoxItem>
                        )}

                    </Droppable>
                ))}
            </DragDropContext>
        </BoxItem>
    )
}