export const Footer = () => {
  return (
    <footer className="w-full h-[4rem] justify-center items-center flex  shadow-lg border-gray-400 border-t-[1px] ">
      <span className="text-lg">
        Built by{" "}
        <a className="underline" href="https://github.com/0xKaizendev">
          Rozales
        </a>
        ,{" "}
        <a className="underline" href="https://github.com/CyrilleValentin">
          Cyrille
        </a>
        ,{" "}
        <a className="underline" href="https://github.com/APELY-ISRAEL">
          Israel
        </a>{" "}
        and{" "}
        <a className="underline" href="https://github.com/Marshalkarl">
          Karl
        </a>
        . The source code is available on{" "}
        <a
          className="underline"
          href="https://github.com/CyrilleValentin/Blockchain_id_System"
        >
          GitHub
        </a>
        .
      </span>
    </footer>
  );
};
