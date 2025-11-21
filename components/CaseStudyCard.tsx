import Link from "next/link";
import Image from "next/image";

type Props = {
  bgColor: string;
  imgSrc: string;
  title: string;
  description: string;
  textColor: string;
  projectId: string;
};

export default function CaseStudyCard({ bgColor, imgSrc, title, description, textColor, projectId }: Props) {
  return (
    <div className="rounded-2xl mb-12 overflow-hidden shadow-2xl">
      {/* Desktop */}
      <div className="hidden lg:flex" style={{ background: `linear-gradient(to right, ${bgColor}, #ffffff)` }}>
        <div className="w-1/2 p-10">
          <Image src={imgSrc} alt={title} width={600} height={400} className="rounded-3xl hover:scale-110 transition duration-500" />
        </div>
        <div className="w-1/2 p-16 flex flex-col justify-center">
          <h3 className={`text-3xl font-bold mb-6 ${textColor}`}>{title}</h3>
          <p className="text-gray-700 text-lg leading-relaxed mb-8">{description}</p>
          <div className="text-right">
            <Link href={`/case-studies/${projectId}`} className="text-purple-600 font-bold hover:underline text-lg">
              Read More →
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className="lg:hidden flex flex-col" style={{ background: `linear-gradient(to bottom, ${bgColor}, #ffffff)` }}>
        <div className="p-8">
          <Image src={imgSrc} alt={title} width={500} height={300} className="rounded-3xl" />
        </div>
        <div className="p-8">
          <h3 className={`text-2xl font-bold mb-4 ${textColor}`}>{title}</h3>
          <p className="text-gray-700 mb-6">{description}</p>
          <Link href={`/case-studies/${projectId}`} className="text-purple-600 font-bold">
            Read More →
          </Link>
        </div>
      </div>
    </div>
  );
}