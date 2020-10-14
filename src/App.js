import React, {Suspense, useRef, useEffect} from "react";
import { Canvas, useFrame } from "react-three-fiber";
import "./App.scss";
//Components
import Header from "./components/header";
import {Section} from "./components/section";
import { Html, useGLTFLoader } from "drei"
 import state from "./components/state"

 import {useInView} from 'react-intersection-observer'
const Model = ({modelPath}) => {
  const glft = useGLTFLoader(modelPath, true)
  return <primitive object={glft.scene} dispose={null} />
}

const Lights = () => {
  
  return <>
    <ambientLight intensity={.02} />
    <directionalLight position={[10, 10, 5]} intensity={1} />
    <directionalLight position={[0, 10, 0]} intensity={1} />
    <spotLight intensity={1} position={[1000,0,0]} />
    </>
}
const HTMLContent = ({bgColour,domContent,children, modelPath, positionY}) => {
  const [refItem, inView] = useInView({
  threshold: 0
})
  const ref = useRef()
  useFrame(() => (ref.current.rotation.y += .02));

  useEffect(() => {
   inView && (document.body.style.background = bgColour)
  }, [inView])
  return<Section factor={1.5} offset={1} >
    <group position={[0, positionY, 0]}> 
      <mesh ref={ref} position={[0,-35,0]}>
        <Model modelPath={modelPath}/>
      </mesh>
       <Html portal={domContent} fullscreen>
        <div className="container" ref={refItem}>
                    {children}

</div>
        </Html>
   </group>
  </Section>
}

export default function App() {

  const domContent = useRef()
  const scrollArea = useRef();

  const onScroll = (e) => (state.top.current = e.target.scrollTop)
  useEffect(() => void onScroll({target: scrollArea.current}), [])
  return (
    <>
      <Header />
      <Canvas
        colorManagement
        camera={{ position:[0,0,120],fov:70 }}
      >
        <Lights/>
        <Suspense fallback={null}>
          <HTMLContent domContent={domContent} modelPath="/treecko.gltf" positionY={240} bgColour={'#7CB9E8'}>


            <h1 className="title">
Treecko

            </h1>
          

          </HTMLContent>
            <HTMLContent domContent={domContent} modelPath="/scene.gltf" positionY={0} bgColour={'#E52B50'}>


            <h1 className="title">
Cubone

            </h1>
          

          </HTMLContent>
            <HTMLContent domContent={domContent} modelPath="/squirtle.gltf" positionY={-250} bgColour={'#A17A74'}>


            <h1 className="title">
Squirtle

            </h1>
          

            </HTMLContent>
        </Suspense>

      </Canvas>

      <div className="scrollArea" ref={scrollArea} onScroll={onScroll}>
        <div style={{ position:'sticky', top: 0 }}  ref={domContent}></div>
                <div style={{ height:`${state.sections * 100}vh` }}></div>

      </div>
    </>
  );
}
