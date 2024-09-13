import React, {useEffect, useRef, useState} from 'react';
import '../styles/canvas.scss'
import canvasState from "../store/canvasState";
import {observer} from "mobx-react-lite";
import axios from 'axios'
import MyModal from "./UI/MyModal";
import firstRender from "../API/firstRender";
import canvasWebSocket from "../API/canvasWebSocket";
import { useLocation } from "react-router-dom";

function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
}

const Canvas = observer(() => {
    const canvasRef = useRef()
    const usernameRef = useRef()
    const [modal, setModal] = useState(true)
    const params = useQuery();

    useEffect(() => {
        canvasState.setCanvas(canvasRef.current)
        firstRender(canvasRef, params.get('id'))
        //canvasState.setUsername('New User')
        // axios.get(`http://localhost:5000/history?id=${params.id}`)
        //     .then(response => {
        //         canvasState.undoList = response.data
        //     })
    }, []) // первый рендер общего холста


    useEffect(() => {
        if(canvasState.username) {
            canvasWebSocket(canvasRef, params.get('id'))
        }

    }, [canvasState.username]) // окрыть сокет, отправлять сообщения серверу о рисовани, принимать сообщения о рисовании


    const mouseDownHandler = () => {
        canvasState.pushToUndo(canvasRef.current.toDataURL())
    }

    const mouseUpHandler = () => {
        axios.post(`https://paintonline-kirill55580666.amvera.io/image?id=${params.get('id')}`, {img: canvasRef.current.toDataURL()})
            .then()
    } // каждый действие сохраняем на сервере, для первого рендера новых пользователей

    return (
        <div className="canvas">
            <MyModal modal={modal} setModal={setModal} usernameRef={usernameRef}/>
            <canvas
                onMouseDown={() => mouseDownHandler()}
                onMouseUp={() => mouseUpHandler()}
                ref={canvasRef}
                width={600}
                height={400}
            >

            </canvas>
        </div>
    );
});

export default Canvas;