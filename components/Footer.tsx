import React from 'react';

function Footer() {
  return (
    <div className="bg-background h-[120px] flex items-center justify-center">
      <p className="text-sm text-muted-foreground">
        © {new Date().getFullYear()} Studio Minsky. All Rights
        Reserved.
      </p>
    </div>
  );
}

export default Footer;
