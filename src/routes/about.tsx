export type SatsNames = {
  names: SatsName[];
};

export type SatsName = {
  name: string;
  inscriptionId: string;
  inscriptionIndex: number;
  owner: string;
};

export default function AboutPage() {
  return (
    <div className="flex-grow w-full h-full p-6 space-y-6 bg-white rounded-xl">
      <div className="prose">
        <h1>sats-names.xyz</h1>
        <h2>1) What</h2>
        <p>
          This website is small toolkit for exploring the quite new{" "}
          <strong>sats-names</strong> space. It's using the API from{" "}
          <strong>sats.id</strong> who coined the term sats-names.
        </p>
        <p>
          Sats Names is a standard for writing names to Bitcoin using ordinals.
          The goal is to build a name ecosystem for Bitcoin, that is built by
          Bitcoiners, and developed entirely on Bitcoin. We’re just starting the
          process of building our indexer for this project but we can share our
          syntax so builders can begin tinkering.
        </p>
        <a
          className="block"
          href="https://docs.sats.id"
          target="_blank"
          rel="noreferrer"
        >
          Read more on the original sats.id website
        </a>
        <h2>2) Who</h2>
        <p>
          This project is currently a solo-effort from me @0xShremp with a lot
          of help from @sats_names. If you want to support you are very welcome
          to do so. You could:
        </p>
        <ul>
          <li>
            Spread the word on{" "}
            <a
              href="https://twitter.com/0xShremp/status/1631996893722034179?s=20"
              target="_blank"
              rel="noreferrer"
            >
              Twitter
            </a>
          </li>
          <li>
            Join the team 🫡. Someone a bit more backend-savvy would be great.
            Send me a DM on{" "}
            <a
              href="https:/twitter.com/0xshremp"
              target="_blank"
              rel="noreferrer"
            >
              Twitter
            </a>
          </li>
          <li>
            Drop some ideas how to improve this. What do you need? Let me know
            under{" "}
            <a
              href="https://twitter.com/0xShremp/status/1631996893722034179?s=20"
              target="_blank"
              rel="noreferrer"
            >
              this tweet
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
