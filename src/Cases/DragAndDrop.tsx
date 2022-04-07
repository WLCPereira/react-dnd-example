import React from "react";
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
// import { styled } from "@mui/system"
import styled from "styled-components";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

type StateKeys = 'items' | 'items2' | 'items3';

const BoxItem = styled.div<React.PropsWithChildren<React.HTMLAttributes<HTMLElement>>>`
    min-width: 100px;
    min-height: 100px;
    background-color: yellow;
    border-radius: 6px;
    padding: 8px;
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
        flex: 0 1 0;
        &.first {
            background-color: red;
        }
        &.second {
            background-color: blue;
        }
        &.isDragging {
            border: 2px doted red;
        }
    }

`;

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

type StateType = { [key in StateKeys]: typeof data }

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
        <Box sx={{ flexGrow: 1, display: 'flex', gap: 3, flexFlow: 'colunm wrap', alingItems: 'start' }}>
            <DragDropContext onDragEnd={onDragEnd}>
                {Object.keys(list).map((item, idx) => (
                    <Droppable droppableId={item} key={item} type="TEST">
                        {(provided, snapshot) => (
                            <div ref={provided.innerRef} className={`dropArea ${snapshot.isDraggingOver ? 'isDraggingOver' : ''}`} {...provided.droppableProps} >
                                <BoxItem className={`dropArea ${snapshot.isDraggingOver ? 'isDraggingOver' : ''}`}>
                                    {(list[item as StateKeys] as typeof data).map((data, index: number) => (
                                        <Draggable key={data.id} draggableId={data.id} index={index}>{(provided, snapshot) => (
                                            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className={`dragObj ${snapshot.isDragging ? 'isDraggingOver' : ''}`}>
                                                <BoxItem className={`dragObj ${snapshot.isDropAnimating ? 'isDragging' : ''}`}><span>{data.name.first}</span></BoxItem>
                                            </div>
                                        )}</Draggable>
                                    ))}
                                </BoxItem>
                                {provided.placeholder}
                            </div>
                        )}

                    </Droppable>
                ))}
                {/* <Droppable droppableId="items" type="PERSON">
                    {(provided, snapshot) => (
                        <div ref={provided.innerRef}  {...provided.droppableProps}>
                            <BoxItem className={`dropArea ${snapshot.isDraggingOver ? 'isDraggingOver' : ''}`}>
                                {state.items.map((person, index) => (
                                    <Draggable draggableId={person.id} key={person.id} index={index} >
                                        {(provided, snapshot) => (
                                            <div ref={provided.innerRef}  {...provided.draggableProps} {...provided.dragHandleProps} >
                                                <BoxItem className={`dragObj ${snapshot.isDragging ? 'isDragging' : ''}`}>
                                                    <span>{person.name.first}</span>
                                                </BoxItem>
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                                {console.log(provided)}
                            </BoxItem>
                        </div>
                    )}
                </Droppable> */}
            </DragDropContext>
        </Box>
    )
}