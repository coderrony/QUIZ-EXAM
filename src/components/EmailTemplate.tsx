import * as React from 'react';

interface EmailTemplateProps {
  title: string;
  message: string;
  action_url: string;
  action_text: string;
}

export function EmailTemplate({
  title,
  message,
  action_url,
  action_text,
}: EmailTemplateProps) {
  return (
    <div
      style={{
        fontFamily: "'Poppins', Segoe UI, Arial, sans-serif",
        background: 'linear-gradient(135deg, #e0e7ff 0%, #f4f6fb 100%)',
        padding: '40px 0',
        minHeight: '50vh',
      }}
    >
      <div
        style={{
          maxWidth: 480,
          margin: '0 auto',
          background: '#fff',
          borderRadius: 18,
          boxShadow: '0 6px 32px rgba(37,99,235,0.13), 0 1.5px 6px rgba(0,0,0,0.04)',
          padding: '40px 32px',
          border: '2px solid #2563eb',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 24 }}>
          <div
            style={{
              background: 'linear-gradient(135deg, #2563eb 60%, #60a5fa 100%)',
              borderRadius: '50%',
              width: 54,
              height: 54,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 16,
              boxShadow: '0 2px 8px rgba(37,99,235,0.18)',
            }}
          >
            <span
              style={{
                color: '#fff',
                fontWeight: 700,
                fontSize: 28,
                fontFamily: "'Poppins', sans-serif",
                letterSpacing: 1,
              }}
            >
              QE
            </span>
          </div>
          <h1
            style={{
              color: '#2563eb',
              fontSize: 28,
              fontWeight: 700,
              margin: 0,
              fontFamily: "'Poppins', sans-serif",
              letterSpacing: 1,
            }}
          >
            {title}
          </h1>
        </div>
        <p style={{ color: '#374151', fontSize: 17, marginBottom: 32, fontWeight: 500 }}>
          {message}
        </p>
        <a
          href={action_url}
          style={{
            display: 'inline-block',
            background: 'linear-gradient(90deg, #2563eb 60%, #60a5fa 100%)',
            color: '#fff',
            padding: '14px 36px',
            borderRadius: 8,
            textDecoration: 'none',
            fontWeight: 700,
            fontSize: 17,
            fontFamily: "'Poppins', sans-serif",
            boxShadow: '0 2px 8px rgba(37,99,235,0.18)',
            letterSpacing: 0.5,
            transition: 'background 0.2s',
          }}
        >
          {action_text}
        </a>
        <p style={{ color: '#6b7280', fontSize: 13, marginTop: 36, textAlign: 'center' }}>
          If you did not request this, you can safely ignore this email.
        </p>
      </div>
    </div>
  );
}