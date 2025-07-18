
import { useRef, useState } from 'react';
import { FaCaretDown } from 'react-icons/fa';

const markers = Array.from({ length: 83 }, (_, i) => i);

interface MarkerProps {
  position: number;
  isLeft: boolean;
  isDragging: boolean;
  onMouseDown: () => void;
  onDoubleClick: () => void;
}

const Marker = ({
  position,
  isLeft,
  isDragging,
  onMouseDown,
  onDoubleClick,
}: MarkerProps) => {
  return (
    <div
      className='absolute top-0 w-4 h-full cursor-ew-resize z-[5] group -ml-2'
      style={{ [isLeft ? 'left' : 'right']: `${position}px` }}
      onMouseDown={onMouseDown}
      onDoubleClick={onDoubleClick}
    >
      <FaCaretDown className='absolute left-1/2 top-0 h-full fill-blue-500 transform -translate-x-1/2' />
      <div
        className='absolute left-1/2 top-4 transform -translate-x-1/2'
        style={{
          height: '100vh',
          width: '1px',
          transform: 'scaleX(0.5)',
          backgroundColor: '#3672f6',
          display: isDragging ? 'block' : 'none'
        }}
      />
    </div>
  )
}
const Ruler = () => {
  const [leftMargin, setLeftMargin] = useState(56);
  const [rightMargin, setRightMargin] = useState(56);

  const [isDraggingLeft, setIsDraggingLeft] = useState(false);
  const [isDraggingRight, setIsDraggingRight] = useState(false);

  const rulerRef = useRef<HTMLDivElement>(null);

  const handleLeftMouseDown = () => {
    setIsDraggingLeft(true)
  }

  const handleRightMouseDown = () => {
    setIsDraggingRight(true)
  }

  /**
  * Handles mouse move events when dragging the ruler margins.
  * Updates left or right margin based on mouse position, while maintaining constraints.
  */
  const handleMouseMove = (e: React.MouseEvent) => {
    const pageWidth = 816;
    const miniumSpace = 100;

    if ((isDraggingLeft || isDraggingRight) && rulerRef.current) {
      const container = rulerRef.current.querySelector('#ruler-container');

      if (container) {
        const containerRect = container.getBoundingClientRect(); // Get the position of the container on the screen
        const relativeX = e.clientX - containerRect.left; // Calculate mouse X position relative to the container
        const rawPosition = Math.max(0, Math.min(pageWidth, relativeX)); // Clamp position within 0 and pageWidth

        if (isDraggingLeft) {
          const maxLeftPosition = pageWidth - rightMargin - miniumSpace; // Ensure minimum space is maintained
          const newLeftPosition = Math.min(rawPosition, maxLeftPosition); // Clamp left margin to valid range
          setLeftMargin(newLeftPosition); // (TODO: make collaborative for real-time sync)
        }
        else if (isDraggingRight) {
          const maxRightPosition = pageWidth - (leftMargin + miniumSpace); // Ensure minimum space is maintained
          const newRightPosition = Math.max(pageWidth - rawPosition, 0); // Calculate and clamp new right margin
          const constrainedRightPosition = Math.min(newRightPosition, maxRightPosition);
          setRightMargin(constrainedRightPosition);
        }
      }
    }
  };

  const handleMouseUp = () => {
    setIsDraggingLeft(false);
    setIsDraggingRight(false)
  }

  const handleLeftDoubleClick = () => {
    setLeftMargin(56)
  }

  const handleRightDoubleClick = () => {
    setRightMargin(56)
  }

  return (
    <div
      ref={rulerRef}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      className='
              w-[816px] mx-auto
              h-6 border-b border-gray-300 
              flex items-end relative 
              select-none print:hidden'>
      <div
        id='ruler-container'
        className='w-full h-full relative'
      >
        <Marker
          position={leftMargin}
          isLeft={true}
          isDragging={isDraggingLeft}
          onMouseDown={handleLeftMouseDown}
          onDoubleClick={handleLeftDoubleClick}
        />
        <Marker
          position={rightMargin}
          isLeft={false}
          isDragging={isDraggingRight}
          onMouseDown={handleRightMouseDown}
          onDoubleClick={handleRightDoubleClick}
        />

        <div className='absolute inset-x-0 bottom-0 h-full'>
          <div className='relative h-full w-[816px]'>
            {markers.map((marker) => {
              const position = (marker * 816) / 82
              return (
                <div
                  key={marker}
                  className='absolute bottom-0'
                  style={{ left: `${position}px` }}
                >
                  {marker % 10 === 0 && (
                    <>
                      <div className='absolute bottom-0 w-[1px] h-2 bg-neutral-500' />
                      <span className='absolute bottom-2 text-[10px] text-neutral-500 transform -translate-x-1/2'>{marker / 10 + 1}</span>
                    </>
                  )}
                  {marker % 5 === 0 && marker % 10 !== 0 && (
                    <div className='absolute bottom-0 w-[1px] h-1.5 bg-neutral-500' />
                  )}
                  {marker % 5 !== 0 && (
                    <div className='absolute bottom-0 w-[1px] h-1 bg-neutral-500' />
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Ruler