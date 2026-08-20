import React, { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { drawPath, stateCode } from '@react-map/india/src/constants';

const defaultStateFill = '#8B73C6'; // Soft StepUp-style violet
const hoverStateFill = '#A98CE5'; // Hover-only accent

const IndiaSvgMap = React.memo(function IndiaSvgMap({
  hoveredState,
  selectedState = 'Maharashtra',
  onStateHover,
  onStateLeave,
  onStateClick,
}) {
  const svgRef = useRef(null);
  const [viewBox, setViewBox] = useState('0 0 824 950');

  const states = useMemo(
    () =>
      stateCode.map((stateName) => ({
        name: stateName,
        path: drawPath[stateName],
      })),
    []
  );

  useLayoutEffect(() => {
    if (svgRef.current) {
      const bbox = svgRef.current.getBBox();
      setViewBox(`${bbox.x} ${bbox.y} ${bbox.width} ${bbox.height}`);
    }
  }, []);

  const handleHover = (stateName, event) => {
    onStateHover?.(stateName, event);
  };

  const handlePointerMove = (stateName, event) => {
    if (event?.clientX && event?.clientY) {
      onStateHover?.(stateName, event);
    }
  };

  return (
    <div className="india-map-container">
      <svg
        ref={svgRef}
        viewBox={viewBox}
        preserveAspectRatio="xMidYMid meet"
        className="india-map"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Interactive India map"
      >
        <defs>
          <filter id="stateGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#A98CE5" floodOpacity="0.5" />
          </filter>
        </defs>

        {states.map(({ name, path }) => {
          const isHovered = hoveredState === name;
          const isSelected = selectedState === name;
          const fill = isHovered ? hoverStateFill : defaultStateFill;
          const filter = isHovered ? 'url(#stateGlow)' : 'none';
          const transform = isHovered ? 'scale(1.03)' : 'scale(1)';

          return (
            <path
              key={name}
              id={name.toLowerCase().replace(/[^a-z0-9]/g, '')}
              d={path}
              fill={fill}
              filter={filter}
              stroke="#FFFFFF"
              strokeWidth="1.2"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
              style={{
                cursor: 'pointer',
                transform,
                transformOrigin: 'center',
                transition: 'fill 0.3s ease, transform 0.25s ease, filter 0.25s ease',
                willChange: 'transform, filter, fill',
              }}
              className={`state state-path ${isSelected ? 'active' : ''}`}
              onMouseEnter={(event) => handleHover(name, event)}
              onMouseMove={(event) => handlePointerMove(name, event)}
              onMouseLeave={() => onStateLeave?.()}
              onTouchStart={(event) => {
                const touch = event.touches[0];
                if (touch) {
                  handleHover(name, {
                    clientX: touch.clientX,
                    clientY: touch.clientY,
                    currentTarget: event.currentTarget,
                  });
                }
              }}
              onClick={() => onStateClick?.(name)}
              tabIndex={0}
              role="button"
              aria-label={name}
            />
          );
        })}
      </svg>

      <style>{`
        .india-map-container {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          margin: 0 auto;
          padding: 0;
        }

        .india-map {
          width: 70%;
          max-width: 760px;
          height: auto;
          display: block;
          margin: 0 auto;
          transition: transform 0.3s ease;
          transform-origin: center;
          overflow: visible;
        }

        .state-path {
          fill: #8B73C6;
          stroke: #FFFFFF;
          stroke-width: 1.2;
          transition: fill 0.3s ease, transform 0.25s ease, filter 0.25s ease;
          transform-origin: center;
          will-change: transform, filter, fill;
        }

        .state-path:hover {
          fill: #A98CE5;
          cursor: pointer;
        }

        .state-path.active {
          fill: #8B73C6;
        }

        .state-path:focus-visible {
          outline: none;
          filter: url(#stateGlow);
          transform: scale(1.03);
        }

        @media (max-width: 1024px) {
          .india-map {
            width: 82%;
            max-width: 620px;
          }
        }

        @media (max-width: 768px) {
          .india-map {
            width: 92%;
            max-width: 520px;
          }
        }
      `}</style>
    </div>
  );
});

export default IndiaSvgMap;
