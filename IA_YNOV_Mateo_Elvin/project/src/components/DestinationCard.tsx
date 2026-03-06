import { useState } from 'react';
import { ArrowRight, Clock, Sparkles } from 'lucide-react';
import { type Destination, getStatusColor } from '../data/destinations';

interface DestinationCardProps {
  destination: Destination;
  onExplore?: (destinationId: string) => void;
}

export default function DestinationCard({ destination, onExplore }: DestinationCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { id, label, era, dateDisplay, description, hoverTagline, image, price, tags, status } = destination;
  const statusColor = getStatusColor(status);
  const isBookable = status === 'Disponible';

  const handleExplore = () => {
    if (onExplore && isBookable) {
      onExplore(id);
    }
  };

  return (
    <div
      id={`card-${id}`}
      className="group relative rounded-2xl overflow-hidden cursor-pointer"
      style={{
        transition: 'transform 0.7s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.7s cubic-bezier(0.22, 1, 0.36, 1)',
        transform: isHovered ? 'scale(1.03) translateY(-4px)' : 'scale(1) translateY(0)',
        boxShadow: isHovered
          ? '0 25px 60px rgba(0, 0, 0, 0.5), 0 0 50px rgba(228, 181, 68, 0.12), 0 0 100px rgba(228, 181, 68, 0.06)'
          : '0 4px 20px rgba(0, 0, 0, 0.3)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none z-20"
        style={{
          transition: 'opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1)',
          opacity: isHovered ? 1 : 0,
          border: '2px solid transparent',
          borderImage: 'linear-gradient(135deg, rgba(228,181,68,0.7), rgba(228,181,68,0.1), rgba(228,181,68,0.5)) 1',
          boxShadow: 'inset 0 0 30px rgba(228, 181, 68, 0.05)',
        }}
      />
      <div
        className="absolute -inset-[1px] rounded-2xl pointer-events-none z-20"
        style={{
          transition: 'opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1)',
          opacity: isHovered ? 1 : 0,
          background: 'linear-gradient(135deg, rgba(228,181,68,0.6), rgba(228,181,68,0.05) 30%, rgba(228,181,68,0.3) 70%, rgba(228,181,68,0.6))',
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'exclude',
          WebkitMaskComposite: 'xor',
          padding: '2px',
          borderRadius: '1rem',
          filter: 'blur(0.5px)',
        }}
      />

      <div className="relative h-[440px] sm:h-[480px] overflow-hidden">
        <img
          src={image}
          alt={label}
          className="w-full h-full object-cover"
          style={{
            transition: 'transform 0.7s cubic-bezier(0.22, 1, 0.36, 1), filter 0.7s cubic-bezier(0.22, 1, 0.36, 1)',
            transform: isHovered ? 'scale(1.12)' : 'scale(1)',
            filter: isHovered ? 'brightness(0.8) saturate(1.15)' : 'brightness(0.4) saturate(0.9)',
          }}
        />

        <div
          className="absolute inset-0"
          style={{
            transition: 'background 0.7s ease',
            background: isHovered
              ? 'linear-gradient(to top, rgba(10,10,12,0.97) 0%, rgba(10,10,12,0.6) 35%, rgba(10,10,12,0.15) 65%, transparent 100%)'
              : 'linear-gradient(to top, rgba(10,10,12,0.92) 0%, rgba(10,10,12,0.4) 50%, transparent 100%)',
          }}
        />

        <div className="absolute top-4 right-4 flex flex-col items-end gap-2 z-10">
          <div className="px-3 py-1.5 bg-white/[0.08] backdrop-blur-xl border border-white/[0.12] rounded-lg text-xs text-gold-300 tracking-wide font-medium">
            {era}
          </div>
          <div className={`px-2.5 py-1 backdrop-blur-xl border rounded-lg text-[10px] uppercase tracking-wider font-semibold ${statusColor}`}>
            {status}
          </div>
        </div>

        <div
          className="absolute top-4 left-4 flex flex-wrap gap-1.5 z-10"
          style={{
            transition: 'opacity 0.5s ease, transform 0.5s ease',
            opacity: isHovered ? 1 : 0,
            transform: isHovered ? 'translateY(0)' : 'translateY(-10px)',
          }}
        >
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 bg-white/[0.08] backdrop-blur-xl border border-white/[0.1] rounded-lg text-[10px] text-dark-100 uppercase tracking-wider font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
          <div
            className="rounded-xl p-5"
            style={{
              transition: 'all 0.7s cubic-bezier(0.22, 1, 0.36, 1)',
              background: isHovered ? 'rgba(255, 255, 255, 0.07)' : 'transparent',
              backdropFilter: isHovered ? 'blur(20px) saturate(1.3)' : 'none',
              WebkitBackdropFilter: isHovered ? 'blur(20px) saturate(1.3)' : 'none',
              border: isHovered ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid transparent',
              boxShadow: isHovered ? '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.04)' : 'none',
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-3.5 h-3.5 text-gold-400" />
              <p className="text-xs text-gold-400/80 tracking-wide font-medium">{dateDisplay}</p>
            </div>

            <h3
              className="font-display text-2xl font-semibold text-gold-50 mb-1"
              style={{
                transition: 'color 0.5s ease',
                color: isHovered ? '#e4b544' : undefined,
              }}
            >
              {label}
            </h3>

            <div
              className="overflow-hidden"
              style={{
                transition: 'max-height 0.7s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.5s ease 0.1s, margin 0.7s ease',
                maxHeight: isHovered ? '200px' : '0px',
                opacity: isHovered ? 1 : 0,
                marginTop: isHovered ? '12px' : '0px',
              }}
            >
              <div className="flex items-start gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-gold-400 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gold-300 italic font-display leading-relaxed">
                  {hoverTagline}
                </p>
              </div>
              <p className="text-sm text-dark-300 leading-relaxed line-clamp-3">
                {description}
              </p>
            </div>

            <div
              className="flex items-center justify-between"
              style={{
                transition: 'margin 0.7s ease',
                marginTop: isHovered ? '16px' : '12px',
              }}
            >
              <div>
                <span className="text-[10px] text-dark-500 uppercase tracking-wider">A partir de</span>
                <p className="text-gold-400 font-display text-lg font-semibold">{price}</p>
              </div>

              <button
                disabled={!isBookable}
                onClick={handleExplore}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium"
                style={{
                  transition: 'all 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
                  background: isHovered && isBookable
                    ? 'rgba(228, 181, 68, 0.15)'
                    : isBookable
                      ? 'rgba(255, 255, 255, 0.05)'
                      : 'rgba(255, 255, 255, 0.03)',
                  border: isHovered && isBookable
                    ? '1px solid rgba(228, 181, 68, 0.35)'
                    : '1px solid rgba(255, 255, 255, 0.08)',
                  color: isBookable ? '#e4b544' : 'rgba(255,255,255,0.25)',
                  cursor: isBookable ? 'pointer' : 'not-allowed',
                  backdropFilter: 'blur(12px)',
                  boxShadow: isHovered && isBookable ? '0 0 20px rgba(228, 181, 68, 0.08)' : 'none',
                }}
              >
                <span>{isBookable ? 'Explorer cette epoque' : status}</span>
                {isBookable && (
                  <ArrowRight
                    className="w-4 h-4"
                    style={{
                      transition: 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
                      transform: isHovered ? 'translateX(4px)' : 'translateX(0)',
                    }}
                  />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-[2px]"
        style={{
          transition: 'all 0.7s ease',
          background: isHovered
            ? 'linear-gradient(to right, transparent, rgba(228, 181, 68, 0.7), transparent)'
            : 'linear-gradient(to right, transparent, rgba(228, 181, 68, 0), transparent)',
          boxShadow: isHovered ? '0 0 15px rgba(228, 181, 68, 0.3)' : 'none',
        }}
      />
    </div>
  );
}
