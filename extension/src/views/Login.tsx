export const Login = () => {
  const webAuthUrl = import.meta.env.VITE_WEB_URL;
  const loginUrl = `${webAuthUrl}/auth/login`;

  // Open the browser to the web auth page
  const openWebLogin = () => {
    chrome.tabs.create({ url: loginUrl });
  };

  return (
    <div className="flex flex-col min-h-[400px]">
      <div className="header">
        <h2 className="font-bold text-lg">Your Mom Extension</h2>
      </div>

      <div className="container flex-1 flex flex-col justify-center items-center pt-4">
        <div
          className="logo"
          style={{
            width: "80px",
            height: "80px",
            backgroundImage: `url(${chrome.runtime.getURL(
              "mom-brunette-happy.png"
            )})`,
            backgroundSize: "cover",
            margin: "0 auto 24px",
            borderRadius: "15px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
          }}
        ></div>

        <div className="card w-full text-center">
          <h3 className="section-title mb-3">Welcome to Your Mom!</h3>
          <p className="mb-6">
            Log in to view and customize your moms in this extension.
          </p>

          <button onClick={openWebLogin} className="btn btn-primary w-full">
            Login with Your Account
          </button>

          <div className="mt-4 text-sm text-gray-600">
            <p>After logging in, return to this extension to see your Mom!</p>
          </div>
        </div>
      </div>
    </div>
  );
};
