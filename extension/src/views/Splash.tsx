export const Splash = () => {
  return (
    <div className="flex flex-col min-w-[300px]">
      <div className="header">
        <h2 className="font-bold text-lg">Your Mom Extension</h2>
        <div
          style={{
            width: "36px",
            height: "36px",
            backgroundImage: `url(${chrome.runtime.getURL("favicon.png")})`,
            backgroundSize: "cover",
          }}
        ></div>
      </div>

      <div className="container">
        <div className="card">
          <h3 className="section-title">Extension Settings</h3>
        </div>
        <a
          href={
            import.meta.env.VITE_WEB_URL ||
            "localhost:3000/protected/settings/account"
          }
          target="_blank"
          rel="noopener"
          className="block mt-4 text-center text-sm hover:underline"
        >
          Manage your moms on the website →
        </a>
      </div>
    </div>
  );
};
