import React, { useEffect, useRef, useState } from 'react'


export const InfiniteScroll = ({onIntersection}) => {
    const scrollElement = useRef();
    const [intersecting, setIntersecting] = useState(false)
    useEffect(() => {
        
        const intersectionObserver = new IntersectionObserver((entries) => {
            const entry = entries[0];
            if (entry.isIntersecting) onIntersection();
            setIntersecting(true)
        });
        intersectionObserver.observe(scrollElement.current);
    }, [intersecting])
    
  
  return (
    <div ref={scrollElement}>InfiniteScroll</div>
  )
}
