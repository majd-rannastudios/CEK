import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'CEK Group — Engineered Integrity. Absolute Precision.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          background: '#18281e',
          padding: '64px',
          fontFamily: 'serif',
        }}
      >
        {/* Top label */}
        <div
          style={{
            display: 'flex',
            position: 'absolute',
            top: '64px',
            left: '64px',
            fontSize: '13px',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: '#b8cbbc',
            fontFamily: 'sans-serif',
            fontWeight: 600,
          }}
        >
          Established 1994
        </div>

        {/* Main headline */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          <div
            style={{
              fontSize: '72px',
              fontWeight: 700,
              color: '#fcf9f1',
              lineHeight: 1.08,
              letterSpacing: '-0.02em',
            }}
          >
            CEK Group
          </div>
          <div
            style={{
              fontSize: '28px',
              color: '#b8cbbc',
              fontFamily: 'sans-serif',
              fontWeight: 300,
              letterSpacing: '0.04em',
            }}
          >
            Engineered Integrity. Absolute Precision.
          </div>
          <div
            style={{
              marginTop: '8px',
              fontSize: '17px',
              color: 'rgba(252, 249, 241, 0.55)',
              fontFamily: 'sans-serif',
              fontWeight: 400,
              maxWidth: '640px',
              lineHeight: 1.5,
            }}
          >
            Executive oversight for high-value infrastructure and long-term asset preservation.
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: 'flex',
            position: 'absolute',
            bottom: '0',
            left: '0',
            right: '0',
            height: '6px',
            background: '#b8cbbc',
          }}
        />
      </div>
    ),
    { ...size }
  );
}
