import Link from "next/link";

function BottomDeck({ cur, max }) {
  return (
    <div className="fixed bottom-5 right-10 left-10 md:flex justify-between items-center uppercase text-xs z-10  hidden">
      <div>
        <Link href={"/projects"}>All Projects</Link>
      </div>

      <div>
        <ul className="flex gap-30">
          <li>{cur + 1}</li>
          <li>{max}</li>
        </ul>
      </div>
    </div>
  );
}

export default BottomDeck;
