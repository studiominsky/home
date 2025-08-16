type Props = {
  name: string;
  email: string;
  message: string;
  company?: string;
  services?: string[];
};

export default function EmailTemplate({
  name,
  email,
  message,
  company,
  services = [],
}: Props) {
  return (
    <div
      style={{
        fontFamily:
          'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial',
      }}
    >
      <h2 style={{ margin: 0, marginBottom: 8 }}>New contact</h2>

      <p>
        <strong>Name:</strong> {name}
      </p>
      <p>
        <strong>Email:</strong> {email}
      </p>
      <p>
        <strong>Company:</strong> {company || '—'}
      </p>
      <p>
        <strong>Services:</strong>{' '}
        {services.length ? services.join(', ') : '—'}
      </p>

      <p style={{ marginTop: 16 }}>
        <strong>Message:</strong>
      </p>
      <pre
        style={{ whiteSpace: 'pre-wrap', font: 'inherit', margin: 0 }}
      >
        {message}
      </pre>
    </div>
  );
}
