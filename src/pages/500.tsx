export default function Custom500() {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>500 - Server error</h1>
        <p style={{ color: '#6B7280' }}>Something went wrong. Please try again later.</p>
      </div>
    </main>
  );
}


