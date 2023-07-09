const Footer = () => (
  <footer className="pt-32 sm:pt-44 px-5">
    <div className="custom-screen text-gray-600">
      <div className="flex flex-wrap gap-y-10 items-center justify-between">
        <div className="space-y-4">
          <h2 className="text-gray-800 text-lg font-semibold sm:text-2xl">
            Buy Ticket Online
          </h2>
          <p className="max-w-md">
            Buy tickets for your favorite movies in a few clicks
          </p>
          <div className="pt-2 flex items-center gap-x-6 text-gray-400">
            <a
              href="https://www.linkedin.com/in/fajarwg"
              target="_blank"
              aria-label="Social media"
            >
              <svg
                className="w-6 h-6 hover:text-gray-500 duration-150"
                fill="none"
                viewBox="0 0 28 28"
              >
                <g clipPath="url(#clip0_1274_2978)">
                  <path
                    fill="currentColor"
                    d="M25.927 0H2.067C.924 0 0 .902 0 2.018v23.959C0 27.092.924 28 2.067 28h23.86C27.07 28 28 27.092 28 25.982V2.018C28 .902 27.07 0 25.927 0zM8.307 23.86H4.151V10.495h4.156V23.86zM6.229 8.673a2.407 2.407 0 110-4.812 2.406 2.406 0 010 4.812zM23.86 23.86h-4.15v-6.497c0-1.547-.028-3.543-2.16-3.543-2.16 0-2.49 1.69-2.49 3.434v6.606h-4.144V10.495h3.98v1.826h.056c.552-1.05 1.908-2.16 3.926-2.16 4.206 0 4.982 2.767 4.982 6.366v7.333z"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_1274_2978">
                    <path fill="#fff" d="M0 0h28v28H0z" />
                  </clipPath>
                </defs>
              </svg>
            </a>
          </div>
        </div>
      </div>
      <div className="mt-10 py-10 border-t flex-row-reverse items-center justify-between sm:flex">
        <p className="mt-6 sm:mt-0">© 2023 TixMov. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
