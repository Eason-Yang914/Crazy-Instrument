// 3rd party library imports
import * as Tone from 'tone';
import React, { useState, useEffect } from 'react';
// project imports
import { Instrument, InstrumentProps } from '../Instruments';

// Drum Sounds (an 8-components standard drum kit): 
// Hi Hat Closed, Hi Hat Open, Ride Symbal, 
// High(small) Tom, Mid Tom, Low(Floor) Tom, Snare Drum, Base Drum
const drumSounds = {
    hihat_closed: '/resources/drum/audio/Hihat-Closed.mp3',
    hihat_open: '/resources/drum/audio/Hihat-Open.mp3',
    ride_cymbal: '/resources/drum/audio/Ride-Cymbal.mp3',
    high_tom: '/resources/drum/audio/High-Tom.mp3',
    mid_tom: '/resources/drum/audio/Medium-Tom.mp3',
    floor_tom: '/resources/drum/audio/Floor-Tom.mp3',
    snare_drum: '/resources/drum/audio/Snare-Drum.mp3',
    bass_drum: '/resources/drum/audio/Bass-Drum.mp3'
};
const drumImage = "/resources/drum/img/drum-kit.jpg";

type DrumStyles = {
    [K in keyof typeof drumSounds]?: React.CSSProperties;
};
// Drum action trigger area coordinates and style
const drumStyles: DrumStyles = {
    hihat_closed: { 
        position: 'absolute', 
        top: '220px', 
        left: '30px', 
        width: '80px', 
        height: '80px', 
        borderRadius: '50%' 
    },
    hihat_open: { 
        position: 'absolute', 
        top: '32px', 
        left: '0px', 
        width: '78px', 
        height: '38px', 
        borderRadius: '50%' 
    },
    ride_cymbal: { 
        position: 'absolute', 
        top: '2px', 
        left: '280px', 
        width: '93px', 
        height: '45px', 
        borderRadius: '50%' 
    },
    high_tom: { 
        position: 'absolute', 
        top: '18px', 
        left: '128px', 
        width: '67px', 
        height: '50px', 
        borderRadius: '50%' 
    },
    mid_tom: { 
        position: 'absolute', 
        top: '15px', 
        left: '206px', 
        width: '78px', 
        height: '58px', 
        borderRadius: '50%' 
    },
    floor_tom: { 
        position: 'absolute', 
        top: '110px', 
        left: '255px', 
        width: '115px', 
        height: '65px', 
        borderRadius: '50%' 
    },
    snare_drum: { 
        position: 'absolute', 
        top: '74px', 
        left: '82px', 
        width: '98px', 
        height: '62px', 
        borderRadius: '50%' 
    },
    bass_drum: { 
        position: 'absolute', 
        top: '180px', 
        left: '160px', 
        width: '80px', 
        height: '110px', 
        borderRadius: '50%' 
    },
};


export function Drum({ synth, setSynth }: InstrumentProps): JSX.Element {
    // States for Tone JS audio Player
    const [players, setPlayers] = useState<{ [K in keyof typeof drumSounds]?: Tone.Player }>({});
    // States for drum hovering effect
    const [hovered, setHovered] = useState<{ [K in keyof typeof drumSounds]?: boolean }>({});

    useEffect(() => {
        const newPlayers: { [K in keyof typeof drumSounds]?: Tone.Player } = {};
        for (let drum in drumSounds) {
            if (drumSounds.hasOwnProperty(drum)) {
                newPlayers[drum as keyof typeof drumSounds] = 
                    new Tone.Player(drumSounds[drum as keyof typeof drumSounds]).toDestination();
            }
        }
        setPlayers(newPlayers);
        
        // clean up
        return () => {
            Object.values(newPlayers).forEach(player => player?.dispose());
        };

    }, []);
    
    const playDrum = (drum: keyof typeof drumSounds) => {
        players[drum]?.start();
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '50vh' }}>
            <div style={{ position: 'relative' }}>
                <img src={drumImage} alt="Drum kit" style={{ width: 'auto', height: '75%' }} />
                {Object.keys(drumStyles).map((drum) => {
                    const drumKey = drum as keyof typeof drumStyles;
                    return (
                        <div 
                            key={drum}
                            style={{ 
                                ...drumStyles[drumKey],
                                backgroundColor: hovered[drumKey] ? 'rgba(255, 0, 0, 0.2)' : undefined, 
                                cursor: 'pointer',
                            }} 
                            onClick={() => playDrum(drumKey)}
                            onMouseEnter={() => setHovered({ ...hovered, [drumKey]: true })}
                            onMouseLeave={() => setHovered({ ...hovered, [drumKey]: false })}
                        >
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export const DrumInstrument = new Instrument('Drum', Drum);