const Logo = ({ size = 40 }: { size?: number }) => {
    return (
        <svg width={size} height={size} viewBox="30 50 220 220" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(68, 80)">
                <rect x="0"   y="0"  width="38" height="38" rx="6" fill="#534AB7"/>
                <rect x="0"   y="46" width="38" height="38" rx="6" fill="#534AB7"/>
                <rect x="0"   y="92" width="38" height="38" rx="6" fill="#534AB7"/>

                <rect x="46"  y="0"  width="38" height="38" rx="6" fill="#7F77DD"/>
                <rect x="46"  y="46" width="38" height="38" rx="6" fill="#7F77DD"/>

                <rect x="100" y="0"  width="38" height="38" rx="6" fill="#534AB7"/>
                <rect x="100" y="46" width="38" height="38" rx="6" fill="#534AB7"/>
                <rect x="100" y="92" width="38" height="38" rx="6" fill="#534AB7"/>

                <rect x="146" y="92" width="38" height="38" rx="6" fill="#7F77DD"/>
            </g>
        </svg>
    )
}

export default Logo